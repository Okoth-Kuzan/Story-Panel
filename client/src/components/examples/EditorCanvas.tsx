import { useState } from 'react';
import EditorCanvas from '../EditorCanvas';

export default function EditorCanvasExample() {
  const [panels, setPanels] = useState([
    { id: '1' },
    { id: '2' },
  ]);

  const handleAddPanel = () => {
    setPanels([...panels, { id: String(panels.length + 1) }]);
  };

  const handleDeletePanel = (id: string) => {
    setPanels(panels.filter(p => p.id !== id));
  };

  return (
    <div className="h-screen">
      <EditorCanvas 
        panels={panels}
        onAddPanel={handleAddPanel}
        onDeletePanel={handleDeletePanel}
      />
    </div>
  );
}