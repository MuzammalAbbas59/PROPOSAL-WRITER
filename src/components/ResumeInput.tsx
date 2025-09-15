import { useRef } from 'react';
import { InputMethod } from '@/lib/apiUtils';
import { clearFile } from '@/lib/fileUtils';

interface ResumeInputProps {
  resume: string;
  setResume: (value: string) => void;
  resumeFile: File | null;
  setResumeFile: (file: File | null) => void;
  resumeInputMethod: InputMethod;
  setResumeInputMethod: (method: InputMethod) => void;
  handleResumeFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ResumeInput({
  resume,
  setResume,
  resumeFile,
  setResumeFile,
  resumeInputMethod,
  setResumeInputMethod,
  handleResumeFileChange
}: ResumeInputProps) {
  const resumeFileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/20 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">📄</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">Your Resume</h2>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setResumeInputMethod('text')}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
              resumeInputMethod === 'text'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
            }`}
          >
            📝 Text
          </button>
          <button
            onClick={() => setResumeInputMethod('file')}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 transform hover:scale-105 ${
              resumeInputMethod === 'file'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
            }`}
          >
            📄 File
          </button>
        </div>
      </div>

      {resumeInputMethod === 'text' ? (
        <textarea
          rows={12}
          className="w-full px-6 py-4 bg-white/5 border-2 border-white/20 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500/50 focus:border-purple-400 transition-all duration-300 resize-none text-white placeholder-gray-400 backdrop-blur-sm"
          placeholder="Paste your resume text here..."
          value={resume}
          onChange={(e) => setResume(e.target.value)}
        />
      ) : (
        <div className="space-y-6">
          <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 lg:p-12 text-center hover:border-purple-400/50 transition-all duration-300 group bg-white/5 backdrop-blur-sm">
            <input
              ref={resumeFileRef}
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleResumeFileChange}
              className="hidden"
            />
            <div className="space-y-6">
              <div className="text-6xl group-hover:scale-110 transition-transform duration-300">📄</div>
              <div>
                <button
                  onClick={() => resumeFileRef.current?.click()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Choose Resume File
                </button>
                <p className="text-sm text-gray-300 mt-4 font-medium">
                  Supports PDF, DOC, DOCX, TXT
                </p>
              </div>
            </div>
          </div>
          {resumeFile && (
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50 rounded-2xl p-6 flex items-center justify-between backdrop-blur-sm shadow-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">✅</span>
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{resumeFile.name}</p>
                  <p className="text-sm text-green-300 font-medium">
                    {(resumeFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={() => clearFile(resumeFileRef, setResumeFile)}
                className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded-xl transition-all duration-300 flex items-center justify-center border border-red-500/30"
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
