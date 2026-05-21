import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { getFirebaseDb } from "@/lib/firebase/client";

export async function getCmsDocument<T>(documentId: string, fallback: T): Promise<T> {
  const db = getFirebaseDb();
  if (!db) return fallback;
  const snapshot = await getDoc(doc(db, "cms", documentId));
  return snapshot.exists() ? ({ ...fallback, ...snapshot.data() } as T) : fallback;
}

export async function saveCmsDocument<T extends Record<string, unknown>>(documentId: string, data: T): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore is not configured.");
  await setDoc(doc(db, "cms", documentId), { ...data, updatedAt: serverTimestamp() }, { merge: true });
}

export async function getPublishedCmsDocument<T extends { published?: boolean }>(documentId: string, fallback: T): Promise<T | null> {
  const db = getFirebaseDb();
  if (!db) return fallback;

  try {
    const snapshot = await getDoc(doc(db, "cms", documentId));
    if (!snapshot.exists()) return null;
    const data = { ...fallback, ...snapshot.data() } as T;
    return data.published ? data : null;
  } catch {
    return null;
  }
}

export async function listCollection<T>(collectionName: string): Promise<Array<T & { id: string }>> {
  const db = getFirebaseDb();
  if (!db) return [];
  const snapshot = await getDocs(query(collection(db, collectionName), orderBy("createdAt", "desc")));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() } as T & { id: string }));
}

export async function listPublishedCollection<T>(collectionName: string): Promise<Array<T & { id: string }> | null> {
  const db = getFirebaseDb();
  if (!db) return null;

  const snapshot = await getDocs(query(collection(db, collectionName), where("published", "==", true)));
  return snapshot.docs
    .map((item) => ({ id: item.id, ...item.data() } as T & { id: string }))
    .sort((a, b) => timestampMillis((b as Record<string, unknown>).createdAt) - timestampMillis((a as Record<string, unknown>).createdAt));
}

export async function getCollectionItem<T>(collectionName: string, id: string): Promise<(T & { id: string }) | null> {
  const db = getFirebaseDb();
  if (!db) return null;
  const snapshot = await getDoc(doc(db, collectionName, id));
  return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data() } as T & { id: string }) : null;
}

export async function getPublishedCollectionItem<T extends { published?: boolean }>(collectionName: string, id: string): Promise<(T & { id: string }) | null> {
  const db = getFirebaseDb();
  if (!db) return null;

  try {
    const snapshot = await getDoc(doc(db, collectionName, id));
    if (!snapshot.exists()) return null;
    const data = { id: snapshot.id, ...snapshot.data() } as T & { id: string };
    return data.published ? data : null;
  } catch {
    return null;
  }
}

export async function addCollectionItem<T extends Record<string, unknown>>(collectionName: string, data: T): Promise<string> {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore is not configured.");
  const item = await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  return item.id;
}

export async function saveCollectionItem<T extends Record<string, unknown>>(collectionName: string, id: string, data: T): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore is not configured.");
  const itemRef = doc(db, collectionName, id);
  const snapshot = await getDoc(itemRef);
  await setDoc(
    itemRef,
    {
      ...data,
      ...(!snapshot.exists() ? { createdAt: serverTimestamp() } : {}),
      updatedAt: serverTimestamp()
    },
    { merge: true }
  );
}

export async function updateCollectionItem<T extends Record<string, unknown>>(collectionName: string, id: string, data: T): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore is not configured.");
  await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: serverTimestamp() });
}

export async function deleteCollectionItem(collectionName: string, id: string): Promise<void> {
  const db = getFirebaseDb();
  if (!db) throw new Error("Firestore is not configured.");
  await deleteDoc(doc(db, collectionName, id));
}

function timestampMillis(value: unknown): number {
  if (value && typeof value === "object" && "toMillis" in value && typeof value.toMillis === "function") {
    return value.toMillis();
  }
  return 0;
}
