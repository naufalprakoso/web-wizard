export function PublicFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-10">
      <div className="section-shell flex flex-col gap-4 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} __PROJECT_NAME__. All rights reserved.</p>
        <p>Built for clear content management.</p>
      </div>
    </footer>
  );
}
