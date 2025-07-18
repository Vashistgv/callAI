"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

export const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "world" }));

  return (
    <div className="flex flex-col gap-4 w-1/2 items-center">
      {data?.greeting}
    </div>
  );
};
