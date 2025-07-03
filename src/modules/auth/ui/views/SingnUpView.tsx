"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { OctagonAlert } from "lucide-react";
import { authClient } from "@/lib/auth-client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(1, { message: "Password is required" }),
    confirmPassword: z.string().min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const SignUpView = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    setError("");
    setPending(true);
    authClient.signUp.email(
      { ...data },
      {
        onSuccess: (data) => {
          console.log(data);
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          console.log(error);
          setPending(false);
          setError(error?.message);
        },
      }
    );
  };

  const onSocial = async (provider: "github" | "google") => {
    console.log(provider);
    setError("");
    setPending(true);
    authClient.signIn.social(
      { provider },
      {
        onSuccess: (data) => {
          console.log(data);
          setPending(false);
        },
        onError: ({ error }) => {
          console.log(error);
          setPending(false);
          setError(error?.message);
        },
      }
    );
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="p-0 overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:p-10"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-semibold">
                    {" "}
                    Let&apos;s get started
                  </h1>
                  <p className="text-muted-foreground text-balance">
                    Create an account to continue
                  </p>
                </div>
                <div className="grid gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlert className="!text-destructive h-4 w-4" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button disabled={pending} type="submit" className="w-full">
                  Submit
                </Button>
                <div
                  className="after:border-border relative text-sm  text-center after:absolute after:top-1/2 after:inset-0 after:z-0
                after:flex after:border-t after:items-center after:justify-center after:bg-body after:text-muted-foreground
                "
                >
                  <span className="relative z-10 bg-card px-4">
                    or Continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 ">
                  <Button
                    variant={"outline"}
                    disabled={pending}
                    type="button"
                    className="w-full"
                    onClick={() => onSocial("google")}
                  >
                    Google
                  </Button>
                  <Button
                    variant={"outline"}
                    disabled={pending}
                    type="button"
                    className="w-full"
                    onClick={() => onSocial("github")}
                  >
                    GitHub
                  </Button>
                </div>
                <p className="text-muted-foreground text-sm text-center">
                  Already have an account?{" "}
                  <Link href="/sign-in" className="text-primary underline">
                    Sign In
                  </Link>
                </p>
              </div>
            </form>
          </Form>
          <div
            className="bg-radial  from-sidebar-accent to-sidebar
           relative hidden md:flex flex-col gap-y-4 items-center  justify-center"
          >
            <img src="./logo.svg" alt="logo" className="w-[92px] h-[92px]" />
            <p className="text-2xl font-semibold text-white">Call AI</p>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-muted-foreground text-sm">
        <p>
          By continuing, you agree to our{" "}
          <Link href="/terms" className="underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpView;
