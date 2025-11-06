import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Palette } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Project } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  const createProjectMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest('POST', '/api/projects', {
        name: `New Comic ${projects.length + 1}`,
        panelsData: [{ id: '1', characters: [], dialogues: [] }],
      });
      return await res.json();
    },
    onSuccess: (newProject: Project) => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      setLocation(`/editor/${newProject.id}`);
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/projects/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Project deleted",
        description: "Project has been removed",
      });
    },
  });

  const duplicateProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const project = projects.find(p => p.id === id);
      if (!project) throw new Error("Project not found");
      
      const res = await apiRequest('POST', '/api/projects', {
        name: `${project.name} (Copy)`,
        panelsData: project.panelsData,
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      toast({
        title: "Project duplicated",
        description: "A copy has been created",
      });
    },
  });

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return `${Math.floor(diffMins / 1440)} days ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-lg" data-testid="link-home">
              <Palette className="w-6 h-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">StoryPanel</span>
            </Link>

            <Button 
              size="default" 
              onClick={() => createProjectMutation.mutate()}
              disabled={createProjectMutation.isPending}
              data-testid="button-create-project"
              className="gap-2"
            >
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Your Projects</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="input-search-projects"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-24">
            <Palette className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try a different search term" : "Create your first comic to get started"}
            </p>
            <Button 
              onClick={() => createProjectMutation.mutate()} 
              disabled={createProjectMutation.isPending}
              data-testid="button-create-first"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                name={project.name}
                thumbnail={project.thumbnail || '/assets/generated_images/Hero_comic_panel_demo_faeadf40.png'}
                updatedAt={formatDate(project.updatedAt)}
                panelCount={project.panelsData.length}
                onOpen={() => setLocation(`/editor/${project.id}`)}
                onDelete={() => deleteProjectMutation.mutate(project.id)}
                onDuplicate={() => duplicateProjectMutation.mutate(project.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}