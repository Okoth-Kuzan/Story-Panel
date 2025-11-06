import { useState, useEffect } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import EditorTopBar from "@/components/EditorTopBar";
import EditorSidebarComponent from "../components/EditorSidebarComponent";
import KonvaCanvas from "@/components/KonvaCanvas";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Project, Panel } from "@shared/schema";
import { createNewPanel } from "@/lib/canvasUtils";

export default function EditorPage() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ['/api/projects', id],
  });

  const updateProjectMutation = useMutation({
    mutationFn: async (updates: Partial<Project>) => {
      const res = await apiRequest('PATCH', `/api/projects/${id}`, updates);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects', id] });
    },
  });

  const handleNameChange = (name: string) => {
    if (project) {
      updateProjectMutation.mutate({ name });
    }
  };

  const handlePanelUpdate = (updatedPanel: Panel) => {
    if (!project) return;
    
    const newPanels = [...project.panelsData];
    newPanels[currentPanelIndex] = updatedPanel;
    updateProjectMutation.mutate({ panelsData: newPanels });
  };

  const handleAddPanel = () => {
    if (!project) return;
    
    const newPanel = createNewPanel();
    const newPanels = [...project.panelsData, newPanel];
    updateProjectMutation.mutate({ panelsData: newPanels });
    setCurrentPanelIndex(newPanels.length - 1);
    
    toast({
      title: "Panel added",
      description: `Panel ${newPanels.length} created`,
    });
  };

  const handleDeletePanel = () => {
    if (!project || project.panelsData.length <= 1) {
      toast({
        title: "Cannot delete",
        description: "You must have at least one panel",
        variant: "destructive",
      });
      return;
    }

    const newPanels = project.panelsData.filter((_, i) => i !== currentPanelIndex);
    updateProjectMutation.mutate({ panelsData: newPanels });
    
    if (currentPanelIndex >= newPanels.length) {
      setCurrentPanelIndex(newPanels.length - 1);
    }
    
    toast({
      title: "Panel deleted",
      description: "Panel removed from project",
    });
  };

  const handleSave = () => {
    toast({
      title: "Project saved",
      description: "All changes have been saved successfully",
    });
  };

  const handleExport = async () => {
    toast({
      title: "Exporting comic",
      description: "Your comic is being prepared for download",
    });
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  const currentPanel = project.panelsData[currentPanelIndex];

  return (
    <div className="h-screen flex flex-col">
      <EditorTopBar
        projectName={project.name}
        onNameChange={handleNameChange}
        onSave={handleSave}
        onExport={handleExport}
      />
      <div className="flex-1 flex overflow-hidden">
        <EditorSidebarComponent
          currentPanel={currentPanel}
          onPanelUpdate={handlePanelUpdate}
        />
        <div className="flex-1 overflow-auto p-8 bg-muted/30">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPanelIndex(Math.max(0, currentPanelIndex - 1))}
                  disabled={currentPanelIndex === 0}
                  data-testid="button-prev-panel"
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Panel {currentPanelIndex + 1} of {project.panelsData.length}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPanelIndex(Math.min(project.panelsData.length - 1, currentPanelIndex + 1))}
                  disabled={currentPanelIndex === project.panelsData.length - 1}
                  data-testid="button-next-panel"
                >
                  Next
                </Button>
              </div>
              <Button
                size="sm"
                variant="destructive"
                onClick={handleDeletePanel}
                data-testid="button-delete-panel"
              >
                Delete Panel
              </Button>
            </div>

            <KonvaCanvas
              panel={currentPanel}
              onUpdate={handlePanelUpdate}
              width={900}
              height={600}
            />

            <Button
              className="w-full gap-2"
              variant="outline"
              onClick={handleAddPanel}
              data-testid="button-add-panel"
            >
              <Plus className="w-4 h-4" />
              Add New Panel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}