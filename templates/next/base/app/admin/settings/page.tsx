import { AdminShell } from "@/components/admin/AdminShell";
import { ThemeSettingsForm } from "@/components/admin/ThemeSettingsForm";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Theme settings">
      <ThemeSettingsForm />
    </AdminShell>
  );
}
