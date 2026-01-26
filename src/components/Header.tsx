import { Link, useLocation } from "react-router-dom";
import { Dna, Search, Info, FlaskConical } from "lucide-react";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bio-gradient-bg rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative p-2 bio-gradient-bg rounded-lg">
                <Dna className="h-5 w-5 text-primary-foreground" />
              </div>
            </div>
            <span className="font-display font-bold text-xl">
              Bio<span className="bio-gradient-text">Hub</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link
              to="/results"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/results")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <FlaskConical className="h-4 w-4" />
              Results
            </Link>
            <Link
              to="/architecture"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive("/architecture")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Info className="h-4 w-4" />
              Architecture
            </Link>
          </nav>

          {/* Demo Badge */}
          <div className="bio-badge-secondary flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse-soft" />
            Demo Mode
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
