import { NextRequest, NextResponse } from 'next/server';
import { createAnthropic } from '@ai-sdk/anthropic';
import { generateObject, LanguageModelV1 } from 'ai';
import { z } from 'zod';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CareerAnalyticsRequest {
  messages: Message[];
  sessionId?: string;
}

// Schema for career analytics data
const careerAnalyticsSchema = z.object({
  skills: z.object({
    current: z.array(z.object({
      name: z.string(),
      level: z.number().min(0).max(100),
      category: z.string(),
    })),
    required: z.array(z.object({
      name: z.string(),
      level: z.number().min(0).max(100),
      category: z.string(),
      priority: z.enum(['high', 'medium', 'low']),
    })),
  }),
  industryComparison: z.object({
    industries: z.array(z.object({
      name: z.string(),
      salaryRange: z.object({
        min: z.number(),
        max: z.number(),
        currency: z.string(),
      }),
      growthProjection: z.number(), // percentage
      marketDemand: z.enum(['high', 'medium', 'low']),
      jobOpenings: z.number(),
    })),
  }),
  careerReadiness: z.object({
    overallScore: z.number().min(0).max(100),
    categories: z.array(z.object({
      name: z.string(),
      score: z.number().min(0).max(100),
    })),
  }),
  skillGap: z.array(z.object({
    skill: z.string(),
    currentLevel: z.number(),
    requiredLevel: z.number(),
    gap: z.number(),
    priority: z.enum(['high', 'medium', 'low']),
  })),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, sessionId }: CareerAnalyticsRequest = body;

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length < 2) {
      return NextResponse.json(
        { error: 'Insufficient messages to generate analytics. Need at least 2 messages.' },
        { status: 400 }
      );
    }

    // Use Claude API key from environment (check both possible names)
    const apiKey = process.env.CLAUDE_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      console.error('Claude API key not found. Checked CLAUDE_API_KEY and ANTHROPIC_API_KEY');
      return NextResponse.json(
        { error: 'Claude API key not configured. Please set CLAUDE_API_KEY or ANTHROPIC_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    const anthropic = createAnthropic({ apiKey });
    const model = anthropic('claude-3-5-sonnet-20241022') as LanguageModelV1;

    // Extract user information from messages
    const userMessages = messages.filter(m => m.role === 'user').map(m => m.content).join('\n');
    const assistantMessages = messages.filter(m => m.role === 'assistant').map(m => m.content).join('\n');

    const systemPrompt = `You are a career analytics expert. Analyze the conversation between a career counsellor and a user to extract structured data for visualization.

Based on the conversation, generate:
1. Current skills mentioned by the user with proficiency levels (0-100)
2. Required skills for recommended career paths with priority levels
3. Industry comparison data (salary ranges in INR, growth projections, market demand)
4. Career readiness score across different categories
5. Skill gap analysis (current vs required)

Use realistic data based on Indian job market standards. Salary ranges should be in INR (₹).
Growth projections should be percentages (e.g., 15% means 15% growth expected).
Market demand should be based on current Indian job market trends.

For skills, infer levels from the conversation context. If not mentioned, use reasonable defaults.
For industries, suggest 3-5 relevant industries based on the user's profile.
For career readiness, calculate scores based on education, skills, and goals mentioned.`;

    const prompt = `Analyze this career counselling conversation and extract structured analytics data:

USER RESPONSES:
${userMessages}

COUNSELLOR RESPONSES:
${assistantMessages}

Generate comprehensive analytics data including:
- Current skills with proficiency levels
- Required skills for recommended careers
- Industry comparison (salary, growth, demand)
- Career readiness scores
- Skill gap analysis

Return data in the specified schema format.`;

    const { object } = await generateObject({
      model,
      schema: careerAnalyticsSchema,
      system: systemPrompt,
      prompt,
      temperature: 0.3, // Lower temperature for more consistent data
    });

    return NextResponse.json({ data: object });
  } catch (error) {
    console.error('Error generating career analytics:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate analytics',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

