"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { signInAdmin } from "@/lib/firebase/auth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInAdmin(email, password);
      router.replace("/admin/dashboard");
    } catch (loginError) {
      const message = loginError instanceof Error ? loginError.message : "Unable to sign in.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-theme bg-white p-6 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">__PROJECT_NAME__</p>
        <h1 className="mt-2 text-3xl font-black text-primary">Admin login</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Use a Firebase Auth account whose email is allowlisted for this site.</p>
        <label className="mt-6 block text-sm font-bold text-slate-700">
          Email
          <input className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 px-4" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label className="mt-4 block text-sm font-bold text-slate-700">
          Password
          <input className="focus-ring mt-2 min-h-12 w-full rounded-theme border border-slate-300 px-4" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </label>
        {error ? <p className="mt-4 rounded-theme bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p> : null}
        <Button className="mt-6 w-full" type="submit" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</Button>
      </form>
    </main>
  );
}
