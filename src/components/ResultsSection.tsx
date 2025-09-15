import { ApplicationMaterials, DocumentType } from '@/lib/apiUtils';
import { copyToClipboard } from '@/lib/uiUtils';

interface ResultsSectionProps {
  materials: ApplicationMaterials;
  documentType: DocumentType;
}

export default function ResultsSection({ materials, documentType }: ResultsSectionProps) {
  return (
    <div className="space-y-12">
      {/* Cover Letter/Proposal Section */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">
              {documentType === 'cover-letter' ? '📝' : '💼'}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white">
            {documentType === 'cover-letter' ? 'Cover Letter' : 'Upwork Proposal'}
          </h2>
        </div>
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 shadow-lg">
          <pre className="whitespace-pre-wrap text-white leading-relaxed font-sans text-base lg:text-lg">
            {materials.coverLetter}
          </pre>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => copyToClipboard(materials.coverLetter)}
            className="group bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <span className="text-xl group-hover:animate-bounce">📋</span>
              <span>Copy {documentType === 'cover-letter' ? 'Cover Letter' : 'Proposal'}</span>
            </span>
          </button>
        </div>
      </div>

      {/* Resume Bullet Points Section */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-white">Resume Bullet Points</h2>
        </div>
        <div className="space-y-6">
          {materials.resumeBulletPoints.map((point, index) => (
            <div key={index} className="group bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/20 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-2xl flex items-center justify-center text-lg font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>
                <p className="text-white leading-relaxed font-medium text-base lg:text-lg group-hover:text-emerald-100 transition-colors duration-300">{point}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => copyToClipboard(materials.resumeBulletPoints.join('\n'))}
            className="group bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-2xl hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <span className="flex items-center space-x-3">
              <span className="text-xl group-hover:animate-bounce">📋</span>
              <span>Copy All Bullet Points</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
