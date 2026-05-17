"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

export function PublicHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4">
        <a href="/" className="font-black tracking-tight text-primary">__PROJECT_NAME__</a>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-primary">{item.label}</a>
          ))}
          <ButtonLink href="/admin/login" variant="ghost" className="px-3">Admin</ButtonLink>
        </nav>
        <button
          type="button"
          className="focus-ring min-h-11 rounded-theme border border-slate-200 px-4 text-sm font-bold md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
        >
          Menu
        </button>
      </div>
      {open ? (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-theme px-3 py-3 font-semibold hover:bg-slate-50" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="/admin/login" className="rounded-theme px-3 py-3 font-semibold hover:bg-slate-50">Admin</a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
