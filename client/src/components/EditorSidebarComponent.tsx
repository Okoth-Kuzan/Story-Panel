import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Users, Image as ImageIcon, MessageSquare } from "lucide-react";
import type { Panel } from "@shared/schema";
import { characterTemplates, backgroundTemplates } from "@shared/assetLibrary";
import { createCharacterInstance, createDialogueBubble } from "@/lib/canvasUtils";

interface EditorSidebarComponentProps {
  currentPanel: Panel;
  onPanelUpdate: (panel: Panel) => void;
}

export default function EditorSidebarComponent({ currentPanel, onPanelUpdate }: EditorSidebarComponentProps) {
  const [selectedTab, setSelectedTab] = useState("characters");

  const handleAddCharacter = (templateId: string, name: string, image: string) => {
    const newCharacter = createCharacterInstance(templateId, name, image);
    const updatedPanel = {
      ...currentPanel,
      characters: [...currentPanel.characters, newCharacter],
    };
    onPanelUpdate(updatedPanel);
  };

  const handleSetBackground = (image: string) => {
    const updatedPanel = {
      ...currentPanel,
      backgroundImage: image,
    };
    onPanelUpdate(updatedPanel);
  };

  const handleAddBubble = (type: 'speech' | 'thought' | 'shout') => {
    const newBubble = createDialogueBubble(type);
    const updatedPanel = {
      ...currentPanel,
      dialogues: [...currentPanel.dialogues, newBubble],
    };
    onPanelUpdate(updatedPanel);
  };

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
              {characterTemplates.map((character) => (
                <Card 
                  key={character.id}
                  className="hover-elevate cursor-pointer overflow-hidden"
                  data-testid={`card-sidebar-character-${character.id}`}
                  onClick={() => handleAddCharacter(character.id, character.name, character.image)}
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
              {backgroundTemplates.map((bg) => (
                <Card 
                  key={bg.id}
                  className="hover-elevate cursor-pointer overflow-hidden"
                  data-testid={`card-sidebar-background-${bg.id}`}
                  onClick={() => handleSetBackground(bg.image)}
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
              {[
                { type: 'speech' as const, name: 'Speech' },
                { type: 'thought' as const, name: 'Thought' },
                { type: 'shout' as const, name: 'Shout' },
              ].map((bubble) => (
                <Card 
                  key={bubble.type}
                  className="hover-elevate cursor-pointer"
                  data-testid={`card-sidebar-bubble-${bubble.type}`}
                  onClick={() => handleAddBubble(bubble.type)}
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