const appType: string = "__APP_TYPE__";

export function PublicFooter() {
  const productCatalog = appType === "product-catalog";

  return (
    <footer className="border-t border-slate-200 bg-slate-950 py-10 text-white">
      <div className="section-shell grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <p className="text-lg font-black tracking-tight">__PROJECT_NAME__</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
            {productCatalog
              ? "A product catalog built for browsing, comparison, and direct inquiry."
              : "A responsive website built for clear content management."}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-slate-300 md:justify-end">
          <a className="hover:text-white" href="/">Home</a>
          {productCatalog ? <a className="hover:text-white" href="/products">Products</a> : null}
          <a className="hover:text-white" href={productCatalog ? "/about" : "/#about"}>About</a>
          <a className="hover:text-white" href={productCatalog ? "/contact" : "/#contact"}>Contact</a>
        </div>
      </div>
      <div className="section-shell mt-8 border-t border-white/10 pt-6 text-xs text-slate-400">
        <p>© {new Date().getFullYear()} __PROJECT_NAME__. All rights reserved.</p>
      </div>
    </footer>
  );
}
