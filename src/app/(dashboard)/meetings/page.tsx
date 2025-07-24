import {
  MeetingViews,
  MeetingViewLoading,
  MeetingViewError,
} from "@/modules/meetings/ui/views/MeetingViews";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingViewLoading />}>
        <ErrorBoundary fallback={<MeetingViewError />}>
          <MeetingViews />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
