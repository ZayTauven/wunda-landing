import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

const CONSOLE_URL =
  (import.meta.env.VITE_CONSOLE_URL as string | undefined) ?? "http://localhost:3000";

export const Cta = () => {
  return (
    <section
      id="lancer"
      className="bg-muted/50 py-16 my-24 sm:my-32"
    >
      <div className="container lg:grid lg:grid-cols-2 place-items-center">
        <div className="lg:col-start-1">
          <h2 className="text-3xl md:text-4xl font-bold ">
            Votre localité a un besoin ?
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              {" "}
              Lancez l'initiative{" "}
            </span>
            qui y répond
          </h2>
          <p className="text-muted-foreground text-xl mt-4 mb-8 lg:mb-0">
            Décrivez le besoin, découpez-le en paliers, faites réviser les
            budgets par un contrôleur — puis mobilisez la diaspora. Chaque
            étape est publiée au registre, du premier franc à la réalisation.
          </p>
        </div>

        <div className="space-y-4 lg:col-start-2">
          <a
            rel="noreferrer noopener"
            href={`${CONSOLE_URL}/login`}
            className={`w-full md:mr-4 md:w-auto ${buttonVariants({ variant: "default" })}`}
          >
            Lancer une initiative
          </a>
          <Link
            to="/initiatives"
            className={`w-full md:w-auto ${buttonVariants({ variant: "outline" })}`}
          >
            Consulter le registre
          </Link>
        </div>
      </div>
    </section>
  );
};
