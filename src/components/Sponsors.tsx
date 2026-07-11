import { MapPin } from "lucide-react";

interface LocalityProps {
  name: string;
  island: string;
}

const localities: LocalityProps[] = [
  { name: "Mohoro", island: "Grande Comore" },
  { name: "Fomboni", island: "Mohéli" },
  { name: "Mutsamudu", island: "Anjouan" },
  { name: "Moroni", island: "Grande Comore" },
];

export const Sponsors = () => {
  return (
    <section
      id="sponsors"
      className="container pt-24 sm:pt-32"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Des localités déjà engagées, sur les trois îles
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
        {localities.map(({ name, island }: LocalityProps) => (
          <div
            key={name}
            className="flex items-center gap-1 text-muted-foreground/60"
          >
            <span><MapPin size={28} /></span>
            <h3 className="text-xl font-bold">
              {name}
              <span className="block text-xs font-normal">{island}</span>
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};
