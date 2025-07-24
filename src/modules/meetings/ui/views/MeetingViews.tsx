"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { DataTable } from "@/components/DataTable";
import { columns } from "../components/Columns";
import EmptyState from "@/components/EmptyState";
export const MeetingViews = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div>
      <DataTable data={data.items} columns={columns} />
      <EmptyState title="No Meetings" description="Please Add Meetings" />
    </div>
  );
};

MeetingViews;

export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings..."
      description="It May take a while"
    />
  );
};

export const MeetingViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};
