import { Button } from '@/components/ui/button';

export function GuestButtons() {
  return (
    <>
      <Button variant="ghost" className="text-white hover:text-pink-400 hover:bg-transparent p-0 h-auto" asChild>
        <a href="/login">Login</a>
      </Button>

      <Button 
        className="px-4 py-1 bg-transparent border border-white hover:border-pink-400 hover:text-pink-400 transition-colors rounded-full text-white" 
        variant="outline"
      >
        <a href="/register">Cadastre-se</a>
      </Button>
    </>
  );
}
