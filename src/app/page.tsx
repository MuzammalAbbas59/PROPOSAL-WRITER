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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6 shadow-2xl">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-6 leading-tight">
            Coverposal
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto px-4 leading-relaxed">
            AI-powered cover letters, proposals, and resume optimization
            <br />
            <span className="text-purple-300 font-semibold">Tailored to perfection for any job</span>
          </p>
        </div>

        {/* Main Content Container */}
        <div className="space-y-8 lg:space-y-12">
          {/* Document Type and Detail Level Selection */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/20 shadow-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-8 text-center">Customize Your Output</h2>
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
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
    </div>
  );
}
