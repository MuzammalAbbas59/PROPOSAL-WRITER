interface ErrorAlertProps {
  error: string;
}

export default function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 max-w-2xl mx-auto">
      <div className="flex items-center space-x-3">
        <div className="text-red-500">⚠️</div>
        <span className="font-medium">{error}</span>
      </div>
    </div>
  );
}
