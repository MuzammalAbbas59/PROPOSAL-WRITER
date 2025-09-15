export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

export const formatFileSize = (bytes: number): string => {
  return (bytes / 1024).toFixed(1) + ' KB';
};

