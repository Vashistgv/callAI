import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="bg-muted flex min-h-svh flex-col p-6 md:p-10 items-center justify-center">
      <div className="w-full max-w-sm md:max-w-4xl ">{children}</div>
    </div>
  );
};

export default layout;
