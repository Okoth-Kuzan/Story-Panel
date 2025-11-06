import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Image as ImageIcon, MessageSquare } from "lucide-react";
import femaleNeutral from "@assets/generated_images/Female_character_neutral_19d8c4ed.png";
import femaleHappy from "@assets/generated_images/Female_character_happy_06e42802.png";
import femaleAngry from "@assets/generated_images/Female_character_angry_e0b049e7.png";
import maleNeutral from "@assets/generated_images/Male_character_neutral_f443294d.png";
import maleHappy from "@assets/generated_images/Male_character_happy_4d6f4070.png";
import classroom from "@assets/generated_images/Classroom_background_scene_836240f2.png";
import cityStreet from "@assets/generated_images/City_street_background_58aa82b7.png";
import livingRoom from "@assets/generated_images/Living_room_background_d23c6b41.png";
import fantasyForest from "@assets/generated_images/Fantasy_forest_background_cf61fd6e.png";

const characters = [
  { id: "char_1", name: "Aiko (Neutral)", image: femaleNeutral },
  { id: "char_2", name: "Aiko (Happy)", image: femaleHappy },
  { id: "char_3", name: "Aiko (Angry)", image: femaleAngry },
  { id: "char_4", name: "Kenji (Neutral)", image: maleNeutral },
  { id: "char_5", name: "Kenji (Happy)", image: maleHappy },
];

const backgrounds = [
  { id: "bg_1", name: "Classroom", image: classroom },
  { id: "bg_2", name: "City Street", image: cityStreet },
  { id: "bg_3", name: "Living Room", image: livingRoom },
  { id: "bg_4", name: "Fantasy Forest", image: fantasyForest },
];

const bubbleTypes = [
  { id: "bubble_speech", name: "Speech", type: "speech" },
  { id: "bubble_thought", name: "Thought", type: "thought" },
  { id: "bubble_shout", name: "Shout", type: "shout" },
];

export default function EditorSidebar() {
  const [selectedTab, setSelectedTab] = useState("characters");

  return (
    <div className="w-80 border-r bg-sidebar h-full flex flex-col">
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col">
        <TabsList className="w-full rounded-none border-b bg-transparent p-0 h-auto">
          <TabsTrigger 
            value="characters" 
            className="flex-1 rounded-none data-[state=active]:bg-sidebar-accent gap-2 py-3"
            data-testid="tab-characters"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Characters</span>
          </TabsTrigger>
          <TabsTrigger 
            value="backgrounds" 
            className="flex-1 rounded-none data-[state=active]:bg-sidebar-accent gap-2 py-3"
            data-testid="tab-backgrounds"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Backgrounds</span>
          </TabsTrigger>
          <TabsTrigger 
            value="bubbles" 
            className="flex-1 rounded-none data-[state=active]:bg-sidebar-accent gap-2 py-3"
            data-testid="tab-bubbles"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Bubbles</span>
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="characters" className="m-0 p-4">
            <div className="grid grid-cols-2 gap-3">
              {characters.map((character) => (
                <Card 
                  key={character.id}
                  className="hover-elevate cursor-grab active:cursor-grabbing overflow-hidden"
                  data-testid={`card-sidebar-character-${character.id}`}
                  onClick={() => console.log('Add character:', character.id)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-square bg-muted/50 overflow-hidden">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-xs font-medium truncate">{character.name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="backgrounds" className="m-0 p-4">
            <div className="space-y-3">
              {backgrounds.map((bg) => (
                <Card 
                  key={bg.id}
                  className="hover-elevate cursor-pointer overflow-hidden"
                  data-testid={`card-sidebar-background-${bg.id}`}
                  onClick={() => console.log('Set background:', bg.id)}
                >
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted/50 overflow-hidden">
                      <img 
                        src={bg.image} 
                        alt={bg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium">{bg.name}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="bubbles" className="m-0 p-4">
            <div className="space-y-3">
              {bubbleTypes.map((bubble) => (
                <Card 
                  key={bubble.id}
                  className="hover-elevate cursor-pointer"
                  data-testid={`card-sidebar-bubble-${bubble.id}`}
                  onClick={() => console.log('Add bubble:', bubble.type)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="w-8 h-8 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{bubble.name} Bubble</p>
                        <p className="text-xs text-muted-foreground capitalize">{bubble.type}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}