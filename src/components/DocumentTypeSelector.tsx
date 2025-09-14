import { DocumentType } from '@/lib/apiUtils';

interface DocumentTypeSelectorProps {
  documentType: DocumentType;
  setDocumentType: (type: DocumentType) => void;
}

export default function DocumentTypeSelector({ documentType, setDocumentType }: DocumentTypeSelectorProps) {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-4">
        Document Type
      </label>
      <div className="space-y-3">
        <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
          <input
            type="radio"
            name="documentType"
            value="cover-letter"
            checked={documentType === 'cover-letter'}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
            documentType === 'cover-letter'
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300'
          }`}>
            {documentType === 'cover-letter' && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
          <div>
            <div className="font-medium text-gray-900">📝 Cover Letter</div>
            <div className="text-sm text-gray-600">Traditional job application letter</div>
          </div>
        </label>

        <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
          <input
            type="radio"
            name="documentType"
            value="proposal"
            checked={documentType === 'proposal'}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
            documentType === 'proposal'
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300'
          }`}>
            {documentType === 'proposal' && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
          <div>
            <div className="font-medium text-gray-900">💼 Upwork Proposal</div>
            <div className="text-sm text-gray-600">Freelance platform proposal</div>
          </div>
        </label>
      </div>
    </div>
  );
}
