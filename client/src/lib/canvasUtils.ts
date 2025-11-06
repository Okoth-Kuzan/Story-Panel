import type { Panel } from '@shared/schema';
import { nanoid } from 'nanoid';

export function createNewPanel(): Panel {
  return {
    id: nanoid(),
    characters: [],
    dialogues: [],
  };
}

export function createCharacterInstance(templateId: string, name: string, image: string) {
  return {
    id: nanoid(),
    templateId,
    name,
    image,
    x: 400,
    y: 300,
    scaleX: 1,
    scaleY: 1,
    rotation: 0,
  };
}

export function createDialogueBubble(type: 'speech' | 'thought' | 'shout' = 'speech') {
  return {
    id: nanoid(),
    text: 'Type your dialogue here...',
    x: 300,
    y: 200,
    width: 200,
    height: 100,
    type,
  };
}