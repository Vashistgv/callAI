import React, { Dispatch, SetStateAction } from "react";
import {
  CommandDialog,
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a Meeting or Agent" />
      <CommandList>
        <CommandItem>Meeting 1</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};

export default DashboardCommand;
