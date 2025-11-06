import { Card, CardContent } from "@/components/ui/card";
import { Layers, Users, MessageSquare, Download, Wand2, Layout } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Drag & Drop Canvas",
    description: "Intuitive editor with powerful Konva.js canvas. Position, scale, and arrange characters with precision."
  },
  {
    icon: Users,
    title: "Character Library",
    description: "100+ pre-drawn characters with customizable expressions, poses, and outfits. No artistic skills needed."
  },
  {
    icon: MessageSquare,
    title: "Speech Bubbles",
    description: "Add dialogue with multiple bubble styles. Auto-snap tails to characters for perfect positioning."
  },
  {
    icon: Layout,
    title: "Panel Management",
    description: "Create multi-panel layouts. Arrange vertically for Webtoon-style or grid for traditional comics."
  },
  {
    icon: Wand2,
    title: "Scene Backgrounds",
    description: "Choose from dozens of professionally designed backgrounds or upload your own custom scenes."
  },
  {
    icon: Download,
    title: "Export Anywhere",
    description: "Download as PNG, vertical comic strips, or share online. Perfect quality every time."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Everything You Need to Create
          </h2>
          <p className="text-lg text-muted-foreground">
            Professional comic creation tools designed for storytellers, not artists. Start creating in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate transition-all" data-testid={`card-feature-${index}`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}