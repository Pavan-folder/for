import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  onFilterClick?: () => void;
  showFilters?: boolean;
}

export default function SearchBar({
  placeholder = "Search...",
  onSearch,
  onFilterClick,
  showFilters = true,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>
      <Button type="submit" data-testid="button-search">
        Search
      </Button>
      {showFilters && onFilterClick && (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={onFilterClick}
          data-testid="button-filters"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      )}
    </form>
  );
}
