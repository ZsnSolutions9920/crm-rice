
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge: string;
  badgeType: 'success' | 'warning' | 'info';
  title: string;
  value: string;
  subtext: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  iconBg,
  iconColor,
  badge,
  badgeType,
  title,
  value,
  subtext,
}) => {
  const badgeColors = {
    success: 'bg-emerald-50 text-emerald-600',
    warning: 'bg-amber-50 text-amber-600',
    info: 'bg-blue-50 text-blue-600',
  };

  return (
    <div className="bg-white p-6 rounded-[12px] border border-gray-50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 relative">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-[10px] ${iconBg}`}>
          <Icon size={20} className={iconColor} />
        </div>
        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${badgeColors[badgeType]}`}>
          {badge}
        </span>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h2 className="text-[28px] font-bold text-gray-900 mb-1 leading-tight">{value}</h2>
        <p className="text-xs text-gray-400 font-medium">{subtext}</p>
      </div>
    </div>
  );
};

export default StatCard;
