export const handleFileUpload = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to process file');
  }

  const data = await response.json();
  return data.text;
};

export const clearFile = (fileRef: React.RefObject<HTMLInputElement | null>, setFile: (file: File | null) => void) => {
  setFile(null);
  if (fileRef.current) {
    fileRef.current.value = '';
  }
};
