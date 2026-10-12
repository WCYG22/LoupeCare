import React, { useState } from 'react';
import { DEFAULT_INSPECTION_ITEMS } from '../data/mockData';
import { InspectionCheckItem } from '../types';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Eye, 
  PenTool, 
  Camera, 
  Maximize2,
  FileCheck2
} from 'lucide-react';

interface TenPointInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  loupeSerial: string;
  loupeModel: string;
  isSigned: boolean;
  onSignOff: () => void;
}

export const TenPointInspectionModal: React.FC<TenPointInspectionModalProps> = ({
  isOpen,
  onClose,
  loupeSerial,
  loupeModel,
  isSigned,
  onSignOff,
}) => {
  const [items] = useState<InspectionCheckItem[]>(DEFAULT_INSPECTION_ITEMS);
  const [activeAreaFilter, setActiveAreaFilter] = useState<'all' | 'optics' | 'hinges' | 'frame' | 'seals' | 'nosepads'>('all');
  const [hasSignedLocally, setHasSignedLocally] = useState(isSigned);
  const [signatureName, setSignatureName] = useState('TAN LEE JIA (YEAR 5 BDS)');

  if (!isOpen) return null;

  const filteredItems = activeAreaFilter === 'all' 
    ? items 
    : items.filter(it => it.area === activeAreaFilter);

  const handleSign = () => {
    setHasSignedLocally(true);
    onSignOff();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[30px] sm:rounded-2xl max-w-3xl w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">10-Point Optical Pre-Inspection Scan</h3>
                <span className="text-[11px] font-mono bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                  {loupeSerial}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Baseline macro intake photo report & hermetic seal verification
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Macro Inspection Visualizer Area */}
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-4 text-white relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 border-b border-slate-800 pb-2">
              <span className="flex items-center gap-1.5 text-teal-400 font-mono">
                <Eye className="w-3.5 h-3.5" /> Macro Ring-Light Telemetry · 12x Magnification
              </span>
              <span className="font-mono text-[11px]">Intake Stamp: 09:18 AM MYT</span>
            </div>

            {/* High visual fidelity SVG Loupe Diagram with Optical Hotspots */}
            <div className="relative w-full h-48 bg-slate-900/90 rounded-xl flex items-center justify-center border border-slate-800">
              <svg className="w-full max-w-md h-36" viewBox="0 0 400 150" fill="none">
                {/* Frame Bridge */}
                <path d="M 160 50 Q 200 40 240 50" stroke="#94A3B8" strokeWidth="4" strokeLinecap="round" />
                {/* Nose Pads */}
                <ellipse cx="180" cy="65" rx="6" ry="12" fill="#38BDF8" opacity="0.8" />
                <ellipse cx="220" cy="65" rx="6" ry="12" fill="#38BDF8" opacity="0.8" />
                {/* Left Ocular Carrier */}
                <rect x="70" y="30" width="90" height="70" rx="16" stroke="#0D9488" strokeWidth="3" fill="#0F172A" />
                {/* Left Objective Barrel */}
                <circle cx="115" cy="65" r="28" stroke="#14B8A6" strokeWidth="2.5" fill="#134E4A" />
                <circle cx="115" cy="65" r="20" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="115" cy="65" r="8" fill="#5EEAD4" opacity="0.9" />
                {/* Right Ocular Carrier */}
                <rect x="240" y="30" width="90" height="70" rx="16" stroke="#0D9488" strokeWidth="3" fill="#0F172A" />
                {/* Right Objective Barrel */}
                <circle cx="285" cy="65" r="28" stroke="#14B8A6" strokeWidth="2.5" fill="#134E4A" />
                <circle cx="285" cy="65" r="20" stroke="#2DD4BF" strokeWidth="1.5" strokeDasharray="3 3" />
                <circle cx="285" cy="65" r="8" fill="#5EEAD4" opacity="0.9" />
                {/* Left Temple Arm */}
                <path d="M 70 45 L 20 40 L 5 70" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
                {/* Right Temple Arm */}
                <path d="M 330 45 L 380 40 L 395 70" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
                {/* Hinge Hotspots */}
                <circle cx="70" cy="45" r="6" fill="#F59E0B" />
                <circle cx="330" cy="45" r="6" fill="#10B981" />
              </svg>

              {/* Interactive Callout Badges */}
              <div className="absolute top-3 left-4 text-[10px] font-mono bg-slate-800/90 border border-slate-700 px-2 py-0.5 rounded text-amber-300">
                Left Hinge: 0.11 Nm (Retorquing Required)
              </div>
              <div className="absolute top-3 right-4 text-[10px] font-mono bg-slate-800/90 border border-slate-700 px-2 py-0.5 rounded text-teal-300">
                Prism Seal: 100% Hermetic Pass
              </div>
              <div className="absolute bottom-3 left-4 text-[10px] font-mono bg-slate-800/90 border border-slate-700 px-2 py-0.5 rounded text-sky-300">
                Silicone Pads: Replacement Queued
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span>Technician: Tan Lee Jia (5th-Yr BDS / Certified Optical Tech)</span>
              <span className="text-teal-400">Target Re-torque: 0.18 Nm ±0.01</span>
            </div>
          </div>

          {/* Filter segment */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl overflow-x-auto text-xs">
            {(['all', 'optics', 'hinges', 'seals', 'nosepads', 'frame'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveAreaFilter(tab)}
                className={`px-3 py-1.5 font-medium rounded-lg capitalize whitespace-nowrap transition-colors ${
                  activeAreaFilter === tab 
                    ? 'bg-white text-slate-900 shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Checklist table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100 text-xs">
            {filteredItems.map((item, idx) => (
              <div key={item.id} className="p-3.5 flex items-start gap-3 hover:bg-slate-50/70 transition-colors">
                <span className="font-mono text-slate-400 w-5 shrink-0 pt-0.5">{idx + 1}.</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-900">{item.label}</span>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded">
                      {item.area}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-0.5">{item.notes}</p>
                </div>
                <div>
                  {item.status === 'passed' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Pass
                    </span>
                  )}
                  {item.status === 'warning' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <AlertTriangle className="w-3 h-3" /> Scheduled Fix
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Clinician Digital Sign-off Section */}
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-200/80 space-y-3">
            <div className="flex items-center gap-2 text-teal-900 font-semibold text-sm">
              <FileCheck2 className="w-4 h-4 text-teal-700" />
              <span>Clinician Pre-Service Verification & Liability Acknowledgement</span>
            </div>
            <p className="text-xs text-teal-800 leading-relaxed">
              I acknowledge the initial intake condition logged above (including pre-existing micro-scratches and loosened left hinge tension). I authorize LoupeCare to proceed with isolated ultrasonic decontamination, silane nano-coating, and 0.18 Nm micro-torque calibration.
            </p>

            {hasSignedLocally ? (
              <div className="p-3 bg-white rounded-lg border border-teal-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <div className="text-xs">
                    <span className="font-semibold text-slate-800">Digitally Signed by: </span>
                    <span className="font-mono text-teal-800">{signatureName}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-500">
                  Verified · Timestamped
                </span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  placeholder="Enter Full Name as Electronic Signature"
                  className="w-full sm:flex-1 px-3 py-2 text-xs bg-white border border-teal-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
                <button
                  onClick={handleSign}
                  className="w-full sm:w-auto px-4 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shrink-0 shadow-xs"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Sign & Authorize Servicing</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500 font-mono">
            Optical Audit ID: #LC-INSP-2026-901
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
};
