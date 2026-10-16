"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SLIDE_INTERVAL = 5000;
const SWIPE_THRESHOLD = 48;

export function useHeroSlider(slideCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null);

  const changeSlide = useCallback(
    (offset: number) => {
      setActiveIndex((current) => (current + offset + slideCount) % slideCount);
    },
    [slideCount],
  );

  useEffect(() => {
    let timeoutId: number | undefined;
    const clearTimer = () => {
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const startTimer = () => {
      clearTimer();
      if (
        document.visibilityState === "visible" &&
        !motionPreference.matches
      ) {
        timeoutId = window.setTimeout(() => changeSlide(1), SLIDE_INTERVAL);
      }
    };

    startTimer();
    document.addEventListener("visibilitychange", startTimer);
    motionPreference.addEventListener("change", startTimer);
    return () => {
      clearTimer();
      document.removeEventListener("visibilitychange", startTimer);
      motionPreference.removeEventListener("change", startTimer);
    };
  }, [activeIndex, changeSlide]);

  const onPointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    if ((event.target as Element).closest("button, a")) return;

    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: React.PointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (
      Math.abs(deltaX) >= SWIPE_THRESHOLD &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2
    ) {
      changeSlide(deltaX < 0 ? 1 : -1);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") changeSlide(-1);
    if (event.key === "ArrowRight") changeSlide(1);
  };

  return {
    activeIndex,
    selectSlide: setActiveIndex,
    previous: () => changeSlide(-1),
    next: () => changeSlide(1),
    onPointerDown,
    onPointerUp,
    onPointerCancel: () => {
      pointerStart.current = null;
    },
    onKeyDown,
  };
}
