import { useRef } from 'react';
import { InputMethod } from '@/lib/apiUtils';
import { clearFile } from '@/lib/fileUtils';

interface JobDescriptionInputProps {
  jobDescription: string;
  setJobDescription: (value: string) => void;
  jobFile: File | null;
  setJobFile: (file: File | null) => void;
  jobInputMethod: InputMethod;
  setJobInputMethod: (method: InputMethod) => void;
  handleJobFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function JobDescriptionInput({
  jobDescription,
  setJobDescription,
  jobFile,
  setJobFile,
  jobInputMethod,
  setJobInputMethod,
  handleJobFileChange
}: JobDescriptionInputProps) {
  const jobFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Job Description</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setJobInputMethod('text')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              jobInputMethod === 'text'
                ? 'bg-blue-100 text-black border-2 border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📝 Text
          </button>
          <button
            onClick={() => setJobInputMethod('file')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              jobInputMethod === 'file'
                ? 'bg-blue-100 text-black border-2 border-blue-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            📄 File
          </button>
        </div>
      </div>

      {jobInputMethod === 'text' ? (
        <textarea
          rows={10}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none text-gray-900 placeholder-gray-500"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      ) : (
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 lg:p-8 text-center hover:border-blue-400 transition-colors">
            <input
              ref={jobFileRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleJobFileChange}
              className="hidden"
            />
            <div className="space-y-4">
              <div className="text-4xl">📄</div>
              <div>
                <button
                  onClick={() => jobFileRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Choose Job Description File
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Supports PDF, DOC, DOCX, TXT
                </p>
              </div>
            </div>
          </div>
          {jobFile && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-green-600">✅</div>
                <div>
                  <p className="font-medium text-green-800">{jobFile.name}</p>
                  <p className="text-sm text-green-600">
                    {(jobFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => clearFile(jobFileRef, setJobFile)}
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
