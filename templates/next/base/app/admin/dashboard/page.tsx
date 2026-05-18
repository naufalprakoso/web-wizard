import { AdminShell } from "@/components/admin/AdminShell";
import { Card } from "@/components/ui/Card";
import { ContactMessages } from "@/components/admin/ContactMessages";

const overviewItems = [
  { label: "CMS content", value: "Ready", detail: "Edit public page and catalog copy." },
  { label: "Theme settings", value: "Active", detail: "Control colors and border radius." },
  { label: "Contact messages", value: "Inbox", detail: "Review visitor inquiries." }
];

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 md:grid-cols-3">
        {overviewItems.map((item) => (
          <Card key={item.label} className="p-5">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-500">{item.label}</p>
            <p className="mt-3 text-3xl font-black text-primary">{item.value}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
          </Card>
        ))}
      </div>
      <section className="mt-6 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <Card className="p-5">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Next steps</p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600">
            <li>Update CMS content and publish product/category records.</li>
            <li>Set brand colors in Theme Settings.</li>
            <li>Replace admin emails in Firestore and Storage rules.</li>
          </ul>
        </Card>
        <ContactMessages />
      </section>
    </AdminShell>
  );
}
