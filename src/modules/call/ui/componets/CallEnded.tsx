import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LogInIcon } from "lucide-react";

const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm ">
          <div className="flex flex-col text-center gap-y-2">
            <h6 className="text-lg font-semibold ">Call Ended</h6>
            <p className="text-sm">Summary will be available soon</p>
          </div>

          <div className="flex w-full  justify-between gap-x-2">
            <Button asChild>
              <Link href="/meetings">Back to Meetings</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallEnded;
