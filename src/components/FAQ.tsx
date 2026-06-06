import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Comment Wunda garantit-il la traçabilité des fonds ?",
    answer: "Chaque contribution est enregistrée et liée à une étape précise d'un chantier. Les factures et rapports de dépenses sont publics et consultables en temps réel par tous les contributeurs de l'initiative.",
    value: "item-1",
  },
  {
    question: "Qui valide la fin des travaux sur place ?",
    answer: "La validation est double : elle est effectuée par le porteur de projet avec preuve visuelle (photos/vidéos) et confirmée par un tiers de confiance local ou une autorité villageoise indépendante.",
    value: "item-2",
  },
  {
    question: "Peut-on lancer une initiative sans être aux Comores ?",
    answer: "Oui, l'initiative peut être lancée par la diaspora. Cependant, elle doit impérativement être connectée à un relais local vérifié qui sera responsable du suivi opérationnel sur le terrain.",
    value: "item-3",
  },
  {
    question: "Qu'advient-il si le budget n'est pas totalement atteint ?",
    answer: "Chaque initiative définit un seuil de viabilité. Si ce seuil n'est pas atteint, les contributions sont soit remboursées, soit réaffectées à une autre initiative similaire, selon le choix du contributeur.",
    value: "item-4",
  },
  {
    question: "Comment sont sélectionnés les porteurs de projets ?",
    answer: "Les porteurs de projets passent par une vérification d'identité et un audit de leur historique de réalisations. Le système de réputation Wunda met en avant ceux qui ont déjà prouvé leur efficacité.",
    value: "item-5",
  },
];

export const FAQ = () => {
  return (
    <section
      id="faq"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Questions{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Fréquentes
        </span>
      </h2>

      <Accordion
        type="single"
        collapsible
        className="w-full AccordionRoot"
      >
        {FAQList.map(({ question, answer, value }: FAQProps) => (
          <AccordionItem
            key={value}
            value={value}
          >
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <h3 className="font-medium mt-4">
        Encore des interrogations ?{" "}
        <a
          rel="noreferrer noopener"
          href="#"
          className="text-primary transition-all border-primary hover:border-b-2"
        >
          Contactez-nous
        </a>
      </h3>
    </section>
  );
};

