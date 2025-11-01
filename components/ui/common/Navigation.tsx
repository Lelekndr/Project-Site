import Link from 'next/link';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }> | null;
}

interface NavigationProps {
  navItems: NavItem[];
}

export function Navigation({ navItems }: NavigationProps) {
  return (
    <nav className="hidden md:flex space-x-6 text-sm">
      {navItems.map((item) => (
        <Link 
          key={item.name} 
          href={item.href} 
          className="flex items-center space-x-1 hover:text-pink-400 transition-colors"
        >
          {item.icon && <item.icon className="w-4 h-4" />}
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
}
