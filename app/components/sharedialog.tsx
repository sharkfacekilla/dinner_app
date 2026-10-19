"use client";

import { useState } from "react";
import { Download, Printer, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setRecipeShare } from "@/lib/actions/recipe";
import { cn } from "@/lib/utils";
import { useOtherUsers } from "./otheruserscontext";

// Share menu: Download/Print the recipe as a PDF (anyone who can see it) and,
// for the owner only, pick which people can see it.
// variant "button" = labelled button (recipe page), "icon" = round icon (cards and list rows).
// tone "light" for icons over a photo, "muted" for icons on a plain background.
export function ShareDialog({
  recipeId,
  isOwner,
  sharedWith,
  variant = "button",
  tone = "light",
}: {
  recipeId: string;
  isOwner: boolean;
  sharedWith: string[];
  variant?: "button" | "icon";
  tone?: "light" | "muted";
}) {
  const otherUsers = useOtherUsers();
  const [shared, setShared] = useState<string[]>(sharedWith);
  const [error, setError] = useState<string | null>(null);

  const toggle = async (username: string, on: boolean) => {
    setError(null);
    setShared((s) => (on ? [...s, username] : s.filter((u) => u !== username)));
    const result = await setRecipeShare(recipeId, username, on);
    if (!result.success) {
      // Roll back if the save failed
      setShared((s) => (on ? s.filter((u) => u !== username) : [...s, username]));
      setError(result.error ?? "Something went wrong");
    }
  };

  return (
    // Stop clicks (including ones inside the dialog, which bubble through React's tree)
    // from reaching a parent card's onClick or link
    <span
      className="contents"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Dialog>
        <DialogTrigger asChild>
          {variant === "icon" ? (
            <button
              type="button"
              aria-label="Share recipe"
              title={shared.length ? `Shared with ${shared.join(", ")}` : "Share"}
              className={cn(
                "rounded-full p-1.5 transition-all active:scale-90",
                tone === "light" ? "bg-black/35 backdrop-blur-sm hover:bg-black/50" : "hover:bg-black/10",
              )}
            >
              <Share2
                className={cn(
                  "h-5 w-5 transition-colors",
                  shared.length
                    ? "text-primary"
                    : tone === "light"
                      ? "text-white/80"
                      : "text-muted-foreground/30",
                )}
              />
            </button>
          ) : (
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">
                {isOwner && shared.length ? `Shared (${shared.length})` : "Share"}
              </span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>Save it as a PDF to send anywhere, or print it.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-2">
            <Button asChild variant="outline" className="gap-2">
              <a href={`/recipes/${recipeId}/pdf`} download>
                <Download className="h-4 w-4" />
                Download PDF
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a href={`/recipes/${recipeId}/pdf?print=1`} target="_blank" rel="noopener">
                <Printer className="h-4 w-4" />
                Print
              </a>
            </Button>
          </div>
          {isOwner && (
            <div className="space-y-3 border-t border-border pt-4">
              <div>
                <p className="text-sm font-medium">Share with people</p>
                <p className="text-sm text-muted-foreground">
                  They can see and favorite it, but not change it.
                </p>
              </div>
              {otherUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">There are no other accounts to share with.</p>
              ) : (
                otherUsers.map((username) => (
                  <div key={username} className="flex items-center gap-3">
                    <Checkbox
                      id={`share-${recipeId}-${username}`}
                      checked={shared.includes(username)}
                      onCheckedChange={(checked) => toggle(username, checked === true)}
                    />
                    <Label htmlFor={`share-${recipeId}-${username}`}>{username}</Label>
                  </div>
                ))
              )}
            </div>
          )}
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </span>
  );
}
