"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";

type Plan = {
  id: string;
  name: string;
  status: "Active" | "Draft" | "Completed";
  duration: string;
  athletes: number;
  updated: string;
};

const SAMPLE_PLANS: Plan[] = [
  { id: "1", name: "Off-Season Strength Phase", status: "Active", duration: "12 Weeks", athletes: 7, updated: "2 days ago" },
  { id: "2", name: "Marathon Prep - Week 1-4", status: "Active", duration: "4 Weeks", athletes: 3, updated: "1 week ago" },
  { id: "3", name: "High-Intensity Interval Block", status: "Draft", duration: "6 Weeks", athletes: 0, updated: "3 days ago" },
  { id: "4", name: "Winter Conditioning Base", status: "Completed", duration: "8 Weeks", athletes: 4, updated: "1 month ago" },
];

export default function page() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Draft" | "Archived">("All");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    return SAMPLE_PLANS.filter((p) => {
      if (filter !== "All") {
        if (filter === "Archived") return p.status === "Completed"; // use Completed as archived proxy
        if (p.status !== filter) return false;
      }
      if (!query) return true;
      return p.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, filter]);

  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Training Plans</h1>
          <p className="text-sm text-slate-500 mt-1">12 Total Plans in your library</p>
        </div>

        <div className="flex items-center gap-3">
          <AppButton onClick={() => setPage(1)} variant="ghost">Import</AppButton>
          <AppButton onClick={() => router.push('/coach/exercises/lesson-plan/create')}>Create Training Plan</AppButton>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1">
            <AppInput placeholder="Search plans by name..." fullWidth value={query} onChange={(e: any) => setQuery(e.target.value)} />
          </div>

          <div className="flex items-center gap-2">
            {(["All", "Active", "Draft", "Archived"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-3 py-1 rounded-full text-sm ${filter === f ? "bg-[#5954E6] text-white" : "border"}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-slate-500 border-b">
                <th className="py-3">Plan Name</th>
                <th className="py-3">Status</th>
                <th className="py-3">Duration</th>
                <th className="py-3">Athletes</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((p) => (
                <tr key={p.id} className="odd:bg-white even:bg-slate-50">
                  <td className="py-4">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-slate-500">Updated {p.updated}</div>
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${p.status === "Active" ? "bg-emerald-100 text-emerald-700" : p.status === "Draft" ? "bg-slate-100 text-slate-700" : "bg-emerald-50 text-emerald-700"}`}>{p.status}</span>
                  </td>
                  <td className="py-4">{p.duration}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-slate-200" />
                      <div className="text-xs text-slate-500">{p.athletes === 0 ? "None assigned" : `${p.athletes} players`}</div>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <button className="text-slate-500 hover:text-slate-900">✏️</button>
                      <button className="text-rose-500 hover:text-rose-700">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-slate-500">Showing {start + 1} to {Math.min(start + perPage, filtered.length)} of {filtered.length} plans</div>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 border rounded" onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
            <button className="px-2 py-1 border rounded" onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
