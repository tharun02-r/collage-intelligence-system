import { MainLayout } from "@/components/layout/MainLayout";
import { CampusMindBot } from "@/components/features/CampusMindBot";
import { SilentSOS } from "@/components/features/SilentSOS";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout role="student" alertCount={1}>
      {children}
      <CampusMindBot role="student" />
      <SilentSOS />
    </MainLayout>
  );
}
