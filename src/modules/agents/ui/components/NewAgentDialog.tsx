"use client";
import ResponsiveDialog from "@/components/ResponsiveDialog";
import AgentForm from "./AgentForm";

interface NewAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewAgentDialog({
  open,
  onOpenChange,
}: NewAgentDialogProps) {
  console.log("responsive dialog", open);
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
        initialValues={undefined}
      />
    </ResponsiveDialog>
  );
}
