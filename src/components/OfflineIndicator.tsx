import React from 'react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 rounded-full bg-amber-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg animate-in fade-in slide-in-from-top-2">
      <WifiOff className="w-3.5 h-3.5 animate-pulse" />
      <span>Offline Mode · Running from Local Device Cache</span>
    </div>
  );
};
