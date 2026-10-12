import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { triggerHaptic } from '../utils/haptics';
import { Download, Share2, PlusSquare, CheckCircle2, X, Smartphone, ArrowDown } from 'lucide-react';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'full' | 'pill';
  onOpenPublishModal?: () => void;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ 
  variant = 'compact',
  onOpenPublishModal 
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  const handleInstallClick = async () => {
    triggerHaptic('medium');
    if (isInstallable) {
      const outcome = await install();
      if (outcome) {
        setInstallSuccess(true);
        triggerHaptic('success');
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else if (onOpenPublishModal) {
      onOpenPublishModal();
    } else {
      setShowIOSGuide(true);
    }
  };

  if (isInstalled && !onOpenPublishModal) {
    return (
      <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        <span>Installed App</span>
      </div>
    );
  }

  return (
    <>
      {variant === 'pill' ? (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-bold shadow-2xs transition-all cursor-pointer active:scale-95"
          title="Install LoupeCare Mobile App"
        >
          <Download className="w-3 h-3" />
          <span>Install App</span>
        </button>
      ) : variant === 'full' ? (
        <button
          onClick={handleInstallClick}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-xs transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2.5 text-left">
            <div className="w-9 h-9 rounded-lg bg-white/20 flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Install Mobile App</div>
              <div className="text-[10px] text-teal-100 mt-0.5">Add to Home Screen for native offline access</div>
            </div>
          </div>
          <div className="px-2.5 py-1 bg-white text-teal-800 rounded-lg text-xs font-bold shadow-2xs">
            {isInstalled ? 'Installed' : 'Install'}
          </div>
        </button>
      ) : (
        <button
          onClick={handleInstallClick}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-[10px] font-semibold transition-colors cursor-pointer"
          title="Install to Mobile Home Screen"
        >
          <Download className="w-3 h-3 text-teal-600" />
          <span>Install</span>
        </button>
      )}

      {/* iOS Safari Guided Install Sheet */}
      {showIOSGuide && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setShowIOSGuide(false)}
        >
          <div 
            className="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl border border-slate-200 animate-in slide-in-from-bottom-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Install LoupeCare App</h3>
                  <p className="text-[11px] text-slate-500">iOS Safari / Web App</p>
                </div>
              </div>
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Tap the Share icon</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    Located in Safari bottom toolbar: <Share2 className="w-3.5 h-3.5 text-blue-600 inline" />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Select "Add to Home Screen"</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                    Scroll down action list: <PlusSquare className="w-3.5 h-3.5 text-slate-700 inline" />
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Tap "Add" in top right corner</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    LoupeCare launches like a native iOS app with full screen &amp; offline support!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success notification */}
      {installSuccess && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>LoupeCare installed to Home Screen!</span>
        </div>
      )}
    </>
  );
};
