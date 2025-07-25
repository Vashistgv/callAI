import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavBar from "@/modules/dashboard/components/DashboardNavBar";
import DashboardSideBar from "@/modules/dashboard/components/DashboardSideBar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSideBar />
      <main className="flex flex-col h-screen w-screen bg-muted ">
        <DashboardNavBar />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default layout;
