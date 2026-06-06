import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://github.com/shadcn.png",
    name: "Ahmed S.",
    userName: "@ahmed_diaspora",
    comment: "Enfin une plateforme qui me permet de voir où va mon argent pour le village. La traçabilité est exemplaire.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Dr. Mariam",
    userName: "@mariam_health",
    comment:
      "Le suivi du chantier du centre de santé est fluide. Les photos envoyées par le relais local nous rassurent tous.",
  },

  {
    image: "https://github.com/shadcn.png",
    name: "Mohamed J.",
    userName: "@mo_initiatives",
    comment:
      "Wunda a transformé ma façon de contribuer. Plus besoin de passer des dizaines de coups de fil pour vérifier l'avancement.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Fatim M.",
    userName: "@fatim_m",
    comment:
      "La validation par des tiers de confiance locaux change tout. On sait que ce qui est annoncé est réellement fait.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Hassani K.",
    userName: "@hassani_k",
    comment:
      "En tant que porteur local, Wunda me donne la crédibilité nécessaire pour mobiliser mes proches à l'étranger.",
  },
  {
    image: "https://github.com/shadcn.png",
    name: "Leila A.",
    userName: "@leila_a",
    comment:
      "C'est l'outil qui manquait à la diaspora. Simple, efficace et surtout transparent.",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        Ils font vivre{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          l'action collective{" "}
        </span>
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Découvrez les retours de ceux qui utilisent Wunda pour transformer leur volonté en impact durable.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src={image}
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
