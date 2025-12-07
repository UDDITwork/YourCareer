import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';

// Configure pdf.js worker for serverless environment
if (typeof window === 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '';
}

// Parse PDF using pdfjs-dist (works in serverless environments)
async function parsePDF(buffer: Buffer): Promise<string> {
  try {
    const uint8Array = new Uint8Array(buffer);
    const loadingTask = pdfjsLib.getDocument({
      data: uint8Array,
      useSystemFonts: true,
    });

    const pdf = await loadingTask.promise;
    const textParts: string[] = [];

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item) => ('str' in item ? item.str : ''))
        .join(' ');
      textParts.push(pageText);
    }

    return textParts.join('\n\n');
  } catch (error) {
    console.error('PDF.js parsing error:', error);
    throw error;
  }
}

// Profile extraction prompt for Anthropic
const PROFILE_EXTRACTION_PROMPT = `You are a professional resume/CV parser. Extract all relevant information from the following document text and return it in a structured JSON format.

IMPORTANT: Only extract information that is explicitly present in the document. Do not make up or assume any information.

Return a JSON object with the following structure (only include fields that have actual data):

{
  "first_name": "string or null",
  "last_name": "string or null",
  "email": "string or null",
  "phone_number": "string or null",
  "location": "string or null",
  "website": "string or null",
  "linkedin_url": "string or null",
  "github_url": "string or null",
  "work_experience": [
    {
      "company": "string",
      "position": "string",
      "location": "string or omit",
      "date": "string (e.g., 'Jan 2020 - Present')",
      "description": ["array of bullet points describing responsibilities/achievements"],
      "technologies": ["array of technologies used or omit"]
    }
  ],
  "education": [
    {
      "school": "string",
      "degree": "string",
      "field": "string (field of study)",
      "location": "string or omit",
      "date": "string (e.g., '2016 - 2020' or 'May 2020')",
      "gpa": "number or string or omit",
      "achievements": ["array of achievements or omit"]
    }
  ],
  "skills": [
    {
      "category": "string (e.g., 'Programming Languages', 'Frameworks', 'Tools')",
      "items": ["array of skill names"]
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": ["array of bullet points describing the project"],
      "date": "string or omit",
      "technologies": ["array of technologies or omit"],
      "url": "string or omit",
      "github_url": "string or omit"
    }
  ]
}

DOCUMENT TEXT:
`;

export async function POST(request: Request) {
  try {
    // Check authentication
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get form data with the uploaded file
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF or Word document.' },
        { status: 400 }
      );
    }

    // Get file buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    let documentText = '';

    // Parse document based on type
    if (file.type === 'application/pdf') {
      try {
        // Validate buffer is not empty
        if (!buffer || buffer.length === 0) {
          return NextResponse.json(
            { error: 'The PDF file appears to be empty or corrupted.' },
            { status: 400 }
          );
        }

        // Validate PDF header (should start with %PDF)
        const pdfHeader = buffer.subarray(0, 4).toString();
        if (!pdfHeader.startsWith('%PDF')) {
          return NextResponse.json(
            { error: 'Invalid PDF file format. The file does not appear to be a valid PDF.' },
            { status: 400 }
          );
        }

        documentText = await parsePDF(buffer);
        
        // Validate extracted text
        if (!documentText || typeof documentText !== 'string') {
          return NextResponse.json(
            { error: 'The PDF file could not be read. It may be encrypted, image-based, or corrupted. Please try a different PDF file.' },
            { status: 400 }
          );
        }
      } catch (pdfError) {
        console.error('PDF parsing error:', pdfError);
        
        // Provide more specific error messages
        const errorMessage = pdfError instanceof Error ? pdfError.message : String(pdfError);
        let userMessage = 'Failed to parse PDF file. Please ensure it is a valid PDF.';
        
        if (errorMessage.includes('encrypted') || errorMessage.includes('password')) {
          userMessage = 'The PDF file is password-protected. Please remove the password and try again.';
        } else if (errorMessage.includes('corrupt') || errorMessage.includes('invalid')) {
          userMessage = 'The PDF file appears to be corrupted or invalid. Please try a different PDF file.';
        } else if (errorMessage.includes('image') || errorMessage.includes('scan')) {
          userMessage = 'The PDF appears to be image-based (scanned). Please use a text-based PDF or convert it to text first.';
        }
        
        return NextResponse.json(
          { error: userMessage },
          { status: 400 }
        );
      }
    } else {
      // Word document (.doc or .docx)
      try {
        const result = await mammoth.extractRawText({ buffer });
        documentText = result.value;
      } catch (docError) {
        console.error('Word document parsing error:', docError);
        return NextResponse.json(
          { error: 'Failed to parse Word document. Please ensure it is a valid .doc or .docx file.' },
          { status: 400 }
        );
      }
    }

    if (!documentText || documentText.trim().length < 50) {
      return NextResponse.json(
        { error: 'The document appears to be empty or has very little text content.' },
        { status: 400 }
      );
    }

    // Get Anthropic API key - first check user's own key, then fall back to server key
    const { data: apiKeysData } = await supabase
      .from('api_keys')
      .select('api_key')
      .eq('user_id', user.id)
      .eq('service_name', 'anthropic')
      .single();

    const anthropicApiKey = apiKeysData?.api_key || process.env.ANTHROPIC_API_KEY;

    if (!anthropicApiKey) {
      return NextResponse.json(
        { error: 'No Anthropic API key available. Please add your API key in settings.' },
        { status: 400 }
      );
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: anthropicApiKey,
    });

    // Call Anthropic API to extract profile data
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: PROFILE_EXTRACTION_PROMPT + documentText,
        }
      ],
    });

    // Extract the text content from the response
    const responseContent = message.content[0];
    if (responseContent.type !== 'text') {
      return NextResponse.json(
        { error: 'Unexpected response format from AI' },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let extractedProfile;
    try {
      // Try to extract JSON from the response (it might have markdown code blocks)
      const jsonMatch = responseContent.text.match(/```json\s*([\s\S]*?)\s*```/) ||
                       responseContent.text.match(/```\s*([\s\S]*?)\s*```/) ||
                       [null, responseContent.text];

      const jsonText = jsonMatch[1] || responseContent.text;
      extractedProfile = JSON.parse(jsonText.trim());
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw response:', responseContent.text);
      return NextResponse.json(
        { error: 'Failed to parse AI response. Please try again.' },
        { status: 500 }
      );
    }

    // Validate and clean the extracted profile
    const cleanedProfile = {
      first_name: extractedProfile.first_name || null,
      last_name: extractedProfile.last_name || null,
      email: extractedProfile.email || null,
      phone_number: extractedProfile.phone_number || null,
      location: extractedProfile.location || null,
      website: extractedProfile.website || null,
      linkedin_url: extractedProfile.linkedin_url || null,
      github_url: extractedProfile.github_url || null,
      work_experience: Array.isArray(extractedProfile.work_experience)
        ? extractedProfile.work_experience.map((exp: Record<string, unknown>) => ({
            company: exp.company || '',
            position: exp.position || '',
            location: exp.location || undefined,
            date: exp.date || '',
            description: Array.isArray(exp.description) ? exp.description : [],
            technologies: Array.isArray(exp.technologies) ? exp.technologies : undefined,
          }))
        : [],
      education: Array.isArray(extractedProfile.education)
        ? extractedProfile.education.map((edu: Record<string, unknown>) => ({
            school: edu.school || '',
            degree: edu.degree || '',
            field: edu.field || '',
            location: edu.location || undefined,
            date: edu.date || '',
            gpa: edu.gpa || undefined,
            achievements: Array.isArray(edu.achievements) ? edu.achievements : undefined,
          }))
        : [],
      skills: Array.isArray(extractedProfile.skills)
        ? extractedProfile.skills.map((skill: Record<string, unknown>) => ({
            category: skill.category || 'Other',
            items: Array.isArray(skill.items) ? skill.items : [],
          }))
        : [],
      projects: Array.isArray(extractedProfile.projects)
        ? extractedProfile.projects.map((proj: Record<string, unknown>) => ({
            name: proj.name || '',
            description: Array.isArray(proj.description) ? proj.description : [],
            date: proj.date || undefined,
            technologies: Array.isArray(proj.technologies) ? proj.technologies : undefined,
            url: proj.url || undefined,
            github_url: proj.github_url || undefined,
          }))
        : [],
    };

    return NextResponse.json({
      success: true,
      profile: cleanedProfile,
      message: 'Profile extracted successfully',
    });

  } catch (error) {
    console.error('Profile extraction error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing the document.' },
      { status: 500 }
    );
  }
}
