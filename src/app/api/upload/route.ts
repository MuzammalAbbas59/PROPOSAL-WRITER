import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Check file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Unsupported file type. Please upload PDF, DOC, DOCX, or TXT files.' },
        { status: 400 }
      );
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Please upload files smaller than 10MB.' },
        { status: 400 }
      );
    }

    let text = '';
    const buffer = await file.arrayBuffer();

    try {
      switch (file.type) {
        case 'text/plain':
          text = await file.text();
          break;

        case 'application/pdf':
          // Use dynamic import to avoid test file issues
          const pdfParse = (await import('pdf-parse')).default;
          const pdfData = await pdfParse(Buffer.from(buffer));
          text = pdfData.text;
          break;

        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
          const docxResult = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
          text = docxResult.value;
          break;

        case 'application/msword':
          // For .doc files, we'll try mammoth as well (it supports some .doc files)
          const docResult = await mammoth.extractRawText({ buffer: Buffer.from(buffer) });
          text = docResult.value;
          break;

        default:
          return NextResponse.json(
            { error: 'Unsupported file type' },
            { status: 400 }
          );
      }

      // Clean up the text
      text = text
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/\n\s*\n/g, '\n\n') // Replace multiple newlines with double newline
        .trim();

      if (!text || text.length < 10) {
        return NextResponse.json(
          { error: 'Could not extract meaningful text from the file. Please try a different file or use text input.' },
          { status: 400 }
        );
      }

      return NextResponse.json({ text });
    } catch (parseError) {
      console.error('Error parsing file:', parseError);
      return NextResponse.json(
        {
          error: 'Failed to parse file. Please ensure the file is not corrupted and try again, or use text input instead.',
          text: 'Failed to parse the uploaded file. Please paste the text content directly or try uploading a different file.'
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json(
      { error: 'Failed to process file' },
      { status: 500 }
    );
  }
}
