import "server-only";
import sharp from "sharp";

// Recipe photo processing. Everything uploaded goes through here before it's stored:
// the bytes are decoded to prove they're an image, then re-encoded from scratch,
// so nothing from the original file (metadata, GPS location, hidden payloads) survives.

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
const MAX_INPUT_PIXELS = 50_000_000; // ~50 MP, above any phone camera; stops decompression bombs
const MAX_EDGE = 1600;
const ALLOWED_FORMATS = new Set(["jpeg", "png", "webp"]);

// One image at a time is plenty here and keeps memory predictable
sharp.concurrency(1);

export type ProcessedImage = { data: Uint8Array<ArrayBuffer>; width: number; height: number };

export class ImageError extends Error {}

export async function processRecipePhoto(file: File): Promise<ProcessedImage> {
  if (file.size === 0) throw new ImageError("The photo is empty");
  if (file.size > MAX_UPLOAD_BYTES) throw new ImageError("The photo is too large (max 8 MB)");

  const input = Buffer.from(await file.arrayBuffer());
  const options = { limitInputPixels: MAX_INPUT_PIXELS, sequentialRead: true, failOn: "error" } as const;

  let format: string | undefined;
  try {
    // Reads only the header: rejects non-images and too-many-pixel files before decoding
    format = (await sharp(input, options).metadata()).format;
  } catch {
    throw new ImageError("That file isn't a photo we can read. Please choose a JPG or PNG.");
  }
  if (!format || !ALLOWED_FORMATS.has(format)) {
    throw new ImageError("Please choose a JPG, PNG or WebP photo.");
  }

  try {
    const { data, info } = await sharp(input, options)
      .rotate() // apply the EXIF orientation, then it's dropped with the rest of the metadata
      .resize(MAX_EDGE, MAX_EDGE, { fit: "inside", withoutEnlargement: true })
      .flatten({ background: "#ffffff" }) // transparent PNGs get a white background in JPEG
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer({ resolveWithObject: true });
    // Plain Uint8Array copy: what Prisma's Bytes field expects
    return { data: new Uint8Array(data), width: info.width, height: info.height };
  } catch {
    throw new ImageError("That photo couldn't be processed. Please try a different one.");
  }
}
