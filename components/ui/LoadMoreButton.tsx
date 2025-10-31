import { Button } from '@/components/ui/button';

interface LoadMoreButtonProps {
  hasMore: boolean;
  onLoadMore: () => void;
}

export function LoadMoreButton({ hasMore, onLoadMore }: LoadMoreButtonProps) {
  if (!hasMore) return null;

  return (
    <div className="text-center">
      <Button
        onClick={onLoadMore}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-200"
      >
        Carregar Mais Eventos
      </Button>
    </div>
  );
}
