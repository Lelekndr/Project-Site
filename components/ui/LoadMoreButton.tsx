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
        className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base min-h-[44px] min-w-[120px]"
        aria-label="Carregar mais eventos"
      >
        Carregar Mais
      </Button>
    </div>
  );
}
