import { useEffect, useRef } from "react";
import { useUpdateNote } from "./use-notes";
import type { NoteUpdate } from "@/types";

const AUTOSAVE_DELAY = 1500; // ms

/**
 * Auto-saves note content after the user stops typing.
 * Uses a debounced approach — waits AUTOSAVE_DELAY ms of inactivity before saving.
 */
export function useAutosave(noteId: string | undefined, data: NoteUpdate) {
  const updateNote = useUpdateNote();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevDataRef = useRef<string>("");

  useEffect(() => {
    if (!noteId) return;

    const serialized = JSON.stringify(data);

    // Skip if nothing actually changed
    if (serialized === prevDataRef.current) return;

    // Clear any pending save
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      prevDataRef.current = serialized;
      updateNote.mutate({ id: noteId, data });
    }, AUTOSAVE_DELAY);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [noteId, data]); // eslint-disable-line react-hooks/exhaustive-deps
}
