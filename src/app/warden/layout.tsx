import { MainLayout } from "@/components/layout/MainLayout";

export default function WardenLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout role="warden" alertCount={3}>
      {children}
    </MainLayout>
  );
}
