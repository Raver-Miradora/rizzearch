import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flashcards",
};

export default function FlashcardsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Flashcards</h1>
        <p className="text-muted-foreground">
          Review AI-generated flashcard decks with spaced repetition.
        </p>
      </div>

      {/* TODO: Flashcard deck grid with study mode (Phase 3) */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8">
        <p className="text-center text-muted-foreground">
          No flashcard decks yet. Generate them from your notes.
        </p>
      </div>
    </div>
  );
}
