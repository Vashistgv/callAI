import EmptyState from "@/components/EmptyState";
import React from "react";

const CancelledState = () => {
  return (
    <div className="bg-white  items-center justify-center py-4 px-5 gap-y-8 rounded-lg flex-col ">
      <EmptyState
        title="Meeting Cancelled"
        description="Meeting Got Cancelled"
        image="/cancelled.svg"
      />
    </div>
  );
};

export default CancelledState;
