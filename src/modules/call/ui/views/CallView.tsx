"use client";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import CallProvider from "../componets/CallProvider";

interface Props {
  meetingId: string;
}
export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center justify-center">
        <ErrorState title="Error" description="Meeting has been completed" />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
};

export const CallViewLoading = () => {
  return (
    <LoadingState
      title="Loading Call"
      description="Please wait while we load the call"
    />
  );
};

export const CallViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};
