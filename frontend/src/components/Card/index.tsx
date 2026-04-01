import React from 'react';

interface CardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  loading?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  actions,
  className = '',
  loading = false
}) => {
  if (loading) {
    return (
      <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
        <div className="p-6">
          <div className="h-6 w-1/3 rounded bg-muted animate-pulse mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 w-full rounded bg-muted animate-pulse"></div>
            <div className="h-4 w-5/6 rounded bg-muted animate-pulse"></div>
            <div className="h-4 w-4/6 rounded bg-muted animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
      {(title || description || actions) && (
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-between items-start">
            <div>
              {title && <h3 className="text-2xl font-semibold leading-none tracking-tight">{title}</h3>}
              {description && <p className="text-sm text-muted-foreground mt-1.5">{description}</p>}
            </div>
            {actions && <div className="flex items-center space-x-2">{actions}</div>}
          </div>
        </div>
      )}
      <div className="p-6 pt-0">
        {children}
      </div>
    </div>
  );
};

export default Card;
