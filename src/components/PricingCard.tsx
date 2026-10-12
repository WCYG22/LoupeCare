import React from 'react';
import { Check, Sparkles, TrendingUp } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  features: string[];
  badge?: string;
  popular?: boolean;
  onSelect: () => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  period,
  features,
  badge,
  popular = false,
  onSelect,
}) => {
  return (
    <div className={`bg-white rounded-3xl p-6 border-2 shadow-lg transition-all ${
      popular 
        ? 'border-[#007AFF] shadow-blue-100 scale-105' 
        : 'border-slate-200 hover:border-slate-300'
    }`}>
      
      {/* Badge */}
      {badge && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-xs font-bold mb-4 shadow-md">
          {popular ? <Sparkles className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
          {badge}
        </div>
      )}

      {/* Plan Name */}
      <h3 className="text-xl font-black text-slate-900 mb-2">
        {name}
      </h3>

      {/* Price */}
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-4xl font-black text-[#007AFF]">RM {price}</span>
        <span className="text-sm text-slate-500 font-medium">/ {period}</span>
      </div>

      {/* Period Detail */}
      <p className="text-xs text-slate-500 mb-6 font-medium">
        ~RM {(price / 6).toFixed(2)}/month equivalent
      </p>

      {/* CTA Button */}
      <button
        onClick={onSelect}
        className={`w-full h-12 rounded-xl font-bold text-sm transition-all mb-6 ${
          popular
            ? 'bg-[#007AFF] hover:bg-blue-600 text-white shadow-md'
            : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
        }`}
      >
        Get Started
      </button>

      {/* Features List */}
      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
            </div>
            <span className="text-xs text-slate-700 leading-relaxed flex-1">
              {feature}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
