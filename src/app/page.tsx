'use client';

import { useState } from 'react';
import { DocumentType, DetailLevel } from '@/lib/apiUtils';
import { useFileHandlers } from '@/hooks/useFileHandlers';
import { useMaterialsGenerator } from '@/hooks/useMaterialsGenerator';
import DocumentTypeSelector from '@/components/DocumentTypeSelector';
import DetailLevelSelector from '@/components/DetailLevelSelector';
import ResumeInput from '@/components/ResumeInput';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import GenerateButton from '@/components/GenerateButton';
import ErrorAlert from '@/components/ErrorAlert';
import ResultsSection from '@/components/ResultsSection';

export default function Home() {
  const [documentType, setDocumentType] = useState<DocumentType>('cover-letter');
  const [detailLevel, setDetailLevel] = useState<DetailLevel>('detailed');

  const fileHandlers = useFileHandlers();
  const { materials, loading, error, generateMaterialsHandler, retryGeneration } = useMaterialsGenerator();

  const handleGenerate = () => {
    generateMaterialsHandler(
      fileHandlers.resume,
      fileHandlers.jobDescription,
      documentType,
      detailLevel,
      fileHandlers.resumeInputMethod,
      fileHandlers.jobInputMethod,
      fileHandlers.resumeFile,
      fileHandlers.jobFile
    );
  };

  const handleRetry = () => {
    retryGeneration();
    handleGenerate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 lg:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            ResumeCraft AI
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto px-4">
            Get personalized cover letters, proposals, and resume suggestions tailored to any job.
            Upload files or paste text - your choice!
          </p>
        </div>

        {/* Document Type and Detail Level Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 mb-6 lg:mb-8 border border-gray-100">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 text-center">Customize Your Output</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <DocumentTypeSelector
              documentType={documentType}
              setDocumentType={setDocumentType}
            />
            <DetailLevelSelector
              detailLevel={detailLevel}
              setDetailLevel={setDetailLevel}
            />
          </div>
        </div>

        {/* Input Sections */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-6 lg:mb-8">
          <ResumeInput {...fileHandlers} />
          <JobDescriptionInput {...fileHandlers} />
        </div>

        {/* Generate Button */}
        <GenerateButton
          loading={loading}
          documentType={documentType}
          onGenerate={handleGenerate}
          onRetry={handleRetry}
          showRetry={!!materials}
        />

        {/* Error Alert */}
        <ErrorAlert error={error} />

        {/* Results */}
        {materials && (
          <ResultsSection
            materials={materials}
            documentType={documentType}
          />
        )}
      </div>
    </div>
  );
}
