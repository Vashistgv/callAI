"use client";
import React, { use } from "react";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

export const AgentView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return <div>{JSON.stringify(data)}</div>;
};

export const AgentViewLoading = () => {
  return (
    <LoadingState title="Loading Agents..." description="It May take a while" />
  );
};

export const AgentViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};
