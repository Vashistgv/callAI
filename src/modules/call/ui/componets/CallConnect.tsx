"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  Call,
  CallingState,
} from "@stream-io/video-react-sdk";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import CallUI from "./CallUI";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC();
  const { mutateAsync: genrateToken } = useMutation(
    trpc.meetings.genrateToken.mutationOptions()
  );

  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    const streamClient = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: userId,
        name: userName,
        image: userImage,
      },
      tokenProvider: genrateToken,
    });
    setClient(streamClient);

    return () => {
      if (streamClient) {
        streamClient.disconnectUser();
        setClient(null);
      }
    };
  }, [userId, userName, userImage, genrateToken]);

  useEffect(() => {
    if (!client) return;

    const _call = client.call("default", meetingId);
    _call.camera.disable();
    _call.microphone.disable();
    setCall(_call);

    return () => {
      if (_call.state.callingState === CallingState.LEFT) {
        _call.leave();
        _call.endCall();
        setCall(null);
      }
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex items-center justify-center text-white">
        <Loader2Icon className="animate-spin" />
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};

export default CallConnect;
