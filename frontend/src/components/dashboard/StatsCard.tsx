import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  trend?: number;
  trendUp?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
  dataTestId?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp = true,
  color = 'primary',
  dataTestId,
}) => {
  const colorConfig = {
    primary: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      gradient: 'from-blue-500 to-blue-600',
    },
    success: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      gradient: 'from-green-500 to-green-600',
    },
    warning: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      gradient: 'from-orange-500 to-orange-600',
    },
    danger: {
      bg: 'bg-red-50',
      text: 'text-red-600',
      gradient: 'from-red-500 to-red-600',
    },
    info: {
      bg: 'bg-cyan-50',
      text: 'text-cyan-600',
      gradient: 'from-cyan-500 to-cyan-600',
    },
  };

  const config = colorConfig[color];

  return (
    <div
      className="bg-card text-card-foreground rounded-lg border shadow-sm p-5 transition-all duration-300 hover:shadow-md"
      data-testid={dataTestId}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium mb-2 text-muted-foreground">
            {title}
          </p>
          <p
            className="text-3xl font-bold mb-3 text-foreground"
            data-testid={`${dataTestId}-value`}
          >
            {value.toLocaleString()}
          </p>
          {trend !== undefined && (
            <div className="flex items-center">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                  trendUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}
                data-testid={`${dataTestId}-trend`}
              >
                <span className="mr-1">{trendUp ? '↑' : '↓'}</span>
                {Math.abs(trend)}%
              </span>
              <span className="text-xs ml-2 text-muted-foreground">
                较上月
              </span>
            </div>
          )}
        </div>
        <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${config.bg}`}>
          {icon || (
            <svg className={`w-7 h-7 ${config.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          )}
        </div>
      </div>

      {/* 装饰性渐变条 */}
      <div className="mt-4 h-1 rounded-full overflow-hidden bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${config.gradient}`}
          style={{ width: '65%' }}
        ></div>
      </div>
    </div>
  );
};
