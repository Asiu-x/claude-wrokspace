import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: 'up' | 'down' | 'flat';
  percentage?: number;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  percentage,
  description,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
          {trend && percentage !== undefined && (
            <div className="mt-2 flex items-center text-sm">
              <span
                className={`flex items-center ${
                  trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}
              >
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {Math.abs(percentage)}%
              </span>
              <span className="ml-1 text-gray-500">vs 上月</span>
            </div>
          )}
          {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            color === 'blue'
              ? 'bg-blue-100 text-blue-600'
              : color === 'green'
              ? 'bg-green-100 text-green-600'
              : color === 'orange'
              ? 'bg-orange-100 text-orange-600'
              : 'bg-purple-100 text-purple-600'
          }`}
        >
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
