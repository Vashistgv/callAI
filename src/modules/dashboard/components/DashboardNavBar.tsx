"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeft, PanelLeftCloseIcon, SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashboardCommand from "./DashboardCommand";

const DashboardNavBar = () => {
  const { isMobile, toggleSidebar, state } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => {
      document.removeEventListener("keydown", down);
    };
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="flex bg-background py-3 px-4 gap-x-2 items-center border-b">
        <Button onClick={toggleSidebar} className="size-9" variant="outline">
          {state === "collapsed" || isMobile ? (
            <PanelLeft className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => setCommandOpen((open) => !open)}
          className="h-9 w-[240px] flex  justify-start text-muted-foreground font-normal
      hover:text-muted-foreground"
        >
          <SearchIcon className="size-4 shrink-0 opacity-50" />
          Search
          <kbd
            className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1
         rounded bg-muted border px-1.5 font-mono text-[10px] font-medium text-muted-foreground"
          >
            <span className="text-xs">&#8984;</span>k
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavBar;
