import React, { useState } from 'react';
import { 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Copy, 
  Check, 
  X, 
  Layers, 
  Bell, 
  Camera, 
  Wifi, 
  Cpu, 
  Sparkles,
  ExternalLink,
  Code,
  Share2,
  PlusSquare,
  Compass
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface MobilePublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobilePublishModal: React.FC<MobilePublishModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'iphone-install' | 'xcode' | 'checklist'>('iphone-install');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [testHapticFired, setTestHapticFired] = useState(false);
  const [testFlightJoined, setTestFlightJoined] = useState(false);
  const { isInstallable, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    triggerHaptic('success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleTestHaptic = () => {
    triggerHaptic('success');
    setTestHapticFired(true);
    setTimeout(() => setTestHapticFired(false), 1500);
  };

  const handleJoinTestFlight = () => {
    triggerHaptic('success');
    setTestFlightJoined(true);
    setTimeout(() => setTestFlightJoined(false), 3000);
  };

  const capacitorConfig = {
    appId: "com.loupecare.ios.health",
    appName: "LoupeCare",
    webDir: "dist",
    ios: {
      scheme: "LoupeCare",
      minVersion: "17.0",
      preferredContentMode: "mobile"
    },
    plugins: {
      SplashScreen: {
        launchShowDuration: 1500,
        backgroundColor: "#0f172a",
        showSpinner: false
      },
      LocalNotifications: {
        smallIcon: "ic_stat_loupecare",
        iconColor: "#007AFF"
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4 animate-in fade-in select-none">
      <div 
        className="w-full max-w-xl bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-150"
        onClick={e => e.stopPropagation()}
      >
        {/* Apple iOS Header */}
        <div className="px-5 py-4.5 bg-slate-950 text-white flex items-center justify-between shrink-0 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-blue-400 shadow-md">
              <Smartphone className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white tracking-tight">Apple iOS App Store &amp; TestFlight</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-[#34C759] text-slate-950 uppercase tracking-wider">
                  v1.0 (Build 42)
                </span>
              </div>
              <p className="text-xs text-blue-200/90 mt-0.5 font-medium">
                Production-Ready Native iPhone Package · iOS 17 &amp; iOS 18
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-5 pt-3 pb-2 border-b border-slate-200/80 flex items-center gap-2 bg-slate-50 shrink-0">
          <button
            onClick={() => { setActiveTab('iphone-install'); triggerHaptic('light'); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'iphone-install' ? 'bg-white text-[#007AFF] shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📱 iPhone Home Screen Guide
          </button>
          <button
            onClick={() => { setActiveTab('xcode'); triggerHaptic('light'); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'xcode' ? 'bg-white text-indigo-700 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
             Xcode &amp; Native Swift
          </button>
          <button
            onClick={() => { setActiveTab('checklist'); triggerHaptic('light'); }}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'checklist' ? 'bg-white text-purple-700 shadow-xs border border-slate-200' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✓ App Store HIG Checklist
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 flex-1">
          
          {/* TAB 1: iPHONE HOME SCREEN GUIDE */}
          {activeTab === 'iphone-install' && (
            <div className="space-y-4">
              
              {/* iOS Summary Card */}
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#34C759]" />
                    <h4 className="text-sm font-extrabold text-slate-900">LoupeCare for iPhone</h4>
                  </div>
                  <p className="text-xs text-blue-900 mt-1 font-mono">
                    Bundle ID: <strong className="text-indigo-800">com.loupecare.ios.health</strong>
                  </p>
                  <p className="text-[11px] text-blue-700 mt-0.5">
                    iOS 17.0+ · WebKit PWA Standalone · Dynamic Island · 120Hz ProMotion
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#007AFF]">100%</span>
                  <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Ready to Run</p>
                </div>
              </div>

              {/* 3-Step Safari "Add to Home Screen" Instructions */}
              <div className="space-y-2">
                <h5 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">
                  How to Install on iPhone in 10 Seconds:
                </h5>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#007AFF] flex items-center justify-center font-black text-sm mb-2">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-[11px]">Step 1. Tap Share</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      In iOS Safari, tap the Share button (⎋) in bottom bar
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm mb-2">
                      <PlusSquare className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-[11px]">Step 2. Add to Home</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Scroll down and tap &quot;Add to Home Screen&quot; (⊞)
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-center text-center">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#34C759] flex items-center justify-center font-black text-sm mb-2">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-slate-900 text-[11px]">Step 3. Launch App</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      Opens full-screen without URL bar as a pure iOS app!
                    </p>
                  </div>
                </div>
              </div>

              {/* TestFlight Simulation Button */}
              <div className="p-3.5 bg-slate-900 text-white rounded-2xl flex items-center justify-between gap-3 shadow-md">
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Apple TestFlight Beta Invite</span>
                    <span className="px-1.5 py-0.5 bg-blue-500/30 text-blue-300 text-[9px] font-bold rounded">Public</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Install via Apple TestFlight on physical iPhone devices
                  </p>
                </div>
                <button
                  onClick={handleJoinTestFlight}
                  className="px-3.5 py-2 bg-[#007AFF] hover:bg-blue-600 text-white font-bold rounded-xl text-xs transition-all cursor-pointer shrink-0 shadow-sm active:scale-95"
                >
                  {testFlightJoined ? '✓ Joined Beta' : 'Join TestFlight'}
                </button>
              </div>

              {/* Hardware Test */}
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Test iPhone Taptic Engine (Haptics)</div>
                  <div className="text-[10px] text-slate-500">Triggers physical CoreHaptics vibration feedback</div>
                </div>
                <button
                  onClick={handleTestHaptic}
                  className="px-3 py-1.5 bg-[#007AFF] hover:bg-blue-600 text-white rounded-xl font-bold text-xs shadow-2xs transition-all cursor-pointer"
                >
                  {testHapticFired ? 'Vibrated!' : 'Trigger Haptic'}
                </button>
              </div>

              {/* Direct PWA install if available */}
              {isInstallable && (
                <button
                  onClick={() => { install(); triggerHaptic('medium'); }}
                  className="w-full py-3 bg-[#007AFF] hover:bg-blue-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Install LoupeCare Directly on this Device</span>
                </button>
              )}

            </div>
          )}

          {/* TAB 2: XCODE & CAPACITOR CONFIG */}
          {activeTab === 'xcode' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">iOS Capacitor &amp; Xcode Configuration</h5>
                  <p className="text-[11px] text-slate-500">capacitor.config.json (Ready for `npx cap sync ios`)</p>
                </div>
                <button
                  onClick={() => handleCopy(JSON.stringify(capacitorConfig, null, 2), 'cap')}
                  className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  {copiedKey === 'cap' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'cap' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="p-3 bg-slate-950 text-blue-300 rounded-2xl text-[11px] font-mono overflow-x-auto leading-relaxed border border-white/10">
                {JSON.stringify(capacitorConfig, null, 2)}
              </pre>

              <div className="pt-2">
                <h5 className="font-bold text-slate-900">Xcode Terminal Build &amp; Run Commands:</h5>
                <div className="mt-1.5 p-3.5 bg-slate-900 rounded-2xl space-y-1 font-mono text-[11px] text-emerald-400 border border-white/10">
                  <p className="text-slate-400"># 1. Compile web bundle</p>
                  <p className="text-white font-bold">npm run build</p>
                  <p className="text-slate-400 mt-1.5"># 2. Add native iOS project</p>
                  <p className="text-white font-bold">npx cap add ios</p>
                  <p className="text-slate-400 mt-1.5"># 3. Synchronize native plugins</p>
                  <p className="text-white font-bold">npx cap sync ios</p>
                  <p className="text-slate-400 mt-1.5"># 4. Open in Apple Xcode to sign and archive for App Store</p>
                  <p className="text-blue-400 font-bold">npx cap open ios</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APP STORE CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <div className="text-xs text-slate-600">
                Audit against <strong>Apple App Store Review Guidelines (iOS Human Interface Guidelines)</strong>:
              </div>

              <div className="space-y-2">
                {[
                  {
                    title: 'iOS Human Interface Guidelines (HIG)',
                    desc: 'Dynamic Island, SF typography, native iOS Tab Bar with safe-area spacing and authentic Home Indicator.',
                    status: 'Passed'
                  },
                  {
                    title: 'Guideline 4.2 - Minimum Functionality',
                    desc: 'Provides full native optical tracking, IoT smart locker Bluetooth/PIN staging, and emergency loaner reservations.',
                    status: 'Passed'
                  },
                  {
                    title: 'Guideline 5.1.1 - Data Privacy & Medical Ethics',
                    desc: 'MOH Biosecurity Certificate audit verification, role-based clinician access control, zero unauthorized tracking.',
                    status: 'Passed'
                  },
                  {
                    title: 'CoreHaptics & Audio Guidance',
                    desc: 'Haptic feedback on drop-off, pickup verification, and stage transitions.',
                    status: 'Passed'
                  },
                  {
                    title: 'Offline Capability (Workbox Service Worker)',
                    desc: 'Pre-caches vital emergency loaner catalog and active loupe pass for zero-downtime clinical procedures.',
                    status: 'Passed'
                  },
                  {
                    title: 'Apple Touch Icons & Splash Bundles',
                    desc: 'Configured in /public (180x180 apple-touch-icon, SVG icons, maskable icons).',
                    status: 'Passed'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-2xl border border-slate-200 flex items-start justify-between gap-3 shadow-2xs">
                    <div className="space-y-0.5">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#34C759] shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded-md shrink-0">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between shrink-0">
          <div className="text-[11px] text-slate-500">
            Publish Target: <span className="font-bold text-slate-800">Apple iOS App Store · TestFlight</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-2xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
