import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Palette } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import heroPanelImage from "@assets/generated_images/Hero_comic_panel_demo_faeadf40.png";

//todo: remove mock functionality
const mockProjects = [
  {
    id: "1",
    name: "My First Comic",
    thumbnail: heroPanelImage,
    updatedAt: "2 hours ago",
    panelCount: 5,
  },
  {
    id: "2",
    name: "School Days Adventure",
    thumbnail: heroPanelImage,
    updatedAt: "1 day ago",
    panelCount: 12,
  },
  {
    id: "3",
    name: "Fantasy Quest",
    thumbnail: heroPanelImage,
    updatedAt: "3 days ago",
    panelCount: 8,
  },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [projects, setProjects] = useState(mockProjects);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateProject = () => {
    //todo: remove mock functionality
    const newProject = {
      id: String(projects.length + 1),
      name: `New Comic ${projects.length + 1}`,
      thumbnail: heroPanelImage,
      updatedAt: "Just now",
      panelCount: 1,
    };
    setProjects([newProject, ...projects]);
    setLocation(`/editor/${newProject.id}`);
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const handleDuplicateProject = (id: string) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      const newProject = {
        ...project,
        id: String(projects.length + 1),
        name: `${project.name} (Copy)`,
        updatedAt: "Just now",
      };
      setProjects([newProject, ...projects]);
    }
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
              onClick={handleCreateProject}
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

        {filteredProjects.length === 0 ? (
          <div className="text-center py-24">
            <Palette className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery ? "Try a different search term" : "Create your first comic to get started"}
            </p>
            <Button onClick={handleCreateProject} data-testid="button-create-first">
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                onOpen={() => setLocation(`/editor/${project.id}`)}
                onDelete={() => handleDeleteProject(project.id)}
                onDuplicate={() => handleDuplicateProject(project.id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}