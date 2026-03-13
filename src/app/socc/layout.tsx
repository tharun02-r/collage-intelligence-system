import { MainLayout } from "@/components/layout/MainLayout";

export default function SOCCLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout role="socc" alertCount={4}>
      {children}
    </MainLayout>
  );
}
