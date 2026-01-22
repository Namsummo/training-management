import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import clsx from "clsx";
import {
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle2,
  Download,
  Mail,
  XCircle,
  Send,
  MoreVertical,
} from "lucide-react";
import { ATHLETES } from "./athlete.type";
import { StatusBadge } from "./StatusBadge";

export interface AvailabilityStat {
  key: "available" | "limited" | "unavailable" | "no_response";
  title: string;
  value: number;
  change?: number;
  changeLabel?: string;
}

const ICON_MAP = {
  available: CheckCircle2,
  limited: AlertTriangle,
  unavailable: XCircle,
  no_response: Mail,
};

const COLOR_MAP = {
  available: {
    border: "border-green-300",
    icon: "text-green-500",
    change: "text-green-600",
  },
  limited: {
    border: "border-yellow-300",
    icon: "text-yellow-500",
    change: "text-slate-500",
  },
  unavailable: {
    border: "border-red-300",
    icon: "text-red-500",
    change: "text-red-600",
  },
  no_response: {
    border: "border-emerald-300",
    icon: "text-purple-500",
    change: "text-red-600",
  },
};

const AVAILABILITY_STATS: AvailabilityStat[] = [
  { key: "available", title: "Available", value: 18, change: 2 },
  { key: "limited", title: "Limited", value: 3, changeLabel: "Stable" },
  { key: "unavailable", title: "Unavailable", value: 1, change: -1 },
  {
    key: "no_response",
    title: "No Response",
    value: 4,
    changeLabel: "-1 expected",
  },
];

export default function Page() {
  return (
    <div className="flex flex-col bg-slate-50">
      {/* ===== Header ===== */}
      <div className="shrink-0 px-6 pt-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Pre-Session Review</h1>
            <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">
              <Calendar size={14} />
              <span>Morning Tactical - 10:00 AM | Pitch 1 | Elite Group A</span>
            </div>
          </div>

          <div className="flex gap-2">
            <AppButton variant="outline" className="gap-2">
              <Bell size={14} />
              Send Ping to All (4)
            </AppButton>
            <AppButton className="gap-2 bg-indigo-600 hover:bg-indigo-600/90">
              <Download size={14} />
              Export Report
            </AppButton>
          </div>
        </div>

        {/* ===== Stats ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {AVAILABILITY_STATS.map((item) => {
            const Icon = ICON_MAP[item.key];
            const colors = COLOR_MAP[item.key];

            return (
              <div
                key={item.key}
                className={clsx(
                  "rounded-xl border bg-white p-5 flex justify-between",
                  colors.border,
                )}
              >
                <div>
                  <p className="text-sm text-slate-600">{item.title}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold">{item.value}</span>
                    {item.change !== undefined && (
                      <span className={clsx("text-sm", colors.change)}>
                        {item.change > 0 && "+"}
                        {item.change}
                      </span>
                    )}
                    {item.changeLabel && (
                      <span className="text-sm text-slate-500">
                        {item.changeLabel}
                      </span>
                    )}
                  </div>
                </div>
                <Icon className={clsx("w-6 h-6", colors.icon)} />
              </div>
            );
          })}
        </div>
      </div>
      {/* ===== Table (flex-1) ===== */}
      <div className="flex-1 px-6 pb-6 mt-6">
        <div className="h-full rounded-xl border bg-white flex flex-col">
          {/* Table header */}
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[200px] text-primary font-bold">
                  All Athletes(26)
                </TableHead>
                <TableHead className="w-[200px]">Available(1)</TableHead>
                <TableHead className="tw-[200px]">
                  Limited/Injured(36)
                </TableHead>
                <TableHead>No Response (4)</TableHead>
              </TableRow>
            </TableHeader>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>Athlete</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Readiness Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
          </Table>

          {/* Scrollable body */}
          <div className="flex-1 overflow-auto">
            <Table>
              <TableBody>
                {ATHLETES.map((athlete) => (
                  <TableRow key={athlete.id}>
                    <TableCell>
                      <div className="flex gap-3 items-center">
                        <div className="w-9 h-9 rounded-full bg-slate-200" />
                        <div>
                          <p className="font-medium">{athlete.name}</p>
                          <p className="text-xs text-slate-500">
                            {athlete.role} | Unit: {athlete.unit}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={athlete.status} />
                    </TableCell>

                    <TableCell className="text-sm text-slate-600">
                      {athlete.note}
                    </TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {athlete.status === "no_response" && (
                          <Button size="sm" className="gap-1">
                            <Send size={14} /> Ping
                          </Button>
                        )}
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination (sticky bottom) */}
          <div className="shrink-0 flex justify-between px-4 py-3 border-t text-sm text-slate-500">
            <span>Showing 4 of 26 athletes</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="justify-end">
        <AppButton>Start</AppButton>
      </div>
    </div>
  );
}
