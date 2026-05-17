import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getFirebaseStorage } from "./client";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const maxUploadSize = 5 * 1024 * 1024;

export async function uploadImage(file: File, folder = "uploads"): Promise<string> {
  if (!allowedImageTypes.has(file.type)) throw new Error("Only JPG, PNG, WebP, or GIF files are allowed.");
  if (file.size > maxUploadSize) throw new Error("Images must be 5MB or smaller.");

  const storage = getFirebaseStorage();
  if (!storage) throw new Error("Firebase Storage is not configured.");

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileRef = ref(storage, `${folder}/${Date.now()}-${safeName}`);
  await uploadBytes(fileRef, file, { contentType: file.type });
  return getDownloadURL(fileRef);
}
