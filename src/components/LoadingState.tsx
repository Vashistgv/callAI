import { Loader2Icon } from "lucide-react";

interface LoadingStateProps {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: LoadingStateProps) => {
  return (
    <div className="py-9 px-8  flex flex-col items-center justify-center">
      <div className="flex  flex-col items-center justify-center gap-y-6 bg-background rounded-2xl p-10 shadow-sm ">
        <Loader2Icon className="animate-spin  size-6 text-primary " />
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
