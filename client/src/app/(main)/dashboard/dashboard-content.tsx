"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Layers,
  MessageSquare,
  Flame,
  TrendingUp,
  Clock,
} from "lucide-react";

export function DashboardContent() {
  // TODO: Replace with real data from API (Phase 3)
  const stats = [
    { label: "Total Notes", value: 0, icon: FileText },
    { label: "Flashcard Decks", value: 0, icon: Layers },
    { label: "Quizzes Taken", value: 0, icon: MessageSquare },
    { label: "Study Streak", value: "0 days", icon: Flame },
    { label: "Review Accuracy", value: "0%", icon: TrendingUp },
    { label: "Upcoming Reviews", value: 0, icon: Clock },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your study overview.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Jump right into studying</CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Create your first note to get started with AI-powered studying.
        </CardContent>
      </Card>
    </div>
  );
}
