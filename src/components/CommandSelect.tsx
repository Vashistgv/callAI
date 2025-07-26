"use client";

import { ReactNode, useState } from "react";
import { ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import {
  CommandInput,
  Command,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
  CommandResponsiveDialog,
} from "./ui/command";

interface CommandSelectProps {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?: boolean;
  className?: string;
}

const CommandSelect = ({
  value,
  options,
  onSelect,
  onSearch,
  placeholder,
  isSearchable,
  className,
}: CommandSelectProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  const handleOpenChange = (value: boolean) => {
    onSearch?.("");
    setOpen(value);
  };

  return (
    <>
      <Button
        type="button"
        variant={"outline"}
        role="combobox"
        className={cn(
          "h-9  font-normal px-2 w-full justify-between",
          !selectedOption && "text-muted-foreground",
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div>{selectedOption ? selectedOption.children : placeholder}</div>
        <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-muted-foreground text-sm">
              No results found.
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              value={option.value}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};

export default CommandSelect;
