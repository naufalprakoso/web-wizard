type VisualProps = {
  alt?: string;
  imageUrl?: string;
  variant: "landing" | "company";
};

export function GeneratedHeroVisual({ alt = "", imageUrl = "", variant }: VisualProps) {
  if (imageUrl) {
    return <img className="aspect-[4/3] w-full rounded-theme object-cover shadow-2xl" src={imageUrl} alt={alt} />;
  }

  if (variant === "company") {
    return <img className="aspect-[5/4] w-full rounded-theme border border-white/15 bg-white/10 object-cover shadow-2xl" src="/template-visuals/company-operations.svg" alt={alt || "Company capability visual"} />;
  }

  return <img className="aspect-[4/3] w-full rounded-theme border border-slate-200 bg-white object-cover shadow-2xl" src="/template-visuals/landing-offer.svg" alt={alt || "Landing page campaign visual"} />;
}
