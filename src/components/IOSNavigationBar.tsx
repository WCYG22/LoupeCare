import React from 'react';
import { Role } from '../types';
import { ShieldCheck, Bell, Sparkles, Smartphone, Download, CheckCircle2 } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface IOSNavigationBarProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  activeTab: 'loupe' | 'tracker' | 'loaners' | 'profile';
  unreadNotificationCount: number;
  onOpenNotifications: () => void;
  onOpenPublishModal: () => void;
}

export const IOSNavigationBar: React.FC<IOSNavigationBarProps> = ({
  currentRole,
  onRoleChange,
  activeTab,
  unreadNotificationCount,
  onOpenNotifications,
  onOpenPublishModal,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'loupe':
        return { title: 'LoupeCare', subtitle: 'IMU Dental School · BDS Track A' };
      case 'tracker':
        return { title: 'Service Tracker', subtitle: 'Live Clean-Room Decontamination' };
      case 'loaners':
        return { title: 'Backup Fleet', subtitle: 'Emergency Clinical Loupes' };
      case 'profile':
        return { title: 'Apple ID & MOH', subtitle: 'Clinician Credentials & Pass' };
    }
  };

  const { title, subtitle } = getTabTitle();

  const handleRoleSelect = (role: Role) => {
    triggerHaptic('light');
    onRoleChange(role);
  };

  return (
    <div className="bg-white px-4 pt-2.5 pb-2 border-b border-slate-200 shrink-0 select-none shadow-xs z-20 touch-manipulation">
      
      {/* Top Header Row */}
      <div className="flex items-center justify-between">
        
        {/* Brand & Large Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#007AFF] text-white flex items-center justify-center shrink-0 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-[10px] text-blue-600 font-semibold leading-none mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Right Actions: TestFlight / App Store & Notification Bell */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              triggerHaptic('light');
              onOpenPublishModal();
            }}
            className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-[#007AFF] border border-blue-200 rounded-full text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shrink-0"
            title="iOS App Store & TestFlight Status"
          >
            <Download className="w-3 h-3 text-[#007AFF]" />
            <span>TestFlight</span>
          </button>

          <button
            onClick={() => {
              triggerHaptic('light');
              onOpenNotifications();
            }}
            className="p-1.5 text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-all cursor-pointer relative active:scale-90 shrink-0"
            title="Notification Center"
          >
            <Bell className="w-4 h-4 text-slate-700" />
            {unreadNotificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF2D55] text-white text-[9px] font-black rounded-full flex items-center justify-center ring-2 ring-white shadow-xs">
                {unreadNotificationCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* iOS Segmented Control - 2-Column Grid for Student/Clinician */}
      <div className="mt-2.5 bg-slate-100 p-1 rounded-xl grid grid-cols-2 gap-1 border border-slate-200 text-center">
        <button
          onClick={() => handleRoleSelect('student')}
          className={`h-8 flex items-center justify-center text-[11px] rounded-lg transition-all cursor-pointer truncate ${
            currentRole === 'student'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          Dental Student (BDS)
        </button>

        <button
          onClick={() => handleRoleSelect('clinician')}
          className={`h-8 flex items-center justify-center text-[11px] rounded-lg transition-all cursor-pointer truncate ${
            currentRole === 'clinician'
              ? 'bg-white text-slate-900 font-bold shadow-xs'
              : 'text-slate-500 hover:text-slate-800 font-medium'
          }`}
        >
          Graduate Dentist
        </button>
      </div>

    </div>
  );
};
