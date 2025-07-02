"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (data: any) => {
    authClient.signUp.email(data, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const onLogin = async (data: any) => {
    authClient.signIn.email(data, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  if (session) {
    return (
      <div className="flex flex-col gap-4 w-1/2 items-center">
        <div className="text-3xl font-bold">Welcome {session.user?.name}</div>
        <Button
          onClick={() => {
            authClient.signOut();
          }}
        >
          Logout
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 w-1/2 items-center">
      <div className="text-3xl font-bold">Create User</div>
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        variant={"default"}
        onClick={() => onSubmit({ name, email, password })}
      >
        Create USer
      </Button>
      <div className="flex flex-col gap-4 w-1/2 items-center">
        <div className="text-3xl font-bold">Login</div>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant={"default"}
          onClick={() => onLogin({ email, password })}
        >
          singin
        </Button>
      </div>
    </div>
  );
}
