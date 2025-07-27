import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

interface Props {
  seed: string;
  variant?: "initials" | "botttsNeutral";
}

export const GenrateAvatar = ({ seed, variant = "initials" }: Props) => {
  let avatar = null;
  if (variant === "initials") {
    avatar = createAvatar(initials, { seed, fontWeight: 500, fontSize: 40 });
  } else {
    avatar = createAvatar(botttsNeutral, { seed });
  }

  return avatar.toDataUri();
};
