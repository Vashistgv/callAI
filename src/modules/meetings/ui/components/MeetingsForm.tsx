"use client";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useTRPC } from "@/trpc/client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import CommandSelect from "@/components/CommandSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { MeetingGetOne } from "../../types";
import { createMeetingSchema } from "../../schemas";
import GenrateAvatar from "@/components/GenrateAvatar";
import NewAgentDialog from "@/modules/agents/ui/components/NewAgentDialog";
interface MeetingFormProps {
  onSuccess: (id: string) => void;
  onCancel: () => void;
  initialValues?: MeetingGetOne;
}

const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}: MeetingFormProps) => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();
  const [openNewDialog, setOpenNewDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );

  const CreateMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.(data?.id ?? "");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const UpdateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({})
        );
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id })
          );
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof createMeetingSchema>>({
    resolver: zodResolver(createMeetingSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = CreateMeeting.isPending || UpdateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof createMeetingSchema>) => {
    if (isEdit) {
      UpdateMeeting.mutate({ ...values, id: initialValues?.id ?? "" });
    } else {
      CreateMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog open={openNewDialog} onOpenChange={setOpenNewDialog} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Math Consultation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="agentId"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    value={field.value}
                    options={(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GenrateAvatar
                            seed={agent.name}
                            className="border size-6"
                            variant="botttsNeutral"
                          />
                          <span>{agent.name}</span>
                        </div>
                      ),
                    }))}
                    onSelect={field.onChange}
                    placeholder="Select an Agent"
                    onSearch={setAgentSearch}
                  />
                </FormControl>

                <FormDescription>
                  Not Found What you&apos;re looking for?{" "}
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setOpenNewDialog(true)}
                  >
                    Create New Agent
                  </Button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-end gap-x-2 py-3">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AgentForm;
