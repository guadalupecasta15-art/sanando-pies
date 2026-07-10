import {
  Footprints,
  ShieldCheck,
  HeartPulse,
  ClipboardCheck,
  Sparkles,
  Activity,
  type LucideProps,
} from "lucide-react";

const map = {
  footprints: Footprints,
  shield: ShieldCheck,
  "heart-pulse": HeartPulse,
  "clipboard-check": ClipboardCheck,
  sparkles: Sparkles,
  activity: Activity,
} as const;

export function TreatmentIcon({
  name,
  ...props
}: { name: string } & LucideProps) {
  const Icon = map[name as keyof typeof map] ?? Footprints;
  return <Icon {...props} />;
}
