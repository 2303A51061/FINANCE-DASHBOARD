import { useAppContext } from "@/context/AppContext";
import { Search, SlidersHorizontal } from "lucide-react";

const Filters = () => {
  const { filters, setFilters } = useAppContext();

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary text-secondary-foreground placeholder:text-muted-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-ring transition-all"
        />
      </div>

      {/* Type filter */}
      <div className="flex items-center gap-1.5 bg-secondary rounded-lg p-1">
        {(["all", "income", "expense"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilters({ type })}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
              filters.type === type
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split("-") as ["date" | "amount", "asc" | "desc"];
            setFilters({ sortBy, sortOrder });
          }}
          className="bg-secondary text-secondary-foreground text-sm rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
