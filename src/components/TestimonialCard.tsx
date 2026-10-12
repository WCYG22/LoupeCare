import React from 'react';
import { Star, Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  institution: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  institution,
  quote,
  rating,
  avatar,
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
          {avatar || name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>

        {/* Name & Role */}
        <div className="flex-1 min-w-0">
          <div className="font-bold text-slate-900 text-sm truncate">{name}</div>
          <div className="text-xs text-slate-500 truncate">{role}</div>
          <div className="text-[10px] text-slate-400 truncate">{institution}</div>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-0.5 shrink-0">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quote Icon */}
      <Quote className="w-8 h-8 text-blue-100 mb-2" />

      {/* Quote Text */}
      <p className="text-sm text-slate-700 leading-relaxed italic">
        "{quote}"
      </p>
    </div>
  );
};
