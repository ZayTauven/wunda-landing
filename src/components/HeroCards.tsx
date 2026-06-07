import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { LightBulbIcon } from "./Icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              alt=""
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop"
            />
            <AvatarFallback>V1</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">Village de Mitsoudjé</CardTitle>
            <CardDescription>Moroni, Grande Comore</CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          "Grâce à la diaspora, notre école est réhabilitée. Tout le processus
          était clair."
        </CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <img
            src="https://i.pravatar.cc/150?img=58"
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
          />
          <CardTitle className="text-center">Saïd M. Bakar</CardTitle>
          <CardDescription className="font-normal text-primary">
            Contributeur à Marseille
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            "J'ai enfin une vue directe sur l'impact de mon action pour mon
            village natal."
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <Badge variant="outline" className="text-xs">
              Profil Vérifié
            </Badge>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[200px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            Chantier #204
            <Badge variant="secondary" className="text-sm text-primary">
              En cours
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">12 4k €</span>
            <span className="text-muted-foreground"> / 15k</span>
          </div>

          <CardDescription>
            Réhabilitation du centre de santé local à Mbéni.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button className="w-full">Suivre l'avancement</Button>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["Grande Comore", "45 Contributeurs", "Livraison Juin 2026"].map(
              (benefit: string) => (
                <span key={benefit} className="flex">
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              ),
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <LightBulbIcon />
          </div>
          <div>
            <CardTitle>Traçabilité totale</CardTitle>
            <CardDescription className="text-md mt-2">
              Chaque euro est tracé depuis Marseille jusqu'au chantier local.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};
