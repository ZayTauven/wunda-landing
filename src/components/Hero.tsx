import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";
import { HeroCards } from "./HeroCards";

export const Hero = () => {
  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            Là où{" "}
            <span className="inline bg-gradient-to-r from-[#2e5fa3] to-[#1b3f6e] text-transparent bg-clip-text">
              l'action
            </span>{" "}
            devient simple,
          </h1>{" "}
          <br />
          <h2 className="inline">
            les{" "}
            <span className="inline bg-gradient-to-r from-[#c69c2e] to-[#a07010] text-transparent bg-clip-text">
              initiatives
            </span>{" "}
            naissent.
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Wunda transforme l'intention de la diaspora en réalisations concrètes,
          suivies et visibles. Un protocole de confiance pour bâtir l'avenir.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link
            to="/initiatives"
            className={`w-full md:w-auto ${buttonVariants({ variant: "default" })}`}
          >
            Découvrir les initiatives
          </Link>

          <Link
            to="/#lancer"
            className={`w-full md:w-auto ${buttonVariants({
              variant: "outline",
            })}`}
          >
            Lancer une initiative
          </Link>
        </div>
      </div>


      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>

      {/* Shadow effect */}
      <div className="shadow"></div>
    </section>
  );
};
