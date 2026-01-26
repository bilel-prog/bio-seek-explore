import { Database, Server, Search, FileText, ArrowRight, Cpu, Layers, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Architecture = () => {
  const pipelineSteps = [
    {
      icon: FileText,
      title: "Data Sources",
      description: "Biological experiments, research papers, and gene annotations from multiple repositories",
      color: "primary",
    },
    {
      icon: Cpu,
      title: "Embeddings",
      description: "Transformer-based models convert multimodal data into 768-dimensional vectors",
      color: "secondary",
    },
    {
      icon: Database,
      title: "Qdrant",
      description: "High-performance vector database storing millions of biological embeddings",
      color: "accent",
    },
    {
      icon: Search,
      title: "Similarity Search",
      description: "Approximate nearest neighbor search finds semantically similar experiments",
      color: "primary",
    },
    {
      icon: Layers,
      title: "Results",
      description: "Ranked results with explainability scores and shared feature highlighting",
      color: "secondary",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 pattern-grid opacity-30" />
          <div className="container mx-auto px-6 relative">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
                <Server className="h-4 w-4" />
                System Architecture
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                How <span className="bio-gradient-text">BioHub</span> Works
              </h1>
              <p className="text-lg text-muted-foreground">
                A modern architecture combining state-of-the-art embeddings with high-performance
                vector search for biological discovery.
              </p>
            </div>
          </div>
        </section>

        {/* Pipeline Visualization */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-center mb-12">
                Data Processing Pipeline
              </h2>

              {/* Pipeline Steps */}
              <div className="relative">
                {/* Connection Line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent opacity-20 -translate-y-1/2" />

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {pipelineSteps.map((step, index) => (
                    <div key={step.title} className="relative">
                      <div className="bio-card p-4 text-center h-full">
                        <div
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 ${
                            step.color === "primary"
                              ? "bg-primary/10 text-primary"
                              : step.color === "secondary"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-accent/10 text-accent"
                          }`}
                        >
                          <step.icon className="h-6 w-6" />
                        </div>
                        <h3 className="font-display font-semibold text-sm mb-2">
                          {step.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {/* Arrow (hide on last item and mobile) */}
                      {index < pipelineSteps.length - 1 && (
                        <div className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                          <ArrowRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Details */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-center mb-12">
                Technical Architecture
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Qdrant Section */}
                <div className="bio-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bio-gradient-bg">
                      <Database className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Qdrant Vector Database</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Qdrant serves as the core vector database, enabling efficient similarity search
                    across millions of biological embeddings with sub-100ms query times.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>HNSW indexing for fast approximate search</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>Payload filtering for metadata queries</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>Horizontal scaling for large datasets</span>
                    </li>
                  </ul>
                </div>

                {/* Embeddings Section */}
                <div className="bio-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bio-gradient-bg">
                      <Cpu className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Multimodal Embeddings</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Biological data is converted into dense vector representations using
                    specialized transformer models trained on scientific literature.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>768-dimensional embedding space</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>BioBERT/SciBERT model architecture</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>Contrastive learning on paired data</span>
                    </li>
                  </ul>
                </div>

                {/* Data Sources */}
                <div className="bio-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bio-gradient-bg">
                      <FileText className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Data Sources</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    BioHub aggregates data from multiple biological repositories and research
                    databases to provide comprehensive coverage.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>GEO, ArrayExpress, SRA</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>UniProt, Gene Ontology</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>PubMed abstracts & full text</span>
                    </li>
                  </ul>
                </div>

                {/* Search Flow */}
                <div className="bio-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bio-gradient-bg">
                      <Search className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold text-lg">Search Flow</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    User queries are embedded in real-time and matched against the vector database
                    to retrieve semantically similar biological experiments.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>Real-time query embedding</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>Cosine similarity scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-secondary" />
                      <span>Feature-based explainability</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-2xl font-bold text-center mb-8">
                Example: Vector Search Query
              </h2>
              <div className="bio-card overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-secondary/50" />
                  <span className="ml-2 text-xs font-mono text-muted-foreground">
                    qdrant_query.py
                  </span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto font-mono">
                  <code className="text-foreground">{`from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

# Initialize clients
client = QdrantClient("localhost", port=6333)
model = SentenceTransformer("allenai/scibert_scivocab_uncased")

# Embed the query
query = "CRISPR gene editing in stem cells"
query_vector = model.encode(query).tolist()

# Search in Qdrant
results = client.search(
    collection_name="biohub_experiments",
    query_vector=query_vector,
    limit=10,
    with_payload=True
)

# Process results with similarity scores
for result in results:
    print(f"ID: {result.id}")
    print(f"Score: {result.score:.2f}")
    print(f"Title: {result.payload['title']}")`}</code>
                </pre>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Architecture;
