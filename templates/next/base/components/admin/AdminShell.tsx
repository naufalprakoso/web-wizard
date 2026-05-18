"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isCurrentUserAdmin, onAuthChanged, signOutAdmin } from "@/lib/firebase/auth";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", helper: "Overview" },
  { href: "/admin/cms", label: "CMS", helper: "Content" },
  { href: "/admin/settings", label: "Theme", helper: "Branding" }
];

export function AdminShell({ children, title }: { children: React.ReactNode; title: string }) {
  const router = useRouter();
  const pathname = usePathname();
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
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
        <div className="rounded-theme border border-slate-200 bg-white p-6 text-sm font-semibold text-slate-600 shadow-sm">Checking admin access...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 p-4 lg:flex-row lg:p-6">
        <aside className="rounded-theme border border-slate-200 bg-white p-3 shadow-sm lg:sticky lg:top-6 lg:h-[calc(100vh-48px)] lg:w-72">
          <div className="px-3 py-4">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Web Template Wizard</p>
            <p className="mt-1 text-xl font-black text-primary">Admin CMS</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Manage content, catalog data, theme, and visitor messages.</p>
          </div>
          <nav className="grid grid-cols-3 gap-2 lg:grid-cols-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`rounded-theme px-3 py-3 text-center transition lg:text-left ${active ? "bg-primary text-white" : "text-slate-700 hover:bg-slate-100"}`}
                >
                  <span className="block text-sm font-black">{item.label}</span>
                  <span className={`hidden text-xs lg:block ${active ? "text-white/75" : "text-slate-500"}`}>{item.helper}</span>
                </a>
              );
            })}
          </nav>
          <div className="mt-4 grid gap-2 border-t border-slate-200 pt-4">
            <a className="rounded-theme px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100" href="/" target="_blank" rel="noreferrer">View public site</a>
            <button
              type="button"
              className="focus-ring w-full rounded-theme border border-slate-200 px-3 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50"
              onClick={() => void signOutAdmin().then(() => router.replace("/admin/login"))}
            >
              Sign out
            </button>
          </div>
        </aside>
        <section className="min-w-0 flex-1">
          <div className="mb-5 rounded-theme border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-bold uppercase tracking-widest text-accent">__APP_DISPLAY_NAME__</p>
            <h1 className="mt-2 text-3xl font-black text-primary md:text-4xl">{title}</h1>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
