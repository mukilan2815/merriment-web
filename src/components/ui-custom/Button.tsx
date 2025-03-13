
import React from 'react';
import { Button as ShadcnButton } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { type VariantProps } from 'class-variance-authority';

// Create a modified type that extends the original button variants
type ButtonVariants = 
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link'
  | 'primary'
  | 'accent';

type ButtonSizes = 'default' | 'sm' | 'lg' | 'icon' | 'xl';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: ButtonVariants;
  size?: ButtonSizes;
  children: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'default', children, isLoading, icon, iconPosition = 'left', className, ...props }, ref) => {
    const customVariants = {
      primary: 'bg-primary hover:bg-primary/90 text-white border-none shadow-md hover:shadow-lg transition-all duration-300',
      accent: 'bg-accent hover:bg-accent/90 text-accent-foreground border-none shadow-md hover:shadow-lg transition-all duration-300',
    };

    const customSizes = {
      xl: 'text-base h-14 px-8',
    };

    let variantClass = '';
    let sizeClass = '';

    // Handle custom variants
    if (variant === 'primary' || variant === 'accent') {
      variantClass = customVariants[variant];
      variant = 'default' as any;
    }

    // Handle custom sizes
    if (size === 'xl') {
      sizeClass = customSizes[size];
      size = 'default' as any;
    }

    return (
      <ShadcnButton
        ref={ref}
        variant={variant as VariantProps<typeof buttonVariants>['variant']}
        size={size as VariantProps<typeof buttonVariants>['size']}
        className={cn(
          'font-medium relative overflow-hidden group',
          variantClass,
          sizeClass,
          isLoading ? 'opacity-80 pointer-events-none' : '',
          className
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg 
              className="animate-spin h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              ></circle>
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        
        <span className={isLoading ? 'invisible' : 'flex items-center gap-2'}>
          {icon && iconPosition === 'left' && icon}
          {children}
          {icon && iconPosition === 'right' && icon}
        </span>
        
        {!isLoading && (
          <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
        )}
      </ShadcnButton>
    );
  }
);

Button.displayName = 'Button';

export default Button;
