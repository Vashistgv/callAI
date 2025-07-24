import ResponsiveDialog from "@/components/ResponsiveDialog";
import { Button } from "@/components/ui/button";
import { set } from "date-fns";
import { JSX, useState } from "react";

export const UseConfirm = (
  title: string,
  description: string
): [() => JSX.Element, () => Promise<unknown>] => {
  const [promise, setPromise] = useState<{
    reslove: (value: boolean) => void;
  } | null>(null);
  const confrim = () => {
    return new Promise((reslove) => setPromise({ reslove }));
  };
  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.reslove(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.reslove(false);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveDialog
        onOpenChange={handleClose}
        open={!!promise}
        title={title}
        description={description}
      >
        <div className="flex py-4 w-full flex flex-col-reverse gap-y-2 lg:flex-row gap-x-2 items-center justify-end">
          <Button
            onClick={handleCancel}
            variant={"outline"}
            className="w-full lg:w-auto"
          >
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="w-full lg:w-auto">
            Confirm
          </Button>
        </div>
      </ResponsiveDialog>
    );
  };
  return [ConfirmationDialog, confrim];
};
