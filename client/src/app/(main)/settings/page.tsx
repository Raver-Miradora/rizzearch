import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

import "use client";

import { useState, useRef, ChangeEvent } from "react";
import { useAuthStore } from "@/stores/auth-store";
import { useUploadAvatar, useUpdateProfile } from "@/hooks/use-user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const metadata: Metadata = {
  title: "Settings",
};

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user);
  const [name, setName] = useState(user?.full_name || "");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const upload = useUploadAvatar();
  const update = useUpdateProfile();

  function onSelectFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    upload.mutate(file, {
      onSuccess: () => toast.success("Avatar updated"),
      onError: () => toast.error("Failed to upload avatar"),
    });
  }

  function onSaveName() {
    if (name.trim() && name !== user?.full_name) {
      update.mutate(name, {
        onSuccess: () => toast.success("Name updated"),
        onError: () => toast.error("Failed to update name"),
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            {preview || user?.avatar_url ? (
              <AvatarImage src={preview || user?.avatar_url || ""} />
            ) : (
              <AvatarFallback>
                {user?.full_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={upload.isLoading}
            >
              Change avatar
            </Button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={onSelectFile}
            />
          </div>
        </div>

        <div className="max-w-sm space-y-2">
          <Label htmlFor="full_name">Full name</Label>
          <Input
            id="full_name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            onClick={onSaveName}
            disabled={update.isLoading || name === user?.full_name}
          >
            Save name
          </Button>
        </div>
      </div>
    </div>
  );
}
