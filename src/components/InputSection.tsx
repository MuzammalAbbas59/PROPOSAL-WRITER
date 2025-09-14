import { useRef } from 'react';
import { InputMethod } from '@/lib/apiUtils';
import { handleFileUpload, clearFile } from '@/lib/fileUtils';
import { formatFileSize } from '@/lib/uiUtils';

interface InputSectionProps {
  title: string;
  inputMethod: InputMethod;
  setInputMethod: (method: InputMethod) => void;
  textValue: string;
  setTextValue: (value: string) => void;
  file: File | null;
  setFile: (file: File | null) => void;
  fileRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  acceptTypes: string;
}

export default function InputSection({
  title,
  inputMethod,
  setInputMethod,
  textValue,
  setTextValue,
  file,
  setFile,
  fileRef,
  handleFileChange,
  placeholder,
  acceptTypes
}: InputSectionProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setInputMethod('text')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              inputMethod === 'text'
                ? 'bg-blue-100 text-black border-2 border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📝 Text
          </button>
          <button
            onClick={() => setInputMethod('file')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              inputMethod === 'file'
                ? 'bg-blue-100 text-black border-2 border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📄 File
          </button>
        </div>
      </div>

      {inputMethod === 'text' ? (
        <textarea
          rows={10}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-gray-900 placeholder-gray-500"
          placeholder={placeholder}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      ) : (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 lg:p-8 text-center hover:border-blue-400 transition-colors">
            <input
              ref={fileRef}
              type="file"
              accept={acceptTypes}
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="space-y-4">
              <div className="text-4xl">📄</div>
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Choose {title} File
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Supports {acceptTypes.replace(/\./g, '').toUpperCase()}
                </p>
              </div>
            </div>
          </div>
          {file && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-green-600">✅</div>
                <div>
                  <p className="font-medium text-green-800">{file.name}</p>
                  <p className="text-sm text-green-600">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => clearFile(fileRef, setFile)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
