import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            Rizzearch
          </Link>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Study smarter with{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              AI-powered
            </span>{" "}
            notes
          </h1>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Take notes, generate flashcards & quizzes, and chat with your
            knowledge base — all in one place.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/register">Start for Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">See Features</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="border-t py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">
            Everything you need to ace your studies
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border bg-card p-6 shadow-sm"
              >
                <div className="mb-3 text-3xl">{f.icon}</div>
                <h3 className="mb-1 text-lg font-semibold">{f.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Rizzearch. All rights reserved.</p>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: "📝",
    title: "Rich-Text Notes",
    description:
      "Write beautifully formatted notes with our TipTap-powered editor, supporting markdown, code blocks, and more.",
  },
  {
    icon: "🤖",
    title: "AI Summaries",
    description:
      "Instantly generate concise summaries of your notes with GPT-4o-mini.",
  },
  {
    icon: "🃏",
    title: "Smart Flashcards",
    description:
      "Auto-generate flashcard decks from your notes with spaced repetition scheduling.",
  },
  {
    icon: "🧠",
    title: "Quiz Generation",
    description:
      "Create multiple-choice, true/false, and short-answer quizzes from any note.",
  },
  {
    icon: "💬",
    title: "Chat with Notes",
    description:
      "Ask questions about your notes using RAG-powered conversational AI.",
  },
  {
    icon: "📊",
    title: "Study Analytics",
    description:
      "Track your study streaks, review accuracy, and progress over time.",
  },
];
