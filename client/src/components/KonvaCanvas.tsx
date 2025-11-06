import { useRef, useState, useEffect } from 'react';
import { Stage, Layer, Image as KonvaImage, Rect, Text, Group, Transformer } from 'react-konva';
import type { Panel, CharacterInstance, DialogueBubble } from '@shared/schema';
import Konva from 'konva';

interface KonvaCanvasProps {
  panel: Panel;
  onUpdate: (panel: Panel) => void;
  width: number;
  height: number;
}

export default function KonvaCanvas({ panel, onUpdate, width, height }: KonvaCanvasProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [images, setImages] = useState<Map<string, HTMLImageElement>>(new Map());
  const transformerRef = useRef<Konva.Transformer>(null);
  const stageRef = useRef<Konva.Stage>(null);

  // Load images for characters and background
  useEffect(() => {
    const imagesToLoad: Array<{ id: string; src: string }> = [];
    
    if (panel.backgroundImage) {
      imagesToLoad.push({ id: 'background', src: panel.backgroundImage });
    }
    
    panel.characters.forEach(char => {
      imagesToLoad.push({ id: char.id, src: char.image });
    });

    const newImages = new Map<string, HTMLImageElement>();
    let loadedCount = 0;

    imagesToLoad.forEach(({ id, src }) => {
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        newImages.set(id, img);
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setImages(new Map(newImages));
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${src}`);
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setImages(new Map(newImages));
        }
      };
      img.src = src;
    });
  }, [panel.backgroundImage, panel.characters]);

  // Update transformer when selection changes
  useEffect(() => {
    if (transformerRef.current && stageRef.current) {
      const node = stageRef.current.findOne(`#${selectedId}`);
      if (node) {
        transformerRef.current.nodes([node]);
      } else {
        transformerRef.current.nodes([]);
      }
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  const handleCharacterDragEnd = (charId: string, e: Konva.KonvaEventObject<DragEvent>) => {
    const updatedCharacters = panel.characters.map(char => 
      char.id === charId 
        ? { ...char, x: e.target.x(), y: e.target.y() }
        : char
    );
    onUpdate({ ...panel, characters: updatedCharacters });
  };

  const handleCharacterTransform = (charId: string, e: Konva.KonvaEventObject<Event>) => {
    const node = e.target;
    const updatedCharacters = panel.characters.map(char => 
      char.id === charId 
        ? {
            ...char,
            x: node.x(),
            y: node.y(),
            scaleX: node.scaleX(),
            scaleY: node.scaleY(),
            rotation: node.rotation(),
          }
        : char
    );
    onUpdate({ ...panel, characters: updatedCharacters });
  };

  const handleDialogueDragEnd = (dialogueId: string, e: Konva.KonvaEventObject<DragEvent>) => {
    const updatedDialogues = panel.dialogues.map(d => 
      d.id === dialogueId 
        ? { ...d, x: e.target.x(), y: e.target.y() }
        : d
    );
    onUpdate({ ...panel, dialogues: updatedDialogues });
  };

  const handleTextEdit = (dialogueId: string, newText: string) => {
    const updatedDialogues = panel.dialogues.map(d => 
      d.id === dialogueId 
        ? { ...d, text: newText }
        : d
    );
    onUpdate({ ...panel, dialogues: updatedDialogues });
  };

  const handleStageClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedId(null);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-md overflow-hidden bg-white">
      <Stage
        width={width}
        height={height}
        ref={stageRef}
        onClick={handleStageClick}
        onTap={handleStageClick}
      >
        <Layer>
          {/* Background */}
          {panel.backgroundImage && images.get('background') && (
            <KonvaImage
              image={images.get('background')}
              width={width}
              height={height}
            />
          )}

          {/* Characters */}
          {panel.characters.map((char) => {
            const img = images.get(char.id);
            if (!img) return null;
            
            return (
              <KonvaImage
                key={char.id}
                id={char.id}
                image={img}
                x={char.x}
                y={char.y}
                scaleX={char.scaleX}
                scaleY={char.scaleY}
                rotation={char.rotation}
                draggable
                onClick={() => setSelectedId(char.id)}
                onTap={() => setSelectedId(char.id)}
                onDragEnd={(e) => handleCharacterDragEnd(char.id, e)}
                onTransformEnd={(e) => handleCharacterTransform(char.id, e)}
              />
            );
          })}

          {/* Speech Bubbles */}
          {panel.dialogues.map((dialogue) => (
            <Group
              key={dialogue.id}
              id={dialogue.id}
              x={dialogue.x}
              y={dialogue.y}
              draggable
              onClick={() => setSelectedId(dialogue.id)}
              onTap={() => setSelectedId(dialogue.id)}
              onDragEnd={(e) => handleDialogueDragEnd(dialogue.id, e)}
            >
              <Rect
                width={dialogue.width}
                height={dialogue.height}
                fill="white"
                stroke="black"
                strokeWidth={2}
                cornerRadius={dialogue.type === 'thought' ? 20 : 5}
              />
              <Text
                text={dialogue.text}
                width={dialogue.width - 20}
                height={dialogue.height - 20}
                x={10}
                y={10}
                fontSize={16}
                fontFamily="Arial"
                fill="black"
                align="center"
                verticalAlign="middle"
                wrap="word"
              />
            </Group>
          ))}

          {/* Transformer for selected object */}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(oldBox, newBox) => {
              // Limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}