import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main className="section-shell py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">Web Wizard</p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold leading-tight">__APP_DISPLAY_NAME__</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          This page is replaced by the selected app type template during generation.
        </p>
      </main>
      <PublicFooter />
    </>
  );
}
