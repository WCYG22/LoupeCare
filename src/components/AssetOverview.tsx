import React from 'react';
import { RegisteredLoupe, Role } from '../types';
import { 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Glasses, 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCw, 
  PackageCheck, 
  Camera, 
  ArrowRight,
  User,
  Zap,
  Activity
} from 'lucide-react';

interface AssetOverviewProps {
  loupe: RegisteredLoupe;
  role: Role;
  onOpenLockerModal: () => void;
  onOpenPickupModal: () => void;
  onOpenLoanerModal: () => void;
  onOpenCertificateModal: () => void;
  onOpenInspectionModal: () => void;
  onViewTracker?: () => void;
}

export const AssetOverview: React.FC<AssetOverviewProps> = ({
  loupe,
  role,
  onOpenLockerModal,
  onOpenPickupModal,
  onOpenLoanerModal,
  onOpenCertificateModal,
  onOpenInspectionModal,
  onViewTracker,
}) => {
  const isOptimal = loupe.healthScore >= 90;
  const isReadyForPickup = loupe.currentStatus === 'Ready for Pickup';
  const isInServicing = loupe.currentStatus === 'In Servicing';
  const isMaintenanceDue = loupe.currentStatus === 'Maintenance Due';

  return (
    <div className="relative group">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse" />
      
      <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden transition-all hover:shadow-blue-200/50 hover:scale-[1.01] duration-300">
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        
        {/* Main Asset Header Card */}
        <div className="p-4 sm:p-5 relative z-10">
        
        {/* Top Identity & Health Score Row - Perfectly Aligned */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* 3D Floating Icon Badge with glow */}
            <div className="relative group/icon">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-lg opacity-50 group-hover/icon:opacity-75 transition-opacity animate-pulse" />
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-[#007AFF] to-[#5856D6] text-white flex items-center justify-center shrink-0 shadow-xl transform group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-all duration-300">
                <Glasses className="w-6 h-6 text-white stroke-[2.2] drop-shadow-lg" />
              </div>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-tight truncate">
                  {loupe.brandModel}
                </h2>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                  isReadyForPickup
                    ? 'bg-emerald-600 text-white'
                    : isOptimal 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : isInServicing
                    ? 'bg-blue-600 text-white'
                    : 'bg-rose-50 text-rose-800 border border-rose-300'
                }`}>
                  {isReadyForPickup && <PackageCheck className="w-3 h-3" />}
                  {isOptimal && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                  {isInServicing && <RotateCw className="w-3 h-3 animate-spin" />}
                  {isMaintenanceDue && <AlertTriangle className="w-3 h-3" />}
                  {loupe.currentStatus}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-mono truncate">
                Serial #{loupe.serialNumber} · {loupe.magnification} · WD {loupe.workingDistance}
              </p>
            </div>
          </div>

          {/* Optical Health Score Badge */}
          <div className="text-right shrink-0">
            <div className="flex items-center justify-end gap-1 text-[10px] font-semibold text-slate-500">
              <Activity className="w-3 h-3 text-blue-600" />
              <span>Clarity</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-blue-600 font-mono tracking-tight leading-none mt-1">
              {loupe.healthScore}%
            </div>
          </div>
        </div>

        {/* Animated Gradient Progress Bar with glow */}
        <div className="mt-3.5 w-full bg-gradient-to-r from-slate-100 to-slate-50 h-3 rounded-full overflow-hidden shadow-inner relative">
          <div 
            className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden shadow-lg"
            style={{ width: `${loupe.healthScore}%` }}
          >
            {/* Shimmer animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
          </div>
          {/* Glow effect */}
          <div 
            className="absolute top-0 h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400 blur-md opacity-50 transition-all duration-700"
            style={{ width: `${loupe.healthScore}%` }}
          />
        </div>

        {/* 3 Glassmorphic Stats Cards with hover effects */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3.5 border-t border-white/40 text-center">
          {/* Card 1: Anti-Fog Shield - Glassmorphism */}
          <div className="relative group/card p-2.5 rounded-2xl bg-gradient-to-br from-cyan-50/80 to-blue-50/80 backdrop-blur-sm border border-cyan-200/50 flex flex-col justify-center items-center h-[62px] hover:scale-105 hover:shadow-lg hover:shadow-cyan-200/50 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/10 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity" />
            <div className="text-[10px] text-slate-600 font-medium truncate flex items-center justify-center gap-1 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0" />
              <span className="truncate">Anti-Fog</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-0.5 truncate w-full">
              {loupe.nanoCoatDaysRemaining}d Left
            </div>
          </div>

          {/* Card 2: Hinge Torque - Glassmorphism */}
          <div className="relative group/card p-2.5 rounded-2xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm border border-purple-200/50 flex flex-col justify-center items-center h-[62px] hover:scale-105 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity" />
            <div className="text-[10px] text-slate-600 font-medium truncate flex items-center justify-center gap-1 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
              <span className="truncate">Torque</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-0.5 truncate w-full">
              {loupe.torqueSpec}
            </div>
          </div>

          {/* Card 3: Last Service - Glassmorphism */}
          <div className="relative group/card p-2.5 rounded-2xl bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm border border-emerald-200/50 flex flex-col justify-center items-center h-[62px] hover:scale-105 hover:shadow-lg hover:shadow-emerald-200/50 transition-all duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/10 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity" />
            <div className="text-[10px] text-slate-600 font-medium truncate flex items-center justify-center gap-1 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              <span className="truncate">Serviced</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-0.5 truncate w-full">
              {loupe.lastServicedDate}
            </div>
          </div>
        </div>

        {/* 3D Gradient Action Button with pulse effect */}
        <div className="mt-3.5 relative">
          {isReadyForPickup ? (
            <button
              onClick={onOpenPickupModal}
              className="relative w-full h-12 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 overflow-hidden group/btn"
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-emerald-400/0 animate-pulse" />
              <PackageCheck className="w-4 h-4 text-white shrink-0 animate-bounce" />
              <span className="relative z-10">Retrieve Serviced Loupe from Locker #04</span>
            </button>
          ) : isInServicing ? (
            <button
              onClick={onViewTracker}
              className="relative w-full h-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 animate-pulse" />
              <RotateCw className="w-4 h-4 animate-spin text-white shrink-0" />
              <span className="relative z-10">Track Live Clean-Room Servicing ➔</span>
            </button>
          ) : (
            <button
              onClick={onOpenLockerModal}
              className="relative w-full h-12 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 hover:from-blue-700 hover:via-cyan-700 hover:to-teal-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-xl shadow-blue-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
              <Lock className="w-4 h-4 text-white shrink-0 relative z-10" />
              <span className="relative z-10">Drop-off Loupe at Campus Smart Locker</span>
            </button>
          )}
        </div>

        {/* Glassmorphic Secondary Action Buttons with 3D effects */}
        <div className="grid grid-cols-3 gap-2 mt-2.5 text-xs">
          <button
            onClick={onOpenInspectionModal}
            className="relative group/sec h-11 px-2 bg-gradient-to-br from-amber-50/80 to-orange-50/80 backdrop-blur-sm hover:from-amber-100/90 hover:to-orange-100/90 text-slate-800 border border-amber-200/50 rounded-2xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center shadow-sm hover:shadow-md hover:shadow-amber-200/50 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/10 opacity-0 group-hover/sec:opacity-100 transition-opacity" />
            <Camera className="w-3.5 h-3.5 text-amber-600 shrink-0 relative z-10 group-hover/sec:scale-110 transition-transform" />
            <span className="truncate relative z-10">10-Pt Scan</span>
          </button>
          
          <button
            onClick={onOpenLoanerModal}
            className="relative group/sec h-11 px-2 bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm hover:from-purple-100/90 hover:to-pink-100/90 text-slate-800 border border-purple-200/50 rounded-2xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center shadow-sm hover:shadow-md hover:shadow-purple-200/50 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/10 opacity-0 group-hover/sec:opacity-100 transition-opacity" />
            <Glasses className="w-3.5 h-3.5 text-purple-600 shrink-0 relative z-10 group-hover/sec:scale-110 transition-transform" />
            <span className="truncate relative z-10">Backup Fleet</span>
          </button>
          
          <button
            onClick={onOpenCertificateModal}
            className="relative group/sec h-11 px-2 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 backdrop-blur-sm hover:from-emerald-100/90 hover:to-teal-100/90 text-slate-800 border border-emerald-200/50 rounded-2xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center shadow-sm hover:shadow-md hover:shadow-emerald-200/50 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-500/10 opacity-0 group-hover/sec:opacity-100 transition-opacity" />
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 relative z-10 group-hover/sec:scale-110 transition-transform" />
            <span className="truncate relative z-10">MOH Pass</span>
          </button>
        </div>

      </div>

    </div>
  );
};
