import EmptyState from "@/components/EmptyState";
import React from "react";
import { VideoIcon, BanIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
}

const UpComingState = ({ meetingId, onCancelMeeting, isCancelling }: Props) => {
  return (
    <div className="bg-white  items-center justify-center py-4 px-5 gap-y-8 rounded-lg flex-col ">
      <EmptyState
        title="Upcoming Meetings"
        description="No Upcoming Meetings"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center gap-x-2">
        <Button
          disabled={isCancelling}
          asChild
          className="flex items-center gap-x-2"
        >
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meetings
          </Link>
        </Button>

        <Button
          variant={"secondary"}
          className="flex items-center gap-x-2 text-foreground-muted"
          disabled={isCancelling}
          onClick={onCancelMeeting}
        >
          <BanIcon />
          Cancel Meetings
        </Button>
      </div>
    </div>
  );
};

export default UpComingState;
