import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2, Copy } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ProjectCardProps {
  id: string;
  name: string;
  thumbnail: string;
  updatedAt: string;
  panelCount: number;
  onOpen: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

export default function ProjectCard({
  id,
  name,
  thumbnail,
  updatedAt,
  panelCount,
  onOpen,
  onDelete,
  onDuplicate,
}: ProjectCardProps) {
  return (
    <Card className="hover-elevate overflow-hidden group cursor-pointer" data-testid={`card-project-${id}`}>
      <CardContent className="p-0">
        <div onClick={onOpen} className="aspect-video bg-muted/50 overflow-hidden">
          <img 
            src={thumbnail} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            data-testid={`img-project-${id}`}
          />
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-base flex-1 truncate" data-testid={`text-project-name-${id}`}>
              {name}
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8" data-testid={`button-menu-${id}`}>
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onDuplicate} data-testid={`button-duplicate-${id}`}>
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDelete} className="text-destructive" data-testid={`button-delete-${id}`}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>{panelCount} panels</span>
            <span>{updatedAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}