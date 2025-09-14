import { DocumentType } from '@/lib/apiUtils';

interface GenerateButtonProps {
  loading: boolean;
  documentType: DocumentType;
  onGenerate: () => void;
  onRetry: () => void;
  showRetry: boolean;
}

export default function GenerateButton({
  loading,
  documentType,
  onGenerate,
  onRetry,
  showRetry
}: GenerateButtonProps) {
  return (
    <div className="text-center mb-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <button
          onClick={onGenerate}
          disabled={loading}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-12 rounded-2xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
        >
          {loading ? (
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating Materials...</span>
            </div>
          ) : (
            `🚀 Generate ${documentType === 'cover-letter' ? 'Cover Letter' : 'Proposal'} & Resume Suggestions`
          )}
        </button>

        {showRetry && (
          <button
            onClick={onRetry}
            disabled={loading}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-2xl hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            🔄 Retry Generation
          </button>
        )}
      </div>
    </div>
  );
}
