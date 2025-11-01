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
        className="bg-pink-600 hover:bg-pink-700 text-white font-medium px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition-colors text-sm sm:text-base min-h-[44px] min-w-[120px]"
      >
        Carregar Mais
      </Button>
    </div>
  );
}
