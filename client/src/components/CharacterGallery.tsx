import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import femaleNeutral from "@assets/generated_images/Female_character_neutral_19d8c4ed.png";
import femaleHappy from "@assets/generated_images/Female_character_happy_06e42802.png";
import femaleAngry from "@assets/generated_images/Female_character_angry_e0b049e7.png";
import maleNeutral from "@assets/generated_images/Male_character_neutral_f443294d.png";
import maleHappy from "@assets/generated_images/Male_character_happy_4d6f4070.png";

const characters = [
  { name: "Aiko", image: femaleNeutral, expressions: 8, outfits: 12 },
  { name: "Aiko (Happy)", image: femaleHappy, expressions: 8, outfits: 12 },
  { name: "Aiko (Angry)", image: femaleAngry, expressions: 8, outfits: 12 },
  { name: "Kenji", image: maleNeutral, expressions: 7, outfits: 10 },
  { name: "Kenji (Happy)", image: maleHappy, expressions: 7, outfits: 10 },
];

export default function CharacterGallery() {
  return (
    <section id="characters" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Meet Your Cast
          </h2>
          <p className="text-lg text-muted-foreground">
            Over 100 professionally designed characters with multiple expressions and customizable outfits. More added every week.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {characters.map((character, index) => (
            <Card key={index} className="hover-elevate overflow-hidden group cursor-pointer" data-testid={`card-character-${index}`}>
              <CardContent className="p-0">
                <div className="aspect-square bg-muted/50 flex items-center justify-center overflow-hidden">
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    data-testid={`img-character-${index}`}
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-sm">{character.name}</h3>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {character.expressions} poses
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {character.outfits} outfits
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}