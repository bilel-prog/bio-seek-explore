import { useState } from "react";
import { 
  FlaskConical, 
  Beaker, 
  Microscope, 
  ListChecks, 
  Search, 
  Sparkles,
  TestTube2,
  Pipette,
  ThermometerSun,
  CircleDot,
  CheckCircle2,
  Circle,
  Zap
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface Reagent {
  name: string;
  role: string;
  supplier?: string;
}

interface Equipment {
  name: string;
  purpose: string;
  required: boolean;
}

interface WorkflowStep {
  step: number;
  title: string;
  description: string;
}

// Demo data for different test types
const getReagentsForTest = (testType: string): Reagent[] => {
  const lowerType = testType.toLowerCase();
  
  if (lowerType.includes("pcr") || lowerType.includes("qpcr")) {
    return [
      { name: "DNA/RNA Extraction Kit", role: "Isolates nucleic acids from biological samples", supplier: "Qiagen, Thermo Fisher" },
      { name: "Taq DNA Polymerase", role: "Heat-stable enzyme for DNA amplification", supplier: "NEB, Promega" },
      { name: "Hot-Start Polymerase", role: "Prevents non-specific amplification before cycling", supplier: "Takara, Roche" },
      { name: "Primers (Forward & Reverse)", role: "Define target sequence boundaries for amplification", supplier: "IDT, Sigma-Aldrich" },
      { name: "dNTPs Mix", role: "Building blocks for new DNA strand synthesis", supplier: "Thermo Fisher, Promega" },
      { name: "PCR Buffer (10X)", role: "Maintains optimal pH and ionic conditions", supplier: "Included with polymerase" },
      { name: "MgCl₂ Solution", role: "Cofactor for polymerase activity", supplier: "Included with polymerase" },
      { name: "Positive Control DNA", role: "Validates assay performance", supplier: "ATCC, in-house" },
      { name: "Negative Control (NTC)", role: "Detects contamination", supplier: "Nuclease-free water" },
    ];
  }
  
  if (lowerType.includes("gene expression") || lowerType.includes("rt-pcr")) {
    return [
      { name: "RNA Extraction Kit", role: "Isolates total RNA from cells/tissues", supplier: "Qiagen RNeasy, TRIzol" },
      { name: "DNase I", role: "Removes genomic DNA contamination", supplier: "Thermo Fisher, Promega" },
      { name: "Reverse Transcriptase", role: "Converts RNA to cDNA", supplier: "Invitrogen SuperScript, Takara" },
      { name: "Random Hexamers / Oligo(dT)", role: "Primers for reverse transcription", supplier: "Thermo Fisher" },
      { name: "SYBR Green / TaqMan Probes", role: "Fluorescent detection of amplification", supplier: "Applied Biosystems, Bio-Rad" },
      { name: "Reference Gene Primers", role: "Normalization controls (GAPDH, β-actin)", supplier: "IDT, Bio-Rad" },
      { name: "RNase Inhibitor", role: "Protects RNA from degradation", supplier: "NEB, Promega" },
      { name: "Nuclease-free Water", role: "Prevents contamination", supplier: "Ambion, Qiagen" },
    ];
  }
  
  if (lowerType.includes("genotyping") || lowerType.includes("hla")) {
    return [
      { name: "Genomic DNA Extraction Kit", role: "Isolates high-quality genomic DNA", supplier: "Qiagen, Promega" },
      { name: "Sequence-Specific Primers (SSP)", role: "Target specific allele variants", supplier: "Custom synthesis" },
      { name: "High-Fidelity Polymerase", role: "Accurate amplification for typing", supplier: "NEB Q5, Takara PrimeSTAR" },
      { name: "Allele-Specific Probes", role: "Discriminate single nucleotide polymorphisms", supplier: "TaqMan, LightCycler" },
      { name: "Internal Amplification Control", role: "Validates successful PCR reaction", supplier: "In-house design" },
      { name: "Size Standards / Ladder", role: "Reference for fragment size analysis", supplier: "NEB, Thermo Fisher" },
      { name: "Loading Dye", role: "Visualize samples during electrophoresis", supplier: "NEB, Bio-Rad" },
    ];
  }
  
  // Default reagents
  return [
    { name: "Sample Collection Buffer", role: "Preserves sample integrity during transport", supplier: "Various" },
    { name: "Extraction Reagents", role: "Isolates target molecules from samples", supplier: "Qiagen, Thermo Fisher" },
    { name: "Reaction Buffer", role: "Provides optimal conditions for enzymatic reactions", supplier: "Included with enzymes" },
    { name: "Detection Reagents", role: "Enables visualization or measurement of results", supplier: "Various" },
    { name: "Positive/Negative Controls", role: "Validates assay performance and specificity", supplier: "ATCC, in-house" },
  ];
};

const getEquipmentForTest = (testType: string): Equipment[] => {
  const lowerType = testType.toLowerCase();
  
  if (lowerType.includes("pcr") || lowerType.includes("qpcr") || lowerType.includes("gene expression")) {
    return [
      { name: "Thermal Cycler", purpose: "Temperature cycling for PCR amplification", required: true },
      { name: "Real-Time PCR System", purpose: "Quantitative detection during amplification", required: lowerType.includes("qpcr") || lowerType.includes("expression") },
      { name: "Microcentrifuge", purpose: "Sample preparation and reagent mixing", required: true },
      { name: "Micropipettes (P10, P20, P200, P1000)", purpose: "Accurate reagent dispensing", required: true },
      { name: "Biosafety Cabinet (Class II)", purpose: "Sterile work environment, user protection", required: true },
      { name: "Vortex Mixer", purpose: "Homogeneous sample mixing", required: true },
      { name: "Gel Electrophoresis System", purpose: "PCR product visualization and sizing", required: !lowerType.includes("qpcr") },
      { name: "UV Transilluminator / Gel Imager", purpose: "DNA band visualization", required: !lowerType.includes("qpcr") },
      { name: "NanoDrop / Spectrophotometer", purpose: "Nucleic acid quantification and purity check", required: false },
      { name: "-20°C Freezer", purpose: "Reagent and sample storage", required: true },
    ];
  }
  
  if (lowerType.includes("genotyping") || lowerType.includes("hla")) {
    return [
      { name: "Thermal Cycler", purpose: "DNA amplification", required: true },
      { name: "Capillary Electrophoresis System", purpose: "High-resolution fragment analysis", required: true },
      { name: "Microcentrifuge", purpose: "Sample preparation", required: true },
      { name: "Micropipettes", purpose: "Accurate reagent handling", required: true },
      { name: "Biosafety Cabinet", purpose: "Contamination prevention", required: true },
      { name: "Spectrophotometer", purpose: "DNA concentration measurement", required: true },
      { name: "Sequencing Platform (optional)", purpose: "High-resolution allele identification", required: false },
      { name: "-80°C Freezer", purpose: "Long-term sample storage", required: false },
    ];
  }
  
  return [
    { name: "Biosafety Cabinet", purpose: "Sterile working environment", required: true },
    { name: "Microcentrifuge", purpose: "Sample processing", required: true },
    { name: "Micropipettes", purpose: "Reagent handling", required: true },
    { name: "Incubator", purpose: "Temperature-controlled reactions", required: false },
    { name: "Analytical Balance", purpose: "Precise reagent weighing", required: false },
  ];
};

const getWorkflowForTest = (testType: string): WorkflowStep[] => {
  const lowerType = testType.toLowerCase();
  
  if (lowerType.includes("pcr") || lowerType.includes("qpcr")) {
    return [
      { step: 1, title: "Sample Collection", description: "Collect biological sample (blood, tissue, swab) using appropriate technique" },
      { step: 2, title: "Nucleic Acid Extraction", description: "Isolate DNA/RNA using extraction kit; assess quality and concentration" },
      { step: 3, title: "Reaction Mix Preparation", description: "Prepare master mix with polymerase, primers, dNTPs, and buffer" },
      { step: 4, title: "Template Addition", description: "Add extracted nucleic acid to reaction tubes/plate in designated wells" },
      { step: 5, title: "Thermal Cycling", description: "Run PCR program: denaturation, annealing, extension cycles" },
      { step: 6, title: "Detection & Analysis", description: "Analyze amplification curves (qPCR) or run gel electrophoresis (conventional)" },
      { step: 7, title: "Result Interpretation", description: "Compare to controls; report positive/negative/quantitative results" },
    ];
  }
  
  if (lowerType.includes("gene expression")) {
    return [
      { step: 1, title: "Sample Preservation", description: "Stabilize RNA immediately after collection (RNAlater, flash freeze)" },
      { step: 2, title: "RNA Extraction", description: "Isolate total RNA; treat with DNase to remove genomic DNA" },
      { step: 3, title: "Quality Assessment", description: "Check RNA integrity (RIN value) and concentration" },
      { step: 4, title: "Reverse Transcription", description: "Convert RNA to cDNA using reverse transcriptase" },
      { step: 5, title: "qPCR Setup", description: "Prepare reactions with gene-specific primers and reference genes" },
      { step: 6, title: "Amplification", description: "Run real-time PCR with appropriate thermal profile" },
      { step: 7, title: "Data Analysis", description: "Calculate relative expression using ΔΔCt or standard curve method" },
    ];
  }
  
  if (lowerType.includes("genotyping") || lowerType.includes("hla")) {
    return [
      { step: 1, title: "Sample Collection", description: "Collect blood or buccal swab for genomic DNA isolation" },
      { step: 2, title: "DNA Extraction", description: "Isolate high-quality genomic DNA; check concentration and purity" },
      { step: 3, title: "PCR Amplification", description: "Amplify target loci using sequence-specific primers" },
      { step: 4, title: "Fragment Analysis", description: "Run products on gel or capillary electrophoresis" },
      { step: 5, title: "Allele Assignment", description: "Compare patterns to reference standards for genotype calling" },
      { step: 6, title: "Confirmation (if needed)", description: "Sequence ambiguous results for definitive typing" },
      { step: 7, title: "Report Generation", description: "Document genotype results with quality metrics" },
    ];
  }
  
  return [
    { step: 1, title: "Sample Preparation", description: "Collect and process biological sample" },
    { step: 2, title: "Extraction", description: "Isolate target molecules from the sample" },
    { step: 3, title: "Reaction Setup", description: "Prepare reagents and reaction conditions" },
    { step: 4, title: "Processing", description: "Perform the main analytical procedure" },
    { step: 5, title: "Detection", description: "Measure or visualize results" },
    { step: 6, title: "Interpretation", description: "Analyze data and draw conclusions" },
  ];
};

const ExperimentBuilder = () => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsLoading(true);
      // Simulate processing
      setTimeout(() => {
        setHasSearched(true);
        setIsLoading(false);
      }, 800);
    }
  };

  const reagents = getReagentsForTest(query);
  const equipment = getEquipmentForTest(query);
  const workflow = getWorkflowForTest(query);

  const sampleQueries = [
    "qPCR test for HLA-B27",
    "PCR diagnostic test for bacterial infection",
    "Gene expression analysis experiment",
    "Autoimmune disease genotyping test",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 pattern-dots opacity-50" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bio-gradient-bg opacity-5 blur-3xl rounded-full" />

          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-6">
                <FlaskConical className="h-4 w-4" />
                Experiment / Test Builder
              </div>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Build Your <span className="bio-gradient-text">Laboratory Test</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Enter your test or experiment type to get a complete list of required reagents, 
                equipment, and step-by-step workflow.
              </p>
            </div>

            {/* Search Input */}
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bio-gradient-bg rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
                <div className="relative flex items-center bg-card border border-border/50 rounded-xl overflow-hidden shadow-lg bio-glow">
                  <div className="flex items-center justify-center w-14 h-full">
                    <Search className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter test type: qPCR, genotyping, gene expression..."
                    className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground py-4 text-base"
                  />
                  <Button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="m-2 bio-button-primary flex items-center gap-2 px-5 py-2.5"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                    <span className="font-medium">Generate</span>
                  </Button>
                </div>
              </div>
            </form>

            {/* Sample Queries */}
            {!hasSearched && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">Try a sample query:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {sampleQueries.map((sample) => (
                    <button
                      key={sample}
                      onClick={() => {
                        setQuery(sample);
                        setIsLoading(true);
                        setTimeout(() => {
                          setHasSearched(true);
                          setIsLoading(false);
                        }, 800);
                      }}
                      className="px-4 py-2 text-sm bg-card border border-border/50 rounded-full text-muted-foreground hover:text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Results Section */}
        {hasSearched && (
          <section className="py-8 pb-16">
            <div className="container mx-auto px-6">
              <div className="max-w-5xl mx-auto space-y-8">
                {/* Query Display */}
                <div className="text-center pb-4 border-b border-border/50">
                  <p className="text-sm text-muted-foreground">Showing requirements for:</p>
                  <h2 className="font-display text-xl font-semibold text-foreground mt-1">"{query}"</h2>
                </div>

                {/* Three Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Required Reagents */}
                  <div className="bio-card p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-primary/10">
                        <TestTube2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg">Required Reagents</h3>
                        <p className="text-sm text-muted-foreground">{reagents.length} items needed</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {reagents.map((reagent, index) => (
                        <div 
                          key={index} 
                          className="p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <Beaker className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm text-foreground">{reagent.name}</h4>
                              <p className="text-xs text-muted-foreground mt-0.5">{reagent.role}</p>
                              {reagent.supplier && (
                                <p className="text-xs text-primary/70 mt-1">
                                  Suppliers: {reagent.supplier}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Required Equipment */}
                  <div className="bio-card p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2.5 rounded-xl bg-secondary/10">
                        <Microscope className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-lg">Laboratory Equipment</h3>
                        <p className="text-sm text-muted-foreground">{equipment.length} instruments</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {equipment.map((item, index) => (
                        <div 
                          key={index} 
                          className="p-3 rounded-lg bg-muted/30 border border-border/30 hover:border-secondary/30 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <Pipette className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <h4 className="font-medium text-sm text-foreground">{item.name}</h4>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${
                                  item.required 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-muted text-muted-foreground"
                                }`}>
                                  {item.required ? "Required" : "Optional"}
                                </span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-0.5">{item.purpose}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Workflow Section */}
                <div className="bio-card p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bio-gradient-bg">
                      <ListChecks className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-lg">Experiment Workflow</h3>
                      <p className="text-sm text-muted-foreground">Step-by-step procedure</p>
                    </div>
                  </div>
                  
                  {/* Timeline */}
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30" />
                    
                    <div className="space-y-4">
                      {workflow.map((step, index) => (
                        <div key={index} className="relative flex gap-4">
                          {/* Step indicator */}
                          <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-card border-2 border-primary shadow-sm shrink-0">
                            <span className="text-sm font-bold text-primary">{step.step}</span>
                          </div>
                          
                          {/* Step content */}
                          <div className="flex-1 pb-4">
                            <div className="p-4 rounded-lg bg-muted/30 border border-border/30 hover:border-primary/30 transition-colors">
                              <h4 className="font-medium text-foreground flex items-center gap-2">
                                {step.title}
                                <Zap className="h-3.5 w-3.5 text-secondary" />
                              </h4>
                              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery("");
                      setHasSearched(false);
                    }}
                    className="gap-2"
                  >
                    <Search className="h-4 w-4" />
                    New Search
                  </Button>
                  <Button className="bio-button-primary gap-2">
                    <ListChecks className="h-4 w-4" />
                    Export Protocol
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ExperimentBuilder;
