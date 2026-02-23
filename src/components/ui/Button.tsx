import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  glow?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'relative bg-gold/10 text-gold font-semibold border border-gold/50 hover:bg-gold/20 hover:shadow-glow-gold active:scale-[0.98] transition-all overflow-hidden',
  secondary:
    'border border-gold/20 text-heading bg-nebula-light hover:bg-nebula-lighter hover:border-gold/30 active:scale-[0.98] transition-all',
  destructive:
    'bg-neon-rose/20 text-neon-rose font-semibold border border-neon-rose/30 hover:bg-neon-rose/30 active:scale-[0.98] transition-all',
  ghost:
    'text-muted hover:text-heading hover:bg-white/5 transition-colors',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-8 py-3 text-base rounded-xl',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed tracking-wide ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
