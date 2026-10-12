/**
 * Safe mobile device haptic feedback triggers
 */
export function triggerHaptic(type: 'light' | 'medium' | 'success' | 'warning' = 'light') {
  if (typeof window === 'undefined' || !('vibrate' in navigator)) {
    return;
  }

  try {
    switch (type) {
      case 'light':
        navigator.vibrate(8);
        break;
      case 'medium':
        navigator.vibrate(18);
        break;
      case 'success':
        navigator.vibrate([12, 40, 16]);
        break;
      case 'warning':
        navigator.vibrate([25, 60, 25]);
        break;
      default:
        navigator.vibrate(10);
    }
  } catch {
    // Ignore unsupported environments
  }
}
