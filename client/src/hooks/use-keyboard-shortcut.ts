"use client";

import { useEffect } from "react";

/**
 * Register a keyboard shortcut.
 * Example: useKeyboardShortcut("k", true, () => openCommandPalette());
 */
export function useKeyboardShortcut(
  key: string,
  ctrlOrMeta: boolean,
  callback: () => void
) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (ctrlOrMeta && !(e.metaKey || e.ctrlKey)) return;
      if (e.key.toLowerCase() !== key.toLowerCase()) return;
      e.preventDefault();
      callback();
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, ctrlOrMeta, callback]);
}
