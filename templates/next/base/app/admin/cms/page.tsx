import { AdminShell } from "@/components/admin/AdminShell";
import { AppContentForm } from "@/lib/app-type/cms/admin-form";

export default function AdminCmsPage() {
  return (
    <AdminShell title="CMS">
      <AppContentForm />
    </AdminShell>
  );
}
