import EmptyState from "@/components/EmptyState";
import React from "react";
import { VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  meetingId: string;
}

const ActiveState = ({ meetingId }: Props) => {
  return (
    <div className="bg-white  items-center justify-center py-4 px-5 gap-y-8 rounded-lg flex-col ">
      <EmptyState
        title="Active Meetings"
        description="Meeting Will end once all participants leave"
        image="/upcoming.svg"
      />
      <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-center gap-x-2">
        <Button asChild className="flex items-center gap-x-2">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Join Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ActiveState;
