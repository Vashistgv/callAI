import { Input } from "@/components/ui/input";
import React from "react";
import { SearchIcon } from "lucide-react";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

const MettingsSearchFilters = () => {
  const [filters, setFilters] = useMeetingsFilters();
  return (
    <div className="relative">
      <Input
        className="h-9 bg-white pl-7 w-[200px]"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        type="text"
        placeholder="Filter by name"
      />
      <SearchIcon className="absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
};

export default MettingsSearchFilters;
