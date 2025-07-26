"use client";
import ResponsiveDialog from "@/components/ResponsiveDialog";
import MeetingsForm from "./MeetingsForm";

import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intialValues?: MeetingGetOne;
}

export default function UpdateMeetingDialog({
  open,
  onOpenChange,
  intialValues,
}: UpdateMeetingDialogProps) {
  return (
    <ResponsiveDialog
      title="Update Meeting"
      description="Update Meeting Details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        onSuccess={(id) => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={intialValues}
      />
    </ResponsiveDialog>
  );
}
