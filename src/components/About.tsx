import { Statistics } from "./Statistics";
import pilot from "../assets/pilot.png";

export const About = () => {
  return (
    <section
      id="vision"
      className="container py-24 sm:py-32"
    >
      <div className="bg-muted/50 border rounded-lg py-12">
        <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
          <img
            src={pilot}
            alt=""
            className="w-[300px] object-contain rounded-lg"
          />
          <div className="bg-green-0 flex flex-col justify-between">
            <div className="pb-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                  L'envie d'agir{" "}
                </span>
                est déjà là.
              </h2>
              <p className="text-xl text-muted-foreground mt-4">
                Des projets qui n’aboutissent jamais faute de suivi. Des fonds envoyés sans visibilité sur leur usage réel. 
                Des initiatives isolées qui s'essoufflent sans coordination. 
                <br /><br />
                Wunda n'est pas une simple plateforme de plus. C'est l'infrastructure qui 
                rend l'action collective fluide, sûre et évidente.
              </p>
            </div>

            <Statistics />
          </div>
        </div>
      </div>
    </section>
  );
};

