import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Beaker, Dna, Target, Calendar, User, Building, Video, Loader2, Sparkles } from "lucide-react";
import { BiologicalExperiment } from "@/data/demoData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ResultCardProps {
  experiment: BiologicalExperiment;
  index: number;
}

const ResultCard = ({ experiment, index }: ResultCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);

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

            {/* Generate Explanatory Video Button */}
            <div className="mt-4">
              <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-2 border-secondary/50 text-secondary hover:bg-secondary/10"
                  >
                    <Video className="h-4 w-4" />
                    <Sparkles className="h-3 w-3" />
                    Generate Explanatory Video
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-secondary" />
                      Generate Explanatory Video
                    </DialogTitle>
                    <DialogDescription>
                      Create an AI-powered video explanation of this experiment's methodology and findings.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4 py-4">
                    {!isGeneratingVideo && !videoGenerated && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                          <h4 className="font-medium text-sm mb-2">{experiment.title}</h4>
                          <p className="text-xs text-muted-foreground line-clamp-2">
                            {experiment.description}
                          </p>
                        </div>
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>• Video will explain key methodology</p>
                          <p>• Highlights shared features and findings</p>
                          <p>• Approx. 30-60 second duration</p>
                        </div>
                        <Button
                          onClick={() => {
                            setIsGeneratingVideo(true);
                            // Simulate video generation
                            setTimeout(() => {
                              setIsGeneratingVideo(false);
                              setVideoGenerated(true);
                            }, 3000);
                          }}
                          className="w-full bg-secondary hover:bg-secondary/90"
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Video
                        </Button>
                      </div>
                    )}

                    {isGeneratingVideo && (
                      <div className="flex flex-col items-center justify-center py-8 space-y-4">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full border-4 border-secondary/20 border-t-secondary animate-spin" />
                          <Video className="h-6 w-6 text-secondary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="text-center">
                          <p className="font-medium text-sm">Generating video...</p>
                          <p className="text-xs text-muted-foreground">This may take a few moments</p>
                        </div>
                        <div className="w-full max-w-xs">
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-secondary animate-pulse" style={{ width: '60%' }} />
                          </div>
                        </div>
                      </div>
                    )}

                    {videoGenerated && (
                      <div className="space-y-4">
                        <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center border border-border/50">
                          <div className="text-center space-y-2">
                            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto">
                              <Video className="h-6 w-6 text-secondary" />
                            </div>
                            <p className="text-sm font-medium">Video Ready</p>
                            <p className="text-xs text-muted-foreground">Demo Mode - Preview Only</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1" onClick={() => {
                            setVideoGenerated(false);
                            setVideoDialogOpen(false);
                          }}>
                            Close
                          </Button>
                          <Button className="flex-1 bg-secondary hover:bg-secondary/90">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <p className="text-xs text-center text-muted-foreground">
                          In production, this would generate a real AI-powered explanatory video.
                        </p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
