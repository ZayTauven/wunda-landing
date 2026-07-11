import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, Search, Stamp, Scale } from "lucide-react";

interface RoleProps {
  icon: JSX.Element;
  name: string;
  position: string;
  description: string;
}

const roleList: RoleProps[] = [
  {
    icon: <Lightbulb className="w-10 h-10" />,
    name: "Le Porteur",
    position: "Initie et exécute",
    description:
      "Il identifie le besoin de sa localité, structure l'initiative en paliers et documente chaque tâche réalisée.",
  },
  {
    icon: <Scale className="w-10 h-10" />,
    name: "Le Contrôleur",
    position: "Révise les budgets",
    description:
      "Avant publication, il examine les estimations, rectifie les budgets et approuve — ou renvoie — l'initiative.",
  },
  {
    icon: <Search className="w-10 h-10" />,
    name: "L'Agent",
    position: "Vérifie sur le terrain",
    description:
      "Présent dans la localité, il constate l'avancement réel et recommande — ou non — la validation de chaque tâche.",
  },
  {
    icon: <Stamp className="w-10 h-10" />,
    name: "Le Chef de localité",
    position: "Valide et scelle",
    description:
      "Autorité locale, il appose la validation officielle qui déclenche la libération des fonds du palier.",
  },
];

export const Team = () => {
  return (
    <section
      id="team"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Une gouvernance{" "}
        </span>
        locale
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        Quatre rôles distincts, aucun cumul : c'est la séparation des pouvoirs
        qui protège chaque contribution.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 gap-y-10">
        {roleList.map(({ icon, name, position, description }: RoleProps) => (
          <Card
            key={name}
            className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
          >
            <CardHeader className="mt-8 flex justify-center items-center pb-2">
              <div className="absolute -top-10 rounded-full w-20 h-20 flex items-center justify-center bg-gradient-to-br from-primary to-[#2e5fa3] text-white border-4 border-background">
                {icon}
              </div>
              <CardTitle className="text-center">{name}</CardTitle>
              <CardDescription className="text-primary">
                {position}
              </CardDescription>
            </CardHeader>

            <CardContent className="text-center pb-6">
              <p>{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
