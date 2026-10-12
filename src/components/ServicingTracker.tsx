import React, { useState } from 'react';
import { Role, ServiceStage, ServiceStageId } from '../types';
import { 
  CheckCircle2, 
  Clock, 
  RotateCw, 
  RotateCcw, 
  Camera, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';

interface ServicingTrackerProps {
  stages: ServiceStage[];
  role: Role;
  onAdvanceStage: (stageId: ServiceStageId) => void;
  onOpenInspectionModal: () => void;
  onCompleteAllStages?: () => void;
  onResetStages?: () => void;
}

export const ServicingTracker: React.FC<ServicingTrackerProps> = ({
  stages,
  role,
  onAdvanceStage,
  onOpenInspectionModal,
  onResetStages,
}) => {
  const [selectedStageId, setSelectedStageId] = useState<ServiceStageId>(3);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  const activeDetailStage = stages.find(s => s.id === selectedStageId) || stages[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden transition-all">
      
      {/* Clean Solid Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>4-Stage Servicing Tracker</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
            Active Job #LC-JOB-882 · Clean-Room Optical Lab
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            <span>In Servicing</span>
          </span>
          {onResetStages && role === 'admin' && (
            <button
              onClick={() => {
                onResetStages();
                setSelectedStageId(1);
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Reset Stages (Admin)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 4 Distinct Step Pills - Aligned 4-Column Grid on Tablet, 2-Column on Mobile */}
      <div className="p-3.5 sm:p-4 border-b border-slate-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stages.map((stage) => {
            const isCompleted = stage.status === 'completed';
            const isCurrent = stage.status === 'current';
            const isSelected = selectedStageId === stage.id;

            // Distinct solid theme per stage
            const stageThemes = {
              1: {
                name: 'Intake',
                subtitle: 'Scan',
                activeBorder: 'ring-2 ring-blue-500 border-blue-400 bg-blue-50 text-blue-950',
                badgeBg: 'text-blue-600'
              },
              2: {
                name: 'Ultrasonic',
                subtitle: 'Clean',
                activeBorder: 'ring-2 ring-purple-500 border-purple-400 bg-purple-50 text-purple-950',
                badgeBg: 'text-purple-600'
              },
              3: {
                name: 'Nano-Coat',
                subtitle: 'Bond',
                activeBorder: 'ring-2 ring-amber-500 border-amber-400 bg-amber-50 text-amber-950',
                badgeBg: 'text-amber-600'
              },
              4: {
                name: 'Calibrate',
                subtitle: 'Return',
                activeBorder: 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50 text-emerald-950',
                badgeBg: 'text-emerald-600'
              }
            };

            const theme = stageThemes[stage.id as 1 | 2 | 3 | 4] || stageThemes[1];

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`h-[70px] flex flex-col justify-between p-2.5 rounded-2xl border text-left transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                  isSelected
                    ? theme.activeBorder
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-slate-900' : 'text-slate-400'}`}>
                    0{stage.id}
                  </span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isCurrent && <RotateCw className={`w-3.5 h-3.5 animate-spin ${theme.badgeBg}`} />}
                  {stage.status === 'pending' && <Clock className="w-3.5 h-3.5 text-slate-300" />}
                </div>
                <div>
                  <div className={`text-xs font-black leading-tight ${isSelected ? 'text-slate-900' : 'text-slate-600'}`}>
                    {theme.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">
                    {theme.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Clean Summary */}
      <div className="p-4 bg-slate-50">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[10px] font-bold">
                Stage {activeDetailStage.id}
              </span>
              <h4 className="text-sm font-black text-slate-900 truncate">
                {activeDetailStage.title}
              </h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
              {activeDetailStage.subtitle}
            </p>
          </div>

          <button
            onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
            className="px-3 py-1.5 text-[11px] font-bold text-slate-700 bg-white border border-slate-200 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-xs hover:bg-slate-50 shrink-0"
          >
            <SlidersHorizontal className="w-3 h-3 text-blue-600" />
            <span className="hidden sm:inline">{showTechnicalDetails ? 'Hide' : 'Specs'}</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {activeDetailStage.id === 1 && (
            <button
              onClick={onOpenInspectionModal}
              className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Macro Photos</span>
            </button>
          )}

          {activeDetailStage.status === 'current' && (
            <button
              onClick={() => onAdvanceStage(activeDetailStage.id)}
              className="flex-1 px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Complete Stage {activeDetailStage.id}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Collapsible Technical Matrix */}
        {showTechnicalDetails && (
          <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
            {activeDetailStage.parameters.slice(0, 4).map((p, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wide">{p.label}</span>
                <span className="text-[11px] font-black text-slate-900 text-right">{p.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
