import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import {
  fmtKMF, mediaUrl, STATUS_PUBLIC,
  type PubInitiative,
} from "@/lib/wundaApi";

/** Double jauge : bleu = collecté, or hachuré = libéré sur le terrain. */
export const DualProgress = ({ collected, released, goal }: {
  collected: number; released: number; goal: number;
}) => {
  const safeGoal = goal > 0 ? goal : 1;
  const pctCollected = Math.min(100, (collected / safeGoal) * 100);
  const pctReleased = Math.min(100, (released / safeGoal) * 100);
  return (
    <div
      className="relative h-2 w-full rounded-full bg-muted border overflow-hidden"
      role="img"
      aria-label={`${fmtKMF(collected)} collectés, ${fmtKMF(released)} libérés, objectif ${fmtKMF(goal)}`}
    >
      <span
        className="absolute inset-y-0 left-0 rounded-full bg-primary"
        style={{ width: `${pctCollected}%` }}
      />
      <span
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          width: `${pctReleased}%`,
          background: "repeating-linear-gradient(45deg,#c69c2e 0 4px,#e8d9a8 4px 8px)",
        }}
      />
    </div>
  );
};

export const ProgressLegend = () => (
  <div className="flex gap-4 text-xs text-muted-foreground">
    <span className="flex items-center gap-1.5">
      <i className="inline-block w-3.5 h-2 rounded-sm bg-primary" /> collecté
    </span>
    <span className="flex items-center gap-1.5">
      <i
        className="inline-block w-3.5 h-2 rounded-sm"
        style={{ background: "repeating-linear-gradient(45deg,#c69c2e 0 3px,#e8d9a8 3px 6px)" }}
      />{" "}
      libéré sur le terrain
    </span>
  </div>
);

export const InitiativeCard = ({ ini }: { ini: PubInitiative }) => {
  const st = STATUS_PUBLIC[ini.status] ?? { label: ini.status, className: "" };
  const img = mediaUrl(ini.image);
  return (
    <Link to={`/initiatives/${ini.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="relative h-40 bg-muted overflow-hidden">
          {img ? (
            <img
              src={img}
              alt=""
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/15 to-primary/5" />
          )}
          <Badge variant="outline" className={`absolute top-3 left-3 bg-card/95 ${st.className}`}>
            {st.label}
          </Badge>
        </div>
        <CardContent className="pt-4 space-y-3">
          <div className="flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
            <MapPin className="w-3.5 h-3.5" /> {ini.locality_name}
          </div>
          <h3 className="font-bold leading-snug line-clamp-2 min-h-[2.6rem]">{ini.title}</h3>
          <DualProgress
            collected={Number(ini.total_collected)}
            released={Number(ini.funds_released_total)}
            goal={Number(ini.goal_amount)}
          />
          <div className="flex items-baseline justify-between text-sm">
            <span>
              <b className="text-[#a07010] dark:text-[#d4ab45]">{fmtKMF(ini.total_collected)}</b>{" "}
              <span className="text-muted-foreground">collectés</span>
            </span>
            <span className="text-muted-foreground text-xs">
              {fmtKMF(ini.funds_released_total)} libérés
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
