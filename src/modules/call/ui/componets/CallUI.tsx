import React, { useState } from "react";
import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import CallLobby from "./CallLobby";
import CallActive from "./CallActive";
import CallEnded from "./CallEnded";

interface Props {
  meetingName: string;
}

const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");
  console.log("join", show);
  const handleJoin = async () => {
    if (!call) return;
    await call.join();
    setShow("call");
  };

  const hanldeLeave = async () => {
    if (!call) return;
    setShow("ended");
    await call.leave();
  };

  return (
    <StreamTheme className="h-screen">
      {show === "lobby" && <CallLobby onJoin={handleJoin} />}
      {show === "call" && (
        <CallActive onLeave={hanldeLeave} meetingName={meetingName} />
      )}
      {show === "ended" && <CallEnded />}
    </StreamTheme>
  );
};

export default CallUI;
