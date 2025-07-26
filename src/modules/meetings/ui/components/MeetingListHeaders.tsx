"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, Search, XCircleIcon } from "lucide-react";
import React, { useState } from "react";

import { DEFAULT_PAGE } from "@/constants";
import NewMeetingDialog from "./NewMeetingDialog";
import MettingsSearchFilters from "./MeetingsSearchFilter";
import StatusFilters from "./StatusFilters";
import AgentIdFilters from "./AgentIdFilters";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const MeetingsListHeaders = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isFiltersActive =
    !!filters.search || !!filters.status || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({ search: "", page: DEFAULT_PAGE, status: null, agentId: "" });
  };

  return (
    <>
      <NewMeetingDialog
        open={isDialogOpen}
        onOpenChange={() => {
          setIsDialogOpen(!isDialogOpen);
        }}
      />
      <div className="py-8 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="text-lg font-semibold">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            {" "}
            <PlusIcon /> New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex intems-center gap-x-2 p-1">
            <MettingsSearchFilters />
            <StatusFilters />
            <AgentIdFilters />
            {isFiltersActive && (
              <Button size="sm" variant={"outline"} onClick={onClearFilters}>
                <XCircleIcon className="size-4" />
                Clear filters
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};

export default MeetingsListHeaders;
