import { Button } from '@/components/ui/button';

interface LoadMoreButtonProps {
  hasMore: boolean;
  onLoadMore: () => void;
}

export function LoadMoreButton({ hasMore, onLoadMore }: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="flex justify-center mt-8 sm:mt-12">
      <Button
        onClick={onLoadMore}
        className="theme-bg-pink hover:theme-bg-purple theme-text-primary font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base min-h-[44px] min-w-[120px]"
        aria-label="Carregar mais eventos"
      >
        Carregar Mais
      </Button>
    </div>
  );
}
