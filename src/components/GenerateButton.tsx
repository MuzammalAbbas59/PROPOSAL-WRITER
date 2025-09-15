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
    <div className="text-center mb-12">
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <button
          onClick={onGenerate}
          disabled={loading}
          className="group relative bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-6 px-16 rounded-3xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed font-black text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 disabled:hover:scale-100 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative flex items-center space-x-4">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-3 border-white/30 border-t-white"></div>
                <span className="text-lg">Generating Materials...</span>
              </>
            ) : (
              <>
                <span className="text-2xl group-hover:animate-bounce">🚀</span>
                <span className="text-lg">
                  Generate {documentType === 'cover-letter' ? 'Cover Letter' : 'Proposal'} & Resume Suggestions
                </span>
              </>
            )}
          </div>
        </button>

        {showRetry && (
          <button
            onClick={onRetry}
            disabled={loading}
            className="group relative bg-gradient-to-r from-emerald-600 to-cyan-600 text-white py-6 px-12 rounded-3xl hover:from-emerald-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed font-black text-xl shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 transform hover:scale-110 disabled:hover:scale-100 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <div className="relative flex items-center space-x-3">
              <span className="text-2xl group-hover:animate-spin">🔄</span>
              <span className="text-lg">Retry Generation</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
