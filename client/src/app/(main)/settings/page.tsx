import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      {/* TODO: Profile, appearance, notifications, API keys settings (Phase 5) */}
      <div className="flex min-h-[400px] items-center justify-center rounded-lg border border-dashed p-8">
        <p className="text-center text-muted-foreground">
          Settings page coming soon.
        </p>
      </div>
    </div>
  );
}
