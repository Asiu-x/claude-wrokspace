import React from 'react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-sm text-gray-500">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="mx-2 text-gray-400">/</span>}
          {item.path ? (
            <a href={item.path} className="hover:text-blue-600 transition-colors">
              {item.label}
            </a>
          ) : (
            <span className="text-gray-900">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
