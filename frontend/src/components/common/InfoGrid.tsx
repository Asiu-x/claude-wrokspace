import React from 'react';
import InfoItem from './InfoItem';

interface InfoGridItem {
  key: string;
  label: string;
  value: React.ReactNode;
  icon?: string;
  color?: string;
}

interface InfoGridProps {
  items: InfoGridItem[];
  columns?: number;
}

const InfoGrid: React.FC<InfoGridProps> = ({
  items,
  columns = 4,
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${Math.min(columns, 4)} gap-6`}>
      {items.map((item) => (
        <div key={item.key} className="min-w-0">
          <InfoItem
            label={item.label}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        </div>
      ))}
    </div>
  );
};

export default InfoGrid;
