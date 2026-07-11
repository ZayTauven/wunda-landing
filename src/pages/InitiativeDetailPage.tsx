import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft, MapPin, User, ShieldCheck, CalendarDays,
  Check, CheckCheck, Landmark, FileText, Film,
} from "lucide-react";
import { DualProgress } from "@/components/InitiativeCard";
import {
  getPublicInitiative, getPublicReviews, getPublicFundReleases, getPublicActivity,
  fmtKMF, fmtDate, logLabel, mediaUrl, STATUS_PUBLIC, TASK_META,
  type PubInitiative, type PubReview, type PubFundRelease, type PubActivityLog, type PubTask,
} from "@/lib/wundaApi";

const PUBLIC_STATUSES = new Set(["OPEN", "FUNDED", "IN_PROGRESS", "COMPLETED", "CANCELLED"]);

/** Une tâche du fil : état, budget, preuves, actes de validation (RM-07). */
const TaskBlock = ({ task }: { task: PubTask }) => {
  const meta = TASK_META[task.status] ?? TASK_META.TODO;
  const shownProofs = task.proofs.slice(0, 5);
  return (
    <div className="rounded-lg border bg-card/50 p-4 space-y-3">
      <div className="flex items-center gap-2.5 flex-wrap">
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${meta.dot}`} aria-hidden />
        <span className="font-medium flex-1 min-w-[10rem]">{task.title}</span>
        <Badge variant="outline" className="font-normal">{meta.label}</Badge>
        <span className="text-sm font-semibold text-[#a07010] dark:text-[#d4ab45] tabular-nums">
          {fmtKMF(task.budget_effective)}
        </span>
      </div>

      {shownProofs.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {shownProofs.map((p) => {
            const src = mediaUrl(p.file);
            return p.media_type === "photo" && src ? (
              <img
                key={p.id}
                src={src}
                alt={p.caption || "Preuve documentée"}
                loading="lazy"
                className="w-16 h-16 rounded-md object-cover border"
              />
            ) : (
              <span
                key={p.id}
                className="w-16 h-16 rounded-md border bg-muted flex items-center justify-center text-muted-foreground"
              >
                {p.media_type === "video" ? <Film className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
              </span>
            );
          })}
          {task.proofs.length > 5 && (
            <span className="w-16 h-16 rounded-md border bg-muted flex items-center justify-center text-xs text-muted-foreground">
              +{task.proofs.length - 5}
            </span>
          )}
        </div>
      )}

      {task.validations.length > 0 && (
        <div className="space-y-1.5 border-t pt-3">
          {[...task.validations].reverse().map((v) => (
            <div key={v.id} className="flex items-center gap-2 text-sm flex-wrap">
              {v.validator_role === "chef" ? (
                <CheckCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
              ) : (
                <Check className="w-4 h-4 text-primary shrink-0" />
              )}
              <span className="flex-1 min-w-[12rem]">
                {v.validator_role === "chef" ? "Chef" : "Agent"} <b>{v.validator_name}</b>{" "}
                {v.decision === "approved"
                  ? v.validator_role === "chef"
                    ? "a validé officiellement"
                    : "recommande la validation"
                  : "a signalé un problème"}
              </span>
              <span className="text-xs text-muted-foreground">{fmtDate(v.created_at)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const InitiativeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [ini, setIni] = useState<PubInitiative | null>(null);
  const [reviews, setReviews] = useState<PubReview[]>([]);
  const [releases, setReleases] = useState<PubFundRelease[]>([]);
  const [journal, setJournal] = useState<PubActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      getPublicInitiative(id),
      getPublicReviews(id),
      getPublicFundReleases(id),
      getPublicActivity(`?entity_type=initiative&entity_id=${id}`),
    ])
      .then(([data, rev, rel, logs]) => {
        setIni(data && PUBLIC_STATUSES.has(data.status) ? data : null);
        setReviews(rev);
        setReleases(rel);
        setJournal(logs);
        if (data) document.title = `Wunda — ${data.title}`;
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="container py-16 min-h-[70vh]">
        <div className="h-8 w-2/3 rounded bg-muted animate-pulse mb-6" />
        <div className="grid lg:grid-cols-[1fr_20rem] gap-8">
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 rounded-xl border bg-muted/50 animate-pulse" />
            ))}
          </div>
          <div className="h-64 rounded-xl border bg-muted/50 animate-pulse" />
        </div>
      </main>
    );
  }

  if (!ini) {
    return (
      <main className="container py-24 min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold mb-3">Initiative introuvable</h1>
        <p className="text-muted-foreground mb-6">
          Elle n'existe pas ou n'est pas encore publiée au registre.
        </p>
        <Link to="/initiatives" className="text-primary underline underline-offset-4">
          Retour à la liste des initiatives
        </Link>
      </main>
    );
  }

  const st = STATUS_PUBLIC[ini.status] ?? { label: ini.status, className: "" };
  const collected = Number(ini.total_collected);
  const released = Number(ini.funds_released_total);
  const goal = Number(ini.goal_amount);
  const before = mediaUrl(ini.image);
  const after = mediaUrl(ini.image_after);
  const releaseByMilestone = new Map<number, PubFundRelease>(releases.map((r) => [r.milestone, r]));

  return (
    <main className="container py-12 sm:py-16 min-h-[70vh]">
      <Link
        to="/initiatives"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Toutes les initiatives
      </Link>

      <header className="mb-10">
        <Badge variant="outline" className={st.className}>{st.label}</Badge>
        <h1 className="text-3xl md:text-4xl font-bold mt-3">{ini.title}</h1>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {ini.locality_name}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" /> Porteur : {ini.owner_name}
          </span>
          {ini.controller_name && (
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Contrôleur : {ini.controller_name}
            </span>
          )}
          {ini.published_at && (
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" /> Publiée le {fmtDate(ini.published_at)}
            </span>
          )}
          {ini.completed_at && (
            <span className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <CheckCheck className="w-4 h-4" /> Réalisée le {fmtDate(ini.completed_at)}
            </span>
          )}
        </div>
      </header>

      <div className="grid lg:grid-cols-[1fr_20rem] gap-10 items-start">
        {/* Colonne principale : description + fil d'exécution */}
        <div>
          <p className="text-lg text-muted-foreground leading-relaxed">{ini.description}</p>

          {(before || after) && (
            <div className="flex gap-4 mt-8 flex-wrap">
              {before && (
                <figure className="flex-1 min-w-[15rem] m-0">
                  <img src={before} alt="État avant travaux" className="w-full rounded-xl border" />
                  <figcaption className="text-xs uppercase tracking-widest text-muted-foreground mt-2">
                    Avant
                  </figcaption>
                </figure>
              )}
              {after && (
                <figure className="flex-1 min-w-[15rem] m-0">
                  <img src={after} alt="État après réalisation" className="w-full rounded-xl border" />
                  <figcaption className="text-xs uppercase tracking-widest text-emerald-700 dark:text-emerald-400 mt-2">
                    Après
                  </figcaption>
                </figure>
              )}
            </div>
          )}

          <h2 className="text-2xl font-bold mt-12">
            Fil{" "}
            <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
              d'exécution
            </span>
          </h2>
          <p className="text-muted-foreground mt-2 mb-6">
            Palier par palier : les tâches, leurs preuves, les actes de validation,
            et les fonds libérés en conséquence.
          </p>

          {ini.milestones.length === 0 ? (
            <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
              Les paliers de cette initiative seront publiés ici.
            </div>
          ) : (
            <ol className="relative space-y-8 border-l-2 border-muted pl-8 ml-3">
              {ini.milestones.map((m, idx) => {
                const release = releaseByMilestone.get(m.id);
                return (
                  <li key={m.id} className="relative">
                    <span
                      className={`absolute -left-[2.6rem] top-0 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                        release
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "bg-card border-muted-foreground/30 text-muted-foreground"
                      }`}
                      aria-hidden
                    >
                      {release ? <Check className="w-4 h-4" /> : idx + 1}
                    </span>
                    <div className="flex items-baseline justify-between gap-4 flex-wrap">
                      <h3 className="font-bold text-lg">{m.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        Palier —{" "}
                        <b className="text-[#a07010] dark:text-[#d4ab45]">{fmtKMF(m.budget)}</b>
                      </span>
                    </div>
                    {m.description && (
                      <p className="text-sm text-muted-foreground mt-1">{m.description}</p>
                    )}
                    <div className="space-y-3 mt-4">
                      {m.tasks.map((t) => (
                        <TaskBlock key={t.id} task={t} />
                      ))}
                    </div>
                    {release && (
                      <div className="mt-4 flex items-center gap-3 rounded-lg border border-emerald-600/30 bg-emerald-600/5 p-4 flex-wrap">
                        <Landmark className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0" />
                        <div className="flex-1 min-w-[12rem]">
                          <div className="font-bold text-emerald-700 dark:text-emerald-400">
                            {fmtKMF(release.amount)} libérés
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Toutes les tâches du palier validées par le Chef
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {fmtDate(release.released_at)}
                        </span>
                      </div>
                    )}
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* Panneau latéral : financement, contributions, révisions, journal */}
        <aside className="space-y-6 lg:sticky lg:top-20">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Financement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-2xl font-bold text-[#a07010] dark:text-[#d4ab45] tabular-nums">
                  {fmtKMF(collected)}
                </div>
                <div className="text-sm text-muted-foreground">
                  collectés sur un objectif de {fmtKMF(goal)}
                </div>
              </div>
              <DualProgress collected={collected} released={released} goal={goal} />
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Libérés sur le terrain</dt>
                  <dd className="font-semibold text-emerald-700 dark:text-emerald-400 tabular-nums">
                    {fmtKMF(released)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Contributeurs</dt>
                  <dd className="font-semibold tabular-nums">{ini.contributor_count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Paliers validés</dt>
                  <dd className="font-semibold tabular-nums">
                    {ini.milestones_validated_count} / {ini.milestones_count}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Dernières contributions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {ini.recent_contributions.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Les contributions confirmées apparaîtront ici.
                </p>
              )}
              {ini.recent_contributions.map((c) => (
                <div key={c.id} className="flex justify-between gap-3 text-sm">
                  <span className="truncate">
                    {c.is_anonymous
                      ? "Un contributeur"
                      : c.group_name || c.contributor_name || "Un contributeur"}
                  </span>
                  <span className="font-semibold text-[#a07010] dark:text-[#d4ab45] tabular-nums shrink-0">
                    {fmtKMF(c.amount)}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          {reviews.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Révisions du contrôleur</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="text-sm space-y-1.5">
                    <div
                      className={`font-semibold ${
                        r.status === "APPROVED"
                          ? "text-emerald-700 dark:text-emerald-400"
                          : "text-red-700 dark:text-red-400"
                      }`}
                    >
                      {r.status === "APPROVED" ? "Estimations approuvées" : "Rectifications demandées"}
                    </div>
                    {r.feedback && <p className="text-muted-foreground">{r.feedback}</p>}
                    {Object.keys(r.revised_tasks ?? {}).length > 0 && (
                      <div className="text-muted-foreground space-y-0.5">
                        {Object.values(r.revised_tasks).map((rt, i) => (
                          <div key={i}>
                            « {rt.title} » : {fmtKMF(rt.budget_old)} → <b>{fmtKMF(rt.budget_new)}</b>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {r.controller_name} · {fmtDate(r.reviewed_at)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {journal.length > 0 && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Journal de l'initiative</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2.5">
                {journal.slice(0, 8).map((l) => (
                  <div key={l.id} className="flex gap-3 text-sm">
                    <span className="text-xs text-muted-foreground shrink-0 w-16 pt-0.5">
                      {fmtDate(l.created_at)}
                    </span>
                    <span className="flex-1">{logLabel(l)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </main>
  );
};
