import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Star, Users, ClipboardList } from "lucide-react";
import clsx from "clsx";

export default function SessionEvaluationPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className=" space-y-8">
        {/* ===== Header ===== */}
        <div>
          <h1 className="text-2xl font-semibold">Session Evaluation</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review performance for{" "}
            <span className="font-medium text-slate-700">
              “Morning Tactical”
            </span>{" "}
            · Dec 10, 2023
          </p>
        </div>

        {/* ===== Top Section ===== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Performance Metrics */}
          <Card>
            <CardHeader icon={<Star size={16} />} title="Performance Metrics" />

            <Metric
              label="Overall Intensity"
              value="High (4/5)"
              description="Physical demand of the drills vs planned load"
            />

            <Metric
              label="Difficulty"
              value="Average (3/5)"
              description="Adherence to tactical session objectives"
            />

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Session Goals Met?</p>
                <p className="text-xs text-slate-500">
                  Did the squad achieve training KPIs?
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>

          {/* Coach Observations */}
          <Card>
            <CardHeader
              icon={<ClipboardList size={16} />}
              title="Coach’s Observations"
            />
            <Textarea
              placeholder="Write detailed observations about team dynamics, individual efforts, or tactical breakthroughs during this session..."
              className="h-48 resize-none"
            />
          </Card>
        </div>
        <Card>
          <CardHeader
            icon={<Users size={16} />}
            title="Squad Performance Tracking"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Performers */}
            <PerformanceGroup
              title="Top Performers"
              tone="success"
              players={["Marcus Rashford", "Bruno Fernandes"]}
            />

            {/* Needs Improvement */}
            <PerformanceGroup
              title="Needs Improvement"
              tone="warning"
              players={["Harry Maguire", "Luke Shaw"]}
            />
          </div>
        </Card>

        {/* ===== Footer Actions ===== */}
        <div className="flex justify-center gap-3 pt-4">
          <Button variant="outline">Save Draft</Button>
          <Button className="bg-indigo-600 hover:bg-indigo-600/90">
            Submit Evaluation
          </Button>
        </div>
      </div>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-white p-6 space-y-6">{children}</div>
  );
}

function CardHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 font-semibold text-slate-900">
      <span className="text-indigo-600">{icon}</span>
      {title}
    </div>
  );
}

function Metric({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">{label}</p>
        <span className="text-xs text-slate-500">{value}</span>
      </div>
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={clsx(
              i < Number(value[0])
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-300",
            )}
          />
        ))}
      </div>
      <p className="text-xs text-slate-500">{description}</p>
    </div>
  );
}

function PerformanceGroup({
  title,
  tone,
  players,
}: {
  title: string;
  tone: "success" | "warning";
  players: string[];
}) {
  const toneStyles = {
    success: "bg-emerald-50 border-emerald-200 text-emerald-700",
    warning: "bg-amber-50 border-amber-200 text-amber-700",
  };

  return (
    <div className={clsx("rounded-lg border p-4 space-y-4", toneStyles[tone])}>
      <p className="text-sm font-semibold">{title}</p>

      {players.map((player) => (
        <div key={player} className="bg-white rounded-md border p-3 text-sm">
          <p className="font-medium">{player}</p>
          <p className="text-xs text-slate-500 mt-1">Detailed review</p>
        </div>
      ))}
    </div>
  );
}
