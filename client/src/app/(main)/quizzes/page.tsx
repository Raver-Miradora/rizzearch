import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quizzes",
};

export default function QuizzesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quizzes</h1>
        <p className="text-muted-foreground">
          Take AI-generated quizzes to test your knowledge.
        </p>
      </div>

      {/* TODO: Quiz list with attempt history (Phase 3) */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8">
        <p className="text-center text-muted-foreground">
          No quizzes yet. Generate them from your notes.
        </p>
      </div>
    </div>
  );
}
