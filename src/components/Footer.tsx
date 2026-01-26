import { Dna, Github, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-1.5 bio-gradient-bg rounded-lg">
              <Dna className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg">
              Bio<span className="bio-gradient-text">Hub</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">
              Search
            </Link>
            <Link to="/results" className="hover:text-foreground transition-colors">
              Results
            </Link>
            <Link to="/architecture" className="hover:text-foreground transition-colors">
              Architecture
            </Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Powered by Vector Similarity Search
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground">
            © 2024 BioHub. Multimodal Biological Discovery Platform. Demo Mode Active.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
