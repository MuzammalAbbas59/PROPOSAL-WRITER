export interface ApplicationMaterials {
  coverLetter: string;
  resumeBulletPoints: string[];
}

export type DocumentType = 'cover-letter' | 'proposal';
export type DetailLevel = 'brief' | 'detailed';

export const generateMaterials = async (
  resume: string,
  jobDescription: string,
  documentType: DocumentType,
  detailLevel: DetailLevel
): Promise<ApplicationMaterials> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      resume,
      jobDescription,
      documentType,
      detailLevel,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate materials');
  }

  return await response.json();
};
