import React from 'react';
import { Role, RegisteredLoupe } from '../types';
import { MOCK_USERS } from '../data/mockData';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Glasses, 
  FileText, 
  CreditCard, 
  MapPin, 
  ExternalLink, 
  Printer, 
  ChevronRight, 
  Sparkles,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  Smartphone,
  Download
} from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';

interface UserProfileViewProps {
  currentRole: Role;
  onRoleChange: (role: Role) => void;
  registeredLoupe: RegisteredLoupe;
  onOpenCertificate: () => void;
  onOpenPricing: () => void;
  onOpenPrdSpec: () => void;
  onOpenHelp: () => void;
  onOpenPublishModal?: () => void;
}

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  currentRole,
  onRoleChange,
  registeredLoupe,
  onOpenCertificate,
  onOpenPricing,
  onOpenPrdSpec,
  onOpenHelp,
  onOpenPublishModal,
  onReplayOnboarding,
}) => {
  const user = MOCK_USERS[currentRole];

  return (
    <div className="space-y-3.5 animate-in fade-in duration-200">
      
      {/* 1. Clinical Identity Card */}
      <div className="bg-white p-4.5 rounded-3xl border border-slate-200 shadow-xs relative overflow-hidden">
        
        <div className="flex items-start gap-3.5">
          {/* Avatar with Status Ring */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-[#5856D6] text-white font-black text-lg flex items-center justify-center shadow-xs">
              {user.avatarInitials}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-xs" title="Active Credential">
              <CheckCircle2 className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          {/* User Names & Affiliation */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base font-extrabold text-slate-900 leading-tight truncate">
                {user.name}
              </h2>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200 shrink-0">
                Verified
              </span>
            </div>
            
            <p className="text-xs text-slate-700 font-semibold mt-0.5">
              {user.roleLabel}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {user.institution}
            </p>
            <div className="mt-1 text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md inline-block border border-purple-200">
              {user.matricId}
            </div>
          </div>
        </div>

        {/* Quick Role Switcher Inside Profile */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 text-[11px] font-bold">Switch Identity:</span>
          <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-center">
            <button
              onClick={() => onRoleChange('student')}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                currentRole === 'student' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Student
            </button>
            <button
              onClick={() => onRoleChange('clinician')}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                currentRole === 'clinician' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Doctor
            </button>
            <button
              onClick={() => onRoleChange('admin')}
              className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                currentRole === 'admin' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* 2. LoupeCare Subscription & Quota Card */}
      <div className="bg-slate-900 text-white p-4.5 rounded-3xl shadow-xs relative overflow-hidden border border-slate-800">
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-black text-amber-300 uppercase tracking-wider">
              Active Coverage
            </span>
          </div>
          <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
            Auto-Renew Active
          </span>
        </div>

        <div className="mt-3">
          <h3 className="text-base font-black text-white">
            {user.activePlan}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Valid until {user.planExpiry} · {user.servicesRemaining} clean-room cycles remaining
          </p>
        </div>

        <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="text-[11px] text-cyan-300 font-medium">
            Malaysian DuitNow / FPX Direct
          </div>
          <button
            onClick={onOpenPricing}
            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-[11px] rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-xs active:scale-[0.98]"
          >
            <span>Manage Plan</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Registered Surgical Loupe Hardware Asset */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Glasses className="w-4 h-4 text-teal-700" />
            <h4 className="text-xs font-bold text-slate-900">Registered Surgical Loupe</h4>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            {registeredLoupe.serialNumber}
          </span>
        </div>

        <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500">Optical Model:</span>
            <span className="font-semibold text-slate-800">{registeredLoupe.brandModel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Optics &amp; WD:</span>
            <span className="text-slate-800 font-mono">{registeredLoupe.magnification} · {registeredLoupe.workingDistance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Current Health:</span>
            <span className="font-bold text-emerald-700">{registeredLoupe.healthScore}% Clarity ({registeredLoupe.currentStatus})</span>
          </div>
        </div>
      </div>

      {/* 4. Smart Locker Campus Preference & Specs */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 text-slate-700 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Preferred Campus Locker</span>
          </span>
          <span className="text-[11px] text-teal-800 font-semibold">IMU Bukit Jalil</span>
        </div>
        <p className="text-[11px] text-slate-500">
          Oral Health Centre Level 3 Dental Lounge · Compartment #04 Assigned
        </p>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          <button
            onClick={onOpenPrdSpec}
            className="text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1 cursor-pointer text-[11px]"
          >
            <BookOpen className="w-3 h-3" />
            <span>PPD Track A Spec</span>
          </button>

          <button
            onClick={onOpenHelp}
            className="text-slate-500 hover:text-slate-800 font-medium flex items-center gap-1 cursor-pointer text-[11px]"
          >
            <HelpCircle className="w-3 h-3" />
            <span>Support &amp; FAQ</span>
          </button>
        </div>
      </div>

    </div>
  );
};
