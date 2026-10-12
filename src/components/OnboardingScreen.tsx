import React, { useState } from 'react';
import { ShieldCheck, Lock, Zap, Glasses, FileText, ArrowRight, CheckCircle } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Lock,
      color: '#007AFF',
      title: 'Contactless Smart Lockers',
      description: 'Drop-off and pickup your surgical loupes at 4 campus locations using IoT-enabled smart lockers.',
      highlight: 'Zero scheduling hassle',
    },
    {
      icon: ShieldCheck,
      color: '#34C759',
      title: 'MOH-Compliant Servicing',
      description: '4-stage professional cleaning with enzymatic decontamination and hydrophobic nano-coating.',
      highlight: 'Medical-grade standards',
    },
    {
      icon: Zap,
      color: '#AF52DE',
      title: 'Zero Downtime Guarantee',
      description: 'Free backup loaner loupes available during servicing. Continue your clinical rotations without interruption.',
      highlight: 'Keep working',
    },
  ];

  const handleNext = () => {
    triggerHaptic('light');
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    triggerHaptic('light');
    onComplete();
  };

  const slide = slides[currentSlide];
  const IconComponent = slide.icon;

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-slate-50 to-white flex flex-col items-center justify-between p-8 select-none safe-top safe-bottom">
      
      {/* Skip Button */}
      <div className="w-full flex justify-end">
        <button
          onClick={handleSkip}
          className="text-sm text-slate-500 hover:text-slate-900 font-semibold transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-sm -mt-12">
        
        {/* Icon */}
        <div 
          className="w-28 h-28 rounded-[32px] flex items-center justify-center shadow-2xl mb-8 animate-in zoom-in duration-500"
          style={{ backgroundColor: slide.color }}
        >
          <IconComponent className="w-14 h-14 text-white stroke-[2]" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-3 animate-in fade-in duration-700">
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-base text-slate-600 leading-relaxed mb-4 animate-in fade-in duration-700 delay-100">
          {slide.description}
        </p>

        {/* Highlight Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold border border-blue-200 animate-in fade-in duration-700 delay-200">
          <CheckCircle className="w-4 h-4" />
          {slide.highlight}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-sm space-y-4">
        
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                triggerHaptic('light');
                setCurrentSlide(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-[#007AFF]'
                  : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>

        {/* Next/Get Started Button */}
        <button
          onClick={handleNext}
          className="w-full h-14 bg-[#007AFF] hover:bg-blue-600 text-white rounded-2xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <span>{currentSlide < slides.length - 1 ? 'Next' : 'Get Started'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Footer */}
        <p className="text-xs text-slate-400 text-center font-medium">
          IMU Dentistry Track A · BDS Entrepreneurship Module
        </p>
      </div>
    </div>
  );
};
