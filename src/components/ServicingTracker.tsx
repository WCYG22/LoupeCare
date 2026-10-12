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
                name: 'Intake Scan',
                activeBorder: 'ring-2 ring-blue-500 border-blue-400 bg-blue-50 text-blue-950',
                badgeBg: 'text-blue-600'
              },
              2: {
                name: 'Ultrasonic Decon',
                activeBorder: 'ring-2 ring-purple-500 border-purple-400 bg-purple-50 text-purple-950',
                badgeBg: 'text-purple-600'
              },
              3: {
                name: 'Nano-Bonding',
                activeBorder: 'ring-2 ring-amber-500 border-amber-400 bg-amber-50 text-amber-950',
                badgeBg: 'text-amber-600'
              },
              4: {
                name: 'Torque Return',
                activeBorder: 'ring-2 ring-emerald-500 border-emerald-400 bg-emerald-50 text-emerald-950',
                badgeBg: 'text-emerald-600'
              }
            };

            const theme = stageThemes[stage.id as 1 | 2 | 3 | 4] || stageThemes[1];

            return (
              <button
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`h-[68px] flex flex-col justify-between p-2.5 sm:p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                  isSelected
                    ? theme.activeBorder
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                  <span className={isSelected ? 'text-slate-900 font-black' : 'text-slate-400'}>0{stage.id}</span>
                  {isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  {isCurrent && <RotateCw className={`w-3.5 h-3.5 animate-spin ${theme.badgeBg}`} />}
                  {stage.status === 'pending' && <Clock className="w-3.5 h-3.5 text-slate-300" />}
                </div>
                <div className="text-xs font-black leading-tight truncate">
                  {theme.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Clean Summary */}
      <div className="p-4 sm:p-5 bg-slate-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-black text-slate-900 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[10px]">
                Stage 0{activeDetailStage.id}
              </span>
              <span>{activeDetailStage.title}</span>
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-xl leading-relaxed">
              {activeDetailStage.description}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeDetailStage.id === 1 && (
              <button
                onClick={onOpenInspectionModal}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Macro Photos</span>
              </button>
            )}

            <button
              onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
              className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-all cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
              <span>{showTechnicalDetails ? 'Hide Specs' : 'Tech Specs'}</span>
            </button>
          </div>
        </div>

        {/* Advance Stage Button (if stage is current) */}
        {activeDetailStage.status === 'current' && (
          <button
            onClick={() => onAdvanceStage(activeDetailStage.id)}
            className="w-full mt-3.5 h-12 bg-[#007AFF] hover:bg-blue-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Complete Stage 0{activeDetailStage.id} &amp; Advance ➔</span>
          </button>
        )}

        {/* Collapsible Technical Matrix */}
        {showTechnicalDetails && (
          <div className="mt-3.5 pt-3.5 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            {activeDetailStage.parameters.map((p, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
                <span className="text-blue-600 block text-[10px] font-bold uppercase tracking-wider">{p.label}</span>
                <span className="font-extrabold text-slate-900 mt-0.5 block truncate">{p.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
