import { DetailLevel } from '@/lib/apiUtils';

interface DetailLevelSelectorProps {
  detailLevel: DetailLevel;
  setDetailLevel: (level: DetailLevel) => void;
}

export default function DetailLevelSelector({ detailLevel, setDetailLevel }: DetailLevelSelectorProps) {
  return (
    <div>
      <label className="block text-lg font-semibold text-gray-800 mb-4">
        Detail Level
      </label>
      <div className="space-y-3">
        <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
          <input
            type="radio"
            name="detailLevel"
            value="brief"
            checked={detailLevel === 'brief'}
            onChange={(e) => setDetailLevel(e.target.value as DetailLevel)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
            detailLevel === 'brief'
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300'
          }`}>
            {detailLevel === 'brief' && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
          <div>
            <div className="font-medium text-gray-900">⚡ Brief</div>
            <div className="text-sm text-gray-600">Concise and to the point</div>
          </div>
        </label>

        <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
          <input
            type="radio"
            name="detailLevel"
            value="detailed"
            checked={detailLevel === 'detailed'}
            onChange={(e) => setDetailLevel(e.target.value as DetailLevel)}
            className="sr-only"
          />
          <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
            detailLevel === 'detailed'
              ? 'border-blue-500 bg-blue-500'
              : 'border-gray-300'
          }`}>
            {detailLevel === 'detailed' && <div className="w-2 h-2 bg-white rounded-full"></div>}
          </div>
          <div>
            <div className="font-medium text-gray-900">📋 Detailed</div>
            <div className="text-sm text-gray-600">Comprehensive and thorough</div>
          </div>
        </label>
      </div>
    </div>
  );
}
