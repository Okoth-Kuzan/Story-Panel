import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-lg" data-testid="link-home">
            <Palette className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">StoryPanel</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-features">
              Features
            </a>
            <a href="#characters" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-characters">
              Characters
            </a>
            <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" data-testid="link-pricing">
              Pricing
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" data-testid="link-login">
              <Button variant="ghost" size="default">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard" data-testid="link-get-started">
              <Button variant="default" size="default">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}