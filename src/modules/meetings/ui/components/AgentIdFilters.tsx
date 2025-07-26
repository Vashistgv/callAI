import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import GenrateAvatar from "@/components/GenrateAvatar";
import CommandSelect from "@/components/CommandSelect";
const AgentIdFilters = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [agentSearch, setAgentSearch] = useState("");

  const trpc = useTRPC();

  const { data } = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch,
    })
  );
  return (
    <div>
      <CommandSelect
        placeholder="Filter by agent"
        className="h-9"
        options={(data?.items ?? []).map((agent) => ({
          id: agent.id,
          value: agent.id,
          children: (
            <div className="flex items-center gap-x-2">
              <GenrateAvatar
                seed={agent.name}
                variant="botttsNeutral"
                className="size-4"
              />
              <span className="text-sm">{agent.name}</span>
            </div>
          ),
        }))}
        value={filters.agentId ?? ""}
        onSelect={(value) => setFilters({ agentId: value })}
        onSearch={(value) => setAgentSearch(value)}
      />
    </div>
  );
};

export default AgentIdFilters;
