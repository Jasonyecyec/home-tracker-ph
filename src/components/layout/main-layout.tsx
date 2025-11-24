import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="p-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Toggle sidebar</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="p-5"> {children}</div>
      </main>
    </SidebarProvider>
  );
}
