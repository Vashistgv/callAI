import { Card } from "@/components/ui/card";
import SingnUpView from "@/modules/auth/ui/views/SingnUpView";
import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
const page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }
  return <SingnUpView />;
};

export default page;
