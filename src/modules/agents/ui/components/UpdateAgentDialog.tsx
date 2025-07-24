"use client";
import ResponsiveDialog from "@/components/ResponsiveDialog";
import AgentForm from "./AgentForm";
import { AgentOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: AgentOne;
}

export default function UpdateAgentDialog({
  open,
  onOpenChange,
  initialValues,
}: UpdateAgentDialogProps) {
  console.log("responsive dialog", open);
  return (
    <ResponsiveDialog
      title="Update Agent"
      description="Edit the Agent Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
}
