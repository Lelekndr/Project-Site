import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function GuestButtons() {
  return (
    <>
      <Button variant="ghost" className="text-white hover:text-pink-400 hover:bg-transparent p-0 h-auto" asChild>
        <Link href="/login">Login</Link>
      </Button>

      <Button 
        className="px-4 py-1 bg-transparent border border-white hover:border-pink-400 hover:text-pink-400 transition-colors rounded-full text-white" 
        variant="outline"
        asChild
      >
        <Link href="/register">Cadastre-se</Link>
      </Button>
    </>
  );
}
