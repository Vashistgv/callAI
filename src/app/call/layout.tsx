import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardNavBar from "@/modules/dashboard/components/DashboardNavBar";
import DashboardSideBar from "@/modules/dashboard/components/DashboardSideBar";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return <div className="h-screen w-screen bg-black">{children}</div>;
};

export default layout;
