"use client";

import clsx from "clsx";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BotIcon,
  CheckCircle2,
  Clock,
  FileText,
  LucideClock2,
  Plus,
  Share2,
  Wand2,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import {
  FLAGGED_ATHLETES,
  METRIC_STATS,
  MetricStat,
  SESSION_META,
} from "../pre-preview/athlete.type";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

// Status configuration
const STATUS_CONFIG = {
  high_strain: {
    label: "High Strain",
    className: "bg-red-100 text-red-600",
  },
  exertion_warning: {
    label: "Normal",
    className: "bg-green-100 text-green-600",
  },
  threshold_break: {
    label: "Normal",
    className: "bg-green-100 text-green-600",
  },
} as const;

// Metric Card Component
interface MetricCardProps {
  item: MetricStat;
}
// Flag Status Badge Component
interface FlagStatusBadgeProps {
  status: keyof typeof STATUS_CONFIG;
}

function SessionStatusBadge({ status }: { status: "completed" | "pending" }) {
  const isCompleted = status === "completed";

  return (
    <div
      className={clsx(
        "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
        isCompleted
          ? "bg-green-100 text-green-700"
          : "bg-yellow-100 text-yellow-700",
      )}
    >
      {isCompleted ? <CheckCircle2 size={12} /> : <Clock size={12} />}
      {isCompleted ? "Completed" : "Pending"}
    </div>
  );
}

function MetricCard({ item }: MetricCardProps) {
  const isPositive = item.change > 0;
  return (
    <div className="rounded-xl border bg-white px-6 py-4 flex justify-between items-center">
      <div>
        <p className="text-sm text-slate-500">{item.title}</p>
        <p className="mt-1 text-3xl font-semibold">{item.value}</p>
      </div>

      <div
        className={clsx(
          "flex items-center gap-1 text-sm font-medium",
          isPositive ? "text-indigo-600" : "text-red-500",
        )}
      >
        {isPositive ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
        {Math.abs(item.change)}%
      </div>
    </div>
  );
}

// Session Metrics Component
function SessionMetrics() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {METRIC_STATS.map((item) => (
        <MetricCard key={item.key} item={item} />
      ))}
    </section>
  );
}

function FlagStatusBadge({ status }: FlagStatusBadgeProps) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={clsx(
        "rounded-full px-2 py-0.5 text-xs font-medium",
        cfg.className,
      )}
    >
      {cfg.label}
    </span>
  );
}

// Flagged Athletes Table Component
function FlaggedAthletesTable() {
  const router = useRouter();
  return (
    <div className="rounded-xl border bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-red-100 p-1.5">
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </div>
            <h3 className="font-semibold">Flagged Athletes</h3>
          </div>
          <p className="mt-1 text-xs text-red-500">
            {FLAGGED_ATHLETES.length} athletes exceeded physiological RPE/Pain
            thresholds
          </p>
        </div>

        <Button variant="link" className="text-sm">
          View All Athlete Data
        </Button>
      </div>

      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Athlete</TableHead>
            <TableHead>RPE</TableHead>
            <TableHead>Pain Score</TableHead>
            <TableHead>Reported Area</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {FLAGGED_ATHLETES.map((athlete) => (
            <TableRow key={athlete.id}>
              <TableCell className="">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-medium">{athlete.name}</p>
                    <p className="text-xs text-slate-500">{athlete.role}</p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="font-medium text-red-500">{athlete.rpe}</span>
                <span className="text-xs text-slate-400"> /10</span>
              </TableCell>

              <TableCell>
                <span className="font-medium text-green-500">
                  {athlete.pain}
                </span>
                <span className="text-xs text-slate-400"> /10</span>
              </TableCell>

              <TableCell>
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs">
                  {athlete.area}
                </span>
              </TableCell>

              <TableCell>
                <FlagStatusBadge status={athlete.status} />
              </TableCell>

              <TableCell className="text-right">
                <Button
                  size="sm"
                  className="bg-slate-900 hover:bg-slate-800"
                  onClick={() => router.push(`/coach/athletes/${athlete.id}`)}
                >
                  View Detail
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function DistributionCharts() {
  return (
    <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* RPE Distribution */}
      <div className="rounded-xl border bg-white p-4">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">
          RPE Distribution
        </h3>

        <div className="flex justify-center">
          <Image
            src="/images/rpedis.png"
            alt="RPE Distribution"
            width={900}
            height={450}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="max-w-full h-auto object-contain"
            priority
          />
        </div>
      </div>

      {/* Pain Distribution */}
      <div className="rounded-xl border bg-white p-4">
        <h3 className="mb-4 text-sm font-semibold text-slate-700">
          Pain Distribution
        </h3>

        <div className="flex justify-center">
          <Image
            src="/images/paindis.png"
            alt="Pain Distribution"
            width={900}
            height={450}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="max-w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}

// Main Page Component
export default function PreTeamPage() {
  const router = useRouter();
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between rounded-xl border bg-white px-5 py-4">
        {/* Left */}
        <div className="space-y-2">
          <h1 className="text-xl font-semibold">Post-Session Team Review</h1>

          <div className="flex justify-center flex-wrap items-center gap-3 text-xs text-slate-600">
            <span className="rounded-md bg-slate-100 px-2 py-0.5">
              {SESSION_META.code}
            </span>

            <span className="flex items-center gap-1">
              <LucideClock2 size={16} /> {SESSION_META.duration}
            </span>
            <SessionStatusBadge status={SESSION_META.status} />
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-2">
          <Button variant="outline" size="lg" className="gap-2">
            <Share2 size={14} />
            Export PDF
          </Button>

          <AppButton
            size="lg"
            className="gap-2"
            onClick={() => router.push("./evaluation")}
          >
            <Plus size={14} />
            Finish
          </AppButton>
        </div>
      </div>
      <SessionMetrics />
      <DistributionCharts />
      <FlaggedAthletesTable />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===== Coach Summary ===== */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={18} className="text-slate-600" />
            <h3 className="font-semibold text-slate-900">
              Coach&apos;s Session Summary
            </h3>
          </div>

          <Textarea
            placeholder="Add observations about today's intensity and player engagement..."
            className="flex-1 resize-none"
          />

          <div className="mt-4 flex justify-end">
            <Button variant="secondary">Save Notes</Button>
          </div>
        </div>

        {/* ===== Next Session Preview ===== */}
        <div className="rounded-xl border bg-indigo-50 p-6 flex flex-col justify-between">
          <div>
            <h3 className=" flex gap-2 font-semibold text-slate-900 mb-2">
              <BotIcon size={20} />
              Next Session Preview
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed">
              Based on today&apos;s High RPE results, we recommend a{" "}
              <span className="font-medium">20% reduction</span> in volume for
              tomorrow&apos;s tactical session.
            </p>
          </div>

          <Button className="mt-6 gap-2 bg-indigo-600 hover:bg-indigo-600/90">
            <Wand2 size={16} />
            Adjust Next Session
          </Button>
        </div>
      </div>
    </div>
  );
}
