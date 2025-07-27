import React from "react";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  VideoPreview,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import Link from "next/link";
import { GenrateAvatar } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { LogInIcon } from "lucide-react";

interface Props {
  onJoin: () => void;
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();
  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image:
            data?.user.image ??
            GenrateAvatar({
              seed: data?.user.name ?? "",
              variant: "initials",
            }),
        } as StreamVideoParticipant
      }
    />
  );
};

const AllowBrowserPermissions = () => {
  return (
    <p className="text-sm">
      please allow your browser to access your camera and microphone
    </p>
  );
};

const CallLobby = ({ onJoin }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const { hasBrowserPermission: hasCameraPermissions } = useCameraState();
  const { hasBrowserPermission: hasMicrophonePermissions } =
    useMicrophoneState();

  const hasBrowerMediaPermission =
    hasCameraPermissions && hasMicrophonePermissions;

  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar">
      <div className="py-4 px-8 flex flex-1 items-center justify-center ">
        <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm ">
          <div className="flex flex-col text-center gap-y-2">
            <h6 className="text-lg font-semibold ">Ready To Join</h6>
            <p className="text-sm">Set Up your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowerMediaPermission
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div className="flex items-center gap-x-2">
            <ToggleVideoPreviewButton />
            <ToggleAudioPreviewButton />
          </div>
          <div className="flex w-full  justify-between gap-x-2">
            <Button variant={"ghost"} asChild>
              <Link href="/meetings">Cancel</Link>
            </Button>
            <Button onClick={onJoin}>
              {" "}
              <LogInIcon /> Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallLobby;
