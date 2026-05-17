import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";
import { ContactMessages } from "@/components/admin/ContactMessages";

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        {["CMS content", "Theme settings", "Contact messages"].map((item) => (
          <Card key={item} className="p-5">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">{item}</p>
            <p className="mt-3 text-3xl font-black text-primary">Ready</p>
          </Card>
        ))}
      </div>
      <section className="mt-6">
        <ContactMessages />
      </section>
    </AdminShell>
  );
}
