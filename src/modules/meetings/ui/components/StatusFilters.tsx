import React from "react";
import {
  CircleCheck,
  CircleXIcon,
  ClockArrowUpIcon,
  ClockFading,
  ClockFadingIcon,
  CornerDownRightIcon,
  LoaderIcon,
  VideoIcon,
} from "lucide-react";
import CommandSelect from "@/components/CommandSelect";
import { MeetingStatus } from "../../types";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

const options = [
  {
    id: MeetingStatus.Upcoming,
    value: MeetingStatus.Upcoming,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <ClockArrowUpIcon />
        {MeetingStatus.Upcoming}
      </div>
    ),
  },
  {
    id: MeetingStatus.Active,
    value: MeetingStatus.Active,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <VideoIcon />
        {MeetingStatus.Active}
      </div>
    ),
  },
  {
    id: MeetingStatus.Completed,
    value: MeetingStatus.Completed,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleCheck />
        {MeetingStatus.Completed}
      </div>
    ),
  },
  {
    id: MeetingStatus.Processing,
    value: MeetingStatus.Processing,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <LoaderIcon />
        {MeetingStatus.Processing}
      </div>
    ),
  },
  {
    id: MeetingStatus.Cancelled,
    value: MeetingStatus.Cancelled,
    children: (
      <div className="flex items-center gap-x-2 capitalize">
        <CircleXIcon />
        {MeetingStatus.Cancelled}
      </div>
    ),
  },
];
const StatusFilters = () => {
  const [filters, setFilters] = useMeetingsFilters();

  return (
    <div>
      <CommandSelect
        placeholder="Filter by status"
        className="h-9"
        options={options}
        value={filters.status ?? ""}
        onSelect={(value) => setFilters({ status: value as MeetingStatus })}
      />
    </div>
  );
};

export default StatusFilters;
