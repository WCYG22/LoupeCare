import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// Register PWA service worker with auto-update
registerSW({
  immediate: true,
  onNeedRefresh() {
    window.location.reload();
  },
  onOfflineReady() {
    console.log('LoupeCare PWA offline ready');
  },
});

createRoot(document.getElementById('root')!).render(<App />);
