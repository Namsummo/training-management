import React from "react";
import Link from "next/link";
import { AppButton } from "@/shared/components/ui/button/AppButton";

const SAMPLE_ATHLETES = [
  { name: "Marcus Johnson", id: "#ATH-0922", position: "Center Forward", fitness: "AVAILABLE", score: 92 },
  { name: "David Chen", id: "#ATH-1105", position: "Midfielder", fitness: "AVAILABLE", score: 78 },
  { name: "Sarah Williams", id: "#ATH-0542", position: "Full Back", fitness: "INJURED", score: 45 },
  { name: "James Smith", id: "#ATH-0331", position: "Goalkeeper", fitness: "AVAILABLE", score: 85 },
  { name: "Elena Rodriguez", id: "#ATH-1299", position: "Left Winger", fitness: "AVAILABLE", score: 89 },
];

function FitnessBadge({ status }: { status: string }) {
  const base = "text-xs font-medium px-3 py-1 rounded-full inline-block";
  if (status === "AVAILABLE") return <span className={`${base} bg-green-50 text-green-700`}>AVAILABLE</span>;
  if (status === "INJURED") return <span className={`${base} bg-red-50 text-red-700`}>INJURED</span>;
  return <span className={`${base} bg-slate-50 text-slate-700`}>{status}</span>;
}

export default function CoachAthletesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-800">Athlete Roster</h1>
          <p className="mt-1 text-sm text-slate-500">Monitoring 24 active athletes in the First Team Squad</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="border rounded px-3 py-2 bg-white text-sm">Bulk Export</button>
          <button className="border rounded px-3 py-2 bg-[#F5F3FF] text-sm text-[#5954E6]">+ import athlete list</button>
          <Link href="/coach/athletes/create">
            <AppButton>+ Add New Athlete</AppButton>
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button className="text-sm text-slate-500">Filters</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 bg-white border rounded text-sm">Squad: All Teams</button>
            <button className="px-3 py-2 bg-white border rounded text-sm">Position: All</button>
            <button className="px-3 py-2 bg-white border rounded text-sm">Fitness: Any</button>
          </div>
          <div className="ml-auto text-sm text-slate-500">Sorted by Performance Score</div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white">
        <div className="px-6 py-4 hidden md:flex text-sm text-slate-500 border-b">
          <div className="w-1/2">Athlete</div>
          <div className="w-1/6">Position</div>
          <div className="w-1/6">Fitness Status</div>
          <div className="w-1/6">AI Perf. Score</div>
          <div className="w-12 text-right">Actions</div>
        </div>

        <div>
          {SAMPLE_ATHLETES.map((a) => (
            <div key={a.id} className="flex items-center gap-4 px-6 py-4 border-b">
              <div className="w-1/2 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">{/* avatar */}</div>
                <div>
                  <div className="font-medium text-slate-800">{a.name}</div>
                  <div className="text-xs text-slate-400">ID: {a.id}</div>
                </div>
              </div>

              <div className="w-1/6 text-sm text-slate-600">{a.position}</div>

              <div className="w-1/6"> <FitnessBadge status={a.fitness} /> </div>

              <div className="w-1/6 flex items-center gap-3">
                <div className="flex-1">
                  <div className="w-full bg-slate-100 h-2 rounded overflow-hidden">
                    <div style={{ width: `${a.score}%` }} className="h-2 bg-[#5954E6]" />
                  </div>
                </div>
                <div className="w-12 text-sm font-semibold text-[#5954E6]">{a.score}</div>
              </div>

              <div className="w-12 text-right">
                <Link href={`/coach/athletes/${a.id.replace('#','')}`}>
                  <button className="text-slate-400">👁️</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 text-sm text-slate-500">Showing 1 to 5 of 24 athletes</div>

        <div className="px-6 py-4 border-t flex items-center justify-between">
          <div className="text-sm text-slate-500">Showing 1 to 5 of 24 athletes</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border rounded text-sm">&lt;</button>
            <button className="px-3 py-1 border rounded bg-[#5954E6] text-white">1</button>
            <button className="px-3 py-1 border rounded text-sm">2</button>
            <button className="px-3 py-1 border rounded text-sm">3</button>
            <button className="px-3 py-1 border rounded text-sm">&gt;</button>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-white p-4 border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">✓</div>
          <div>
            <div className="text-sm text-slate-500">Available</div>
            <div className="text-xl font-semibold">18/24</div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">!</div>
          <div>
            <div className="text-sm text-slate-500">At Risk</div>
            <div className="text-xl font-semibold">4</div>
          </div>
        </div>

        <div className="rounded-lg bg-white p-4 border flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-700">↗</div>
          <div>
            <div className="text-sm text-slate-500">Avg. Performance</div>
            <div className="text-xl font-semibold">78.6</div>
          </div>
        </div>
      </div>
    </div>
  );
}
