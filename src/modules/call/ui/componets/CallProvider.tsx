"use client";
import React from "react";
import { Loader2Icon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { GenrateAvatar } from "@/lib/avatar";
import CallConnect from "./CallConnect";

interface Props {
  meetingId: string;
  meetingName: string;
}

const CallProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();
  console.log(!data, !isPending);
  if (!data || isPending) {
    return (
      <div className="flex items-center justify-center h-screen  bg-radial from-sidebar-accent to-sidebar">
        <Loader2Icon className="animate-spin size-6 text-white" />
      </div>
    );
  }

  return (
    <div>
      <CallConnect
        meetingId={meetingId}
        meetingName={meetingName}
        userId={data.user.id}
        userName={data.user.name}
        userImage={
          data.user.image ??
          GenrateAvatar({
            seed: data.user.name,
            variant: "initials",
          })
        }
      />
    </div>
  );
};

export default CallProvider;
