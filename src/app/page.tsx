import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 text-green-400">
      <h1>Home</h1>
      <Button
       variant={"custom"}
      >
        Click
      </Button>
    </div>
  );
}
