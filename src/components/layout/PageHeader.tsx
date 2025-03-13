
import React from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={cn('bg-muted py-12', className)}>
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold">{title}</h1>
          {description && (
            <p className="mt-4 text-xl text-muted-foreground">{description}</p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PageHeader;
