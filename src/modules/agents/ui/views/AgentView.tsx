"use client";
import React, { use } from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";
import { DataTable } from "../components/DataTable";
import { columns } from "../components/Columns";

export const AgentView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <>
      <div className="flex flex-1  pb-4 px-4 md:px-8 flex-col gap-y-4">
        <DataTable columns={columns} data={data} />
        {data?.length === 0 && (
          <EmptyState title="No Agents" description="Please Add Agents" />
        )}
      </div>
    </>
  );
};

export const AgentViewLoading = () => {
  return (
    <LoadingState title="Loading Agents..." description="It May take a while" />
  );
};

export const AgentViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};
