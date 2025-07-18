import { AlertCircleIcon } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
}

export const ErrorState = ({ title, description }: ErrorStateProps) => {
  return (
    <div className="py-9 px-8  flex flex-col items-center justify-center">
      <div className="flex  flex-col items-center justify-center gap-y-6 bg-background rounded-2xl p-10 shadow-sm ">
        <AlertCircleIcon className="  size-6 text-primary " />
        <h1 className="text-3xl font-bold text-red-500">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
