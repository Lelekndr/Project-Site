import { Star } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-1 text-sm md:text-3xl font-bold">
      <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
      <span className="font-extrabold tracking-wider">COLALÁ</span>
    </div>
  );
}
