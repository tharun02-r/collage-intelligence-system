import { MainLayout } from "@/components/layout/MainLayout";

export default function FacilityLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout role="facility" alertCount={2}>
      {children}
    </MainLayout>
  );
}
