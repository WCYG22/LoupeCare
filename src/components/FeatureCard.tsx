import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  badge?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  color = '#007AFF',
  badge,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden">
      
      {/* Background Gradient */}
      <div 
        className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-5"
        style={{ backgroundColor: color }}
      />

      {/* Badge */}
      {badge && (
        <div className="inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-bold mb-3 border border-blue-200">
          {badge}
        </div>
      )}

      {/* Icon */}
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </div>

      {/* Content */}
      <h3 className="text-base font-bold text-slate-900 mb-2 relative z-10">
        {title}
      </h3>
      
      <p className="text-sm text-slate-600 leading-relaxed relative z-10">
        {description}
      </p>
    </div>
  );
};
