import { doc, getDoc, setDoc } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase/client";
import type { ThemeSettings } from "./theme-types";

export async function getThemeSettings(fallback: ThemeSettings): Promise<ThemeSettings> {
  const db = getFirebaseDb();
  if (!db) return fallback;
  const snapshot = await getDoc(doc(db, "siteSettings", "theme"));
  return snapshot.exists() ? ({ ...fallback, ...snapshot.data() } as ThemeSettings) : fallback;
}

export async function saveThemeSettings(theme: ThemeSettings): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore is not configured.");
  await setDoc(doc(db, "siteSettings", "theme"), theme, { merge: true });
}
