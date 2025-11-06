import ProjectCard from '../ProjectCard';
import heroPanelImage from "@assets/generated_images/Hero_comic_panel_demo_faeadf40.png";

export default function ProjectCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <ProjectCard
        id="1"
        name="My First Comic"
        thumbnail={heroPanelImage}
        updatedAt="2 hours ago"
        panelCount={5}
        onOpen={() => console.log('Open project 1')}
        onDelete={() => console.log('Delete project 1')}
        onDuplicate={() => console.log('Duplicate project 1')}
      />
      <ProjectCard
        id="2"
        name="School Days Adventure"
        thumbnail={heroPanelImage}
        updatedAt="1 day ago"
        panelCount={12}
        onOpen={() => console.log('Open project 2')}
        onDelete={() => console.log('Delete project 2')}
        onDuplicate={() => console.log('Duplicate project 2')}
      />
    </div>
  );
}