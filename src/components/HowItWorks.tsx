import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "../components/Icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "1. Initier",
    description:
      "Un projet local est proposé avec des objectifs clairs et des besoins identifiés par le terrain.",
  },
  {
    icon: <MapIcon />,
    title: "2. Mobiliser",
    description:
      "La diaspora contribue, suit l'évolution et participe activement au succès de l'initiative.",
  },
  {
    icon: <PlaneIcon />,
    title: "3. Réaliser",
    description:
      "Les avancées sont visibles, documentées et vérifiables. L'impact est immédiat et partagé.",
  },
  {
    icon: <GiftIcon />,
    title: "4. Impacter",
    description:
      "Le projet est clôturé avec un bilan complet, renforçant la réputation du porteur local.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="suivi"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        Comment ça{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          marche ?{" "}
        </span>
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Une structure claire pour transformer l'intention en action collective souveraine.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

