import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription, documentType = 'cover-letter', detailLevel = 'detailed' } = await request.json();

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and job description are required' },
        { status: 400 }
      );
    }

    const isCoverLetter = documentType === 'cover-letter';
    const isDetailed = detailLevel === 'detailed';

    const documentTypeInstructions = isCoverLetter
      ? `Write a professional, personalized cover letter that:
   - Addresses the hiring manager professionally
   - Highlights relevant experience from the resume that matches the job requirements
   - Shows enthusiasm for the role and company
   - Demonstrates understanding of the job requirements
   - Ends with a strong call to action
   - ${isDetailed ? 'Use 4-5 paragraphs with detailed explanations' : 'Use 2-3 short, concise paragraphs'}`
      : `Write a compelling Upwork proposal that:
   - Addresses the client directly and professionally
   - Immediately shows understanding of their project needs
   - Highlights relevant skills and experience from the resume
   - Demonstrates value and quick turnaround capability
   - ${isDetailed ? 'Use 3-4 paragraphs with detailed project approach' : 'Use 2-3 short, punchy paragraphs'}`;

    const prompt = `You are an expert career coach helping job seekers create tailored application materials.

Given the following resume and job description, please:

1. ${documentTypeInstructions}

2. Suggest 3-5 resume bullet points that the candidate should highlight or rephrase to better fit this specific job. Each bullet point should:
   - Be specific and quantifiable when possible
   - Use action verbs
   - Align with the job requirements
   - Be ready to use in a resume
   - ${isDetailed ? 'Include more context and impact metrics' : 'Be concise and direct'}

RESUME:
${resume}

JOB DESCRIPTION:
${jobDescription}

Please format your response as follows:

[${isCoverLetter ? 'COVER LETTER' : 'PROPOSAL'}]
[Your ${isCoverLetter ? 'cover letter' : 'proposal'} here]

[RESUME BULLET POINTS]
- [Bullet point 1]
- [Bullet point 2]
- [Bullet point 3]
- [Bullet point 4]
- [Bullet point 5]`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career coach and resume writer with 15+ years of experience helping job seekers land their dream jobs. You create compelling, personalized cover letters and optimize resume content to match specific job requirements.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from OpenAI');
    }

    // Parse the response to extract cover letter/proposal and bullet points
    const documentTypeRegex = isCoverLetter ? 'COVER LETTER' : 'PROPOSAL';
    const coverLetterMatch = response.match(new RegExp(`\\[${documentTypeRegex}\\]\\s*([\\s\\S]*?)\\[RESUME BULLET POINTS\\]`));
    const bulletPointsMatch = response.match(/\[RESUME BULLET POINTS\]\s*([\s\S]*?)$/);

    if (!coverLetterMatch || !bulletPointsMatch) {
      throw new Error('Failed to parse response format');
    }

    const coverLetter = coverLetterMatch[1].trim();
    const bulletPointsText = bulletPointsMatch[1].trim();

    // Split bullet points by lines and filter out empty ones
    const resumeBulletPoints = bulletPointsText
      .split('\n')
      .map(line => line.replace(/^-\s*/, '').trim())
      .filter(line => line.length > 0);

    return NextResponse.json({
      coverLetter,
      resumeBulletPoints,
    });
  } catch (error) {
    console.error('Error generating materials:', error);
    return NextResponse.json(
      { error: 'Failed to generate materials' },
      { status: 500 }
    );
  }
}
