import { DetailLevel } from '@/lib/apiUtils';

interface DetailLevelSelectorProps {
  detailLevel: DetailLevel;
  setDetailLevel: (level: DetailLevel) => void;
}

export default function DetailLevelSelector({ detailLevel, setDetailLevel }: DetailLevelSelectorProps) {
  return (
    <div>
      <label className="block text-xl font-bold text-white mb-6">
        Detail Level
      </label>
      <div className="space-y-4">
        <label className={`group flex items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          detailLevel === 'brief'
            ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/25'
            : 'bg-white/5 border-2 border-white/10 hover:border-blue-400/30 hover:bg-white/10'
        }`}>
          <input
            type="radio"
            name="detailLevel"
            value="brief"
            checked={detailLevel === 'brief'}
            onChange={(e) => setDetailLevel(e.target.value as DetailLevel)}
            className="sr-only"
          />
          <div className={`w-6 h-6 rounded-full border-2 mr-5 flex items-center justify-center transition-all duration-300 ${
            detailLevel === 'brief'
              ? 'border-blue-400 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg'
              : 'border-white/30 group-hover:border-blue-400/50'
          }`}>
            {detailLevel === 'brief' && (
              <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">⚡</span>
              <div className="font-bold text-white text-lg">Brief</div>
            </div>
            <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Concise and to the point
            </div>
          </div>
        </label>

        <label className={`group flex items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${
          detailLevel === 'detailed'
            ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-400/50 shadow-lg shadow-blue-500/25'
            : 'bg-white/5 border-2 border-white/10 hover:border-blue-400/30 hover:bg-white/10'
        }`}>
          <input
            type="radio"
            name="detailLevel"
            value="detailed"
            checked={detailLevel === 'detailed'}
            onChange={(e) => setDetailLevel(e.target.value as DetailLevel)}
            className="sr-only"
          />
          <div className={`w-6 h-6 rounded-full border-2 mr-5 flex items-center justify-center transition-all duration-300 ${
            detailLevel === 'detailed'
              ? 'border-blue-400 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg'
              : 'border-white/30 group-hover:border-blue-400/50'
          }`}>
            {detailLevel === 'detailed' && (
              <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">📋</span>
              <div className="font-bold text-white text-lg">Detailed</div>
            </div>
            <div className="text-sm text-gray-300 group-hover:text-white transition-colors">
              Comprehensive and thorough
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
