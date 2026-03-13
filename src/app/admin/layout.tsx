import { MainLayout } from "@/components/layout/MainLayout";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout role="admin" alertCount={0}>
      {children}
    </MainLayout>
  );
}
