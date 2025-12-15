import MainLayout from "@/components/layout/main-layout";
import { QueryProvider } from "@/components/provider/query-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <MainLayout>{children}</MainLayout>
    </QueryProvider>
  );
}
