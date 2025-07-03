import React from "react";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  seed: string;
  className?: string;
  variant?: "initials" | "botttsNeutral";
}
const GenrateAvatar = ({ seed, className, variant = "initials" }: Props) => {
  let avatar = null;
  if (variant === "initials") {
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 20 });
  } else {
    avatar = createAvatar(botttsNeutral, { seed });
  }

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={avatar.toDataUri()} />
      <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};

export default GenrateAvatar;
