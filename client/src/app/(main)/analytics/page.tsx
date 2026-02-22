import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Track your study progress and performance over time.
        </p>
      </div>

      {/* TODO: Charts and analytics dashboard (Phase 4) */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8">
        <p className="text-center text-muted-foreground">
          Start studying to see your analytics here.
        </p>
      </div>
    </div>
  );
}
