import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth, quick loading timer that finishes in ~1.6s and enters the dashboard automatically
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // When progress reaches 100, smoothly trigger onComplete to enter dashboard
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 250);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <div 
      onClick={onComplete}
      className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-between p-8 select-none cursor-pointer animate-in fade-in duration-200"
      title="Tap anywhere to enter immediately"
    >
      {/* Top subtle spacer */}
      <div className="w-full flex justify-end">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="text-xs text-slate-400 hover:text-white transition-colors py-1 px-3 rounded-full bg-white/10 font-semibold"
        >
          Skip ➔
        </button>
      </div>

      {/* Center Brand Icon, Title, and Clean Spinner */}
      <div className="flex flex-col items-center text-center -mt-6">
        {/* LoupeCare Solid Blue Icon Badge */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-3xl bg-[#007AFF] text-white flex items-center justify-center shadow-xl border border-white/20">
            <ShieldCheck className="w-11 h-11 text-white stroke-[2.2]" />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-black text-white tracking-tight">
          LoupeCare
        </h1>
        <p className="text-xs text-blue-400 font-bold mt-1 tracking-wide uppercase">
          Optical Hygiene &amp; Smart Lockers
        </p>

        {/* Solid Progress Bar */}
        <div className="w-56 bg-white/15 h-2 rounded-full overflow-hidden mt-8 p-0.5">
          <div 
            className="h-full bg-[#007AFF] rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] font-mono font-bold text-slate-400 mt-2">{progress}%</span>
      </div>

      {/* Footer Tagline */}
      <div className="text-[11px] text-slate-500 font-semibold tracking-wider uppercase">
        Malaysia BDS Track A · IMU Healthcare
      </div>
    </div>
  );
};
