import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notebooks",
};

export default function NotebooksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notebooks</h1>
        <p className="text-muted-foreground">
          Organize your notes into notebooks.
        </p>
      </div>

      {/* TODO: Notebook grid with create, edit, and nested notebooks (Phase 2) */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8">
        <p className="text-center text-muted-foreground">
          No notebooks yet. Create one to organize your notes.
        </p>
      </div>
    </div>
  );
}
