import { ChevronDown, Filter } from "lucide-react";
import { organisms, experimentTypes, outcomes } from "@/data/demoData";

interface SearchFiltersProps {
  selectedOrganism: string;
  selectedType: string;
  selectedOutcome: string;
  onOrganismChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onOutcomeChange: (value: string) => void;
}

const SearchFilters = ({
  selectedOrganism,
  selectedType,
  selectedOutcome,
  onOrganismChange,
  onTypeChange,
  onOutcomeChange,
}: SearchFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Filter className="h-4 w-4" />
        <span>Filters:</span>
      </div>

      {/* Organism Filter */}
      <div className="relative">
        <select
          value={selectedOrganism}
          onChange={(e) => onOrganismChange(e.target.value)}
          className="appearance-none bg-card border border-border/50 rounded-lg px-4 py-2 pr-10 text-sm text-foreground cursor-pointer hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        >
          {organisms.map((org) => (
            <option key={org} value={org}>
              {org}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>

      {/* Experiment Type Filter */}
      <div className="relative">
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="appearance-none bg-card border border-border/50 rounded-lg px-4 py-2 pr-10 text-sm text-foreground cursor-pointer hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        >
          {experimentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>

      {/* Outcome Filter */}
      <div className="relative">
        <select
          value={selectedOutcome}
          onChange={(e) => onOutcomeChange(e.target.value)}
          className="appearance-none bg-card border border-border/50 rounded-lg px-4 py-2 pr-10 text-sm text-foreground cursor-pointer hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        >
          {outcomes.map((outcome) => (
            <option key={outcome} value={outcome}>
              {outcome}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    </div>
  );
};

export default SearchFilters;
