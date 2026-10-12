import React, { useState } from 'react';
import { 
  Zap, 
  Bell, 
  RotateCcw, 
  Smartphone, 
  Monitor, 
  Download, 
  BookOpen, 
  X,
  CreditCard,
  Maximize2,
  Minimize2,
  Sliders
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface IOSAssistiveTouchProps {
  onFastDemo: () => void;
  onSimulatePush: () => void;
  onReplaySplash: () => void;
  onToggleFrame: () => void;
  isFrameMode: boolean;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
  onOpenStoreModal: () => void;
  onOpenPrdSpec: () => void;
  onOpenPricing: () => void;
}

export const IOSAssistiveTouch: React.FC<IOSAssistiveTouchProps> = ({
  onFastDemo,
  onSimulatePush,
  onReplaySplash,
  onToggleFrame,
  isFrameMode,
  onToggleFullscreen,
  isFullscreen,
  onOpenStoreModal,
  onOpenPrdSpec,
  onOpenPricing,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAction = (action: () => void) => {
    triggerHaptic('medium');
    action();
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-3.5 sm:right-6 z-50 select-none">
      {/* Expanded iOS Quick Actions Menu */}
      {isOpen && (
        <div className="mb-3 w-64 bg-slate-950/90 text-white backdrop-blur-2xl rounded-3xl p-3 shadow-2xl border border-white/15 animate-in zoom-in-95 fade-in duration-200">
          <div className="flex items-center justify-between px-2 pb-2 mb-2 border-b border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
              <Sliders className="w-3.5 h-3.5 text-[#007AFF]" />
              <span>iOS Assistive Actions</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-[11px] font-semibold">
            {/* 1. Fast Demo */}
            <button
              onClick={() => handleAction(onFastDemo)}
              className="p-2.5 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 text-emerald-300 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>5s Fast Demo</span>
            </button>

            {/* 2. Push Alert */}
            <button
              onClick={() => handleAction(onSimulatePush)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Push Alert</span>
            </button>

            {/* 3. Replay Splash */}
            <button
              onClick={() => handleAction(onReplaySplash)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-4 h-4 text-[#007AFF]" />
              <span>Replay Splash</span>
            </button>

            {/* 4. Frame Toggle */}
            <button
              onClick={() => handleAction(onToggleFrame)}
              className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              {isFrameMode ? <Monitor className="w-4 h-4 text-purple-400" /> : <Smartphone className="w-4 h-4 text-purple-400" />}
              <span>{isFrameMode ? 'Edge Screen' : 'iPhone Frame'}</span>
            </button>

            {/* 5. App Store Readiness */}
            <button
              onClick={() => handleAction(onOpenStoreModal)}
              className="col-span-2 p-2.5 rounded-xl bg-[#007AFF] hover:bg-blue-600 text-white font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>iOS App Store Package (v1.0)</span>
            </button>
          </div>

          <div className="pt-2 mt-1 flex items-center justify-between text-[10px] text-slate-400 px-1 border-t border-white/5">
            <button onClick={() => handleAction(onOpenPrdSpec)} className="hover:text-white underline cursor-pointer">
              PRD Blueprint
            </button>
            <button onClick={() => handleAction(onOpenPricing)} className="hover:text-white underline cursor-pointer">
              DuitNow Plans
            </button>
          </div>
        </div>
      )}

      {/* Floating AssistiveTouch Orb */}
      <button
        onClick={() => {
          triggerHaptic('light');
          setIsOpen(!isOpen);
        }}
        className={`w-11 h-11 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-all active:scale-90 ${
          isOpen
            ? 'bg-[#007AFF] text-white ring-4 ring-[#007AFF]/30'
            : 'bg-slate-950/75 hover:bg-slate-950/90 text-white backdrop-blur-md border border-white/25 hover:border-white/40'
        }`}
        title="iOS AssistiveTouch Menu"
      >
        <div className="w-6 h-6 rounded-full border-2 border-white/80 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
        </div>
      </button>
    </div>
  );
};
