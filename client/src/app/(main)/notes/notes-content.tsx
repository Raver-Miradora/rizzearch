"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Star, Pin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useNotes, useCreateNote, useSearchNotes } from "@/hooks/use-notes";
import { formatRelativeTime, truncate } from "@/lib/utils";

export function NotesPageContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: notes, isLoading } = useNotes();
  const { data: searchResults } = useSearchNotes(searchQuery);
  const createNote = useCreateNote();

  const displayedNotes = searchQuery.length > 0 ? searchResults : notes;

  async function handleCreateNote() {
    const note = await createNote.mutateAsync({
      title: "Untitled",
      content: "",
    });
    router.push(`/notes/${note.id}`);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground">
            Create and manage your study notes.
          </p>
        </div>
        <Button onClick={handleCreateNote} disabled={createNote.isPending}>
          <Plus className="mr-2 h-4 w-4" />
          New Note
        </Button>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search notes…"
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Notes grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
          ))}
        </div>
      ) : displayedNotes && displayedNotes.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedNotes.map((note) => (
            <Card
              key={note.id}
              className="cursor-pointer transition-shadow hover:shadow-md"
              onClick={() => router.push(`/notes/${note.id}`)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base leading-tight">
                    {note.title || "Untitled"}
                  </CardTitle>
                  <div className="flex gap-1">
                    {note.is_favorite && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                    {note.is_pinned && (
                      <Pin className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </div>
                <CardDescription>
                  {formatRelativeTime(note.updated_at)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {truncate(note.content_plain || "", 120)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8">
          <div className="text-center">
            <p className="text-muted-foreground">
              {searchQuery
                ? "No notes match your search."
                : "No notes yet. Create your first note to get started."}
            </p>
            {!searchQuery && (
              <Button
                className="mt-4"
                onClick={handleCreateNote}
                disabled={createNote.isPending}
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
