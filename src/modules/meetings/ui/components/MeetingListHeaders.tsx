"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import React, { useState } from "react";

import { DEFAULT_PAGE } from "@/constants";
import NewMeetingDialog from "./NewMeetingDialog";

const MeetingsListHeaders = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
        <div className="flex intems-center gap-x-2 p-1">filters</div>
      </div>
    </>
  );
};

export default MeetingsListHeaders;
