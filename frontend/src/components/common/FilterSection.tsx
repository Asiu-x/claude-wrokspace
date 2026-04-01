import React from 'react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  children,
  className = ''
}) => {
  return (
    <div className={`border rounded-lg p-4 mb-4 ${className}`}>
      <h3 className="text-sm font-medium text-gray-900 mb-3">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};
