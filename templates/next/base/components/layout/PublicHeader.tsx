"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";

const appType: string = "__APP_TYPE__";
const showAdminLink = process.env.NEXT_PUBLIC_SHOW_ADMIN_LINK === "true";

const defaultNavItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

const portfolioNavItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" }
];

const serviceBusinessNavItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#about" },
  { label: "Packages", href: "/#packages" },
  { label: "Contact", href: "/#contact" }
];

const productCatalogNavItems = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/#categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export function PublicHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navItems = appType === "product-catalog" ? productCatalogNavItems : appType === "portfolio" ? portfolioNavItems : appType === "service-business" ? serviceBusinessNavItems : defaultNavItems;

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="section-shell flex min-h-16 items-center justify-between gap-4">
        <a href="/" className="min-w-0 truncate text-lg font-black tracking-tight text-primary">__PROJECT_NAME__</a>
        <nav className="hidden items-center gap-1 text-sm font-bold text-slate-700 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
          {showAdminLink ? <ButtonLink href="/admin/login" variant="ghost" className="ml-2 px-3">Admin</ButtonLink> : null}
        </nav>
        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-theme border border-slate-200 bg-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation"
        >
          <span className="grid gap-1.5">
            <span className="block h-0.5 w-5 rounded-full bg-primary" />
            <span className="block h-0.5 w-5 rounded-full bg-primary" />
            <span className="block h-0.5 w-5 rounded-full bg-primary" />
          </span>
        </button>
      </div>
      {open ? (
        <nav id="mobile-navigation" className="border-t border-slate-200 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-theme px-3 py-3 font-bold transition ${isActive(item.href, pathname) ? "bg-page text-primary" : "text-slate-700 hover:bg-slate-50 hover:text-accent"}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {showAdminLink ? (
              <a href="/admin/login" className="rounded-theme px-3 py-3 font-bold text-slate-700 hover:bg-slate-50" onClick={() => setOpen(false)}>
                Admin
              </a>
            ) : null}
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function NavLink({ item, pathname }: { item: { label: string; href: string }; pathname: string }) {
  const active = isActive(item.href, pathname);
  return (
    <a
      href={item.href}
      className={`rounded-full px-3 py-2 transition ${active ? "bg-page text-primary" : "hover:bg-slate-50 hover:text-accent"}`}
    >
      {item.label}
    </a>
  );
}

function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  if (href.startsWith("/#")) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}
