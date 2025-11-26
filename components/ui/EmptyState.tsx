interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="text-white/70 dark:text-white/70 light:text-gray-600 text-lg">
        {message}
      </p>
    </div>
  );
}
