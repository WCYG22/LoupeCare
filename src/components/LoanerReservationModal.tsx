import React, { useState } from 'react';
import { MOCK_LOANER_FLEET } from '../data/mockData';
import { LoanerLoupe } from '../types';
import { 
  X, 
  Glasses, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Filter,
  Sparkles
} from 'lucide-react';

interface LoanerReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReserveSuccess: (loupe: LoanerLoupe, pupillaryDist: string) => void;
}

export const LoanerReservationModal: React.FC<LoanerReservationModalProps> = ({
  isOpen,
  onClose,
  onReserveSuccess,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMag, setSelectedMag] = useState<'all' | '2.5x' | '3.0x' | '3.5x'>('all');
  const [selectedWd, setSelectedWd] = useState<'all' | '350mm' | '420mm' | '480mm'>('all');
  const [selectedPd, setSelectedPd] = useState('62mm');
  const [reservedItem, setReservedItem] = useState<LoanerLoupe | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  if (!isOpen) return null;

  const filteredFleet = MOCK_LOANER_FLEET.filter((item) => {
    if (selectedMag !== 'all' && item.magnification !== selectedMag) return false;
    if (selectedWd !== 'all' && item.workingDistance !== selectedWd) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match = item.model.toLowerCase().includes(q) || item.availableLocation.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleInstantReserve = (item: LoanerLoupe) => {
    setReservedItem(item);
    setIsConfirmed(true);
    onReserveSuccess(item, selectedPd);
  };

  const handleReset = () => {
    setIsConfirmed(false);
    setReservedItem(null);
    setSearchQuery('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[30px] sm:rounded-2xl max-w-2xl w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center">
              <Glasses className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">Emergency Clinical Loaner Fleet</h3>
                <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                  Zero-Quota-Downtime
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Reserve standardized backup surgical loupes while your personal pair is serviced
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {isConfirmed && reservedItem ? (
            /* Confirmation Receipt State */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Emergency Loaner Reserved!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                  Your backup surgical loupes are staged for immediate contactless pickup. Continue clinical sessions and meet patient quotas without delay.
                </p>
              </div>

              {/* Loaner Pass Details */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs max-w-md mx-auto space-y-2 font-mono">
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Loaner Model:</span>
                  <span className="font-semibold text-slate-900 font-sans">{reservedItem.model}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Optics:</span>
                  <span className="font-semibold text-teal-700">{reservedItem.magnification} {reservedItem.type}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Working Distance:</span>
                  <span className="font-semibold text-slate-800">{reservedItem.workingDistance}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 pb-1.5">
                  <span className="text-slate-500">Pupillary Distance:</span>
                  <span className="font-semibold text-slate-800">{selectedPd} (Pre-set)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Staged At:</span>
                  <span className="font-semibold text-slate-800 font-sans truncate max-w-[200px]">{reservedItem.availableLocation}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-teal-700">
                <Zap className="w-4 h-4" />
                <span>Pickup Token generated: Enter OTP at Smart Locker #02 to unlock</span>
              </div>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold"
              >
                Done
              </button>
            </div>
          ) : (
            /* Fleet Selection State */
            <>
              {/* Search & Quick Preset Bar */}
              <div className="space-y-2.5">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by brand model or campus location (e.g. ExamVision, IMU, Zeiss)..."
                    className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                  <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Quick Preset Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] pb-1">
                  <span className="text-slate-400 shrink-0 font-medium">Quick Presets:</span>
                  <button
                    onClick={() => { setSelectedMag('2.5x'); setSelectedWd('420mm'); setSearchQuery(''); }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 rounded-lg shrink-0 border border-slate-200 transition-colors"
                  >
                    Year 4 BDS (2.5x Standard)
                  </button>
                  <button
                    onClick={() => { setSelectedMag('3.0x'); setSelectedWd('350mm'); setSearchQuery(''); }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 rounded-lg shrink-0 border border-slate-200 transition-colors"
                  >
                    Crown &amp; Bridge (3.0x)
                  </button>
                  <button
                    onClick={() => { setSelectedMag('3.5x'); setSelectedWd('all'); setSearchQuery(''); }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 rounded-lg shrink-0 border border-slate-200 transition-colors"
                  >
                    Endodontics (3.5x Prismatic)
                  </button>
                  <button
                    onClick={() => { setSelectedMag('all'); setSelectedWd('all'); setSearchQuery(''); }}
                    className="px-2 py-1 text-slate-400 hover:text-slate-700 shrink-0"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Filter Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                
                {/* Mag Filter */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Magnification:
                  </label>
                  <select
                    value={selectedMag}
                    onChange={(e) => setSelectedMag(e.target.value as any)}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="all">All Magnifications</option>
                    <option value="2.5x">2.5x (General Operative)</option>
                    <option value="3.0x">3.0x (Crown & Bridge)</option>
                    <option value="3.5x">3.5x (Endo / Perio Microsurgery)</option>
                  </select>
                </div>

                {/* Working Distance */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Working Distance:
                  </label>
                  <select
                    value={selectedWd}
                    onChange={(e) => setSelectedWd(e.target.value as any)}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="all">All Distances</option>
                    <option value="350mm">350mm (Short Stature)</option>
                    <option value="420mm">420mm (Standard Clinical)</option>
                    <option value="480mm">480mm (Tall Ergonomic)</option>
                  </select>
                </div>

                {/* Pupillary Distance */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Pupillary Distance (PD):
                  </label>
                  <select
                    value={selectedPd}
                    onChange={(e) => setSelectedPd(e.target.value)}
                    className="w-full text-xs p-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option value="58mm">58 mm</option>
                    <option value="60mm">60 mm</option>
                    <option value="62mm">62 mm (Standard)</option>
                    <option value="64mm">64 mm</option>
                    <option value="66mm">66 mm</option>
                  </select>
                </div>

              </div>

              {/* Available Loupe Cards */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Available Loaner Units ({filteredFleet.length})</span>
                  <span>Sanitized & Heat-Cured Anti-Fog Ready</span>
                </div>

                {filteredFleet.length === 0 ? (
                  <div className="text-center py-8 text-xs text-slate-500">
                    No loaner units match your exact filter combination. Try resetting filters.
                  </div>
                ) : (
                  filteredFleet.map((loupe) => (
                    <div
                      key={loupe.id}
                      className="p-4 rounded-xl border border-slate-200 hover:border-teal-500/80 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{loupe.model}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-semibold border border-teal-200">
                            {loupe.magnification} · {loupe.type}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span>WD: {loupe.workingDistance}</span>
                          <span>·</span>
                          <span>Weight: {loupe.weight}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <MapPin className="w-3 h-3 text-teal-600" />
                            <span className="truncate max-w-[200px]">{loupe.availableLocation}</span>
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        {loupe.isAvailable ? (
                          <button
                            onClick={() => handleInstantReserve(loupe)}
                            className="w-full sm:w-auto px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Instant Reserve</span>
                          </button>
                        ) : (
                          <button
                            disabled
                            className="w-full sm:w-auto px-4 py-2 bg-slate-100 text-slate-400 rounded-lg text-xs font-semibold cursor-not-allowed"
                          >
                            Checked Out
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>MOH Sanitized between every loan cycle</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 rounded-lg hover:bg-slate-200/60"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
