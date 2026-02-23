import { ReactNode } from 'react';

type BadgeVariant = 'default' | 'green' | 'blue' | 'amber' | 'rose' | 'violet' | 'emerald';

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-body border-white/10',
  green: 'bg-neon-emerald/10 text-neon-emerald border-neon-emerald/20',
  blue: 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20',
  amber: 'bg-gold/10 text-gold border-gold/20',
  rose: 'bg-neon-rose/10 text-neon-rose border-neon-rose/20',
  violet: 'bg-neon-violet/10 text-neon-violet border-neon-violet/20',
  emerald: 'bg-neon-emerald/10 text-neon-emerald border-neon-emerald/20',
};

export default function Badge({ variant = 'default', children, className = '', onClick }: BadgeProps) {
  return (
    <span onClick={onClick} className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
