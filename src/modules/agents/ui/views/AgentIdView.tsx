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
import AgentIdHeader from "../components/AgentIdHeader";
import GenrateAvatar from "@/components/GenrateAvatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UseConfirm } from "@/hooks/use-confirmation";
import UpdateAgentDialog from "../components/UpdateAgentDialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const route = useRouter();
  const trpc = useTRPC();
  const [updateAgentDialog, setUpdateAgentDialog] = useState(false);
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        route.push("/agents");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation, confrimRemove] = UseConfirm(
    "Remove Agent",
    `Are you sure you want to remove this agent? This action will remove ${data.meetingCount} associated meetings`
  );

  const handleRemoveAgent = async () => {
    const ok = await confrimRemove();

    if (!ok) return;
    await removeAgent.mutateAsync({ id: agentId });
  };

  return (
    <>
      <RemoveConfirmation />
      <UpdateAgentDialog
        open={updateAgentDialog}
        onOpenChange={setUpdateAgentDialog}
        initialValues={data}
      />
      <div className="flex flex-1  py-4 px-4 md:px-9 flex-col gap-y-4">
        <AgentIdHeader
          agentId={agentId}
          agentName={data.name}
          onEdit={() => setUpdateAgentDialog(true)}
          onRemove={() => handleRemoveAgent()}
        />
        <div className="bg-white border rounded-lg">
          <div className="px-4 py-4  flex flex-col col-span-5 gap-y-5  ">
            <div className="flex items-center gap-x-2">
              <GenrateAvatar
                seed={data.name}
                variant="botttsNeutral"
                className="size-10"
              />
              <h2 className="text-lg font-semibold">{data.name}</h2>
            </div>
            <Badge
              variant={"outline"}
              className="flex items-center gap-x-2 [&>svg]size-4"
            >
              <VideoIcon className="text-blue-700" />
              {data.meetingCount}{" "}
            </Badge>
            <div className="flex flex-col gap-y-2">
              <p className="text-lg font-medium">Instructions</p>
              <p className="text-lg text-muted-foreground">
                {data.instructions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const AgentViewLoading = () => {
  return (
    <LoadingState title="Loading Agent..." description="It May take a while" />
  );
};

export const AgentViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};
