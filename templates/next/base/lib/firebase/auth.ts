import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from "firebase/auth";
import { getFirebaseAuth } from "./client";

export function getAdminEmails(): string[] {
  return (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isCurrentUserAdmin(user: User | null): boolean {
  if (!user?.email) return false;
  return getAdminEmails().includes(user.email.toLowerCase());
}

export async function signInAdmin(email: string, password: string): Promise<void> {
  const auth = getFirebaseAuth();
  if (!auth) throw new Error("Firebase is not configured. Copy .env.example to .env.local and fill in your Firebase web app values.");
  const result = await signInWithEmailAndPassword(auth, email, password);
  if (!isCurrentUserAdmin(result.user)) {
    await signOut(auth);
    throw new Error("This email is not allowlisted as an admin.");
  }
}

export function onAuthChanged(callback: (user: User | null) => void): () => void {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => undefined;
  }
  return onAuthStateChanged(auth, callback);
}

export async function signOutAdmin(): Promise<void> {
  const auth = getFirebaseAuth();
  if (auth) await signOut(auth);
}
