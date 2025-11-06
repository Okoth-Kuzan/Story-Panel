import { CharacterTemplate, BackgroundTemplate } from './schema';

export const characterTemplates: CharacterTemplate[] = [
  {
    id: 'char_female_neutral',
    name: 'Aiko (Neutral)',
    image: '/assets/generated_images/Female_character_neutral_19d8c4ed.png',
    category: 'female'
  },
  {
    id: 'char_female_happy',
    name: 'Aiko (Happy)',
    image: '/assets/generated_images/Female_character_happy_06e42802.png',
    category: 'female'
  },
  {
    id: 'char_female_angry',
    name: 'Aiko (Angry)',
    image: '/assets/generated_images/Female_character_angry_e0b049e7.png',
    category: 'female'
  },
  {
    id: 'char_male_neutral',
    name: 'Kenji (Neutral)',
    image: '/assets/generated_images/Male_character_neutral_f443294d.png',
    category: 'male'
  },
  {
    id: 'char_male_happy',
    name: 'Kenji (Happy)',
    image: '/assets/generated_images/Male_character_happy_4d6f4070.png',
    category: 'male'
  },
];

export const backgroundTemplates: BackgroundTemplate[] = [
  {
    id: 'bg_classroom',
    name: 'Classroom',
    image: '/assets/generated_images/Classroom_background_scene_836240f2.png',
    category: 'indoor'
  },
  {
    id: 'bg_city_street',
    name: 'City Street',
    image: '/assets/generated_images/City_street_background_58aa82b7.png',
    category: 'outdoor'
  },
  {
    id: 'bg_living_room',
    name: 'Living Room',
    image: '/assets/generated_images/Living_room_background_d23c6b41.png',
    category: 'indoor'
  },
  {
    id: 'bg_fantasy_forest',
    name: 'Fantasy Forest',
    image: '/assets/generated_images/Fantasy_forest_background_cf61fd6e.png',
    category: 'fantasy'
  },
];