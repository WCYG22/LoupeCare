import React from 'react';
import { Sparkles, TrendingUp, Users, Award } from 'lucide-react';

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGetStarted }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-3xl p-6 border border-blue-100 shadow-lg overflow-hidden relative">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-4 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Launch Offer · First 50 Students</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight mb-3">
          Professional Loupe Care<br />
          <span className="text-[#007AFF]">Made Simple</span>
        </h1>

        {/* Subheadline */}
        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          Doubles equipment lifespan. Zero chairside downtime. MOH-compliant decontamination. 
          <strong className="text-slate-900"> Starting from RM 79/semester.</strong>
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-slate-900">350+</div>
            <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wide">Students</div>
          </div>

          <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-center gap-1 text-emerald-600 mb-1">
              <Award className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-slate-900">82%</div>
            <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wide">Margin</div>
          </div>

          <div className="text-center p-3 bg-white rounded-xl border border-slate-200">
            <div className="flex items-center justify-center gap-1 text-purple-600 mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
            <div className="text-lg font-black text-slate-900">4</div>
            <div className="text-[9px] text-slate-500 font-medium uppercase tracking-wide">Campuses</div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onGetStarted}
          className="w-full h-12 bg-[#007AFF] hover:bg-blue-600 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>Start Your Semester Pass</span>
          <span className="text-xs opacity-90">→</span>
        </button>

        {/* Trust Badge */}
        <p className="text-[10px] text-slate-500 text-center mt-3 font-medium">
          ✓ MOH Compliant · ✓ MDA Act 737 Certified · ✓ ISO 6789 Calibrated
        </p>
      </div>
    </div>
  );
};
