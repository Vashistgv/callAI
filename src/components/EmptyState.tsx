import React from "react";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
interface EmptyStateProps {
  title: string;
  description: string;
  image?: string;
}

const EmptyState = ({
  title,
  description,
  image = "/empty.svg",
}: EmptyStateProps) => {
  return (
    <div className="py-4 px-8  flex flex-col items-center justify-center">
      <div className="flex  flex-col items-center justify-center gap-y-6 bg-background rounded-2xl p-10 shadow-sm ">
        <Image src={image} width={240} height={240} alt="empty" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
        <h1 className="text-3xl font-semibold ">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default EmptyState;
