"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { setRecipePhoto } from "@/lib/actions/recipe";
import { PhotoPicker } from "./photopicker";

// Owner-only: replace (or add) the photo on an existing recipe
export function ChangePhotoDialog({ recipeId, currentImage }: { recipeId: string; currentImage?: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const save = async () => {
    if (!photo) return;
    setSaving(true);
    setError(null);
    const formData = new FormData();
    formData.append("photo", photo);
    const result = await setRecipePhoto(recipeId, formData).catch(() => ({
      success: false as const,
      error: "Couldn't upload the photo. Try a smaller one.",
    }));
    setSaving(false);
    if (!result.success) return setError(result.error ?? "Something went wrong");
    setOpen(false);
    setPhoto(null);
    router.refresh();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) {
          setPhoto(null);
          setError(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary" className="gap-2 bg-card/90 backdrop-blur-sm">
          <Camera className="h-4 w-4" />
          {currentImage ? "Change photo" : "Add photo"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Recipe photo</DialogTitle>
          <DialogDescription>Pick any photo; big ones are shrunk automatically.</DialogDescription>
        </DialogHeader>
        <PhotoPicker value={photo} onChange={setPhoto} currentImage={currentImage} />
        {error && (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        )}
        <Button onClick={save} disabled={!photo || saving} className="gap-2">
          {saving && <Loader2 className="h-4 w-4 animate-spin" />}
          {saving ? "Saving..." : "Save photo"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
