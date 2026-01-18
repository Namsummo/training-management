"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { authHeaders } from "@/shared/lib/api";

type Exercise = {
  id: number;
  title: string;
  category: string | null;
  duration: number;
  difficulty?: string | null;
  equipment?: string | null;
  thumbnail?: string | null;
  video_path?: string | null;
  status?: string | null;
};

const DEFAULT_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://vitex.duckdns.org/api/v1").replace(/\/$/, "");
// prefer a public env token, fallback to localStorage token (useful in dev)
const DEFAULT_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || null;


export default function Page() {
  const [items, setItems] = useState<Exercise[]>([]);
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const perPage = 8;
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string>("All");
  const [filterIntensity, setFilterIntensity] = useState<string>("Any");
  const [filterEquipment, setFilterEquipment] = useState<string>("Any");
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // fetch a page
  const fetchPage = async (p: number) => {
    setLoading(true);
    try {
      // Use shared authFetch to attach auth headers when available and parse JSON
      const resJson: any = await (await fetch(`${DEFAULT_BASE}/exercises?page=${p}&per_page=${perPage}`, { headers: authHeaders() })).json();
      const data = resJson?.data?.data || [];
      const mapped: Exercise[] = data.map((d: any) => {
        // normalize equipment to a string when possible — API may return an array or string
        let equipment: string | null = null;
        if (Array.isArray(d.equipment)) {
          equipment = d.equipment.join(",");
        } else if (d.equipment && typeof d.equipment === "string") {
          equipment = d.equipment;
        } else {
          equipment = null;
        }

        return {
          id: d.id,
          title: d.title,
          category: d.category,
          duration:
            d.duration !== null && d.duration !== undefined && Number(d.duration) > 0
              ? Number(d.duration)
              : Math.floor(Math.random() * 21) + 10,
          difficulty: d.technical_difficulty || d.difficulty || null,
          equipment,
          thumbnail: d.thumbnail || null,
          video_path: d.video_path || null,
          status: d.status || null,
        } as Exercise;
      });

    setItems((cur) => {
      // avoid duplicates when appending pages: only add items with new ids
      const existing = new Set(cur.map((c) => c.id));
      const toAdd = mapped.filter((m) => !existing.has(m.id));
      return [...cur, ...toAdd];
    });
    setTotal(resJson?.data?.total ?? null);
    setPage(resJson?.data?.current_page ?? p);
    } catch (e) {
      console.error("Failed to load exercises", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial load
    fetchPage(1);
    // fetch Category enum for the Type filter
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await fetch(`${DEFAULT_BASE}/enums/CategoryEnum`, { headers: authHeaders() });
        const json = await res.json();
        const data = json?.data || json || [];
        if (Array.isArray(data)) {
          // keep the raw items (they may be objects like { key, label }) so we can render
          // labels and unique keys correctly instead of coercing to "[object Object]"
          setCategories(data);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
        // leave categories empty; UI will fall back to sensible defaults
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const hasMore = useMemo(() => {
    if (total === null) return false;
    return items.length < total;
  }, [items.length, total]);

  const loadMore = () => {
    if (loading) return;
    const next = page + 1;
    fetchPage(next);
  };

  // helper to normalize strings (keys/labels) for comparison
  const normalize = (s: any) => String(s || "").toLowerCase().replace(/\s+/g, "").replace(/-/g, "");

  // client-side filtering/searching over loaded items
  const filtered = useMemo(() => {
    return items.filter((it) => {
      if (filterType !== "All" && it.category && normalize(it.category) !== normalize(filterType)) return false;
      if (filterIntensity !== "Any" && it.difficulty && it.difficulty.toLowerCase() !== filterIntensity.toLowerCase()) return false;
      if (filterEquipment !== "Any" && it.equipment && !it.equipment.toLowerCase().includes(filterEquipment.toLowerCase())) return false;
      if (search && !it.title.toLowerCase().includes(search.toLowerCase()) && !(it.equipment || "").toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [items, filterType, filterIntensity, filterEquipment, search]);

  const clearFilters = () => {
    setFilterType("All");
    setFilterIntensity("Any");
    setFilterEquipment("Any");
    setSearch("");
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-10 px-6 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-black">Exercise Library</h1>
            <p className="mt-2 text-sm text-slate-600">Manage and organize your team's training drills.</p>
          </div>

          <div className="pt-1">
            <Link href="/coach/exercises/create">
              <AppButton size="sm" className="px-4" variant="default">
                + Create new exercise
              </AppButton>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="flex-1">
            <AppInput
              label={undefined}
              placeholder="Search exercises by name, tag, or focus area..."
              fullWidth
              className="max-w-full"
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Filters (on their own row) */}
        <div className="mt-3 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Type:</span>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
              <option value="All">All</option>
              {categoriesLoading ? (
                <option disabled>Loading...</option>
              ) : (
                (categories.length > 0 ? categories : ["Technical", "Conditioning", "Tactical", "Recovery"]).map((c, idx) => {
                  if (typeof c === 'string') {
                    return <option key={`cat-${c}`} value={c}>{c}</option>;
                  }
                  if (c && typeof c === 'object') {
                    const key = c.key ?? c.value ?? `idx-${idx}`;
                    const label = c.label ?? c.name ?? String(key);
                    return <option key={`cat-${String(key)}`} value={String(key)}>{label}</option>;
                  }
                  return <option key={`cat-${idx}`} value={String(c)}>{String(c)}</option>;
                })
              )}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Intensity:</span>
            <select value={filterIntensity} onChange={(e) => setFilterIntensity(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
              <option>Any</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Equipment:</span>
            <select value={filterEquipment} onChange={(e) => setFilterEquipment(e.target.value)} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
              <option>Any</option>
              <option>Cones</option>
              <option>Bibs</option>
              <option>Balls</option>
            </select>
          </div>

          <div className="ml-auto">
            <button onClick={clearFilters} className="text-sm text-slate-500">Clear all</button>
          </div>
        </div>

        {/* Grid of cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((ex) => (
            <article
              key={ex.id}
              role="button"
              onClick={() => router.push(`/coach/exercises/${ex.id}/edit`)}
              className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden cursor-pointer"
            >
              <div className="relative h-36 bg-slate-100">
                {ex.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={ex.thumbnail} alt={ex.title} className="object-cover w-full h-full" />
                ) : (
                  <div className="w-full h-full bg-slate-100" />
                )}

                <div className="absolute right-3 top-3 rounded-md bg-slate-700 px-2 py-1 text-xs text-white">{ex.duration} min</div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">{ex.title}</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-[#EDF2FF] px-2 py-1 text-xs text-[#4541b3]">{ex.category || 'Uncategorized'}</span>
                  {ex.equipment && <span className="rounded-md bg-[#FFF7ED] px-2 py-1 text-xs text-[#8a5a2b]">{ex.equipment}</span>}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-80">
                        <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="1.5" />
                      </svg>
                      <span>{ex.difficulty || 'Unknown'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-80">
                        <rect x="3" y="6" width="18" height="12" rx="2" stroke="#CBD5E1" strokeWidth="1.5" />
                      </svg>
                      <span>{ex.equipment ? ex.equipment.split(",")[0] : '—'}</span>
                    </div>
                  </div>

                  {/* Card click navigates to edit — removed separate View link */}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          {hasMore ? (
            <button onClick={loadMore} disabled={loading} className="text-sm text-[#6B7280]">{loading ? 'Loading...' : 'Load more exercises ▾'}</button>
          ) : (
            <div className="text-sm text-slate-400">No more exercises</div>
          )}
        </div>
      </div>
    </div>
  );
}
