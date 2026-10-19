"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ImageIcon, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { compressImage, CompressError } from "@/lib/client/compress-image";

// Pick a photo; it's shrunk on the device (lib/client/compress-image.ts) and the small
// copy is handed to onChange. Used by the create form and the "Change photo" dialog.
export function PhotoPicker({
  value,
  onChange,
  currentImage,
}: {
  value: File | null;
  onChange: (file: File | null) => void;
  currentImage?: string; // shown when nothing new has been picked
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Preview URL for the picked (compressed) photo; freed when it changes or the picker goes away
  const preview = useMemo(() => (value ? URL.createObjectURL(value) : null), [value]);
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview);
  }, [preview]);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    setBusy(true);
    try {
      onChange(await compressImage(file));
    } catch (e) {
      setError(e instanceof CompressError ? e.message : "That photo couldn't be used. Please try another.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = ""; // allow picking the same file again
    }
  };

  const shown = preview ?? currentImage;

  return (
    <div className="space-y-2">
      <input
        ref={inputRef}
        type="file"
        // Listing these (not HEIC) makes iPhones hand over a JPEG
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {shown ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-border bg-muted">
          <img src={shown} alt="Recipe photo" className="h-full w-full object-cover" />
          {value && (
            <button
              type="button"
              aria-label="Remove photo"
              onClick={() => onChange(null)}
              className="absolute top-2 right-2 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm hover:bg-black/70"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="flex aspect-video w-full max-w-sm flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background/50 text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
        >
          {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImageIcon className="h-6 w-6" />}
          {busy ? "Preparing photo..." : "Add a photo"}
        </button>
      )}
      {shown && (
        <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImageIcon className="h-4 w-4" />}
          {busy ? "Preparing photo..." : "Choose a different photo"}
        </Button>
      )}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
