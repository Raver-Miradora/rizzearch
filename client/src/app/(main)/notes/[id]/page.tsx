"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useNote, useUpdateNote, useDeleteNote, useToggleFavorite } from "@/hooks/use-notes";
import { NoteEditor } from "@/components/editor/note-editor";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAutosave } from "@/hooks/use-autosave";
import { Star, Trash2, ArrowLeft } from "lucide-react";

export default function NoteEditorPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = typeof params.id === "string" ? params.id : Array.isArray(params.id) ? params.id[0] : undefined;

  const { data: note, isLoading } = useNote(noteId);
  const updateNote = useUpdateNote();
  const deleteNote = useDeleteNote();
  const toggleFavorite = useToggleFavorite();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentPlain, setContentPlain] = useState("");

  // Sync state with loaded note
  useEffect(() => {
    if (note) {
      setTitle(note.title || "");
      setContent(note.content || "");
      setContentPlain(note.content_plain || "");
    }
  }, [note?.id]);

  // Auto-save hook
  useAutosave(noteId, { title, content, content_plain: contentPlain });

  if (isLoading || !note) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <input
          className="flex-1 bg-transparent text-2xl font-bold outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
        />
        <Button
          variant={note.is_favorite ? "secondary" : "ghost"}
          size="icon"
          onClick={() => toggleFavorite.mutate(noteId!)}
        >
          <Star className={note.is_favorite ? "fill-yellow-400 text-yellow-400" : ""} />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          onClick={async () => {
            await deleteNote.mutateAsync(noteId!);
            router.push("/notes");
          }}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
      <NoteEditor
        content={content}
        onChange={(html, plain) => {
          setContent(html);
          setContentPlain(plain);
        }}
        editable
      />
    </div>
  );
}
