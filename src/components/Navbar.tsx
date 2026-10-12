import React, { useState } from 'react';
import { Role } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { Shield, Sparkles, Smartphone, Monitor, BookOpen, User, Menu, X, ChevronDown, Bell } from 'lucide-react';

interface NavbarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: () => void;
  onOpenPrdSpec: () => void;
  onOpenPricing: () => void;
  unreadNotificationCount?: number;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  onRoleChange,
  isMobileFrame,
  onToggleMobileFrame,
  onOpenPrdSpec,
  onOpenPricing,
  unreadNotificationCount = 0,
  onOpenNotifications,
}) => {
  const activeUser = MOCK_USERS[currentRole];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2 sm:gap-4">
          
          {/* Brand Wordmark & Clinical Indicator */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#2D1B69] text-white flex items-center justify-center shadow-md shadow-purple-900/25 shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">LoupeCare</span>
                <span className="text-[11px] font-bold text-[#2D1B69] bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200/60">
                  For Dental Students
                </span>
              </div>
            </div>
          </div>

          {/* Right Action Tools: Desktop & Mobile Triggers */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* In-App Push Notification Bell Button */}
            <button
              onClick={onOpenNotifications}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors relative cursor-pointer"
              title="View In-App Notifications"
            >
              <Bell className="w-4 h-4 text-slate-700" />
              {unreadNotificationCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* PRD Spec Modal Button (Desktop) */}
            <button
              onClick={onOpenPrdSpec}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
              title="Open Track A Academic PRD & Technical Blueprint"
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>PPD Spec</span>
            </button>

            {/* Subscription Button with Purple Accent */}
            <button
              onClick={onOpenPricing}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-bold text-white bg-[#2D1B69] hover:bg-[#4A3089] rounded-lg transition-all whitespace-nowrap cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">DuitNow Plans</span>
              <span className="sm:hidden">Plans</span>
            </button>

            {/* Desktop Simulator Frame Toggle (hidden on mobile touchscreens) */}
            <button
              onClick={onToggleMobileFrame}
              className={`p-1.5 sm:p-2 rounded-lg border transition-colors cursor-pointer hidden md:flex items-center justify-center ${
                isMobileFrame
                  ? 'bg-indigo-600 text-white border-indigo-700'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title={isMobileFrame ? 'Switch to Full Desktop View' : 'Simulate Mobile Frame'}
            >
              {isMobileFrame ? (
                <Monitor className="w-4 h-4" />
              ) : (
                <Smartphone className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Dropdown Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-100 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between text-xs px-2 py-1 text-slate-500">
              <span>Logged in as:</span>
              <span className="font-bold text-slate-800">{activeUser.name} ({activeUser.matricId})</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => { onOpenPrdSpec(); setMobileMenuOpen(false); }}
                className="p-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                <span>PPD Track A Spec</span>
              </button>
              <button
                onClick={() => { onOpenPricing(); setMobileMenuOpen(false); }}
                className="p-2 text-xs font-semibold text-teal-800 bg-teal-50 border border-teal-200 rounded-lg flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>DuitNow Plans</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
