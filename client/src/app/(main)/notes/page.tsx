import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
};

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notes</h1>
          <p className="text-muted-foreground">
            Create and manage your study notes.
          </p>
        </div>
      </div>

      {/* TODO: Note list with search, filters, and create button (Phase 2) */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8">
        <p className="text-center text-muted-foreground">
          No notes yet. Create your first note to get started.
        </p>
      </div>
    </div>
  );
}
