import { useRef } from 'react';

/**
 * Parmak sürükleme (swipe) tanıma hook'u.
 * onSwipeLeft  → sola kaydırma (sonraki resim)
 * onSwipeRight → sağa kaydırma (önceki resim)
 * threshold    → minimum px mesafe (varsayılan 40px)
 */
export function useSwipe(
  onSwipeLeft: () => void,
  onSwipeRight: () => void,
  threshold = 40
) {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;

    const dx = e.changedTouches[0].clientX - startX.current;
    const dy = e.changedTouches[0].clientY - startY.current;

    // Yatay hareket dikey hareketten büyükse swipe say
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > threshold) {
      if (dx < 0) onSwipeLeft();   // sola → sonraki
      else        onSwipeRight();  // sağa → önceki
    }

    startX.current = null;
    startY.current = null;
  };

  return { onTouchStart, onTouchEnd };
}
