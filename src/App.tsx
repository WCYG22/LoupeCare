import React, { useState } from 'react';
import { 
  CampusLocation, 
  LoanerLoupe, 
  RegisteredLoupe, 
  Role, 
  ServiceStage, 
  ServiceStageId, 
  SubscriptionTier,
  InAppNotification
} from './types';
import { 
  INITIAL_STUDENT_LOUPE, 
  INITIAL_CLINICIAN_LOUPE, 
  INITIAL_SERVICE_STAGES, 
  MOCK_USERS,
  MOCK_LOANER_FLEET,
  SUBSCRIPTION_TIERS
} from './data/mockData';
import { AssetOverview } from './components/AssetOverview';
import { ServicingTracker } from './components/ServicingTracker';
import { SmartLockerModal } from './components/SmartLockerModal';
import { TenPointInspectionModal } from './components/TenPointInspectionModal';
import { LoanerReservationModal } from './components/LoanerReservationModal';
import { MohCertificateModal } from './components/MohCertificateModal';
import { SubscriptionCheckoutModal } from './components/SubscriptionCheckoutModal';
import { TrackASpecDrawer } from './components/TrackASpecDrawer';
import { HelpModal } from './components/HelpModal';
import { PushNotificationBanner } from './components/PushNotificationBanner';
import { NotificationCenterModal } from './components/NotificationCenterModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LoadingScreen } from './components/LoadingScreen';
import { UserProfileView } from './components/UserProfileView';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobilePublishModal } from './components/MobilePublishModal';
import { IPhoneFrame } from './components/IPhoneFrame';
import { IOSNavigationBar } from './components/IOSNavigationBar';
import { IOSAssistiveTouch } from './components/IOSAssistiveTouch';

import { 
  Glasses, 
  RotateCw, 
  RotateCcw,
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  Lock, 
  MapPin, 
  Zap, 
  BookOpen,
  Printer,
  Sparkles,
  Smartphone,
  Monitor,
  HelpCircle,
  Bell,
  User,
  Maximize2,
  Minimize2,
  Download
} from 'lucide-react';

const INITIAL_NOTIFICATIONS: InAppNotification[] = [
  {
    id: 'notif-1',
    type: 'stage_complete',
    title: 'Stage 2 Completed: Ultrasonic Decontamination',
    message: 'Isolated enzymatic cavitation completed (40 kHz, pH 7.2). Prism seals inspected 100% intact.',
    timestamp: '10m ago',
    isRead: false,
    actionLabel: 'View Tracker',
    actionTab: 'tracker',
  },
  {
    id: 'notif-2',
    type: 'loaner_ready',
    title: 'Emergency Loaner Loupe Ready for Pickup',
    message: 'ExamVision Galilean 2.5x (420mm) staged in Locker #02 at IMU Dental Lounge. Use PIN 849-201 to unlock.',
    timestamp: '25m ago',
    isRead: false,
    actionLabel: 'View Backup Fleet',
    actionTab: 'loaners',
  },
  {
    id: 'notif-3',
    type: 'inspection_ready',
    title: '10-Point Pre-Inspection Logged',
    message: 'Intake macro optical photos archived. Left hinge tension drift (0.11 Nm) flagged for torque restoration.',
    timestamp: '1h ago',
    isRead: true,
    actionLabel: 'Review Inspection',
    actionType: 'inspection',
  },
];

export default function App() {
  // Global App States - Mobile App first by default
  const [currentRole, setCurrentRole] = useState<Role>('student');
  // Auto-detect mobile device and set frame mode accordingly
  const [isMobileFrame, setIsMobileFrame] = useState(() => {
    // If on actual mobile device, disable frame
    if (typeof window !== 'undefined') {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isSmallScreen = window.innerWidth < 640;
      return !isMobile && !isSmallScreen; // Only show frame on desktop
    }
    return true;
  });
  const [activeTab, setActiveTab] = useState<'loupe' | 'tracker' | 'loaners' | 'profile'>('loupe');
  const [isLoading, setIsLoading] = useState(true);

  // Loupe Asset state depending on role
  const [studentLoupe, setStudentLoupe] = useState<RegisteredLoupe>(INITIAL_STUDENT_LOUPE);
  const [clinicianLoupe, setClinicianLoupe] = useState<RegisteredLoupe>(INITIAL_CLINICIAN_LOUPE);

  // Servicing Stages state
  const [serviceStages, setServiceStages] = useState<ServiceStage[]>(INITIAL_SERVICE_STAGES);

  // Active Loaner and Signature state
  const [activeLoaner, setActiveLoaner] = useState<LoanerLoupe | null>(null);
  const [isInspectionSigned, setIsInspectionSigned] = useState(false);

  // Notifications State
  const [notifications, setNotifications] = useState<InAppNotification[]>(INITIAL_NOTIFICATIONS);
  const [activePushBanner, setActivePushBanner] = useState<InAppNotification | null>(null);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Modal open states
  const [isLockerModalOpen, setIsLockerModalOpen] = useState(false);
  const [lockerModalMode, setLockerModalMode] = useState<'dropoff' | 'pickup'>('dropoff');
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [isLoanerModalOpen, setIsLoanerModalOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const [isPrdSpecOpen, setIsPrdSpecOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  React.useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  // Notification Banner
  const [alertBanner, setAlertBanner] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const activeLoupe = currentRole === 'clinician' ? clinicianLoupe : studentLoupe;
  const activeUser = MOCK_USERS[currentRole];
  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  // Trigger floating simulated push banner
  const triggerPushNotification = (notif: InAppNotification) => {
    setNotifications(prev => [notif, ...prev]);
    setActivePushBanner(notif);
    setTimeout(() => {
      setActivePushBanner(prev => (prev?.id === notif.id ? null : prev));
    }, 5500);
  };

  // Handler for depositing item into smart locker
  const handleItemDeposited = (location: CampusLocation, lockerId: string) => {
    const updatedStatus = 'In Servicing';
    if (currentRole === 'clinician') {
      setClinicianLoupe(prev => ({ 
        ...prev, 
        currentStatus: updatedStatus,
        currentLockerCode: lockerId,
        currentLockerLocation: location
      }));
    } else {
      setStudentLoupe(prev => ({ 
        ...prev, 
        currentStatus: updatedStatus,
        currentLockerCode: lockerId,
        currentLockerLocation: location
      }));
    }

    setAlertBanner({
      message: `Loupe dropped in ${lockerId}. 4-Stage Servicing in progress.`,
      type: 'success',
    });
    setActiveTab('tracker');

    // Trigger in-app push notification
    triggerPushNotification({
      id: `push-deposit-${Date.now()}`,
      type: 'stage_complete',
      title: 'Locker Deposit Confirmed · Stage 1 Active',
      message: `Solenoid latched in ${lockerId}. Clean-room intake macro inspection initiated.`,
      timestamp: 'Just now',
      isRead: false,
      actionLabel: 'View Tracker',
      actionTab: 'tracker',
    });
  };

  // Handler for retrieving serviced item from locker
  const handleItemRetrieved = () => {
    const updatedStatus = 'Optimal';
    if (currentRole === 'clinician') {
      setClinicianLoupe(prev => ({ 
        ...prev, 
        currentStatus: updatedStatus,
        healthScore: 100,
        nanoCoatDaysRemaining: 60,
        torqueSpec: '0.18 Nm (Calibrated)',
        lastServicedDate: 'Today'
      }));
    } else {
      setStudentLoupe(prev => ({ 
        ...prev, 
        currentStatus: updatedStatus,
        healthScore: 100,
        nanoCoatDaysRemaining: 60,
        torqueSpec: '0.18 Nm (Calibrated)',
        lastServicedDate: 'Today'
      }));
    }

    setAlertBanner({
      message: '🎉 Loupe retrieved! Restored to 100% health & 0.18 Nm torque.',
      type: 'success',
    });
    setActiveTab('loupe');
  };

  // Handler for advancing stages
  const handleAdvanceStage = (stageId: ServiceStageId) => {
    setServiceStages(prev => {
      return prev.map(s => {
        if (s.id < stageId) return { ...s, status: 'completed' as const };
        if (s.id === stageId) {
          const nextStatus = s.status === 'completed' ? 'pending' : s.status === 'current' ? 'completed' : 'current';
          return { ...s, status: nextStatus as any };
        }
        return { ...s, status: 'pending' as const };
      });
    });

    if (stageId === 3) {
      triggerPushNotification({
        id: `push-stage3-${Date.now()}`,
        type: 'stage_complete',
        title: 'Stage 3 Finished: Nano-Shield Heat-Cured',
        message: 'Fluorinated silane polymer covalently bonded at 55°C. Water contact angle >114° verified.',
        timestamp: 'Just now',
        isRead: false,
        actionLabel: 'View Stage 3',
        actionTab: 'tracker',
      });
    }

    if (stageId === 4) {
      const targetState = 'Ready for Pickup';
      if (currentRole === 'clinician') {
        setClinicianLoupe(prev => ({ 
          ...prev, 
          currentStatus: targetState,
          healthScore: 98,
          nanoCoatDaysRemaining: 60,
          torqueSpec: '0.18 Nm (Calibrated)' 
        }));
      } else {
        setStudentLoupe(prev => ({ 
          ...prev, 
          currentStatus: targetState,
          healthScore: 99,
          nanoCoatDaysRemaining: 60,
          torqueSpec: '0.18 Nm (Calibrated)' 
        }));
      }

      // Trigger Push Notification for Pickup
      triggerPushNotification({
        id: `push-stage4-${Date.now()}`,
        type: 'pickup_ready',
        title: '🎉 Loupe Ready in Locker #04!',
        message: 'Torque calibrated to 0.18 Nm and sealed in sterile pouch. Scan QR at terminal to retrieve.',
        timestamp: 'Just now',
        isRead: false,
        actionLabel: 'Retrieve Loupe',
        actionType: 'pickup',
      });
    }
  };

  // 1-click completion of all 4 stages
  const handleCompleteAllStages = () => {
    setServiceStages(prev => prev.map(s => ({ ...s, status: 'completed' as const })));
    const updatedStatus = 'Ready for Pickup';
    if (currentRole === 'clinician') {
      setClinicianLoupe(prev => ({ 
        ...prev, 
        currentStatus: updatedStatus,
        healthScore: 98,
        nanoCoatDaysRemaining: 60,
        torqueSpec: '0.18 Nm (Calibrated)' 
      }));
    } else {
      setStudentLoupe(prev => ({ 
        ...prev, 
        currentStatus: updatedStatus,
        healthScore: 99,
        nanoCoatDaysRemaining: 60,
        torqueSpec: '0.18 Nm (Calibrated)' 
      }));
    }
    setAlertBanner({
      message: '⚡ All 4 stages finished! Loupe is ready for pickup in Locker #04.',
      type: 'success',
    });

    // Trigger Push Notification
    triggerPushNotification({
      id: `push-all-done-${Date.now()}`,
      type: 'pickup_ready',
      title: '🎉 Service Complete: Ready in Locker #04',
      message: 'Your surgical loupe has completed all 4 stages and is waiting in Compartment #04.',
      timestamp: 'Just now',
      isRead: false,
      actionLabel: 'Retrieve Loupe',
      actionType: 'pickup',
    });
  };

  // Reset stages
  const handleResetStages = () => {
    setServiceStages(INITIAL_SERVICE_STAGES);
    if (currentRole === 'clinician') {
      setClinicianLoupe(INITIAL_CLINICIAN_LOUPE);
    } else {
      setStudentLoupe(INITIAL_STUDENT_LOUPE);
    }
    setAlertBanner({
      message: 'Servicing stages reset to baseline.',
      type: 'info',
    });
  };

  // Handler for reserving loaner
  const handleReserveLoaner = (loaner: LoanerLoupe, pd: string) => {
    setActiveLoaner(loaner);
    setAlertBanner({
      message: `Loaner reserved: ${loaner.model} (${loaner.magnification}). Pick up at ${loaner.availableLocation}.`,
      type: 'success',
    });

    // Trigger push notification for loaner
    triggerPushNotification({
      id: `push-loaner-${Date.now()}`,
      type: 'loaner_ready',
      title: '👓 Emergency Loaner Ready for Pickup',
      message: `${loaner.model} (${loaner.magnification}, PD ${pd}) is staged in Locker #02. Use PIN 849-201 to unlock.`,
      timestamp: 'Just now',
      isRead: false,
      actionLabel: 'View Loaner Pass',
      actionTab: 'loaners',
    });
  };

  // Handler for subscription upgrade
  const handleSubscriptionSuccess = (tier: SubscriptionTier) => {
    setAlertBanner({
      message: `Subscribed to ${tier.name}! Quota credited.`,
      type: 'success',
    });
  };

  // Notification action click router
  const handleNotificationAction = (notif: InAppNotification) => {
    setNotifications(prev => prev.map(n => n.id === notif.id ? { ...n, isRead: true } : n));
    setActivePushBanner(null);
    setIsNotificationModalOpen(false);

    if (notif.actionType === 'pickup') {
      setLockerModalMode('pickup');
      setIsLockerModalOpen(true);
    } else if (notif.actionType === 'inspection') {
      setIsInspectionModalOpen(true);
    } else if (notif.actionTab) {
      setActiveTab(notif.actionTab);
    }
  };

  // Manual Push Simulator trigger
  const handleSimulatePushFromModal = (type: 'stage_complete' | 'loaner_ready' | 'pickup_ready') => {
    if (type === 'stage_complete') {
      triggerPushNotification({
        id: `sim-stage-${Date.now()}`,
        type: 'stage_complete',
        title: 'Stage 3: Hydrophobic Nano-Bonding Complete',
        message: 'Heat-cured fluoro-silane layer bonded to lenses. Tested with zero fogging under N95.',
        timestamp: 'Just now',
        isRead: false,
        actionLabel: 'View Tracker',
        actionTab: 'tracker',
      });
    } else if (type === 'loaner_ready') {
      triggerPushNotification({
        id: `sim-loaner-${Date.now()}`,
        type: 'loaner_ready',
        title: '👓 Emergency Backup Loupe Staged',
        message: 'Orascoptic EyeZoom 3.0x staged in Locker #02 at IMU Dental Lounge. Door unlatch token ready.',
        timestamp: 'Just now',
        isRead: false,
        actionLabel: 'View Loaner',
        actionTab: 'loaners',
      });
    } else if (type === 'pickup_ready') {
      triggerPushNotification({
        id: `sim-pickup-${Date.now()}`,
        type: 'pickup_ready',
        title: '🎉 Your Loupe is Ready in Locker #04',
        message: 'All 4 clean-room stages verified by Tan Lee Jia. Micro-torque restored to 0.18 Nm.',
        timestamp: 'Just now',
        isRead: false,
        actionLabel: 'Open Locker #04',
        actionType: 'pickup',
      });
    }
  };

  // Detect screen size changes for responsive frame toggle
  React.useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.innerWidth < 640;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isSmallScreen || isMobile) {
        setIsMobileFrame(false); // Disable frame on mobile
      }
    };
    
    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={`min-h-screen text-slate-900 font-sans flex flex-col selection:bg-[#007AFF] selection:text-white ${
      isMobileFrame ? 'bg-[#090b10] sm:py-3' : 'bg-slate-50'
    }`}>
      
      {/* Floating Simulated Push Notification Banner */}
      <PushNotificationBanner
        notification={activePushBanner}
        onDismiss={() => setActivePushBanner(null)}
        onActionClick={handleNotificationAction}
      />

      {/* Discrete Apple Studio Canvas Header (Visible on Desktop when in iPhone Frame mode) */}
      {isMobileFrame && (
        <header className="hidden sm:flex items-center justify-between w-full max-w-[420px] mx-auto px-4 py-1.5 mb-1.5 text-xs bg-slate-900 border border-slate-800 rounded-full text-slate-200 shadow-xl select-none shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34C759]" />
            <span className="font-bold text-white tracking-tight">🍎 LoupeCare iOS</span>
            <span className="text-slate-400 text-[11px]">· iPhone 16 Pro</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMobileFrame(false)}
              className="px-2.5 py-0.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold text-[11px] transition-all cursor-pointer flex items-center gap-1 active:scale-95"
              title="Switch to Edge-to-Edge Mobile View"
            >
              <Smartphone className="w-3 h-3 text-[#007AFF]" />
              <span>Full Screen</span>
            </button>

            <button
              onClick={handleCompleteAllStages}
              className="px-2 py-0.5 bg-[#34C759]/20 hover:bg-[#34C759]/30 text-[#34C759] border border-[#34C759]/30 rounded-full font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1 active:scale-95"
              title="Fast forward all 4 cleanroom stages"
            >
              <Zap className="w-3 h-3" />
              <span>5s Demo</span>
            </button>

            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="px-2.5 py-0.5 bg-[#007AFF] hover:bg-blue-600 text-white rounded-full font-bold text-[11px] transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-sm"
              title="Apple iOS App Store & TestFlight Publish Package"
            >
              <Download className="w-3 h-3" />
              <span>App Store</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
              title="Toggle Browser Full Screen"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </header>
      )}

      {/* Main iPhone Frame & App Canvas */}
      <main className="flex-1 w-full flex flex-col items-center justify-center p-0">
        
        <IPhoneFrame
          isEdgeToEdge={!isMobileFrame}
          isInServicing={activeLoupe.currentStatus === 'In Servicing'}
          isReadyForPickup={activeLoupe.currentStatus === 'Ready for Pickup'}
          activeStageName={serviceStages.find(s => s.status === 'current')?.title || 'Ultrasonic Cavitation'}
          onDynamicIslandClick={() => {
            if (activeLoupe.currentStatus === 'In Servicing') {
              setActiveTab('tracker');
            } else if (activeLoupe.currentStatus === 'Ready for Pickup') {
              setLockerModalMode('pickup');
              setIsLockerModalOpen(true);
            }
          }}
        >
          {/* Inside iPhone: Interactive Loading Screen */}
          {isLoading ? (
            <LoadingScreen onComplete={() => setIsLoading(false)} />
          ) : (
            <div className="flex-1 flex flex-col h-full bg-slate-50 relative overflow-hidden">
              
              {/* Native iOS Navigation Bar */}
              <IOSNavigationBar
                currentRole={currentRole}
                onRoleChange={setCurrentRole}
                activeTab={activeTab}
                unreadNotificationCount={unreadNotificationCount}
                onOpenNotifications={() => setIsNotificationModalOpen(true)}
                onOpenPublishModal={() => setIsPublishModalOpen(true)}
              />

              {/* Scrollable iOS Content Body */}
              <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 pb-24 scrollbar-thin">
                
                {/* iOS Notification Toast */}
                {alertBanner && (
                  <div className="p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between text-xs text-slate-900 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#34C759] shrink-0" />
                      <span className="text-[12px] font-semibold">{alertBanner.message}</span>
                    </div>
                    <button 
                      onClick={() => setAlertBanner(null)}
                      className="text-slate-400 font-bold hover:text-slate-700 text-xs cursor-pointer ml-1.5"
                    >
                      ✕
                    </button>
                  </div>
                )}

                {/* TAB 1: MY LOUPE */}
                {activeTab === 'loupe' && (
                  <div className="space-y-3.5 animate-in fade-in duration-150">
                    <AssetOverview
                      loupe={activeLoupe}
                      role={currentRole}
                      onOpenLockerModal={() => { setLockerModalMode('dropoff'); setIsLockerModalOpen(true); }}
                      onOpenPickupModal={() => { setLockerModalMode('pickup'); setIsLockerModalOpen(true); }}
                      onOpenLoanerModal={() => setIsLoanerModalOpen(true)}
                      onOpenCertificateModal={() => setIsCertificateModalOpen(true)}
                      onOpenInspectionModal={() => setIsInspectionModalOpen(true)}
                      onViewTracker={() => setActiveTab('tracker')}
                    />

                    {/* Active Backup Loupe Alert (if reserved) */}
                    {activeLoaner && (
                      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-950 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                            <Glasses className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-[12px]">Backup Staged &amp; Active</div>
                            <div className="text-[11px] text-amber-800">{activeLoaner.model} ({activeLoaner.magnification})</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setActiveLoaner(null)}
                          className="px-2.5 py-1 bg-white border border-amber-300 rounded-xl text-amber-900 font-bold cursor-pointer text-[11px] shadow-xs transition-transform active:scale-95"
                        >
                          Return
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: LIVE SERVICE TRACKER */}
                {activeTab === 'tracker' && (
                  <div className="space-y-3.5 animate-in fade-in duration-150">
                    <ServicingTracker
                      stages={serviceStages}
                      role={currentRole}
                      onAdvanceStage={handleAdvanceStage}
                      onOpenInspectionModal={() => setIsInspectionModalOpen(true)}
                      onCompleteAllStages={handleCompleteAllStages}
                      onResetStages={handleResetStages}
                    />
                  </div>
                )}

                {/* TAB 3: BACKUP LOANER FLEET */}
                {activeTab === 'loaners' && (
                  <div className="bg-white p-4.5 rounded-3xl border border-slate-200/90 shadow-xs space-y-3.5 animate-in fade-in duration-150 relative">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-[#AF52DE]" />
                          <span>Emergency Backup Loupes</span>
                        </h3>
                        <p className="text-[11px] text-slate-500 font-medium">Zero-downtime clinic quotas for BDS clinicals</p>
                      </div>
                      <button
                        onClick={() => setIsLoanerModalOpen(true)}
                        className="px-3 py-1.5 bg-[#AF52DE] hover:bg-purple-600 text-white rounded-xl text-xs font-bold cursor-pointer shadow-xs active:scale-95 transition-transform"
                      >
                        Filter
                      </button>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      {MOCK_LOANER_FLEET.slice(0, 3).map((l) => (
                        <div key={l.id} className="py-3 flex items-center justify-between gap-2.5">
                          <div>
                            <div className="font-bold text-slate-900 text-[12px]">{l.model}</div>
                            <div className="text-slate-500 text-[10px] font-mono mt-0.5">
                              {l.magnification} · WD {l.workingDistance} · {l.availableLocation.split('(')[0]}
                            </div>
                          </div>
                          <button
                            onClick={() => handleReserveLoaner(l, '62mm')}
                            className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-bold rounded-xl text-[11px] cursor-pointer shrink-0 transition-colors shadow-xs active:scale-95"
                          >
                            Reserve
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: USER PROFILE */}
                {activeTab === 'profile' && (
                  <UserProfileView
                    currentRole={currentRole}
                    onRoleChange={setCurrentRole}
                    registeredLoupe={activeLoupe}
                    onOpenCertificate={() => setIsCertificateModalOpen(true)}
                    onOpenPricing={() => setIsPricingModalOpen(true)}
                    onOpenPrdSpec={() => setIsPrdSpecOpen(true)}
                    onOpenHelp={() => setIsHelpModalOpen(true)}
                    onOpenPublishModal={() => setIsPublishModalOpen(true)}
                  />
                )}

                {/* iOS Subtle Footnote & Specs */}
                <div className="pt-2 pb-1 text-center text-[10px] text-slate-400 flex items-center justify-center gap-2">
                  <button
                    onClick={() => setIsPrdSpecOpen(true)}
                    className="hover:text-[#007AFF] underline cursor-pointer"
                  >
                    PPD Track A Spec
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => setIsPricingModalOpen(true)}
                    className="hover:text-[#007AFF] underline cursor-pointer"
                  >
                    DuitNow Plans
                  </button>
                  <span>·</span>
                  <button
                    onClick={() => setIsHelpModalOpen(true)}
                    className="hover:text-[#007AFF] underline cursor-pointer"
                  >
                    Help &amp; FAQ
                  </button>
                </div>

              </div>

              {/* Native iOS Docked Bottom Navigation Bar */}
              <div className="shrink-0 sticky bottom-0 z-30">
                <MobileBottomNav
                  activeTab={activeTab}
                  onChangeTab={setActiveTab}
                  isInServicing={activeLoupe.currentStatus === 'In Servicing'}
                  isReadyForPickup={activeLoupe.currentStatus === 'Ready for Pickup'}
                  hasActiveLoaner={!!activeLoaner}
                />
              </div>

            </div>
          )}
        </IPhoneFrame>

      </main>

      {/* iOS AssistiveTouch Floating Orb */}
      <IOSAssistiveTouch
        onFastDemo={handleCompleteAllStages}
        onSimulatePush={() => handleSimulatePushFromModal('stage_complete')}
        onReplaySplash={() => setIsLoading(true)}
        onToggleFrame={() => setIsMobileFrame(!isMobileFrame)}
        isFrameMode={isMobileFrame}
        onToggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
        onOpenStoreModal={() => setIsPublishModalOpen(true)}
        onOpenPrdSpec={() => setIsPrdSpecOpen(true)}
        onOpenPricing={() => setIsPricingModalOpen(true)}
      />

      {/* ALL MODALS (Kept functional & ready) */}
      <NotificationCenterModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
        onSelectNotification={handleNotificationAction}
        onSimulatePush={handleSimulatePushFromModal}
      />

      <SmartLockerModal
        isOpen={isLockerModalOpen}
        mode={lockerModalMode}
        onClose={() => setIsLockerModalOpen(false)}
        onItemDeposited={handleItemDeposited}
        onItemRetrieved={handleItemRetrieved}
      />

      <TenPointInspectionModal
        isOpen={isInspectionModalOpen}
        onClose={() => setIsInspectionModalOpen(false)}
        loupeSerial={activeLoupe.serialNumber}
        loupeModel={activeLoupe.brandModel}
        isSigned={isInspectionSigned}
        onSignOff={() => {
          setIsInspectionSigned(true);
          setAlertBanner({
            message: '10-Point Pre-Inspection signed. Servicing authorized.',
            type: 'success',
          });
        }}
      />

      <LoanerReservationModal
        isOpen={isLoanerModalOpen}
        onClose={() => setIsLoanerModalOpen(false)}
        onReserveSuccess={handleReserveLoaner}
      />

      <MohCertificateModal
        isOpen={isCertificateModalOpen}
        onClose={() => setIsCertificateModalOpen(false)}
        loupeSerial={activeLoupe.serialNumber}
      />

      <SubscriptionCheckoutModal
        isOpen={isPricingModalOpen}
        onClose={() => setIsPricingModalOpen(false)}
        onSubscriptionSuccess={handleSubscriptionSuccess}
      />

      <TrackASpecDrawer
        isOpen={isPrdSpecOpen}
        onClose={() => setIsPrdSpecOpen(false)}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
        onQuickAction={(action) => {
          if (action === 'locker') {
            setLockerModalMode('dropoff');
            setIsLockerModalOpen(true);
          } else if (action === 'loaner') {
            setIsLoanerModalOpen(true);
          } else if (action === 'cert') {
            setIsCertificateModalOpen(true);
          }
        }}
      />

      <MobilePublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
      />

      <OfflineIndicator />

    </div>
  );
}
