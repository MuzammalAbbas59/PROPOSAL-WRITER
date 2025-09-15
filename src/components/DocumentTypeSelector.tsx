import { DocumentType } from '@/lib/apiUtils';

interface DocumentTypeSelectorProps {
  documentType: DocumentType;
  setDocumentType: (type: DocumentType) => void;
}

export default function DocumentTypeSelector({ documentType, setDocumentType }: DocumentTypeSelectorProps) {
  return (
    <div>
      <label className="block text-xl font-bold text-white mb-6">
        Document Type
      </label>
      <div className="space-y-4">
        <label className={`group flex items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          documentType === 'cover-letter'
            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 shadow-lg shadow-purple-500/25'
            : 'bg-white/5 border-2 border-white/10 hover:border-purple-400/30 hover:bg-white/10'
        }`}>
          <input
            type="radio"
            name="documentType"
            value="cover-letter"
            checked={documentType === 'cover-letter'}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="sr-only"
          />
          <div className={`w-6 h-6 rounded-full border-2 mr-5 flex items-center justify-center transition-all duration-300 ${
            documentType === 'cover-letter'
              ? 'border-purple-400 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
              : 'border-white/30 group-hover:border-purple-400/50'
          }`}>
            {documentType === 'cover-letter' && (
              <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">📝</span>
              <div className="font-bold text-white text-lg">Cover Letter</div>
            </div>
            <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Traditional job application letter
            </div>
          </div>
        </label>

        <label className={`group flex items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          documentType === 'proposal'
            ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 shadow-lg shadow-purple-500/25'
            : 'bg-white/5 border-2 border-white/10 hover:border-purple-400/30 hover:bg-white/10'
        }`}>
          <input
            type="radio"
            name="documentType"
            value="proposal"
            checked={documentType === 'proposal'}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="sr-only"
          />
          <div className={`w-6 h-6 rounded-full border-2 mr-5 flex items-center justify-center transition-all duration-300 ${
            documentType === 'proposal'
              ? 'border-purple-400 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg'
              : 'border-white/30 group-hover:border-purple-400/50'
          }`}>
            {documentType === 'proposal' && (
              <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">💼</span>
              <div className="font-bold text-white text-lg">Upwork Proposal</div>
            </div>
            <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Freelance platform proposal
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
