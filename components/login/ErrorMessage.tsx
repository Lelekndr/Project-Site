interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="bg-red-600/20 border border-red-600/50 rounded-lg p-3 mb-4">
      <p className="text-red-400 text-sm">{message}</p>
    </div>
  );
}
