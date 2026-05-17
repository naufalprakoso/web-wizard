"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isCurrentUserAdmin, onAuthChanged, signOutAdmin } from "@/lib/firebase/auth";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/cms", label: "CMS" },
  { href: "/admin/settings", label: "Theme" }
];

export function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    return onAuthChanged((user) => {
      if (!user || !isCurrentUserAdmin(user)) {
        router.replace("/admin/login");
        return;
      }
      setReady(true);
    });
  }, [router]);

  if (!ready) {
    return <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-sm font-semibold text-slate-600">Checking admin access...</main>;
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:flex-row md:p-6">
        <aside className="rounded-theme border border-slate-200 bg-white p-3 shadow-sm md:sticky md:top-6 md:h-[calc(100vh-48px)] md:w-64">
          <div className="px-3 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Web Wizard</p>
            <p className="mt-1 text-lg font-black text-primary">Admin</p>
          </div>
          <nav className="grid grid-cols-3 gap-2 md:grid-cols-1">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-theme px-3 py-3 text-center text-sm font-bold text-slate-700 hover:bg-slate-100 md:text-left">
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="focus-ring mt-4 w-full rounded-theme border border-slate-200 px-3 py-3 text-sm font-bold text-slate-700"
            onClick={() => void signOutAdmin().then(() => router.replace("/admin/login"))}
          >
            Sign out
          </button>
        </aside>
        <section className="min-w-0 flex-1">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-accent">__APP_DISPLAY_NAME__</p>
              <h1 className="text-3xl font-black text-primary">{title}</h1>
            </div>
            <a className="text-sm font-bold text-accent" href="/" target="_blank" rel="noreferrer">View site</a>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
