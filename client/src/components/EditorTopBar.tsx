import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Download, Settings, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface EditorTopBarProps {
  projectName: string;
  onSave: () => void;
  onExport: () => void;
  onNameChange: (name: string) => void;
}

export default function EditorTopBar({ 
  projectName, 
  onSave, 
  onExport,
  onNameChange 
}: EditorTopBarProps) {
  return (
    <div className="h-16 border-b bg-background flex items-center justify-between px-6 gap-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link href="/dashboard" data-testid="button-back-dashboard">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <Input 
          value={projectName}
          onChange={(e) => onNameChange(e.target.value)}
          className="max-w-md"
          placeholder="Project name..."
          data-testid="input-project-name"
        />
      </div>

      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="default" 
          onClick={onSave}
          data-testid="button-save"
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save</span>
        </Button>
        <Button 
          variant="default" 
          size="default" 
          onClick={onExport}
          data-testid="button-export"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          data-testid="button-settings"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}