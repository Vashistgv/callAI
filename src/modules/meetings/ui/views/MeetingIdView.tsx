"use client";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React, { useState } from "react";
import MeetingIdHeader from "../components/MeetingIdHeader";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UseConfirm } from "@/hooks/use-confirmation";
import UpdateMeetingDialog from "../components/UpdateMeetingDialog";
import UpComingState from "../components/UpComingState";
import ActiveState from "../components/ActiveState";
import CancelledState from "../components/CancelledState";
import ProcessingState from "../components/ProcessingState";

interface MeetingIdViewProps {
  meetingId: string;
}

export const MeetingIdView = ({ meetingId }: MeetingIdViewProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const route = useRouter();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

  const [RemoveConfirmation, confirmRemove] = UseConfirm(
    "Remove Meeting",
    "Are you sure you want to remove this meeting?"
  );

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        route.push("/meetings");
      },
      onError: (error) => {
        toast.error("Something went wrong");
      },
    })
  );

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove();
    if (ok) {
      removeMeeting.mutate({ id: data.id });
    }
  };

  const isActive = data.status === "active";
  const isCompleted = data.status === "completed";
  const isCancelled = data.status === "cancelled";
  const isProcessing = data.status === "processing";
  const isUpcoming = data.status === "upcoming";

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        intialValues={data}
      />
      <div className="flex flex-1 py-4 px-4 md:px-8 flex-col gap-y-4">
        <MeetingIdHeader
          meetingId={data.id}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handleRemoveMeeting}
        />
        {isProcessing && <ProcessingState />}
        {isUpcoming && (
          <UpComingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
        {isCompleted && <div>Completed</div>}
        {isCancelled && <CancelledState />}
        {isActive && <ActiveState meetingId={meetingId} />}
      </div>
    </>
  );
};

export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meeting..."
      description="It May take a while"
    />
  );
};

export const MeetingViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};
