"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";
import NewAgentDialog from "./NewAgentDialog";

const AgentListHeaders = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  return (
    <>
      <NewAgentDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      <div className="py-8 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-semibold">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            {" "}
            <PlusIcon /> New Agents
          </Button>
        </div>
      </div>
    </>
  );
};

export default AgentListHeaders;
