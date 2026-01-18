"use client";

import React, { useMemo, useState, useEffect } from "react";
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
const DEFAULT_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://vitex.duckdns.org/api/v1").replace(/\/$/, "");

type ApiPagination = {
  current_page?: number;
  from?: number;
  to?: number;
  per_page?: number;
  total?: number;
  last_page?: number;
};

const SAMPLE_PLANS: Plan[] = [];

export default function page() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Draft" | "Archived">("All");
  const [page, setPage] = useState(1);
  const perPage = 10;
  const [plans, setPlans] = useState<Plan[]>(SAMPLE_PLANS);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<ApiPagination>({});

  const filtered = useMemo(() => {
    return plans.filter((p) => {
      if (filter !== "All") {
        if (filter === "Archived") return p.status === "Completed"; // use Completed as archived proxy
        if (p.status !== filter) return false;
      }
      if (!query) return true;
      return p.name.toLowerCase().includes(query.toLowerCase());
    });
  }, [query, filter, plans]);

  const start = (page - 1) * perPage;
  const pageItems = filtered.slice(start, start + perPage);

  useEffect(() => {
    // fetch plans from API when page changes
    const fetchPlans = async () => {
      setLoading(true);
      try {
        const startDate = new Date().toISOString().slice(0, 10); // default to today
        // read token from localStorage or env fallback
        let token = "";
        if (typeof window !== 'undefined') {
          token = localStorage.getItem('token') || localStorage.getItem('auth_token') || localStorage.getItem('access_token') || localStorage.getItem('api_token') || '';
        }
        if (!token) token = (process.env.NEXT_PUBLIC_API_TOKEN as string) || '';

        const url = `${DEFAULT_BASE}/plans?start_date=${encodeURIComponent(startDate)}&get_all=0&per_page=${perPage}&page=${page}`;
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(url, { headers });
        const json = await res.json();
        const data = json?.data || {};
        const items = data?.data || [];
        const mapped: Plan[] = (items || []).map((p: any) => {
          // compute duration roughly as weeks or days
          let duration = '—';
          try {
            const s = p.start_date ? new Date(p.start_date) : null;
            const e = p.end_date ? new Date(p.end_date) : null;
            if (s && e && !isNaN(s.getTime()) && !isNaN(e.getTime())) {
              const days = Math.max(1, Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1);
              if (days >= 7) duration = `${Math.ceil(days / 7)} Weeks`;
              else duration = `${days} days`;
            }
          } catch (e) {
            /* ignore */
          }

          return {
            id: String(p.id),
            name: p.name || '',
            status: (p.status || 'draft').toLowerCase() === 'draft' ? 'Draft' : (p.status || 'active').toLowerCase() === 'active' ? 'Active' : 'Completed',
            duration,
            athletes: (p.users && Array.isArray(p.users)) ? p.users.length : 0,
            updated: p.updated_at ? new Date(p.updated_at).toLocaleDateString() : (p.created_at ? new Date(p.created_at).toLocaleDateString() : ''),
          } as Plan;
        });

        setPlans(mapped);
        setPagination({
          current_page: data.current_page,
          from: data.from,
          to: data.to,
          per_page: data.per_page,
          total: data.total,
          last_page: data.last_page,
        });
      } catch (err) {
        console.error('Failed to load plans', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [page]);

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
