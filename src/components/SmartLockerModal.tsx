import React, { useState, useEffect } from 'react';
import { CampusLocation } from '../types';
import { CAMPUS_LOCATIONS } from '../data/mockData';
import { 
  X, 
  MapPin, 
  Lock, 
  Unlock, 
  QrCode, 
  CheckCircle2, 
  RefreshCw, 
  Smartphone, 
  AlertCircle, 
  KeyRound, 
  Sparkles,
  PackageCheck
} from 'lucide-react';

interface SmartLockerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemDeposited: (location: CampusLocation, lockerId: string) => void;
  mode?: 'dropoff' | 'pickup';
  onItemRetrieved?: () => void;
}

export const SmartLockerModal: React.FC<SmartLockerModalProps> = ({
  isOpen,
  onClose,
  onItemDeposited,
  mode = 'dropoff',
  onItemRetrieved,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(mode === 'pickup' ? 3 : 1);
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation>(CAMPUS_LOCATIONS[0]);
  const [assignedLocker] = useState('Locker #04 (Level 3 Dental Lounge)');
  const [backupPin, setBackupPin] = useState('849-201');
  const [qrCounter, setQrCounter] = useState(45);
  const [isLockerOpen, setIsLockerOpen] = useState(false);
  const [isPickupDone, setIsPickupDone] = useState(false);

  // Sync step if mode is pickup
  useEffect(() => {
    if (mode === 'pickup') {
      setStep(3);
    } else {
      setStep(1);
    }
  }, [mode, isOpen]);

  // Dynamic QR code timer countdown
  useEffect(() => {
    if (!isOpen || step !== 3) return;
    const interval = setInterval(() => {
      setQrCounter((prev) => {
        if (prev <= 1) {
          const p1 = Math.floor(100 + Math.random() * 900);
          const p2 = Math.floor(100 + Math.random() * 900);
          setBackupPin(`${p1}-${p2}`);
          return 45;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, step]);

  if (!isOpen) return null;

  const handleSimulateDoor = () => {
    setIsLockerOpen(true);
    setTimeout(() => {
      setIsLockerOpen(false);
      setStep(4);
      if (mode === 'pickup') {
        setIsPickupDone(true);
        if (onItemRetrieved) onItemRetrieved();
      } else {
        onItemDeposited(selectedLocation, 'Locker #04');
      }
    }, 700);
  };

  const handleInstantAction = () => {
    setIsLockerOpen(false);
    setStep(4);
    if (mode === 'pickup') {
      setIsPickupDone(true);
      if (onItemRetrieved) onItemRetrieved();
    } else {
      onItemDeposited(selectedLocation, 'Locker #04');
    }
  };

  const handleReset = () => {
    setStep(1);
    setIsLockerOpen(false);
    setIsPickupDone(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[30px] sm:rounded-2xl max-w-lg w-full max-h-[92vh] sm:max-h-[85vh] shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Mobile Grab Handle */}
        <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mt-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-lg text-white flex items-center justify-center ${
              mode === 'pickup' ? 'bg-emerald-600' : 'bg-teal-600'
            }`}>
              {mode === 'pickup' ? <PackageCheck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {mode === 'pickup' ? 'Contactless Smart Locker Pickup' : 'Contactless Smart Locker Drop-off'}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">IoT Autonomous Campus Terminal</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper indicator (Only for dropoff) */}
        {mode === 'dropoff' && (
          <div className="px-6 pt-4 pb-2">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
              <span className={step >= 1 ? 'text-teal-700 font-bold' : ''}>1. Select Location</span>
              <span className="text-slate-300">→</span>
              <span className={step >= 2 ? 'text-teal-700 font-bold' : ''}>2. Compartment</span>
              <span className="text-slate-300">→</span>
              <span className={step >= 3 ? 'text-teal-700 font-bold' : ''}>3. Scan & Drop</span>
            </div>
          </div>
        )}

        {/* Step Body */}
        <div className="p-6">
          
          {/* STEP 1: Select Location (Dropoff only) */}
          {mode === 'dropoff' && step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Select University Dental Campus or Clinic Locker Bank:
                </label>
                <div className="space-y-2.5">
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <label
                      key={loc}
                      onClick={() => setSelectedLocation(loc)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        selectedLocation === loc
                          ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600/30'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <input
                        type="radio"
                        name="campus_location"
                        checked={selectedLocation === loc}
                        onChange={() => setSelectedLocation(loc)}
                        className="mt-0.5 text-teal-600 focus:ring-teal-500"
                      />
                      <div className="text-xs">
                        <div className="font-semibold text-slate-900">{loc}</div>
                        <div className="text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-teal-600" />
                          <span>8 of 12 Lockers Available · 24/7 Access</span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-semibold text-sm transition-colors mt-2 cursor-pointer"
              >
                Confirm Location & Assign Compartment
              </button>
            </div>
          )}

          {/* STEP 2: Compartment Assignment (Dropoff only) */}
          {mode === 'dropoff' && step === 2 && (
            <div className="space-y-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center mx-auto shadow-xs">
                <Lock className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Compartment Reserved!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Assigned at <span className="font-semibold text-slate-700">{selectedLocation}</span>
                </p>
                <div className="inline-block mt-3 px-4 py-2 bg-slate-900 text-white rounded-xl font-mono text-base font-bold tracking-wide">
                  {assignedLocker}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-left text-xs text-amber-900 space-y-1">
                <div className="font-semibold flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Drop-off Instructions:</span>
                </div>
                <p className="text-amber-800 pl-5">
                  1. Place your loupes securely inside the provided LoupeCare protective microfiber padded pouch.
                </p>
                <p className="text-amber-800 pl-5">
                  2. Include headlamp cable if wire testing is required.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="w-2/3 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
                >
                  Generate Dynamic QR & Unlock Key
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Scan QR & Unlock (Both dropoff and pickup) */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-xs text-slate-600">
                  {mode === 'pickup' 
                    ? 'Your loupe is serviced & ready in Locker #04! Scan below or enter OTP to retrieve:' 
                    : 'Scan this encrypted QR code at the terminal scanner or enter the one-time PIN:'}
                </p>
              </div>

              {/* Dynamic QR Box */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center relative max-w-[260px] mx-auto">
                <div className="w-44 h-44 mx-auto bg-white p-3 rounded-xl border border-slate-300/80 shadow-xs flex flex-col items-center justify-center relative">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                    <rect x="5" y="5" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4"/>
                    <rect x="12" y="12" width="12" height="12" fill="currentColor"/>
                    <rect x="69" y="5" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4"/>
                    <rect x="76" y="12" width="12" height="12" fill="currentColor"/>
                    <rect x="5" y="69" width="26" height="26" rx="2" fill="none" stroke="currentColor" strokeWidth="4"/>
                    <rect x="12" y="76" width="12" height="12" fill="currentColor"/>
                    <rect x="36" y="8" width="6" height="6"/>
                    <rect x="46" y="14" width="8" height="6"/>
                    <rect x="38" y="24" width="6" height="12"/>
                    <rect x="48" y="24" width="12" height="6"/>
                    <rect x="8" y="38" width="6" height="12"/>
                    <rect x="18" y="44" width="12" height="6"/>
                    <rect x="36" y="36" width="8" height="8"/>
                    <rect x="48" y="40" width="14" height="6"/>
                    <rect x="66" y="36" width="6" height="14"/>
                    <rect x="78" y="36" width="12" height="6"/>
                    <rect x="84" y="46" width="6" height="12"/>
                    <rect x="36" y="52" width="12" height="6"/>
                    <rect x="54" y="52" width="6" height="14"/>
                    <rect x="42" y="66" width="18" height="6"/>
                    <rect x="68" y="68" width="8" height="8"/>
                    <rect x="80" y="68" width="12" height="6"/>
                    <rect x="74" y="80" width="14" height="10"/>
                    <rect x="42" y="80" width="8" height="12"/>
                    <rect x="54" y="84" width="10" height="6"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-9 h-9 rounded-lg text-white flex items-center justify-center shadow-md ${
                      mode === 'pickup' ? 'bg-emerald-600' : 'bg-teal-600'
                    }`}>
                      {mode === 'pickup' ? <PackageCheck className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* QR Timer */}
                <div className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-mono text-slate-500">
                  <RefreshCw className="w-3 h-3 animate-spin text-teal-600" />
                  <span>Encrypted OTP refreshes in <strong className="text-teal-700">{qrCounter}s</strong></span>
                </div>
              </div>

              {/* Backup PIN */}
              <div className="flex items-center justify-between p-3 bg-slate-100 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-slate-500" />
                  <span className="text-xs text-slate-600">6-Digit Backup Terminal PIN:</span>
                </div>
                <span className="font-mono font-bold text-sm tracking-wider text-slate-900 bg-white px-3 py-1 rounded-md border border-slate-200">
                  {backupPin}
                </span>
              </div>

              {/* Simulated Door Buttons */}
              <div className="pt-1 space-y-2">
                <button
                  onClick={handleSimulateDoor}
                  disabled={isLockerOpen}
                  className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    isLockerOpen
                      ? 'bg-amber-500 text-white animate-pulse'
                      : mode === 'pickup'
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                      : 'bg-teal-700 hover:bg-teal-800 text-white shadow-md'
                  }`}
                >
                  {isLockerOpen ? (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Solenoid Unlatched... Locker Compartment Open</span>
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>{mode === 'pickup' ? 'Simulate Unlatch & Retrieve Loupe' : 'Simulate Locker Door Solenoid Unlatch'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleInstantAction}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                  <span>{mode === 'pickup' ? 'Instant Retrieve (Fast Prototype)' : 'Instant Deposit (Fast Prototype Pass)'}</span>
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  Simulates Bluetooth Low Energy (BLE) / MQTT locker trigger
                </p>
              </div>

            </div>
          )}

          {/* STEP 4: Success Deposit Confirmation / Pickup Confirmation */}
          {step === 4 && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  {mode === 'pickup' ? 'Loupe Successfully Retrieved!' : 'Item Received at Locker!'}
                </h4>
                <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                  {mode === 'pickup' 
                    ? 'Your surgical loupe is now restored with anti-fog nano-shield, calibrated torque (0.18 Nm), fresh silicone nose pads, and certified sterile packaging.'
                    : 'Solenoid lock engaged. Optical intake telemetry initiated. Our certified technician will retrieve your loupe for 4-Stage Servicing.'}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left font-mono space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Locker:</span>
                  <span className="font-semibold text-slate-800">Compartment #04</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-semibold text-slate-800 truncate max-w-[200px]">{selectedLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{mode === 'pickup' ? 'Status:' : 'Estimated Turnaround:'}</span>
                  <span className="font-semibold text-teal-700">
                    {mode === 'pickup' ? 'Ready for Chairside Procedures' : 'Today by 15:30 PM (Express)'}
                  </span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
              >
                {mode === 'pickup' ? 'Return to Dashboard' : 'Return to Live Servicing Tracker'}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
