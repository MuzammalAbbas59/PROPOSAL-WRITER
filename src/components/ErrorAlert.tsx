interface ErrorAlertProps {
  error: string;
}

export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 border-2 border-red-400/50 text-red-100 px-8 py-6 rounded-3xl mb-12 max-w-4xl mx-auto backdrop-blur-xl shadow-2xl shadow-red-500/25">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <span className="text-2xl">⚠️</span>
        </div>
        <span className="font-bold text-lg">{error}</span>
      </div>
    </div>
  );
}
