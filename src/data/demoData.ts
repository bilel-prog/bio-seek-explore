export interface BiologicalExperiment {
  id: string;
  title: string;
  description: string;
  organism: string;
  experimentType: string;
  outcome: string;
  similarityScore: number;
  sharedFeatures: string[];
  metadata: {
    date: string;
    author: string;
    institution: string;
    doi?: string;
  };
}

export const demoExperiments: BiologicalExperiment[] = [
  {
    id: "EXP-001",
    title: "CRISPR-Cas9 Gene Editing in Human Embryonic Stem Cells",
    description: "Investigation of CRISPR-Cas9 efficiency for targeted gene knockout in hESCs, focusing on pluripotency maintenance and differentiation potential post-editing.",
    organism: "Homo sapiens",
    experimentType: "Gene Editing",
    outcome: "Successful",
    similarityScore: 0.94,
    sharedFeatures: ["CRISPR-Cas9", "Stem cells", "Pluripotency", "Gene knockout"],
    metadata: {
      date: "2024-03-15",
      author: "Dr. Sarah Chen",
      institution: "Stanford University",
      doi: "10.1038/s41586-024-07123-4"
    }
  },
  {
    id: "EXP-002",
    title: "RNA-Seq Analysis of Tumor Microenvironment in Melanoma",
    description: "Comprehensive transcriptomic profiling of melanoma tumors and surrounding stroma to identify immune checkpoint regulators and potential therapeutic targets.",
    organism: "Homo sapiens",
    experimentType: "Transcriptomics",
    outcome: "Significant findings",
    similarityScore: 0.87,
    sharedFeatures: ["RNA-Seq", "Tumor microenvironment", "Immune response", "Cancer"],
    metadata: {
      date: "2024-02-28",
      author: "Dr. Marcus Weber",
      institution: "MD Anderson Cancer Center",
      doi: "10.1016/j.cell.2024.02.045"
    }
  },
  {
    id: "EXP-003",
    title: "Single-Cell Proteomics of Neural Differentiation",
    description: "Mass spectrometry-based single-cell proteomics to map protein expression dynamics during iPSC differentiation into cortical neurons.",
    organism: "Homo sapiens",
    experimentType: "Proteomics",
    outcome: "Novel pathway identified",
    similarityScore: 0.82,
    sharedFeatures: ["Single-cell analysis", "Neural differentiation", "Proteomics", "iPSC"],
    metadata: {
      date: "2024-01-10",
      author: "Dr. Yuki Tanaka",
      institution: "RIKEN Center",
      doi: "10.1126/science.abc1234"
    }
  },
  {
    id: "EXP-004",
    title: "Microbiome-Host Interactions in Inflammatory Bowel Disease",
    description: "Metagenomic and metabolomic analysis of gut microbiota alterations in IBD patients, correlating microbial signatures with disease severity.",
    organism: "Mixed (Human + Microbiome)",
    experimentType: "Metagenomics",
    outcome: "Biomarker discovered",
    similarityScore: 0.79,
    sharedFeatures: ["Microbiome", "Metabolomics", "Inflammatory disease", "Host-pathogen"],
    metadata: {
      date: "2024-04-02",
      author: "Dr. Elena Rodriguez",
      institution: "Karolinska Institute"
    }
  },
  {
    id: "EXP-005",
    title: "Zebrafish Model for Drug Screening in Cardiac Regeneration",
    description: "High-throughput chemical screening using zebrafish heart injury model to identify small molecules promoting cardiomyocyte proliferation.",
    organism: "Danio rerio",
    experimentType: "Drug Screening",
    outcome: "Lead compounds identified",
    similarityScore: 0.75,
    sharedFeatures: ["Zebrafish", "Cardiac regeneration", "Drug screening", "High-throughput"],
    metadata: {
      date: "2024-03-20",
      author: "Dr. James Liu",
      institution: "Harvard Medical School",
      doi: "10.1038/ncomms2024-0567"
    }
  },
  {
    id: "EXP-006",
    title: "Epigenetic Reprogramming in Mouse Embryonic Development",
    description: "ChIP-seq and ATAC-seq profiling of histone modifications during early mouse embryogenesis to understand zygotic genome activation.",
    organism: "Mus musculus",
    experimentType: "Epigenomics",
    outcome: "Regulatory network mapped",
    similarityScore: 0.71,
    sharedFeatures: ["Epigenetics", "Embryo development", "ChIP-seq", "Chromatin accessibility"],
    metadata: {
      date: "2024-02-14",
      author: "Dr. Anna Kowalski",
      institution: "Max Planck Institute"
    }
  },
  {
    id: "EXP-007",
    title: "CAR-T Cell Engineering for Solid Tumor Targeting",
    description: "Development of dual-targeting CAR-T cells with enhanced tumor infiltration and persistence in pancreatic cancer xenograft models.",
    organism: "Homo sapiens",
    experimentType: "Cell Therapy",
    outcome: "Improved efficacy",
    similarityScore: 0.68,
    sharedFeatures: ["CAR-T", "Immunotherapy", "Cancer", "Cell engineering"],
    metadata: {
      date: "2024-03-08",
      author: "Dr. Michael Park",
      institution: "Memorial Sloan Kettering",
      doi: "10.1158/2159-8290.CD-24-0123"
    }
  },
  {
    id: "EXP-008",
    title: "Structural Analysis of SARS-CoV-2 Spike Variants",
    description: "Cryo-EM structural determination of emerging spike protein variants and their binding affinity to ACE2 receptor.",
    organism: "SARS-CoV-2",
    experimentType: "Structural Biology",
    outcome: "Structure solved",
    similarityScore: 0.65,
    sharedFeatures: ["Cryo-EM", "Viral proteins", "Structural biology", "Receptor binding"],
    metadata: {
      date: "2024-01-25",
      author: "Dr. David Thompson",
      institution: "Scripps Research Institute"
    }
  }
];

export const organisms = [
  "All Organisms",
  "Homo sapiens",
  "Mus musculus",
  "Danio rerio",
  "Drosophila melanogaster",
  "SARS-CoV-2",
  "Mixed"
];

export const experimentTypes = [
  "All Types",
  "Gene Editing",
  "Transcriptomics",
  "Proteomics",
  "Metagenomics",
  "Drug Screening",
  "Epigenomics",
  "Cell Therapy",
  "Structural Biology"
];

export const outcomes = [
  "All Outcomes",
  "Successful",
  "Significant findings",
  "Novel pathway identified",
  "Biomarker discovered",
  "Lead compounds identified",
  "Regulatory network mapped",
  "Improved efficacy",
  "Structure solved"
];
