"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MeetingGetMany } from "../../types";
import GenrateAvatar from "@/components/GenrateAvatar";
import {
  CircleCheck,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFading,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import humanizeDuration from "humanize-duration";

import { cn } from "@/lib/utils";

function formatDuration(duration: number) {
  return humanizeDuration(duration * 1000, {
    largest: 1,
    round: true,
    units: ["h", "m", "s"],
  });
}

const statusIconMap = {
  upcoming: ClockArrowUpIcon,
  active: LoaderIcon,
  completed: CircleCheck,
  processing: LoaderIcon,
  cancelled: CircleXIcon,
};

const statusColorMap = {
  upcoming: "bg-yellow-500/20 text-yellow-800 border-yellow-800/20",
  active: "bg-blue-500/20 text-blue-800 border-blue-800/20",
  completed: "bg-green-500/20 text-green-800 border-green-800/20",
  processing: "bg-gray-500/20 text-gray-800 border-gray-800/20",
  cancelled: "bg-rose-500/20 text-rose-800 border-rose-800/20",
};
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<MeetingGetMany[number]>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-2">
        <span className="font-semibold capitalize">{row.original.name}</span>
        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-x-1">
            <CornerDownRightIcon className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize ">
              {row.original.agent.name}
            </span>
          </div>
          <GenrateAvatar
            seed={row.original.agent.name}
            variant="botttsNeutral"
            className="size-4"
          />
          <span className="text-sm text-muted-foreground max-w-[200px]">
            {row.original.startedAt
              ? format(row.original.startedAt, "MM d")
              : ""}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const Icon = statusIconMap[row.original.status];
      const color = statusColorMap[row.original.status];
      return (
        <Badge className={color} variant={"outline"}>
          <Icon
            className={cn(
              "size-4",
              row.original.status === "processing" && "animate-spin"
            )}
          />
          <span className="text-xs capitalize">{row.original.status}</span>
        </Badge>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      return (
        <Badge
          variant={"outline"}
          className="flex items-center gap-x-2 [&>svg]:size-4"
        >
          <ClockFadingIcon className="text-blue-700" />
          <span className="text-xs capitalize">
            {row.original.duration
              ? formatDuration(row.original.duration)
              : "NO DURATION AVAILABLE"}
          </span>
        </Badge>
      );
    },
  },
];
