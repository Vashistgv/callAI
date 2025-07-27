import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
interface Props {
  onLeave: () => void;
  meetingName: string;
}

const CallActive = ({ onLeave, meetingName }: Props) => {
  return (
    <div className="flex flex-col p-4 justify-between h-full text-white">
      <div className="bg-[#101213] rounded-full p-4 flex items-center gap-4 ">
        <Link
          href={`/`}
          className="flex  bg-white/10 p-1 rounded-full w-fit
        items-center justify-center"
        >
          <Image src="/logo.svg" alt="logo" width={22} height={22} />
        </Link>
        <h4 className="text-base">{meetingName}</h4>
      </div>
      <SpeakerLayout />
      <div className="bg-[#101213] px-4  rounded-full">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};

export default CallActive;
