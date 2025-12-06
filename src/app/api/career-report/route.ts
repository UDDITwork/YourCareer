import { generateObject } from 'ai';
import { createAnthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface CareerReportRequest {
  sessionId: string;
  messages: Message[];
}

const careerReportSchema = z.object({
  personal_summary: z.string().describe('A comprehensive summary of the person based on the conversation'),
  strengths: z.array(z.string()).min(1).describe('Array of identified strengths - must be an array of strings like ["strength 1", "strength 2"]'),
  areas_for_growth: z.array(z.string()).min(1).describe('Array of areas where the person can improve - must be an array of strings'),
  recommended_careers: z.array(z.object({
    title: z.string().describe('Career title'),
    reasoning: z.string().describe('Why this career is recommended'),
    salary_range: z.string().optional().describe('Expected salary range in India'),
    growth_prospects: z.string().optional().describe('Future growth prospects'),
  })).min(1).describe('Array of 3-5 recommended career paths - must be an array of objects'),
  subject_guidance: z.string().optional().describe('Subject selection advice if applicable'),
  competitive_exams: z.array(z.string()).optional().default([]).describe('Relevant competitive exams to consider'),
  skill_development: z.array(z.object({
    skill: z.string().describe('Skill to develop'),
    priority: z.enum(['high', 'medium', 'low']).describe('Priority level'),
    resources: z.array(z.string()).optional().default([]).describe('Learning resources'),
  })).min(1).describe('Array of skills to develop with priority - must be an array of objects'),
  action_plan: z.array(z.object({
    timeframe: z.string().describe('Time period like "Next 1 Month", "3-6 Months", "1 Year"'),
    actions: z.array(z.string()).min(1).describe('Specific actions to take - must be an array of strings'),
  })).min(1).describe('Array of step-by-step action plan items - must be an array of objects'),
  additional_resources: z.array(z.string()).optional().default([]).describe('Helpful websites, books, or courses'),
});

const REPORT_GENERATION_PROMPT = `You are a career counsellor generating a comprehensive career guidance report.

Based on the conversation history provided, create a detailed, personalized career report for this person.

CRITICAL: You MUST return a valid JSON object with the EXACT structure below. All array fields MUST be arrays, not strings.

Required JSON Structure:
{
  "personal_summary": "A string summarizing the person",
  "strengths": ["strength 1", "strength 2", "strength 3"],  // MUST be an array of strings
  "areas_for_growth": ["area 1", "area 2"],  // MUST be an array of strings
  "recommended_careers": [
    {
      "title": "Career Title",
      "reasoning": "Why this career fits",
      "salary_range": "₹X - ₹Y LPA",
      "growth_prospects": "Description of growth"
    }
  ],  // MUST be an array of objects with at least 3 careers
  "subject_guidance": "Optional subject advice",
  "competitive_exams": ["Exam 1", "Exam 2"],  // Array of relevant exams
  "skill_development": [
    {
      "skill": "Skill name",
      "priority": "high",  // must be "high", "medium", or "low"
      "resources": ["Resource 1", "Resource 2"]
    }
  ],  // MUST be an array of skill objects
  "action_plan": [
    {
      "timeframe": "Next 1 Month",
      "actions": ["Action 1", "Action 2"]  // actions MUST be an array
    }
  ],  // MUST be an array of timeframe objects
  "additional_resources": ["Website 1", "Book 1"]  // Optional array
}

Guidelines:
1. Be specific and actionable - avoid generic advice
2. Consider the Indian education system and job market
3. Provide realistic salary expectations for India
4. Include relevant competitive exams (JEE, NEET, GATE, CAT, UPSC, etc.) if applicable
5. Suggest practical skill development paths
6. Create a time-bound action plan with at least 3 timeframes
7. Be encouraging but realistic
8. Provide at least 3 strengths, 2 areas for growth, 3 recommended careers, and 3 skills to develop

The conversation history is provided below. Analyze it thoroughly and generate a comprehensive report.`;

export async function POST(req: Request) {
  try {
    const { messages }: CareerReportRequest = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Anthropic API key not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const anthropic = createAnthropic({
      apiKey,
    });

    // Format conversation history
    const conversationHistory = messages
      .map(m => `${m.role.toUpperCase()}: ${m.content}`)
      .join('\n\n');

    const { object: report } = await generateObject({
      model: anthropic('claude-sonnet-4-20250514'),
      schema: careerReportSchema,
      prompt: `${REPORT_GENERATION_PROMPT}

CONVERSATION HISTORY:
${conversationHistory}

Generate a comprehensive career guidance report based on this conversation. Remember: ALL array fields (strengths, areas_for_growth, recommended_careers, skill_development, action_plan) MUST be arrays, not strings.`,
    });

    // Add generation timestamp
    const finalReport = {
      ...report,
      generated_at: new Date().toISOString(),
    };

    return new Response(JSON.stringify(finalReport), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error generating career report:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Failed to generate report' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
