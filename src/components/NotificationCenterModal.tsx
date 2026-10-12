import React, { useState } from 'react';
import { InAppNotification } from '../types';
import { 
  X, 
  Bell, 
  CheckCircle2, 
  RotateCw, 
  Glasses, 
  PackageCheck, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  Check,
  Send
} from 'lucide-react';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: InAppNotification[];
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: InAppNotification) => void;
  onSimulatePush: (type: 'stage_complete' | 'loaner_ready' | 'pickup_ready') => void;
}

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onSelectNotification,
  onSimulatePush,
}) => {
  const [filter, setFilter] = useState<'all' | 'stages' | 'lockers'>('all');

  if (!isOpen) return null;

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'stages') return n.type === 'stage_complete';
    if (filter === 'lockers') return n.type === 'loaner_ready' || n.type === 'pickup_ready';
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getNotificationIcon = (type: InAppNotification['type']) => {
    switch (type) {
      case 'pickup_ready':
        return <PackageCheck className="w-4 h-4 text-emerald-600" />;
      case 'stage_complete':
        return <CheckCircle2 className="w-4 h-4 text-teal-600" />;
      case 'loaner_ready':
        return <Glasses className="w-4 h-4 text-amber-600" />;
      default:
        return <Bell className="w-4 h-4 text-teal-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-t-[30px] sm:rounded-2xl max-w-lg w-full max-h-[92vh] sm:max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-4 duration-200">
        
        {/* Mobile Sheet Grab Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2.5 sm:hidden shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 sm:py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">In-App Notifications</h3>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[10px] font-bold font-mono">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">Real-time service stages & locker status telemetry</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[11px] font-medium text-slate-600 hover:text-teal-700 px-2 py-1 rounded hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                Mark read
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="px-5 py-2.5 bg-slate-50/50 border-b border-slate-100 flex items-center gap-1.5 shrink-0 text-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-teal-800 shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Alerts ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('stages')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === 'stages'
                ? 'bg-white text-teal-800 shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Service Stages
          </button>
          <button
            onClick={() => setFilter('lockers')}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
              filter === 'lockers'
                ? 'bg-white text-teal-800 shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Lockers &amp; Loaners
          </button>
        </div>

        {/* Notifications Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          
          {/* Quick Mock Push Simulator Toolstrip */}
          <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-teal-900">
              <span className="flex items-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-teal-700" />
                <span>Simulate Push Notification:</span>
              </span>
              <span className="text-[10px] font-mono text-teal-700">Prototype Demo</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              <button
                onClick={() => onSimulatePush('stage_complete')}
                className="p-2 text-left bg-white hover:bg-teal-100/50 border border-teal-200 rounded-lg text-[11px] font-semibold text-slate-700 hover:text-teal-900 transition-colors cursor-pointer"
              >
                ⚡ Stage 3 Done Alert
              </button>
              <button
                onClick={() => onSimulatePush('loaner_ready')}
                className="p-2 text-left bg-white hover:bg-teal-100/50 border border-teal-200 rounded-lg text-[11px] font-semibold text-slate-700 hover:text-teal-900 transition-colors cursor-pointer"
              >
                👓 Loaner Staged Alert
              </button>
              <button
                onClick={() => onSimulatePush('pickup_ready')}
                className="p-2 text-left bg-white hover:bg-teal-100/50 border border-teal-200 rounded-lg text-[11px] font-semibold text-slate-700 hover:text-teal-900 transition-colors cursor-pointer"
              >
                🎉 Pickup in #04 Alert
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-400">
                No notifications in this category.
              </div>
            ) : (
              filteredNotifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => onSelectNotification(notif)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                    !notif.isRead
                      ? 'bg-teal-50/30 border-teal-300 shadow-2xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                    !notif.isRead ? 'bg-white border-teal-200' : 'bg-slate-50 border-slate-200'
                  }`}>
                    {getNotificationIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-900 truncate pr-2">
                        {notif.title}
                      </span>
                      <span className="text-slate-400 font-mono shrink-0">
                        {notif.timestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>

                    {notif.actionLabel && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-900">
                        <span>{notif.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>

                  {!notif.isRead && (
                    <span className="w-2 h-2 rounded-full bg-teal-600 shrink-0 mt-1" />
                  )}
                </div>
              ))
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0 text-xs text-slate-500">
          <span>Push notifications powered by Firebase FCM &amp; MQTT Broker</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
