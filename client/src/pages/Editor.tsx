import { useState } from "react";
import EditorTopBar from "@/components/EditorTopBar";
import EditorSidebar from "@/components/EditorSidebar";
import EditorCanvas from "@/components/EditorCanvas";
import { useToast } from "@/hooks/use-toast";

interface Panel {
  id: string;
  background?: string;
}

export default function Editor() {
  const { toast } = useToast();
  const [projectName, setProjectName] = useState("My First Comic");
  const [panels, setPanels] = useState<Panel[]>([
    { id: "1" },
    { id: "2" },
  ]);

  const handleAddPanel = () => {
    const newPanel = { id: String(panels.length + 1) };
    setPanels([...panels, newPanel]);
    toast({
      title: "Panel added",
      description: `Panel ${panels.length + 1} created`,
    });
  };

  const handleDeletePanel = (id: string) => {
    if (panels.length === 1) {
      toast({
        title: "Cannot delete",
        description: "You must have at least one panel",
        variant: "destructive",
      });
      return;
    }
    setPanels(panels.filter(p => p.id !== id));
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
    console.log("Saving project:", { projectName, panels });
  };

  const handleExport = () => {
    toast({
      title: "Exporting comic",
      description: "Your comic is being prepared for download",
    });
    console.log("Exporting project:", { projectName, panels });
  };

  return (
    <div className="h-screen flex flex-col">
      <EditorTopBar
        projectName={projectName}
        onNameChange={setProjectName}
        onSave={handleSave}
        onExport={handleExport}
      />
      <div className="flex-1 flex overflow-hidden">
        <EditorSidebar />
        <EditorCanvas
          panels={panels}
          onAddPanel={handleAddPanel}
          onDeletePanel={handleDeletePanel}
        />
      </div>
    </div>
  );
}