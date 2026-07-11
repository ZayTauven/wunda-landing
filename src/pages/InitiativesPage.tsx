import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { InitiativeCard, ProgressLegend } from "@/components/InitiativeCard";
import { getPublicInitiatives, STATUS_PUBLIC, type PubInitiative } from "@/lib/wundaApi";

const FILTERS: { value: string; label: string }[] = [
  { value: "ALL", label: "Toutes" },
  { value: "OPEN", label: "Ouvertes" },
  { value: "IN_PROGRESS", label: "En réalisation" },
  { value: "COMPLETED", label: "Réalisées" },
];

export const InitiativesPage = () => {
  const [initiatives, setInitiatives] = useState<PubInitiative[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Wunda — Suivi public des initiatives";
    getPublicInitiatives()
      .then(setInitiatives)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (filter === "ALL") return initiatives;
    if (filter === "OPEN") return initiatives.filter((i) => i.status === "OPEN" || i.status === "FUNDED");
    return initiatives.filter((i) => i.status === filter);
  }, [initiatives, filter]);

  return (
    <main className="container py-16 sm:py-20 min-h-[70vh]">
      <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
        Registre public
      </p>
      <h1 className="text-3xl md:text-5xl font-bold">
        Les initiatives, du premier franc à la{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          réalisation
        </span>
      </h1>
      <p className="text-xl text-muted-foreground pt-4 md:w-8/12">
        Chaque initiative appartient à une localité et suit la même mécanique :
        contribution enregistrée, exécution documentée, double validation,
        fonds libérés par palier.
      </p>

      <div className="flex items-center justify-between gap-4 flex-wrap mt-10 mb-6">
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <Button
              key={f.value}
              size="sm"
              variant={filter === f.value ? "default" : "outline"}
              onClick={() => setFilter(f.value)}
            >
              {f.label}
              {f.value !== "ALL" && (
                <span className="ml-1.5 opacity-70 tabular-nums">
                  {f.value === "OPEN"
                    ? initiatives.filter((i) => i.status === "OPEN" || i.status === "FUNDED").length
                    : initiatives.filter((i) => i.status === f.value).length}
                </span>
              )}
            </Button>
          ))}
        </div>
        <ProgressLegend />
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-72 rounded-xl border bg-muted/50 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed p-14 text-center text-muted-foreground">
          Aucune initiative {FILTERS.find((f) => f.value === filter)?.label.toLowerCase()} pour
          l'instant. Revenez bientôt — ou{" "}
          <a href="/#lancer" className="text-primary underline underline-offset-4">
            lancez la vôtre
          </a>
          .
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ini) => (
            <InitiativeCard key={ini.id} ini={ini} />
          ))}
        </div>
      )}

      {/* Rappel du statut de chaque étiquette */}
      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground border-t pt-6">
        {Object.values(STATUS_PUBLIC).map((s) => (
          <span key={s.label}>{s.label}</span>
        ))}
        <span className="ml-auto">Montants en franc comorien (KMF)</span>
      </div>
    </main>
  );
};
