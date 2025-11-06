import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroPanelImage from "@assets/generated_images/Hero_comic_panel_demo_faeadf40.png";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">No drawing skills required</span>
            </div>
            
            <h1 className="text-6xl font-bold tracking-tight leading-tight">
              Create Stunning Comics{" "}
              <span className="text-primary">Without Drawing</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Build professional comics and manga with drag-and-drop characters, customizable scenes, and speech bubbles. Your story, simplified.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/dashboard" data-testid="button-hero-start">
                <Button size="lg" className="gap-2">
                  Start Creating Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <a href="#features" data-testid="button-hero-learn">
                <Button size="lg" variant="outline">
                  See How It Works
                </Button>
              </a>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Comics Created</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold">5K+</div>
                <div className="text-sm text-muted-foreground">Active Creators</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="text-3xl font-bold">100+</div>
                <div className="text-sm text-muted-foreground">Characters</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-2xl blur-3xl" />
            <img 
              src={heroPanelImage} 
              alt="Comic panel demo" 
              className="relative rounded-2xl shadow-2xl border"
              data-testid="img-hero-demo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}