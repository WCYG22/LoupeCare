import React from 'react';
import { Glasses, RotateCw, Zap, User } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface MobileBottomNavProps {
  activeTab: 'loupe' | 'tracker' | 'loaners' | 'profile';
  onChangeTab: (tab: 'loupe' | 'tracker' | 'loaners' | 'profile') => void;
  isInServicing?: boolean;
  isReadyForPickup?: boolean;
  hasActiveLoaner?: boolean;
  className?: string;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onChangeTab,
  isInServicing,
  isReadyForPickup,
  hasActiveLoaner,
  className = '',
}) => {
  const handleTabPress = (tab: 'loupe' | 'tracker' | 'loaners' | 'profile') => {
    triggerHaptic('light');
    onChangeTab(tab);
  };

  return (
    <div className={`bg-white/95 backdrop-blur-2xl border-t border-slate-200/90 select-none safe-bottom ${className}`}>
      <nav className="h-16 px-1 grid grid-cols-4 items-center touch-manipulation">
        {/* TAB 1: MY LOUPE */}
        <button
          onClick={() => handleTabPress('loupe')}
          className={`h-full flex flex-col items-center justify-center py-1 transition-all cursor-pointer relative ${
            activeTab === 'loupe'
              ? 'text-[#007AFF] font-bold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Glasses className={`w-5 h-5 transition-transform ${activeTab === 'loupe' ? 'scale-110 text-[#007AFF]' : ''}`} />
            {isReadyForPickup && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#34C759] rounded-full ring-2 ring-white animate-ping" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-semibold">My Loupe</span>
        </button>

        {/* TAB 2: LIVE TRACKER */}
        <button
          onClick={() => handleTabPress('tracker')}
          className={`h-full flex flex-col items-center justify-center py-1 transition-all cursor-pointer relative ${
            activeTab === 'tracker'
              ? 'text-[#5856D6] font-bold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <RotateCw className={`w-5 h-5 transition-transform ${
              isInServicing ? 'animate-spin text-[#5856D6]' : activeTab === 'tracker' ? 'scale-110 text-[#5856D6]' : ''
            }`} />
            {isInServicing && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#5856D6] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-semibold">Tracker</span>
        </button>

        {/* TAB 3: BACKUP LOANERS */}
        <button
          onClick={() => handleTabPress('loaners')}
          className={`h-full flex flex-col items-center justify-center py-1 transition-all cursor-pointer relative ${
            activeTab === 'loaners'
              ? 'text-[#AF52DE] font-bold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Zap className={`w-5 h-5 transition-transform ${activeTab === 'loaners' ? 'scale-110 text-[#AF52DE]' : ''}`} />
            {hasActiveLoaner && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FF9500] rounded-full ring-2 ring-white animate-pulse" />
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-semibold">Loaners</span>
        </button>

        {/* TAB 4: USER PROFILE */}
        <button
          onClick={() => handleTabPress('profile')}
          className={`h-full flex flex-col items-center justify-center py-1 transition-all cursor-pointer relative ${
            activeTab === 'profile'
              ? 'text-[#34C759] font-bold'
              : 'text-slate-400 hover:text-slate-700'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <User className={`w-5 h-5 transition-transform ${activeTab === 'profile' ? 'scale-110 text-[#34C759]' : ''}`} />
          </div>
          <span className="text-[10px] mt-1 tracking-tight font-semibold">Profile</span>
        </button>
      </nav>

      {/* iOS Home Indicator Bar - Responsive padding for safe area */}
      <div className="w-full pt-0.5 pb-2 sm:pb-1.5 flex justify-center">
        <div className="w-32 h-1 bg-black/25 rounded-full" />
      </div>
    </div>
  );
};
