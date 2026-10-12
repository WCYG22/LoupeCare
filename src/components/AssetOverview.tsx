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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-all">
      
      {/* Main Asset Header Card */}
      <div className="p-4 sm:p-5">
        
        {/* Top Identity & Health Score Row - Perfectly Aligned */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {/* Solid Apple Blue Icon Badge */}
            <div className="w-12 h-12 rounded-2xl bg-[#007AFF] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Glasses className="w-6 h-6 text-white stroke-[2.2]" />
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

        {/* Solid Health Progress Bar */}
        <div className="mt-3.5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full transition-all duration-700 bg-[#007AFF]"
            style={{ width: `${loupe.healthScore}%` }}
          />
        </div>

        {/* 3 Clean Solid Stats Boxes - Symmetrical Grid */}
        <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3.5 border-t border-slate-100 text-center">
          {/* Card 1: Anti-Fog Shield */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center items-center h-[62px]">
            <div className="text-[10px] text-slate-600 font-medium truncate flex items-center justify-center gap-1 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 shrink-0" />
              <span className="truncate">Anti-Fog</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-0.5 truncate w-full">
              {loupe.nanoCoatDaysRemaining}d Left
            </div>
          </div>

          {/* Card 2: Hinge Torque */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center items-center h-[62px]">
            <div className="text-[10px] text-slate-600 font-medium truncate flex items-center justify-center gap-1 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-600 shrink-0" />
              <span className="truncate">Torque</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-0.5 truncate w-full">
              {loupe.torqueSpec}
            </div>
          </div>

          {/* Card 3: Last Service */}
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-center items-center h-[62px]">
            <div className="text-[10px] text-slate-600 font-medium truncate flex items-center justify-center gap-1 w-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
              <span className="truncate">Serviced</span>
            </div>
            <div className="text-xs sm:text-sm font-black text-slate-900 font-mono mt-0.5 truncate w-full">
              {loupe.lastServicedDate}
            </div>
          </div>
        </div>

        {/* Solid Primary Action Button */}
        <div className="mt-3.5">
          {isReadyForPickup ? (
            <button
              onClick={onOpenPickupModal}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <PackageCheck className="w-4 h-4 text-white shrink-0" />
              <span>Retrieve Serviced Loupe from Locker #04</span>
            </button>
          ) : isInServicing ? (
            <button
              onClick={onViewTracker}
              className="w-full h-12 bg-[#007AFF] hover:bg-blue-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <RotateCw className="w-4 h-4 animate-spin text-white shrink-0" />
              <span>Track Live Clean-Room Servicing ➔</span>
            </button>
          ) : (
            <button
              onClick={onOpenLockerModal}
              className="w-full h-12 bg-[#007AFF] hover:bg-blue-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <Lock className="w-4 h-4 text-white shrink-0" />
              <span>Drop-off Loupe at Campus Smart Locker</span>
            </button>
          )}
        </div>

        {/* 3 Solid Secondary Action Buttons - Clean Symmetrical Grid */}
        <div className="grid grid-cols-3 gap-2 mt-2.5 text-xs">
          <button
            onClick={onOpenInspectionModal}
            className="h-11 px-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-2xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center shadow-xs active:scale-[0.98]"
          >
            <Camera className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span className="truncate">10-Pt Scan</span>
          </button>
          
          <button
            onClick={onOpenLoanerModal}
            className="h-11 px-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-2xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center shadow-xs active:scale-[0.98]"
          >
            <Glasses className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span className="truncate">Backup Fleet</span>
          </button>
          
          <button
            onClick={onOpenCertificateModal}
            className="h-11 px-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-2xl font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer text-center shadow-xs active:scale-[0.98]"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">MOH Pass</span>
          </button>
        </div>

      </div>

    </div>
  );
};
