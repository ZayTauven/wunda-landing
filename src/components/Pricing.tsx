import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Soutien",
    popular: 0,
    price: 0,
    description:
      "Suivez les initiatives, recevez les alertes et participez à la discussion sans engagement financier.",
    buttonText: "Rejoindre gratuitement",
    benefitList: [
      "Suivi des chantiers",
      "Commentaires publics",
      "Alertes localités",
      "Historique public",
    ],
  },
  {
    title: "Contributeur",
    popular: 1,
    price: 15,
    description:
      "Propulsez les initiatives locales avec des contributions directes et tracées sur le terrain.",
    buttonText: "Démarrer l'action",
    benefitList: [
      "Tous les avantages Soutien",
      "Badge Profil Vérifié",
      "Accès aux justificatifs",
      "Vote sur les jalons",
    ],
  },
  {
    title: "Partenaire",
    popular: 0,
    price: 150,
    description:
      "Accompagnez plusieurs initiatives et bénéficiez d'une visibilité institutionnelle sur la plateforme.",
    buttonText: "Contacter l'équipe",
    benefitList: [
      "Tous les avantages Contributeur",
      "Rapports d'impact trimestriels",
      "Support prioritaire",
      "Visibilité logo partenaires",
    ],
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Modèle de{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Contribution{" "}
        </span>
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Pas de frais cachés. Chaque centime est dédié à l'impact sur le terrain.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === 1
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === 1 ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Populaire
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">€{pricing.price}</span>
                <span className="text-muted-foreground"> /mois</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <Button className="w-full">{pricing.buttonText}</Button>
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
