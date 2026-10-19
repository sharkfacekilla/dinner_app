// Shrinks a photo in the browser before it's uploaded, so people can pick huge camera
// photos without compressing them first. Only the small copy is sent; the original
// never leaves the device. This is a convenience: the server checks and re-processes
// everything anyway (lib/images.ts).

export const MAX_ORIGINAL_BYTES = 50 * 1024 * 1024;
const MAX_EDGE = 2000;
const QUALITY = 0.85;

export class CompressError extends Error {}

export async function compressImage(file: File): Promise<File> {
  if (file.size > MAX_ORIGINAL_BYTES) {
    throw new CompressError("That photo is too large (max 50 MB).");
  }

  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new CompressError("That file isn't a photo we can read. Please choose a JPG or PNG.");
  }

  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new CompressError("Your browser couldn't process the photo.");
  ctx.fillStyle = "#ffffff"; // transparent PNGs become white, not black
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", QUALITY));
  canvas.width = canvas.height = 0; // free the canvas memory right away (matters on phones)
  if (!blob) throw new CompressError("Your browser couldn't process the photo.");

  return new File([blob], "photo.jpg", { type: "image/jpeg" });
}
