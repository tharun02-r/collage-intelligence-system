import { MainLayout } from "@/components/layout/MainLayout";
import { CampusMindBot } from "@/components/features/CampusMindBot";

export default function CounselorLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout role="counselor" alertCount={3}>
      {children}
      <CampusMindBot role="counselor" />
    </MainLayout>
  );
}
