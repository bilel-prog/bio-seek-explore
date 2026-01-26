import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  initialQuery?: string;
  onSearch?: (query: string) => void;
  compact?: boolean;
}

const SearchBar = ({ initialQuery = "", onSearch, compact = false }: SearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query);
      } else {
        navigate(`/results?q=${encodeURIComponent(query)}`);
      }
    }
  };

  const placeholderText = "Search for biological experiments, gene expressions, pathways...";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative group ${compact ? "" : "max-w-3xl mx-auto"}`}>
        {/* Glow effect */}
        {!compact && (
          <div className="absolute -inset-1 bio-gradient-bg rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
        )}
        
        <div className={`relative flex items-center bg-card border border-border/50 rounded-xl overflow-hidden shadow-lg ${
          compact ? "shadow-md" : "bio-glow"
        }`}>
          <div className="flex items-center justify-center w-14 h-full">
            <Search className={`text-muted-foreground ${compact ? "h-4 w-4" : "h-5 w-5"}`} />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholderText}
            className={`flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground ${
              compact ? "py-3 text-sm" : "py-4 text-base"
            }`}
          />
          
          <button
            type="submit"
            className={`m-2 bio-button-primary flex items-center gap-2 ${
              compact ? "px-4 py-2 text-sm" : "px-5 py-2.5"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            <span className="font-medium">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
