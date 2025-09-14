# ResumeCraft AI

A Next.js application that helps job seekers create tailored application materials using AI. The app generates personalized cover letters and resume bullet point suggestions based on your resume and job descriptions.

## Features

- **Personalized Cover Letters**: Generate professional, tailored cover letters (3-5 paragraphs) that highlight relevant experience
- **Resume Optimization**: Get 3-5 suggested bullet points to better align your resume with specific job requirements
- **Flexible Input Methods**: Upload files (PDF, DOC, DOCX, TXT) or paste text directly
- **File Processing**: Automatic text extraction from PDF, DOC, DOCX, and TXT files
- **AI-Powered**: Uses OpenAI's GPT-3.5-turbo for intelligent content generation
- **Modern UI**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Copy to Clipboard**: Easy copying of generated materials

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI API (GPT-3.5-turbo)
- **File Processing**: pdf-parse (PDF), mammoth (DOC/DOCX)
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- OpenAI API key

### Installation

#### Quick Setup (Recommended)
```bash
git clone <your-repo-url>
cd resume-craft-ai
chmod +x setup.sh
./setup.sh
```

#### Manual Setup
1. Clone the repository:
```bash
git clone <your-repo-url>
cd resume-craft-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```bash
# Edit .env.local and add your OpenAI API key
OPENAI_API_KEY=your_actual_openai_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Input Methods
You can choose between two input methods for both resume and job description:

1. **Text Input**: Copy and paste your content directly
2. **File Upload**: Upload PDF, DOC, DOCX, or TXT files

### Steps
1. **Choose Input Method**: Select "Text" or "File" for both resume and job description
2. **Provide Content**: Either paste text or upload files
3. **Generate Materials**: Click the "Generate Cover Letter & Resume Suggestions" button
4. **Review Results**: The app will generate:
   - A personalized cover letter tailored to the job
   - 3-5 resume bullet points optimized for the position
5. **Copy Results**: Use the copy buttons to easily copy generated materials

## API Endpoints

### POST /api/generate

Generates cover letter and resume suggestions based on provided resume and job description.

**Request Body:**
```json
{
  "resume": "Your resume text...",
  "jobDescription": "Job description text..."
}
```

**Response:**
```json
{
  "coverLetter": "Generated cover letter...",
  "resumeBulletPoints": [
    "Optimized bullet point 1",
    "Optimized bullet point 2",
    "Optimized bullet point 3"
  ]
}
```

### POST /api/upload

Processes uploaded files and extracts text content.

**Request:** FormData with file field

**Supported File Types:**
- PDF (.pdf)
- Microsoft Word (.doc, .docx)
- Plain Text (.txt)

**Response:**
```json
{
  "text": "Extracted text content..."
}
```

**Error Response:**
```json
{
  "error": "Error message...",
  "text": "Fallback text or error details..."
}
```

## Deployment

The app is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `OPENAI_API_KEY` environment variable in Vercel dashboard
4. Deploy!

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
