import React from 'react';
import { Glasses, Plus, Sparkles } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
  icon?: 'glasses' | 'sparkles' | 'plus';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon = 'glasses',
}) => {
  const icons = {
    glasses: Glasses,
    sparkles: Sparkles,
    plus: Plus,
  };

  const IconComponent = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 py-16">
      
      {/* Icon */}
      <div className="w-20 h-20 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mb-6">
        <IconComponent className="w-10 h-10 stroke-[1.5]" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-black text-slate-900 mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-6">
        {description}
      </p>

      {/* Action Button */}
      <button
        onClick={onAction}
        className="px-6 py-3 bg-[#007AFF] hover:bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
      >
        {actionLabel}
      </button>
    </div>
  );
};
