import React from 'react';
import { 
  Lock, 
  Camera, 
  RotateCw, 
  Glasses, 
  FileCheck2, 
  Sparkles, 
  HelpCircle,
  PlayCircle
} from 'lucide-react';

interface GuidedTourBarProps {
  onOpenLocker: () => void;
  onOpenInspection: () => void;
  onScrollToTracker: () => void;
  onOpenLoaner: () => void;
  onOpenCertificate: () => void;
  onOpenPricing: () => void;
  onOpenHelp: () => void;
}

export const GuidedTourBar: React.FC<GuidedTourBarProps> = ({
  onOpenLocker,
  onOpenInspection,
  onScrollToTracker,
  onOpenLoaner,
  onOpenCertificate,
  onOpenPricing,
  onOpenHelp,
}) => {
  const steps = [
    { label: '1. Locker Drop', icon: Lock, onClick: onOpenLocker },
    { label: '2. 10-Point Scan', icon: Camera, onClick: onOpenInspection },
    { label: '3. 4-Stage Tracker', icon: RotateCw, onClick: onScrollToTracker },
    { label: '4. Backup Loaner', icon: Glasses, onClick: onOpenLoaner },
    { label: '5. MOH Audit Pass', icon: FileCheck2, onClick: onOpenCertificate },
    { label: '6. DuitNow Plans', icon: Sparkles, onClick: onOpenPricing },
  ];

  return (
    <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-2.5">
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 shrink-0 self-start sm:self-center">
        <div className="w-6 h-6 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
          <PlayCircle className="w-4 h-4 text-teal-600" />
        </div>
        <span>Interactive Flow:</span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-0.5 no-scrollbar">
        {steps.map((st, i) => {
          const Icon = st.icon;
          return (
            <button
              key={i}
              onClick={st.onClick}
              className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-[11px] font-semibold text-slate-700 hover:text-teal-900 flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer shrink-0 shadow-2xs"
            >
              <Icon className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>{st.label}</span>
            </button>
          );
        })}
      </div>

      <button
        onClick={onOpenHelp}
        className="text-xs font-semibold text-slate-500 hover:text-teal-700 flex items-center gap-1 shrink-0 px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer self-end sm:self-center"
        title="View Clinician Guide & FAQ"
      >
        <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
        <span className="hidden md:inline">Guide &amp; FAQ</span>
      </button>
    </div>
  );
};
