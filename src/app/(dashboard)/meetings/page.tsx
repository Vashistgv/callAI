import MeetingsListHeaders from "@/modules/meetings/ui/components/MeetingListHeaders";
import {
  MeetingViews,
  MeetingViewLoading,
  MeetingViewError,
} from "@/modules/meetings/ui/views/MeetingViews";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { loadSearchParams } from "@/modules/meetings/hooks/Params";
import type { SearchParams } from "nuqs";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  searchParams: SearchParams;
}

const page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({ ...filters })
  );

  return (
    <>
      <MeetingsListHeaders />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<MeetingViewLoading />}>
          <ErrorBoundary fallback={<MeetingViewError />}>
            <MeetingViews />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default page;
