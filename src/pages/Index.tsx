import { useState } from "react";
import { Dna, Database, Cpu, Search as SearchIcon, Microscope, FlaskConical, Fingerprint } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import SearchFilters from "@/components/SearchFilters";

const Index = () => {
  const [selectedOrganism, setSelectedOrganism] = useState("All Organisms");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedOutcome, setSelectedOutcome] = useState("All Outcomes");

  const sampleQueries = [
    "CRISPR gene editing in stem cells",
    "Tumor microenvironment RNA-seq",
    "Neural differentiation proteomics",
    "Microbiome host interactions IBD",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-20 pb-24 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 pattern-dots opacity-50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bio-gradient-bg opacity-5 blur-3xl rounded-full" />

          <div className="container mx-auto px-6 relative">
            {/* Title */}
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Dna className="h-4 w-4" />
                Vector Similarity Search
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                BioHub – Multimodal
                <br />
                <span className="bio-gradient-text">Biological Discovery</span> Engine
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover biologically similar experiments and candidates through advanced
                vector embeddings and semantic similarity search.
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <SearchBar />
            </div>

            {/* Filters */}
            <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <SearchFilters
                selectedOrganism={selectedOrganism}
                selectedType={selectedType}
                selectedOutcome={selectedOutcome}
                onOrganismChange={setSelectedOrganism}
                onTypeChange={setSelectedType}
                onOutcomeChange={setSelectedOutcome}
              />
            </div>

            {/* Sample Queries */}
            <div className="text-center animate-fade-in-up" style={{ animationDelay: "300ms" }}>
              <p className="text-sm text-muted-foreground mb-3">Try a sample query:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {sampleQueries.map((query) => (
                  <a
                    key={query}
                    href={`/results?q=${encodeURIComponent(query)}`}
                    className="px-4 py-2 text-sm bg-card border border-border/50 rounded-full text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
                  >
                    {query}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                How It Works
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                BioHub leverages multimodal embeddings to find semantically similar biological data
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="bio-card p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bio-gradient-bg mb-4">
                  <Microscope className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Multimodal Data</h3>
                <p className="text-sm text-muted-foreground">
                  Process text descriptions, experimental metadata, and biological annotations in a unified embedding space.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bio-card p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bio-gradient-bg mb-4">
                  <Database className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Vector Database</h3>
                <p className="text-sm text-muted-foreground">
                  Powered by Qdrant for fast, scalable similarity search across millions of biological entries.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bio-card p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bio-gradient-bg mb-4">
                  <Fingerprint className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">Explainable Results</h3>
                <p className="text-sm text-muted-foreground">
                  Understand why results match with transparent similarity scores and shared feature highlighting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold bio-gradient-text mb-1">1M+</div>
                <div className="text-sm text-muted-foreground">Experiments Indexed</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold bio-gradient-text mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Organisms Covered</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold bio-gradient-text mb-1">&lt;100ms</div>
                <div className="text-sm text-muted-foreground">Query Response</div>
              </div>
              <div className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold bio-gradient-text mb-1">768D</div>
                <div className="text-sm text-muted-foreground">Embedding Vectors</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
