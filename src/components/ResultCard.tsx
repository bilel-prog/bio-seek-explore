import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Beaker, Dna, Target, Calendar, User, Building } from "lucide-react";
import { BiologicalExperiment } from "@/data/demoData";

interface ResultCardProps {
  experiment: BiologicalExperiment;
  index: number;
}

const ResultCard = ({ experiment, index }: ResultCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scorePercent = Math.round(experiment.similarityScore * 100);
  const scoreColor = scorePercent >= 80 ? "text-secondary" : scorePercent >= 60 ? "text-primary" : "text-accent";

  return (
    <div
      className="bio-card overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Main Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-muted-foreground">{experiment.id}</span>
              <span className="bio-badge">{experiment.experimentType}</span>
            </div>
            <h3 className="font-display font-semibold text-lg text-foreground leading-tight mb-2">
              {experiment.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {experiment.description}
            </p>
          </div>

          {/* Similarity Score */}
          <div className="flex flex-col items-center justify-center min-w-[80px]">
            <div className={`text-2xl font-bold font-display ${scoreColor}`}>
              {scorePercent}%
            </div>
            <div className="text-xs text-muted-foreground">similarity</div>
            <div className="w-full mt-2 bio-score-bar">
              <div
                className="bio-score-bar-fill transition-all duration-500"
                style={{ width: `${scorePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Metadata Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-xs">
            <Dna className="h-3.5 w-3.5 text-primary" />
            <span>{experiment.organism}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-xs">
            <Target className="h-3.5 w-3.5 text-secondary" />
            <span>{experiment.outcome}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full text-xs">
            <Beaker className="h-3.5 w-3.5 text-accent" />
            <span>{experiment.experimentType}</span>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Hide explainability
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show why this result matched
            </>
          )}
        </button>
      </div>

      {/* Explainability Section */}
      {isExpanded && (
        <div className="px-6 pb-6 pt-0 border-t border-border/50 animate-fade-in">
          <div className="pt-4">
            <h4 className="font-display font-semibold text-sm mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Shared Features with Query
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {experiment.sharedFeatures.map((feature) => (
                <span
                  key={feature}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-medium rounded-full border border-primary/20"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Metadata Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-border/30">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{experiment.metadata.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{experiment.metadata.author}</span>
              </div>
              <div className="flex items-center gap-2 text-sm col-span-2">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{experiment.metadata.institution}</span>
              </div>
            </div>

            {experiment.metadata.doi && (
              <a
                href={`https://doi.org/${experiment.metadata.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
              >
                <ExternalLink className="h-4 w-4" />
                View publication: {experiment.metadata.doi}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
