import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { InitiativeCard, ProgressLegend } from "@/components/InitiativeCard";
import {
  getPublicStats, getPublicInitiatives, fmtKMF,
  type PublicStats, type PubInitiative,
} from "@/lib/wundaApi";

export const SuiviPublic = () => {
  const [stats, setStats] = useState<PublicStats | null>(null);
  const [initiatives, setInitiatives] = useState<PubInitiative[]>([]);

  useEffect(() => {
    getPublicStats().then(setStats).catch(() => {});
    getPublicInitiatives()
      .then((list) => setInitiatives(list.slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <section id="suivi" className="container py-24 sm:py-32">
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Suivi{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          public
        </span>
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8 md:w-8/12 mx-auto">
        Pas de promesses : le registre. Contributions, preuves, double
        validation et libération des fonds sont consultables par tous,
        sans compte.
      </h3>

      {/* Chiffres du registre — données réelles de l'API */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {[
            {
              value: fmtKMF(stats.contributions_total),
              label: `contribués par ${stats.contributors_count} membres de la diaspora`,
              gold: true,
            },
            {
              value: fmtKMF(stats.funds_released_total),
              label: "libérés après double validation terrain",
            },
            {
              value: String(stats.tasks_validated),
              label: "tâches validées par les chefs de localité",
            },
            {
              value: `${stats.initiatives_active} / ${stats.initiatives_total}`,
              label: `initiatives en cours · ${stats.initiatives_completed} réalisée${stats.initiatives_completed > 1 ? "s" : ""}`,
            },
          ].map(({ value, label, gold }) => (
            <div key={label} className="rounded-xl border bg-card p-5">
              <div
                className={`text-2xl md:text-3xl font-bold tabular-nums ${
                  gold ? "text-[#a07010] dark:text-[#d4ab45]" : ""
                }`}
              >
                {value}
              </div>
              <p className="text-sm text-muted-foreground mt-1.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Aperçu des initiatives suivies */}
      {initiatives.length > 0 ? (
        <>
          <div className="flex items-end justify-between gap-4 mb-5 flex-wrap">
            <p className="text-muted-foreground text-sm md:w-6/12">
              Ouvrez une initiative pour consulter ses paliers, ses preuves et
              chaque libération de fonds.
            </p>
            <ProgressLegend />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initiatives.map((ini) => (
              <InitiativeCard key={ini.id} ini={ini} />
            ))}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
          Le registre est prêt — les premières initiatives publiées
          apparaîtront ici.
        </div>
      )}

      <div className="text-center mt-10">
        <Link to="/initiatives" className={buttonVariants({ size: "lg" })}>
          Voir toutes les initiatives
        </Link>
      </div>
    </section>
  );
};
