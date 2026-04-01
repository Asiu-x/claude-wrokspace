import React from 'react';

interface InfoItemProps {
  label: string;
  value: React.ReactNode;
  icon?: string;
  color?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  icon,
  color = 'gray',
}) => {
  return (
    <div className="py-3">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
        {icon && <span>{icon}</span>}
        <span>{label}</span>
      </div>
      <div className="text-sm text-gray-900">{value || '-'}</div>
    </div>
  );
};

export default InfoItem;
