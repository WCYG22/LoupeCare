import React from 'react';
import { InAppNotification } from '../types';
import { 
  Bell, 
  CheckCircle2, 
  RotateCw, 
  Glasses, 
  PackageCheck, 
  AlertTriangle, 
  X,
  ArrowRight
} from 'lucide-react';

interface PushNotificationBannerProps {
  notification: InAppNotification | null;
  onDismiss: () => void;
  onActionClick: (notification: InAppNotification) => void;
}

export const PushNotificationBanner: React.FC<PushNotificationBannerProps> = ({
  notification,
  onDismiss,
  onActionClick,
}) => {
  if (!notification) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'pickup_ready':
        return <PackageCheck className="w-5 h-5 text-emerald-600" />;
      case 'stage_complete':
        return <CheckCircle2 className="w-5 h-5 text-teal-600" />;
      case 'loaner_ready':
        return <Glasses className="w-5 h-5 text-amber-600" />;
      default:
        return <Bell className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <div className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-3 animate-in slide-in-from-top-6 duration-300 select-none">
      <div className="bg-slate-950/85 text-white backdrop-blur-2xl rounded-[26px] p-3.5 shadow-2xl border border-white/20 flex items-start gap-3">
        
        {/* iOS App Icon Pill */}
        <div className="w-9 h-9 rounded-xl bg-[#007AFF] flex items-center justify-center shrink-0 shadow-md">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold tracking-wider">
            <span className="uppercase text-slate-300">
              LOUPECARE
            </span>
            <span className="font-mono">{notification.timestamp}</span>
          </div>

          <h4 className="text-[13px] font-bold text-white mt-0.5 leading-snug">
            {notification.title}
          </h4>

          <p className="text-[11px] text-slate-300 mt-0.5 line-clamp-2 leading-relaxed">
            {notification.message}
          </p>

          {notification.actionLabel && (
            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={() => onActionClick(notification)}
                className="px-3.5 py-1 bg-[#007AFF] hover:bg-blue-600 text-white rounded-full text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm active:scale-95"
              >
                <span>{notification.actionLabel}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={onDismiss}
                className="px-2.5 py-1 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>

        {/* Close */}
        <button
          onClick={onDismiss}
          className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
