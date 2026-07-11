import { Link } from "react-router-dom";
import { WundaLogo } from "./Navbar";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <Link to="/" className="flex items-center">
            <WundaLogo className="h-10" />
          </Link>
          <p className="mt-4 text-muted-foreground">
            L'infrastructure de l'action collective pour la diaspora comorienne.
            Rendre le développement local fluide, sûr et visible.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Suivez-nous</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Facebook
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Plateforme</h3>
          <div>
            <Link to="/initiatives" className="opacity-60 hover:opacity-100">
              Initiatives
            </Link>
          </div>

          <div>
            <Link to="/#suivi" className="opacity-60 hover:opacity-100">
              Suivi public
            </Link>
          </div>

          <div>
            <Link to="/#vision" className="opacity-60 hover:opacity-100">
              Vision
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Aide</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Contact
            </a>
          </div>

          <div>
            <Link to="/#faq" className="opacity-60 hover:opacity-100">
              FAQ
            </Link>
          </div>

          <div>
            <Link to="/#lancer" className="opacity-60 hover:opacity-100">
              Guide Porteur
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Communauté</h3>
          <div>
            <Link to="/#team" className="opacity-60 hover:opacity-100">
              Gouvernance locale
            </Link>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              className="opacity-60 hover:opacity-100"
            >
              Devenir Relais
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3 className="text-muted-foreground">
          &copy; 2026 Wunda. Vers une action collective souveraine.
        </h3>
      </section>
    </footer>
  );
};
