import { useState } from 'react';
import { InputMethod } from '@/lib/apiUtils';

export function useFileHandlers() {
  const [resume, setResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobFile, setJobFile] = useState<File | null>(null);
  const [resumeInputMethod, setResumeInputMethod] = useState<InputMethod>('text');
  const [jobInputMethod, setJobInputMethod] = useState<InputMethod>('text');

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setResume(''); // Clear text input when file is selected
    }
  };

  const handleJobFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setJobFile(file);
      setJobDescription(''); // Clear text input when file is selected
    }
  };

  return {
    resume,
    setResume,
    jobDescription,
    setJobDescription,
    resumeFile,
    setResumeFile,
    jobFile,
    setJobFile,
    resumeInputMethod,
    setResumeInputMethod,
    jobInputMethod,
    setJobInputMethod,
    handleResumeFileChange,
    handleJobFileChange,
  };
}
