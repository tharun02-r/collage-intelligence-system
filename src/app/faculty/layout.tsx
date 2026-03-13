import { MainLayout } from "@/components/layout/MainLayout";

export default function FacultyLayout({ children }: { children: React.ReactNode }) {
  return (
    <MainLayout role="faculty" alertCount={1}>
      {children}
    </MainLayout>
  );
}
