import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, MessageCircle, User } from 'lucide-react';

interface BottomNavProps {
  onOpenSearch: () => void;
}

const navItems = [
  { icon: Home, label: 'Главная', href: '/' },
  { icon: Search, label: 'Поиск', href: '#search' },
  { icon: ShoppingBag, label: 'Заказы', href: '/dashboard' },
  { icon: MessageCircle, label: 'Чат', href: '/dashboard' },
  { icon: User, label: 'Профиль', href: '/auth' },
];

export default function BottomNav({ onOpenSearch }: BottomNavProps) {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-void/95 backdrop-blur-xl border-t border-gold/10">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = item.href !== '#search' && location.pathname === item.href;
          const Icon = item.icon;

          if (item.href === '#search') {
            return (
              <button
                key={item.label}
                onClick={onOpenSearch}
                className="flex flex-col items-center gap-1 px-3 py-1 cursor-pointer"
              >
                <Icon size={20} className="text-muted" />
                <span className="text-[10px] text-muted">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.href}
              className="flex flex-col items-center gap-1 px-3 py-1"
            >
              <Icon size={20} className={isActive ? 'text-gold' : 'text-muted'} />
              <span className={`text-[10px] ${isActive ? 'text-gold font-medium' : 'text-muted'}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
