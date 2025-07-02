"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export const HomeView = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session) {
    return (
      <div className="flex flex-col gap-4 w-1/2 items-center">...Loading</div>
    );
  }
  return (
    <div className="flex flex-col gap-4 w-1/2 items-center">
      <div className="text-3xl font-bold">Welcome {session.user?.name}</div>
      <Button
        onClick={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/sign-in"); // redirect to login page
              },
            },
          });
        }}
      >
        Logout
      </Button>
    </div>
  );
};
