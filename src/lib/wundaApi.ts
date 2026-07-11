/**
 * Accès observateur au registre Wunda — lecture publique, sans compte.
 */

const API: string =
  (import.meta.env.VITE_API_URL as string | undefined) ?? "http://localhost:8000/api";
const ORIGIN = API.replace(/\/api\/?$/, "");

async function get<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API}${path}`);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

function asList<T>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (data && typeof data === "object" && Array.isArray((data as { results?: unknown }).results)) {
    return (data as { results: T[] }).results;
  }
  return [];
}

export function mediaUrl(path?: string | null): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${ORIGIN}${path}`;
}

/* ------------------------------- Types ---------------------------------- */

export interface PublicStats {
  initiatives_total: number;
  initiatives_active: number;
  initiatives_completed: number;
  contributions_total: number;
  contributors_count: number;
  funds_released_total: number;
  tasks_validated: number;
  localities_count: number;
}

export interface PubProof {
  id: number;
  media_type: string;
  file: string;
  caption: string;
  uploaded_at: string;
  uploaded_by_name: string;
}

export interface PubValidation {
  id: number;
  validator_role: "agent" | "chef";
  decision: "approved" | "rejected";
  comment: string;
  created_at: string;
  validator_name: string;
}

export interface PubTask {
  id: number;
  title: string;
  status: "TODO" | "IN_PROGRESS" | "DONE" | "VALIDATED" | "CONTESTED";
  budget: string;
  budget_effective: string | number;
  proofs: PubProof[];
  validations: PubValidation[];
}

export interface PubMilestone {
  id: number;
  title: string;
  description: string;
  order: number;
  budget: string;
  tasks: PubTask[];
}

export interface PubContribution {
  id: number;
  contributor_name: string | null;
  group_name: string | null;
  amount: string;
  is_anonymous: boolean;
  created_at: string;
}

export interface PubReview {
  id: number;
  status: "APPROVED" | "REJECTED";
  feedback: string;
  controller_name: string;
  revised_tasks: Record<string, { title: string; budget_old: number; budget_new: number; note: string }>;
  reviewed_at: string;
}

export interface PubInitiative {
  id: number;
  title: string;
  description: string;
  cover: string;
  image: string | null;
  image_after: string | null;
  status: string;
  scope: string;
  goal_amount: string;
  total_collected: number | string;
  contributor_count: number;
  funds_released_total: number;
  locality_name: string;
  owner_name: string;
  controller_name: string | null;
  milestones: PubMilestone[];
  recent_contributions: PubContribution[];
  milestones_count: number;
  milestones_validated_count: number;
  last_review: PubReview | null;
  published_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export interface PubFundRelease {
  id: number;
  milestone: number;
  amount: string;
  released_at: string;
}

export interface PubActivityLog {
  id: number;
  entity_type: string;
  entity_id: number;
  action: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

/* ------------------------------ Fetchers -------------------------------- */

export const getPublicStats = () => get<PublicStats>("/initiatives/stats/");

export async function getPublicInitiatives(): Promise<PubInitiative[]> {
  const data = await get<unknown>("/initiatives/?status__in=OPEN,FUNDED,IN_PROGRESS,COMPLETED");
  return asList<PubInitiative>(data);
}

export const getPublicInitiative = (id: string | number) =>
  get<PubInitiative>(`/initiatives/${id}/`);

export async function getPublicReviews(id: string | number): Promise<PubReview[]> {
  return asList<PubReview>(await get<unknown>(`/initiatives/${id}/reviews/`));
}

export async function getPublicFundReleases(id: string | number): Promise<PubFundRelease[]> {
  return asList<PubFundRelease>(await get<unknown>(`/fund-releases/?initiative=${id}`));
}

export async function getPublicActivity(params = ""): Promise<PubActivityLog[]> {
  return asList<PubActivityLog>(await get<unknown>(`/activity-logs/${params}`));
}

/* ------------------------------ Helpers --------------------------------- */

export const fmtKMF = (n: number | string) =>
  `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Number(n))} KMF`;

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short", year: "numeric" });

export const STATUS_PUBLIC: Record<string, { label: string; className: string }> = {
  OPEN:        { label: "Ouverte aux contributions", className: "bg-primary/10 text-primary border-primary/30" },
  FUNDED:      { label: "Financée",                  className: "bg-[#c69c2e]/10 text-[#a07010] dark:text-[#d4ab45] border-[#c69c2e]/40" },
  IN_PROGRESS: { label: "En réalisation",            className: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30" },
  COMPLETED:   { label: "Réalisée",                  className: "bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 border-emerald-600/30" },
};

/** Traduit une entrée du journal d'activité en phrase lisible. */
export function logLabel(log: PubActivityLog): string {
  const title = (log.metadata?.title as string) ?? (log.metadata?.initiative as string) ?? "";
  const amount = log.metadata?.amount != null ? fmtKMF(log.metadata.amount as number) : "";
  const a = log.action;
  if (a === "CONTRIBUTION_MADE") return `Contribution de ${amount}`;
  if (a === "FUNDS_RELEASED") return `Fonds libérés : ${amount} — ${(log.metadata?.milestone as string) ?? ""}`;
  if (a === "PROOF_UPLOADED") return "Preuve documentée sur une tâche";
  if (a === "PROOF_VALIDATED") return "Preuve scellée";
  if (a === "CONTEST_FILED") return "Contestation déposée";
  if (a === "CONTEST_UPHELD") return "Contestation retenue";
  if (a === "CONTEST_DISMISSED") return "Contestation écartée";
  const m = a.match(/^STATUS_(\w+)_TO_(\w+)$/);
  if (m) {
    const map: Record<string, string> = {
      UNDER_REVIEW: "soumise à révision",
      APPROVED: "approuvée par le Contrôleur",
      OPEN: "publiée aux contributeurs",
      FUNDED: "objectif de financement atteint",
      IN_PROGRESS: log.entity_type === "task" ? "tâche démarrée" : "exécution démarrée",
      DONE: "tâche en attente de validation",
      VALIDATED: "tâche validée par le Chef",
      CONTESTED: "tâche contestée",
      COMPLETED: "initiative complétée",
      DRAFT: "renvoyée au porteur",
      CANCELLED: "annulée",
    };
    const verb = map[m[2]] ?? `passage à ${m[2]}`;
    return title ? `${title} — ${verb}` : (log.entity_type === "task" ? `Tâche ${verb}` : verb);
  }
  return a;
}

export const TASK_META: Record<string, { label: string; dot: string }> = {
  TODO:        { label: "À faire",                  dot: "bg-slate-400" },
  IN_PROGRESS: { label: "En cours",                 dot: "bg-amber-500" },
  DONE:        { label: "En attente de validation", dot: "bg-blue-600" },
  VALIDATED:   { label: "Validée",                  dot: "bg-emerald-600" },
  CONTESTED:   { label: "Contestée",                dot: "bg-red-700" },
};
