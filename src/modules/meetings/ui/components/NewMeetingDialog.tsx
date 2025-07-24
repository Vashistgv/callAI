"use client";
import ResponsiveDialog from "@/components/ResponsiveDialog";
import MeetingsForm from "./MeetingsForm";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NewMeetingDialog({
  open,
  onOpenChange,
}: NewMeetingDialogProps) {
  const route = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new Meeting"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        onSuccess={(id) => {
          onOpenChange(false);
          route.push(`/meetings/${id}`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
}
