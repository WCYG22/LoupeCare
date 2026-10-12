import React, { useState, useEffect } from 'react';
import { Wifi, PackageCheck } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface IPhoneFrameProps {
  children: React.ReactNode;
  isEdgeToEdge: boolean;
  isInServicing?: boolean;
  isReadyForPickup?: boolean;
  activeStageName?: string;
  onDynamicIslandClick?: () => void;
}

export const IPhoneFrame: React.FC<IPhoneFrameProps> = ({
  children,
  isEdgeToEdge,
  isInServicing = false,
  isReadyForPickup = false,
  activeStageName = 'Ultrasonic Cavitation',
  onDynamicIslandClick,
}) => {
  const [currentTime, setCurrentTime] = useState('9:41');
  const [islandExpanded, setIslandExpanded] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const formatted = `${hours % 12 || 12}:${minutes}`;
      setCurrentTime(formatted);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleIslandTap = () => {
    triggerHaptic('medium');
    setIslandExpanded(prev => !prev);
    if (onDynamicIslandClick) {
      onDynamicIslandClick();
    }
  };

  // Reusable Native iOS Status Bar with centered Dynamic Island
  const renderStatusBar = () => (
    <header className="w-full h-11 px-5 flex items-center justify-between relative shrink-0 select-none bg-white border-b border-slate-200/80 z-30 safe-top touch-manipulation">
      {/* Left: Time (Fixed 72px width for symmetric balance) */}
      <div className="w-[72px] text-left">
        <span className="font-bold text-xs text-slate-900 tracking-tight font-sans">
          {currentTime}
        </span>
      </div>

      {/* Center: Mathematically Centered Dynamic Island */}
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30">
        <button
          onClick={handleIslandTap}
          className={`transition-all duration-300 ease-out bg-black text-white flex items-center justify-between cursor-pointer active:scale-95 shadow-md ${
            isInServicing || isReadyForPickup || islandExpanded
              ? 'px-3 py-1 rounded-full text-[11px] gap-2 min-w-[170px]'
              : 'w-24 h-6 rounded-full px-2'
          }`}
          title="Apple Dynamic Island"
        >
          {isInServicing ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#5856D6] animate-ping" />
                <span className="text-[10px] font-bold text-indigo-300">Cleanroom</span>
              </div>
              <div className="text-[10px] text-white font-medium truncate max-w-[85px]">
                {activeStageName}
              </div>
            </>
          ) : isReadyForPickup ? (
            <>
              <div className="flex items-center gap-1">
                <PackageCheck className="w-3 h-3 text-[#34C759]" />
                <span className="text-[10px] font-bold text-emerald-400">Locker #04</span>
              </div>
              <span className="text-[10px] text-emerald-200 font-mono font-bold">READY</span>
            </>
          ) : (
            <div className="w-full flex items-center justify-between px-1">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950" />
            </div>
          )}
        </button>
      </div>

      {/* Right: iOS System Status Icons (Fixed 72px width for symmetric balance) */}
      <div className="w-[72px] flex items-center justify-end gap-1.5 text-slate-800 text-xs">
        <span className="text-[10px] font-bold tracking-tight text-slate-700">5G</span>
        <Wifi className="w-3.5 h-3.5 text-slate-800 shrink-0" />
        <div className="flex items-center shrink-0">
          <div className="w-5 h-2.5 rounded-[3px] border border-slate-800 p-0.5 flex items-center">
            <div className="h-full w-full bg-[#34C759] rounded-[1px]" />
          </div>
          <div className="w-0.5 h-1 bg-slate-800 rounded-r-[1px]" />
        </div>
      </div>
    </header>
  );

  // If in edge-to-edge mode, render full-screen with native proportions
  if (isEdgeToEdge) {
    return (
      <div className="w-full h-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden relative touch-manipulation">
        {renderStatusBar()}
        <div className="flex-1 w-full overflow-hidden flex flex-col relative overscroll-none">
          {children}
        </div>
      </div>
    );
  }

  // Device Frame Mode: Edge-to-edge on mobile screens (< sm), elegant framed canvas on desktop
  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-0 sm:py-4 select-none">
      <div className="w-full sm:max-w-[420px] min-h-screen sm:min-h-[844px] sm:h-[844px] sm:max-h-[94vh] bg-white sm:rounded-[46px] sm:shadow-2xl sm:border sm:border-slate-300 sm:ring-8 sm:ring-slate-900/90 overflow-hidden flex flex-col relative">
        {renderStatusBar()}
        <div className="flex-1 w-full overflow-hidden flex flex-col relative bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  );
};
