import { ApplicationMaterials, DocumentType } from '@/lib/apiUtils';
import { copyToClipboard } from '@/lib/uiUtils';

interface ResultsSectionProps {
  materials: ApplicationMaterials;
  documentType: DocumentType;
}

export default function ResultsSection({ materials, documentType }: ResultsSectionProps) {
  return (
    <div className="space-y-8">
      {/* Cover Letter/Proposal Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xl">
              {documentType === 'cover-letter' ? '📝' : '💼'}
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {documentType === 'cover-letter' ? 'Cover Letter' : 'Upwork Proposal'}
          </h2>
        </div>
        <div className="bg-gray-50 rounded-xl p-4 lg:p-6 border border-gray-200">
          <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans text-sm lg:text-base">
            {materials.coverLetter}
          </pre>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => copyToClipboard(materials.coverLetter)}
            className="bg-blue-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-lg hover:shadow-xl"
          >
            📋 Copy {documentType === 'cover-letter' ? 'Cover Letter' : 'Proposal'}
          </button>
        </div>
      </div>

      {/* Resume Bullet Points Section */}
      <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <span className="text-green-600 text-xl">✨</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Resume Bullet Points</h2>
        </div>
        <div className="space-y-4">
          {materials.resumeBulletPoints.map((point, index) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 lg:p-6 border border-blue-200 hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <p className="text-gray-800 leading-relaxed font-medium text-sm lg:text-base">{point}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => copyToClipboard(materials.resumeBulletPoints.join('\n'))}
            className="bg-green-600 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium shadow-lg hover:shadow-xl"
          >
            📋 Copy All Bullet Points
          </button>
        </div>
      </div>
    </div>
  );
}
