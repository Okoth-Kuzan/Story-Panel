import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface Panel {
  id: string;
  background?: string;
}

interface EditorCanvasProps {
  panels: Panel[];
  onAddPanel: () => void;
  onDeletePanel: (id: string) => void;
}

export default function EditorCanvas({ panels, onAddPanel, onDeletePanel }: EditorCanvasProps) {
  return (
    <div className="flex-1 bg-background overflow-auto p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {panels.map((panel, index) => (
          <Card 
            key={panel.id} 
            className="relative border-2 border-dashed hover-elevate"
            data-testid={`panel-${panel.id}`}
          >
            <div className="aspect-video bg-muted/30 flex items-center justify-center relative">
              {panel.background ? (
                <img 
                  src={panel.background} 
                  alt="Panel background" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
              ) : null}
              <div className="relative z-10 text-center">
                <p className="text-muted-foreground mb-4">
                  Panel {index + 1}
                </p>
                <p className="text-sm text-muted-foreground">
                  Drag characters and backgrounds here
                </p>
              </div>
              <Button
                size="icon"
                variant="destructive"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onDeletePanel(panel.id)}
                data-testid={`button-delete-panel-${panel.id}`}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}

        <Card 
          className="border-2 border-dashed hover-elevate cursor-pointer"
          onClick={onAddPanel}
          data-testid="button-add-panel"
        >
          <div className="aspect-video flex items-center justify-center">
            <div className="text-center">
              <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground font-medium">Add New Panel</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}