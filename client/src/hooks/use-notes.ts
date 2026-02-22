import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/api";
import type { Note, NoteCreate, NoteUpdate } from "@/types";

const NOTES_KEY = ["notes"];

export function useNotes() {
  return useQuery<Note[]>({
    queryKey: NOTES_KEY,
    queryFn: async () => {
      const { data } = await api.get("/notes/");
      return data;
    },
  });
}

export function useNote(id: string | undefined) {
  return useQuery<Note>({
    queryKey: ["notes", id],
    queryFn: async () => {
      const { data } = await api.get(`/notes/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: NoteCreate) => {
      const { data: note } = await api.post("/notes/", data);
      return note as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTES_KEY });
    },
  });
}

export function useUpdateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: NoteUpdate;
    }) => {
      const { data: note } = await api.put(`/notes/${id}`, data);
      return note as Note;
    },
    onSuccess: (note) => {
      queryClient.invalidateQueries({ queryKey: NOTES_KEY });
      queryClient.setQueryData(["notes", note.id], note);
    },
  });
}

export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTES_KEY });
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.post(`/notes/${id}/favorite`);
      return data as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTES_KEY });
    },
  });
}

export function useSearchNotes(query: string) {
  return useQuery<Note[]>({
    queryKey: ["notes", "search", query],
    queryFn: async () => {
      const { data } = await api.get("/notes/search/", {
        params: { q: query },
      });
      return data;
    },
    enabled: query.length > 0,
  });
}
