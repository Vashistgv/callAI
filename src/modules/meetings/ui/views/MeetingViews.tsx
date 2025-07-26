"use client";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { DataTable } from "@/components/DataTable";
import { columns } from "../components/Columns";
import EmptyState from "@/components/EmptyState";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import DataPagination from "@/components/DataPagination";
export const MeetingViews = () => {
  const trpc = useTRPC();
  const route = useRouter();
  const [filters, setFilters] = useMeetingsFilters();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  );
  return (
    <div>
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(data) => route.push(`/meetings/${data.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data?.items?.length === 0 && (
        <EmptyState title="No Meetings" description="Please Add Meetings" />
      )}
    </div>
  );
};

MeetingViews;

export const MeetingViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings..."
      description="It May take a while"
    />
  );
};

export const MeetingViewError = () => {
  return <ErrorState title="Error" description="Something went wrong" />;
};
