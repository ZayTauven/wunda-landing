import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import image from "../assets/growth.png";
import image3 from "../assets/reflecting.png";
import image4 from "../assets/looking-ahead.png";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Suivi en temps réel",
    description:
      "Visualisez l'avancement des chantiers grâce à des mises à jour régulières, photos et rapports de terrain.",
    image: image4,
  },
  {
    title: "Identités vérifiées",
    description:
      "Chaque porteur de projet et contributeur passe par un processus de validation pour garantir l'intégrité du réseau.",
    image: image3,
  },
  {
    title: "Validation locale",
    description:
      "Les réalisations sont confirmées par des tiers de confiance sur place avant la clôture de l'initiative.",
    image: image,
  },
];

const featureList: string[] = [
  "Traçabilité",
  "Transparence",
  "Impact Mesuré",
  "Confiance",
  "Action Collective",
  "Visibilité",
  "Souveraineté",
  "Engagement",
  "Résultats",
];

export const Features = () => {
  return (
    <section
      id="features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        L'infrastructure de{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          votre confiance
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

