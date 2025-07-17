import React from "react";
import { authClient } from "@/lib/auth-client";
import { ChevronDown, LoaderCircleIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import GenrateAvatar from "@/components/GenrateAvatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
const DashboardUserButton = () => {
  const { data, isPending } = authClient.useSession();
  const isMobile = useIsMobile();
  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/sign-in"; // redirect to login page
        },
      },
    });
  };

  if (isPending)
    return (
      <div>
        <LoaderCircleIcon className="animate-spin w-12 h-12 text-blue-500" />
      </div>
    );

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger
          className="flex items-center justify-between
       rounded-lg border-border/10 p-3 w-full  bg-white/5 hover:bg-white/10 overflow-hidden"
        >
          {data?.user?.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />{" "}
            </Avatar>
          ) : (
            <GenrateAvatar
              seed={data?.user?.name || ""}
              className="size-14 mr-3"
            />
          )}
          <div className="flex flex-col gap-2 text-left flex-1 min-w-0">
            {data?.user?.name}
          </div>

          <ChevronDown className="size-4 shrink-0" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data?.user?.name || ""}</DrawerTitle>
            <DrawerDescription>{data?.user?.email || ""}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={onLogout}>
              <LogOut />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="flex items-center justify-between
       rounded-lg border-border/10 p-3 w-full  bg-white/5 hover:bg-white/10 overflow-hidden"
      >
        <div className="flex items-center gap-2">
          {data?.user?.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />{" "}
            </Avatar>
          ) : (
            <GenrateAvatar
              seed={data?.user?.name || ""}
              className="size-14 mr-3"
            />
          )}
          <div className="flex flex-col gap-2 text-left flex-1 min-w-0">
            {data?.user?.name}
          </div>
        </div>
        <ChevronDown className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel className="flex flex-col gap-2 font-medium  cursor-pointer ">
          Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex flex-col-2 gap-2 font-medium  cursor-pointer "
          onClick={() => onLogout()}
        >
          Logout
          <LogOut />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DashboardUserButton;
