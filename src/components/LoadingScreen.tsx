import React, { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

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
      className="fixed inset-0 z-50 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950 text-white flex flex-col items-center justify-between p-8 select-none cursor-pointer animate-in fade-in duration-200 overflow-hidden"
      title="Tap anywhere to enter immediately"
    >
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full animate-float blur-sm"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(15,23,42,0.8)_100%)]" />
      {/* Top subtle spacer */}
      <div className="w-full flex justify-end relative z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="text-xs text-slate-400 hover:text-white transition-colors py-1 px-3 rounded-full bg-white/10 hover:bg-white/20 font-semibold backdrop-blur-sm border border-white/10"
        >
          Skip ➔
        </button>
      </div>

      {/* Center Brand Icon, Title, and Clean Spinner */}
      <div className="flex flex-col items-center text-center -mt-6 relative z-10">
        {/* LoupeCare 3D Floating Icon Badge with glow */}
        <div className="relative mb-6 animate-float">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-[28px] blur-2xl opacity-60 animate-pulse" />
          <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] text-white flex items-center justify-center shadow-2xl border border-white/20 transform hover:scale-110 hover:rotate-6 transition-all duration-500">
            <ShieldCheck className="w-11 h-11 text-white stroke-[2.2] drop-shadow-2xl" />
            {/* Orbiting ring */}
            <div className="absolute inset-0 border-2 border-white/20 rounded-3xl animate-ping" />
          </div>
        </div>

        {/* Brand Name with gradient */}
        <h1 className="text-3xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent tracking-tight animate-gradient">
          LoupeCare
        </h1>
        <p className="text-xs text-blue-400 font-bold mt-1 tracking-wide uppercase flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
          Optical Hygiene &amp; Smart Lockers
          <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
        </p>

        {/* Glassmorphic Progress Bar with shimmer */}
        <div className="relative w-56 bg-white/10 backdrop-blur-sm h-3 rounded-full overflow-hidden mt-8 border border-white/20 shadow-lg">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-100 ease-out relative overflow-hidden shadow-lg"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          {/* Glow effect */}
          <div 
            className="absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-sm opacity-50 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-[10px] font-mono font-bold text-blue-300 mt-2 flex items-center gap-2">
          <span className="w-1 h-1 bg-blue-400 rounded-full animate-ping" />
          {progress}%
          <span className="w-1 h-1 bg-blue-400 rounded-full animate-ping" />
        </span>
      </div>

      {/* Footer Tagline */}
      <div className="text-[11px] text-slate-400 font-semibold tracking-wider uppercase relative z-10">
        Malaysia BDS Track A · IMU Healthcare
      </div>
    </div>
  );
};
