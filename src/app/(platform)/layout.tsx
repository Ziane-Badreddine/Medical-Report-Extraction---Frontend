import { AppSidebar } from "@/components/platform/app-sidebar";
import { SearchDialog } from "@/components/platform/SearchDialog";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ProtectedRoute } from "@/providers/ProtectedRoute";
import { ReactNode } from "react";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>

    <SidebarProvider>
      <AppSidebar />
      <SearchDialog />
      <main className="w-full flex-1">
        <SidebarTrigger size={"icon-lg"} className=" flex md:hidden m-2" />
        {children}
      </main>
      ;
    </SidebarProvider>
    </ProtectedRoute>
  );
}
