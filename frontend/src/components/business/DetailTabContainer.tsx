import React from 'react';

interface DetailTabContainerProps {
  children: React.ReactNode;
  title?: string;
  icon?: string;
}

const DetailTabContainer: React.FC<DetailTabContainerProps> = ({
  children,
  title,
  icon,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      {(title || icon) && (
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            {icon && <span className="text-lg">{icon}</span>}
            {title && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
};

export default DetailTabContainer;
