import { useEffect, useState } from "react";
import { getPublicStats, fmtKMF, type PublicStats } from "@/lib/wundaApi";

export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const [live, setLive] = useState<PublicStats | null>(null);

  useEffect(() => {
    getPublicStats().then(setLive).catch(() => {});
  }, []);

  const stats: statsProps[] = [
    {
      quantity: live ? fmtKMF(live.contributions_total) : "—",
      description: "Fonds tracés",
    },
    {
      quantity: live ? String(live.initiatives_total) : "—",
      description: "Initiatives",
    },
    {
      quantity: live ? String(live.contributors_count) : "—",
      description: "Contributeurs",
    },
    {
      quantity: live ? String(live.localities_count) : "—",
      description: "Localités",
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div
            key={description}
            className="space-y-2 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold ">{quantity}</h2>
            <p className="text-xl text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
