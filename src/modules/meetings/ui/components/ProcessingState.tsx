import EmptyState from "@/components/EmptyState";
import React from "react";

const ProcessingState = () => {
  return (
    <div className="bg-white  items-center justify-center py-4 px-5 gap-y-8 rounded-lg flex-col ">
      <EmptyState
        title="Meeting Processing"
        description="Meeting has completed , a summary will be appared soon"
        image="/processing.svg"
      />
    </div>
  );
};

export default ProcessingState;
