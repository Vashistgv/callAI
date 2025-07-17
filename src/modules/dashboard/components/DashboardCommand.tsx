import React, { Dispatch, SetStateAction } from "react";
import {
  CommandDialog,
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
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a Meeting or Agent" />
      <CommandList>
        <CommandItem>Meeting 1</CommandItem>
      </CommandList>
    </CommandDialog>
  );
};

export default DashboardCommand;
