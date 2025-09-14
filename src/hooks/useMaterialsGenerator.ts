import { useState } from 'react';
import { ApplicationMaterials, DocumentType, DetailLevel, generateMaterials } from '@/lib/apiUtils';
import { handleFileUpload } from '@/lib/fileUtils';

export function useMaterialsGenerator() {
  const [materials, setMaterials] = useState<ApplicationMaterials | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateMaterialsHandler = async (
    resume: string,
    jobDescription: string,
    documentType: DocumentType,
    detailLevel: DetailLevel,
    resumeInputMethod: string,
    jobInputMethod: string,
    resumeFile: File | null,
    jobFile: File | null
  ) => {
    let resumeText = resume;
    let jobText = jobDescription;

    // Validate inputs
    if (resumeInputMethod === 'text' && !resume.trim()) {
      setError('Please provide your resume');
      return;
    }
    if (jobInputMethod === 'text' && !jobDescription.trim()) {
      setError('Please provide the job description');
      return;
    }
    if (resumeInputMethod === 'file' && !resumeFile) {
      setError('Please upload your resume file');
      return;
    }
    if (jobInputMethod === 'file' && !jobFile) {
      setError('Please upload the job description file');
      return;
    }

    setLoading(true);
    setError('');
    setMaterials(null);

    try {
      // Process file uploads if needed
      if (resumeInputMethod === 'file' && resumeFile) {
        resumeText = await handleFileUpload(resumeFile);
      }
      if (jobInputMethod === 'file' && jobFile) {
        jobText = await handleFileUpload(jobFile);
      }

      const data = await generateMaterials(resumeText, jobText, documentType, detailLevel);
      setMaterials(data);
    } catch (err) {
      setError('Failed to generate materials. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const retryGeneration = () => {
    setMaterials(null);
  };

  return {
    materials,
    loading,
    error,
    generateMaterialsHandler,
    retryGeneration,
  };
}
