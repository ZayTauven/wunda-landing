# 🌊 Wunda — Landing Page

> Page d'accueil et marketing pour Wunda.

Cette application présente Wunda à la diaspora comorienne : vision, fonctionnalités, impact, et appel à l'action.

## Stack

- **Vite** (dev server + build)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (composants)

## Structure

```
src/
├── components/
│   ├── Hero.tsx          # Section headline
│   ├── Features.tsx      # Piliers de Wunda
│   ├── HowItWorks.tsx    # Workflow utilisateur
│   ├── Stats.tsx         # Métriques
│   ├── Testimonials.tsx  # Témoignages contributeurs
│   ├── CTA.tsx           # Call-to-action principal
│   ├── Footer.tsx
│   └── ui/               # shadcn/ui components
├── App.tsx
└── index.css
```

## Démarrage

```bash
npm install
npm run dev
```

Visite **http://localhost:5173**

## Build

```bash
npm run build
# Résultat : dist/
```

## Design tokens

Utilise les couleurs Wunda :

```typescript
const COLORS = {
  wundaBlue: "#1B3F6E", // Primaire
  wundaGold: "#C69C2E", // Accent
  lightBg: "#FAFAF8", // Background
};
```

## Sections clés

### Hero

- Headline : "La où l'action collective devient vérifiable"
- Tagline : "Contribuez à vos localités d'origine, chaque franc traçable"
- CTA : "Commencer" (vers app web) + "En savoir plus"

### Features (4 piliers)

1. **Visibilité** — Voir exactement où vont les fonds
2. **Transparence** — Vérifier les réalisations en temps réel
3. **Validation** — Double signature (Agent + Chef)
4. **Gouvernance locale** — Le pouvoir aux chefs de localités

### How It Works

- Contributeur : crée un compte, cherche une localité, propose contribution
- Porteur : crée une initiative, découpe en tâches, ajoute preuves
- Agent : vérifie réalisation terrain
- Chef : valide officiellement, fonds libérés

### Social Proof

- Chiffres : "450k€ mobilisés", "12 initiatives actives", "1200+ contributeurs"
- Témoignages contributeurs réels (si disponibles)

### Footer

- Liens : Initiatives, FAQ, Contact
- Localités partenaires
- Social links

## Points d'attention

1. **Pas de jargon fintech** — parle de "contribution", pas de "donation" ou "crowdfunding"
2. **Géographique** — mentionne les Comores, la diaspora
3. **Traçabilité** — montre le journey d'un franc du début à la fin
4. **Autorité locale** — souligne le rôle des Chefs

```bash
npm install
```

4. Run project

```bash
npm run dev
```
