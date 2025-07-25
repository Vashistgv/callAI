"use client";

import { ColumnDef } from "@tanstack/react-table";
import { AgentMany } from "../../types";
import GenrateAvatar from "@/components/GenrateAvatar";
import { CornerDownRight, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<AgentMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center gap-x-2">
          <GenrateAvatar
            seed={row.original.name}
            variant="botttsNeutral"
            className="size-6"
          />
          <span className="font-semibold capitalize ">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerDownRight className="size-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize ">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "meetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant={"outline"}
        className="flex items-center gap-x-2 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700" />
        {row.original.meetingCount}{" "}
        {row.original.meetingCount === 1 ? "Meeting" : "Meetings"}
      </Badge>
    ),
  },
];
