
import React from 'react';
import { Card as ShadcnCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  children?: React.ReactNode;
  hover?: boolean;
  glass?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  border?: boolean;
  onClick?: () => void;
}

interface CardComponentProps {
  Card: React.FC<CardProps>;
  Header: typeof CardHeader;
  Title: typeof CardTitle;
  Description: typeof CardDescription;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
}

const Card: React.FC<CardProps> & CardComponentProps = ({
  className,
  children,
  hover = false,
  glass = false,
  shadow = 'md',
  border = true,
  onClick,
}) => {
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <ShadcnCard
      className={cn(
        'overflow-hidden transition-all duration-300',
        hover && 'hover:translate-y-[-4px] hover:shadow-lg',
        glass && 'glass',
        shadows[shadow],
        !border && 'border-0',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </ShadcnCard>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;
