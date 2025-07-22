"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React from "react";
import NewAgentDialog from "./NewAgentDialog";
import AgentsSearchFilters from "./AgentsSearchFilters";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DEFAULT_PAGE } from "@/constants";

const AgentListHeaders = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [filters, setFilters] = useAgentsFilters();
  const isFiltersActive = !!filters.search;

  const onClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE });
  };

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
        <div className="flex intems-center gap-x-2 p-1">
          <AgentsSearchFilters />
          {isFiltersActive && (
            <Button size="sm" variant={"outline"} onClick={onClearFilters}>
              <XCircleIcon />
              Clear filters
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentListHeaders;
