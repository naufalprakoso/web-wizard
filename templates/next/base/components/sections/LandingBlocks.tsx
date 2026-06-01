import { ButtonLink } from "@/components/ui/Button";

export function SectionHeader({
  label,
  title,
  body,
  align = "left"
}: {
  label?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label ? <p className="text-sm font-black uppercase tracking-widest text-accent">{label}</p> : null}
      <h2 className="mt-3 text-3xl font-black leading-tight text-primary md:text-4xl">{title}</h2>
      {body ? <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">{body}</p> : null}
    </div>
  );
}

export function TrustBar({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  const dark = tone === "dark";

  return (
    <div className={`grid gap-3 sm:grid-cols-3 ${dark ? "text-white" : ""}`}>
      {items.map((item) => (
        <div key={item} className={`rounded-theme border p-4 shadow-sm ${dark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"}`}>
          <p className={`text-sm font-black leading-6 ${dark ? "text-white" : "text-primary"}`}>{item}</p>
        </div>
      ))}
    </div>
  );
}

export function FinalCTA({
  title,
  body,
  ctaHref,
  ctaLabel
}: {
  title: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <section className="bg-primary py-16 text-white md:py-20">
      <div className="section-shell grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <h2 className="text-3xl font-black leading-tight md:text-4xl">{title}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-white/75">{body}</p>
        </div>
        <ButtonLink href={ctaHref} variant="secondary">{ctaLabel}</ButtonLink>
      </div>
    </section>
  );
}
