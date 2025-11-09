interface EmptyStateProps {
  message: string;
}

export function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <p className="theme-text-secondary text-lg">
        {message}
      </p>
    </div>
  );
}
