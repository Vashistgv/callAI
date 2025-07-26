import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  MeetingIdView,
  MeetingViewError,
  MeetingViewLoading,
} from "@/modules/meetings/ui/views/MeetingIdView";

interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { meetingId } = await params;
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );
  return (
    <HydrationBoundary>
      <Suspense fallback={<MeetingViewLoading />}>
        <ErrorBoundary fallback={<MeetingViewError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
