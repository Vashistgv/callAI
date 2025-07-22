import {
  AgentView,
  AgentViewLoading,
  AgentViewError,
} from "@/modules/agents/ui/views/AgentView";
import React, { Suspense } from "react";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import AgentListHeaders from "@/modules/agents/ui/components/AgentListHeaders";
import type { SearchParams } from "nuqs";
import { loadSearchParams } from "@/modules/agents/hooks/Params";

interface Props {
  searchParams: Promise<SearchParams>;
}

const AgentPage = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  );

  return (
    <>
      <AgentListHeaders />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentViewLoading />}>
          <ErrorBoundary fallback={<AgentViewError />}>
            <AgentView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default AgentPage;
