import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowUpDown, ArrowUp, ArrowDown, FlaskConical, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import SearchFilters from "@/components/SearchFilters";
import ResultCard from "@/components/ResultCard";
import { demoExperiments } from "@/data/demoData";

type SortOrder = "desc" | "asc";

const Results = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [selectedOrganism, setSelectedOrganism] = useState("All Organisms");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedOutcome, setSelectedOutcome] = useState("All Outcomes");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results = [...demoExperiments];

    // Apply filters
    if (selectedOrganism !== "All Organisms") {
      results = results.filter((exp) => exp.organism === selectedOrganism);
    }
    if (selectedType !== "All Types") {
      results = results.filter((exp) => exp.experimentType === selectedType);
    }
    if (selectedOutcome !== "All Outcomes") {
      results = results.filter((exp) => exp.outcome === selectedOutcome);
    }

    // Sort by similarity
    results.sort((a, b) =>
      sortOrder === "desc"
        ? b.similarityScore - a.similarityScore
        : a.similarityScore - b.similarityScore
    );

    return results;
  }, [selectedOrganism, selectedType, selectedOutcome, sortOrder]);

  const toggleSort = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="py-8 border-b border-border/50 bg-muted/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <SearchBar initialQuery={query} compact />
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {/* Results Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <FlaskConical className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h1 className="font-display font-bold text-xl">
                      {filteredResults.length} Results
                    </h1>
                    {query && (
                      <p className="text-sm text-muted-foreground">
                        for "{query}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Sort Button */}
                <button
                  onClick={toggleSort}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border/50 rounded-lg text-sm hover:bg-muted transition-colors"
                >
                  {sortOrder === "desc" ? (
                    <ArrowDown className="h-4 w-4" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                  Sort by similarity
                </button>
              </div>

              {/* Filters */}
              <div className="mb-6">
                <SearchFilters
                  selectedOrganism={selectedOrganism}
                  selectedType={selectedType}
                  selectedOutcome={selectedOutcome}
                  onOrganismChange={setSelectedOrganism}
                  onTypeChange={setSelectedType}
                  onOutcomeChange={setSelectedOutcome}
                />
              </div>

              {/* Demo Notice */}
              <div className="flex items-start gap-3 p-4 rounded-lg border border-secondary/30 bg-secondary/5 mb-6">
                <AlertCircle className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-foreground">Demo Mode Active</p>
                  <p className="text-sm text-muted-foreground">
                    Showing preloaded sample biological experiments. Connect to your database for real data.
                  </p>
                </div>
              </div>

              {/* Results List */}
              <div className="space-y-4">
                {filteredResults.length > 0 ? (
                  filteredResults.map((experiment, index) => (
                    <ResultCard key={experiment.id} experiment={experiment} index={index} />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FlaskConical className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <h3 className="font-display font-semibold text-lg mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search query
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Results;
