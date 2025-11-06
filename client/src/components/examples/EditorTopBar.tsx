import { useState } from 'react';
import EditorTopBar from '../EditorTopBar';

export default function EditorTopBarExample() {
  const [projectName, setProjectName] = useState('My First Comic');

  return (
    <EditorTopBar
      projectName={projectName}
      onNameChange={setProjectName}
      onSave={() => console.log('Save clicked')}
      onExport={() => console.log('Export clicked')}
    />
  );
}