"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { authHeaders } from "@/shared/lib/api";

const DEFAULT_BASE = (process.env.NEXT_PUBLIC_API_BASE_URL || "http://vitex.duckdns.org/api/v1").replace(/\/$/, "");

export default function CreateLessonPlanPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [asideFilter, setAsideFilter] = useState<string>("All");
  const [categories, setCategories] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [drills, setDrills] = useState<any[]>([]);
  const [drillsLoading, setDrillsLoading] = useState(false);
  const [asideSearch, setAsideSearch] = useState<string>("");
  const [planName, setPlanName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [targetOutcomes, setTargetOutcomes] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  // small toast system (local to this page)
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 3000);
  };
  // creator info (from localStorage where available)
  const [creatorName, setCreatorName] = useState<string>("Coach Marcus");
  const [createdAtDisplay, setCreatedAtDisplay] = useState<string>(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const apiUserRaw = localStorage.getItem('api_user');
      let name: string | null = null;
      if (apiUserRaw) {
        try {
          const apiUser = JSON.parse(apiUserRaw);
          name = apiUser?.name || apiUser?.fullname || apiUser?.username || null;
        } catch (e) {
          // api_user is not JSON, maybe a plain username string
          name = apiUserRaw;
        }
      }
      if (!name) {
        name = localStorage.getItem('user_name') || localStorage.getItem('name') || localStorage.getItem('fullname') || localStorage.getItem('user') || localStorage.getItem('username') || null;
      }
      if (name) setCreatorName(String(name));
    } catch (err) {
      // ignore and keep default
    }
    const now = new Date();
    setCreatedAtDisplay(now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  const getDateRange = (start?: string, end?: string) => {
    if (!start || !end) return [] as string[];
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return [] as string[];
    if (e < s) return [] as string[];
    const days: string[] = [];
    const cur = new Date(s);
    while (cur <= e) {
      // format as D/M (no leading zeros) to match example: 12/1
      days.push(`${cur.getDate()}/${cur.getMonth() + 1}`);
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  };

  // return array of ISO date strings (YYYY-MM-DD) for inclusive range
  const getIsoDateRange = (start?: string, end?: string) => {
    if (!start || !end) return [] as string[];
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s.getTime()) || isNaN(e.getTime())) return [] as string[];
    if (e < s) return [] as string[];
    const days: string[] = [];
    const cur = new Date(s);
    while (cur <= e) {
      days.push(cur.toISOString().slice(0, 10));
      cur.setDate(cur.getDate() + 1);
    }
    return days;
  };

  const getDisplayFromIso = (iso?: string) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return `${d.getDate()}/${d.getMonth() + 1}`;
  };

  // small avatar helpers for selected athletes
  const AVATAR_PALE_COLORS = [
    'bg-emerald-200 text-emerald-700',
    'bg-indigo-200 text-indigo-700',
    'bg-rose-200 text-rose-700',
    'bg-amber-200 text-amber-700',
    'bg-sky-200 text-sky-700',
    'bg-violet-200 text-violet-700',
    'bg-pink-200 text-pink-700',
    'bg-lime-200 text-lime-700',
  ];
  const pickAvatarClass = (key: string | number | undefined) => {
    const s = String(key || '');
    let sum = 0;
    for (let i = 0; i < s.length; i++) sum += s.charCodeAt(i);
    return AVATAR_PALE_COLORS[sum % AVATAR_PALE_COLORS.length];
  };
  const getInitials = (name?: string) => {
    if (!name) return '';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return (parts[0].slice(0, 1) + parts[1].slice(0, 1)).toUpperCase();
  };

  // Users modal state (Selected athletes)
  const [users, setUsers] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch(`${DEFAULT_BASE}/users?per_page=1000`, { headers: authHeaders() });
      const json = await res.json();
      // backend may return { data: { data: [...] } } or { data: [...] }
      const data = json?.data?.data || json?.data || json || [];
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load users', err);
      showToast('error', 'Failed to load users: ' + (err instanceof Error ? err.message : String(err)));
    } finally {
      setUsersLoading(false);
    }
  };

  const openUserModal = () => {
    // pre-select previously chosen users
    setSelectedUserIds((selectedUsers || []).map((u: any) => Number(u.id)));
    setShowUserModal(true);
    // load users if not already loaded
    if (!users || users.length === 0) fetchUsers();
  };

  const toggleSelectUser = (id: number) => {
    setSelectedUserIds((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  };

  const saveUserSelection = () => {
    const chosen = users.filter((u: any) => selectedUserIds.includes(Number(u.id)));
    setSelectedUsers(chosen);
    setShowUserModal(false);
  };

  // sections state - holds copied drills per section
  const [sections, setSections] = useState<{
    [k: string]: any[];
  }>({
    "warm-up": [],
    "main-workout": [],
    "cool-down": [],
  });

  // per-date sections: map ISO date -> sections object
  const [sectionsByDate, setSectionsByDate] = useState<Record<string, { [k: string]: any[] }>>({});
  const [activeDate, setActiveDate] = useState<string | null>(null); // ISO YYYY-MM-DD

  const [savedSteps, setSavedSteps] = useState<any[] | null>(null);
  // per-date start time mapping (HH:MM)
  const [startTimes, setStartTimes] = useState<Record<string, string>>({});

  const findDrillById = (id: string | number) => drills.find((d) => String(d.id) === String(id));

  const onDragStart = (e: React.DragEvent, id: string | number) => {
    e.dataTransfer.setData("text/plain", String(id));
    e.dataTransfer.effectAllowed = "copy";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const onDropToSection = (e: React.DragEvent, sectionKey: string) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (!id) return;
    const drill = findDrillById(id);
    if (!drill) return;
    // if an active date is selected, operate on that date's sections
    if (activeDate) {
      setSectionsByDate((cur) => {
        const curForDate = cur[activeDate] || { "warm-up": [], "main-workout": [], "cool-down": [] };
        const existing = curForDate[sectionKey] || [];
        if (existing.find((it: any) => String(it.id) === String(drill.id))) return cur;
        return { ...cur, [activeDate]: { ...curForDate, [sectionKey]: [...existing, drill] } };
      });
      return;
    }

    // fallback: global template sections
    setSections((cur) => {
      const existing = cur[sectionKey] || [];
      if (existing.find((it: any) => String(it.id) === String(drill.id))) return cur;
      return { ...cur, [sectionKey]: [...existing, drill] };
    });
  };

  const removeFromSection = (sectionKey: string, id: string | number) => {
    if (activeDate) {
      setSectionsByDate((cur) => {
        const curForDate = cur[activeDate] || { "warm-up": [], "main-workout": [], "cool-down": [] };
        return { ...cur, [activeDate]: { ...curForDate, [sectionKey]: (curForDate[sectionKey] || []).filter((it: any) => String(it.id) !== String(id)) } };
      });
      return;
    }

    setSections((cur) => ({ ...cur, [sectionKey]: (cur[sectionKey] || []).filter((it: any) => String(it.id) !== String(id)) }));
  };

  const buildStepsPayload = () => {
    // Build sections-per-date payload. For each date between startDate and endDate (inclusive)
    // create an object with the date (ISO YYYY-MM-DD) and the three step arrays.
    const dates = getIsoDateRange(startDate, endDate);

    // Fallback: if no dates provided, use a single entry with today's date
    const targetDates = dates.length > 0 ? dates : [new Date().toISOString().slice(0, 10)];

    const sectionsPayload = targetDates.map((d) => {
      const s = sectionsByDate[d] || sections; // use per-date if present, otherwise template
      return {
        date: d,
        start_time: startTimes[d] || null,
        steps: [
          { step: "warm-up", exercise_ids: (s["warm-up"] || []).map((it) => it.id) },
          { step: "main-workout", exercise_ids: (s["main-workout"] || []).map((it) => it.id) },
          { step: "cool-down", exercise_ids: (s["cool-down"] || []).map((it) => it.id) },
        ],
      };
    });

    setSavedSteps(sectionsPayload as any);
    // for now, just log — we can POST this payload to the backend when an endpoint is defined
    console.log("Lesson plan sections payload:", sectionsPayload);
    return sectionsPayload;
  };

  const createPlan = async () => {
    try {
      const sectionsPayload = buildStepsPayload();

      // read token from localStorage with a few common key fallbacks
      const token =
        (typeof window !== 'undefined' && (localStorage.getItem('token') || localStorage.getItem('auth_token') || localStorage.getItem('access_token') || localStorage.getItem('api_token'))) || null;

      if (!token) {
        console.error('No auth token found in localStorage');
        showToast('error', 'Not authenticated: no token found');
        return;
      }

      const body = {
        name: planName || 'Untitled Plan',
        description: description || '',
        start_date: startDate || null,
        end_date: endDate || null,
        target_outcome: (targetOutcomes || []).map((t) => String(t).toLowerCase()),
        status: 'draft',
        sections: sectionsPayload,
        user_ids: selectedUserIds || [],
      };

      const res = await fetch(`${DEFAULT_BASE}/plans`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) {
        console.error('Failed to create plan', json);
        // Build a detailed validation message when available
        const title = json?.message || 'Failed to create plan';
        const details: string[] = [];
        // If the response contains a nested `errors` object, prefer that
        const errorsSource = json?.errors && typeof json.errors === 'object' ? json.errors : json;
        Object.keys(errorsSource || {}).forEach((k) => {
          if (k === 'message' || k === 'success' || k === 'data') return;
          const v = (errorsSource as any)[k];
          if (Array.isArray(v)) details.push(`${k}: ${v.join('; ')}`);
          else if (typeof v === 'string') details.push(`${k}: ${v}`);
          else if (typeof v === 'object') {
            try {
              // try to stringify small objects
              details.push(`${k}: ${JSON.stringify(v)}`);
            } catch (e) {
              // ignore
            }
          }
        });
        const msg = details.length > 0 ? `${title} — ${details.join('\n')}` : `${title}`;
        showToast('error', msg);
        return;
      }

      console.log('Created plan', json);
      showToast('success', 'create plan success');
      // navigate to list
      try {
        router.push('/coach/exercises/lesson-plan/list');
      } catch (e) {
        // ignore
      }
    } catch (err) {
      console.error('Error creating plan', err);
      showToast('error', 'Error creating plan: ' + (err instanceof Error ? err.message : String(err)));
    }
  };

  const normalize = (s: any) => String(s || "").toLowerCase().replace(/\s+/g, "").replace(/-/g, "");

  useEffect(() => {
    // fetch categories and drills for the aside
    const fetchCategories = async () => {
      setCategoriesLoading(true);
      try {
        const res = await fetch(`${DEFAULT_BASE}/enums/CategoryEnum`, { headers: authHeaders() });
        const json = await res.json();
        const data = json?.data || json || [];
        if (Array.isArray(data)) setCategories(data);
      } catch (err) {
        console.error('Failed to load categories', err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    const fetchDrills = async () => {
      setDrillsLoading(true);
      try {
        const res = await fetch(`${DEFAULT_BASE}/exercises?page=1&per_page=1000`, { headers: authHeaders() });
        const json = await res.json();
        const data = json?.data?.data || [];
        const mapped = (data || []).map((d: any) => ({
          id: d.id,
          title: d.title,
          badge: d.technical_difficulty || d.difficulty || 'Med Int',
          time: d.duration ? `${d.duration}m` : '—',
          duration: d.duration || 0,
          category: d.category || d.category_key || null,
        }));
        setDrills(mapped);
      } catch (err) {
        console.error('Failed to load drills', err);
      } finally {
        setDrillsLoading(false);
      }
    };

    fetchCategories();
    fetchDrills();
  }, []);

  // ensure activeDate is set to first date in range when start/end change
  useEffect(() => {
    const isoDates = getIsoDateRange(startDate, endDate);
    if (isoDates.length > 0) {
      if (!activeDate || !isoDates.includes(activeDate)) {
        const first = isoDates[0];
        setActiveDate(first);
        // initialize that date's sections if not present
        setSectionsByDate((cur) => cur[first] ? cur : { ...cur, [first]: { "warm-up": [], "main-workout": [], "cool-down": [] } });
        // ensure a default start time exists for these dates
        setStartTimes((cur) => {
          const out = { ...cur };
          isoDates.forEach((d) => {
            if (!out[d]) out[d] = '10:30';
          });
          return out;
        });
      }
    }
  }, [startDate, endDate]);

  const ensureDateInitialized = (iso: string) => {
    if (!iso) return;
    setSectionsByDate((cur) => (cur[iso] ? cur : { ...cur, [iso]: { "warm-up": Array.from(sections["warm-up"] || []), "main-workout": Array.from(sections["main-workout"] || []), "cool-down": Array.from(sections["cool-down"] || []) } }));
    setStartTimes((cur) => (cur[iso] ? cur : { ...cur, [iso]: '10:30' }));
  };

  // derive which sections to render: per-active-date if set, otherwise the template `sections`
  const templateSections = { "warm-up": sections["warm-up"] || [], "main-workout": sections["main-workout"] || [], "cool-down": sections["cool-down"] || [] };
  const displayedSections = activeDate ? (sectionsByDate[activeDate] || templateSections) : templateSections;

  // Calculate duration for a section
  const getSectionDuration = (sectionKey: "warm-up" | "main-workout" | "cool-down"): number => {
    const sectionExercises = (displayedSections as Record<string, any[]>)[sectionKey] || [];
    return sectionExercises.reduce((sum: number, ex: any) => {
      // Parse duration from time field (e.g., "29m" -> 29)
      let duration = 0;
      if (ex.time) {
        const timeStr = String(ex.time).trim();
        // Remove "m" and parse the number
        const parsed = parseFloat(timeStr.replace(/m$/i, '').trim());
        duration = isNaN(parsed) ? 0 : parsed;
      } else if (ex.duration) {
        // Fallback to duration field if time is not available
        duration = typeof ex.duration === 'number' ? ex.duration : (typeof ex.duration === 'string' ? parseFloat(ex.duration) || 0 : 0);
      }
      return sum + duration;
    }, 0);
  };

  // Calculate total duration across all sections
  const getTotalDuration = (): number => {
    return getSectionDuration("warm-up") + getSectionDuration("main-workout") + getSectionDuration("cool-down");
  };

  return (
    <div className="p-6">
      {step === 1 && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Create New Training Plan</h1>
            <p className="text-sm text-slate-500 mt-1">Define the foundational framework for your athlete's upcoming performance phase.</p>
          </div>

        </div>
      )}

      <div className="rounded-lg border bg-white p-6">

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Plan Name</label>
              <AppInput placeholder="e.g., Pre-Season Endurance Phase 1" value={planName} onChange={(e: any) => setPlanName(e.target.value)} />
            </div>

            <div className="flex gap-4 mb-4 items-start">
              <div className="min-w-[50%]">
                <label className="block text-sm font-medium mb-2"> Date Range</label>
                                <div className="flex-1 flex gap-4">

                <AppInput type="date" value={startDate} onChange={(e: any) => setStartDate(e.target.value)} />
                <AppInput type="date" value={endDate} onChange={(e: any) => setEndDate(e.target.value)} />
                  </div>
              </div>

              <div className="min-w-[50%]">
                <label className="block text-sm font-medium mb-2">Target Outcome</label>
                <div className="flex gap-2 flex-wrap">
                  {['Conditioning','Technical','Rehab','Strength'].map((t) => {
                    const selected = targetOutcomes.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        role="checkbox"
                        aria-checked={selected}
                        onClick={() => setTargetOutcomes((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]))}
                        className={`px-3 py-1 rounded-full text-sm ${selected ? 'bg-[#f1f5ff] text-[#4541b3] border-[#5954E6]' : 'border bg-white'}`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description & Notes</label>
              <textarea
                rows={6}
                placeholder="Outline specific goals, intensity levels, or athlete constraints for this phase..."
                className="w-full rounded border p-3 text-sm bg-slate-50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            
            
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            {/* Header card */}
       

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-7">
                     <div className="rounded-lg border bg-white p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{planName ? planName : 'Plan name'}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    {/* date badges computed from step 1 start/end (click to select active date) */}
                    {getIsoDateRange(startDate, endDate).map((iso) => {
                      const disp = getDisplayFromIso(iso);
                      const selected = iso === activeDate;
                      return (
                        <button
                          key={`date-${iso}`}
                          onClick={() => {
                            setActiveDate(iso);
                            ensureDateInitialized(iso);
                          }}
                          className={`text-xs px-2 py-1 rounded ${selected ? 'bg-[#EEF4FF] text-[#2B4BFF] font-semibold' : 'bg-slate-100'}`}
                        >
                          {disp}
                        </button>
                      );
                    })}
    
                    <span className="text-sm text-slate-400">Created by {creatorName} • {createdAtDisplay}</span>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="px-2 py-1 rounded-full bg-slate-50 text-xs">⚡ High Intensity</span>
                    <span className="px-2 py-1 rounded-full bg-slate-50 text-xs">Difficult</span>
                    <div>
                      <input
                        type="time"
                        disabled={!activeDate}
                        value={activeDate ? (startTimes[activeDate] || '10:30') : '10:30'}
                        onChange={(e) => {
                          if (!activeDate) return;
                          const v = e.target.value;
                          setStartTimes((cur) => ({ ...cur, [activeDate]: v }));
                        }}
                        className="px-3 py-1 border rounded-full text-xs"
                        aria-label="Start time for selected date"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="rounded-lg bg-slate-50 px-4 py-3 text-center">
                    <div className="text-xs text-slate-500">Duration</div>
                    <div className="text-lg font-semibold text-[#5954E6]">{getTotalDuration()} MIN</div>
                  </div>
                </div>
              </div>
            </div>
                {/* Sections */}
                <div className="space-y-6">
                  {/* Save Steps removed — creation now happens when user clicks Start Training on Step 3 */}
                  <section className="rounded-lg border-2 border-[#E8F0FF] bg-white p-4 relative">
                    {/* top-right duration badge */}
                    <div className="absolute right-4 top-4 text-xs font-semibold text-[#5954E6]">{getSectionDuration("warm-up")} MIN</div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#EEF4FF] text-[#2B4BFF]">
                        <svg suppressHydrationWarning width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#E7F0FF"/>
                          <path d="M11 10h2v6h-2v-6zm0-4h2v2h-2V6z" fill="#2B4BFF"/>
                        </svg>
                      </div>
                      <div className="text-sm font-medium">Warm-up</div>
                    </div>

                    <div
                      className="rounded-md border border-dashed border-[#DDEBFF] p-3 space-y-3 bg-[#FBFDFF] min-h-[120px]"
                      onDragOver={onDragOver}
                      onDrop={(e) => onDropToSection(e, "warm-up")}
                    >
                      {(displayedSections["warm-up"] || []).length === 0 ? (
                        <div className="text-sm text-slate-400">Drag drills here from the Exercise Library</div>
                      ) : (
                        (displayedSections["warm-up"] || []).map((s: any) => {
                          const badge = s.badge || '';
                          const badgeLower = String(badge).toLowerCase();
                          let badgeClasses = 'text-xs px-2 py-1 rounded-full inline-block';
                          if (badgeLower.includes('low')) badgeClasses += ' bg-emerald-100 text-emerald-700';
                          else if (badgeLower.includes('high') || badgeLower.includes('difficult')) badgeClasses += ' bg-rose-100 text-rose-700';
                          else if (badgeLower.includes('med') || badgeLower.includes('moderate')) badgeClasses += ' bg-amber-100 text-amber-700';
                          else if (badgeLower.includes('tac') || badgeLower.includes('easy')) badgeClasses += ' bg-indigo-100 text-indigo-700';
                          else badgeClasses += ' bg-slate-100 text-slate-700';

                          return (
                            <div key={`warm-${s.id}`} className="rounded-md border border-slate-100 bg-slate-50 p-3 text-sm flex items-start justify-between">
                              <div>
                                <div className="font-medium">{s.title}</div>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className={badgeClasses}>{badge}</div>
                                  <div className="text-xs text-slate-400">{s.time || '—'}</div>
                                </div>
                              </div>
                              <button onClick={() => removeFromSection("warm-up", s.id)} className="text-xs text-slate-500">Remove</button>
                            </div>
                          );
                        })
                      )}
                    </div>
                    <div className="mt-3">
                      <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#E6E9FF] text-sm text-[#5954E6] bg-white">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#F0E9FF] text-[#6B52E6] text-xs">+</span>
                        <span> Add Exercise</span>
                      </button>
                    </div>
                  </section>

                  <section className="rounded-md border p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">Technical / Power</div>
                      </div>
                      <div className="text-xs font-semibold text-[#5954E6]">{getSectionDuration("main-workout")} MIN</div>
                    </div>

                    <div
                      className="space-y-3 min-h-[120px]"
                      onDragOver={onDragOver}
                      onDrop={(e) => onDropToSection(e, "main-workout")}
                    >
                      {(displayedSections["main-workout"] || []).length === 0 ? (
                        <div className="text-sm text-slate-400">Drag drills here from the Exercise Library</div>
                      ) : (
                        (displayedSections["main-workout"] || []).map((s: any) => {
                          const badge = s.badge || '';
                          const badgeLower = String(badge).toLowerCase();
                          let badgeClasses = 'text-xs px-2 py-1 rounded-full inline-block';
                          if (badgeLower.includes('low')) badgeClasses += ' bg-emerald-100 text-emerald-700';
                          else if (badgeLower.includes('high') || badgeLower.includes('difficult')) badgeClasses += ' bg-rose-100 text-rose-700';
                          else if (badgeLower.includes('med') || badgeLower.includes('moderate')) badgeClasses += ' bg-amber-100 text-amber-700';
                          else if (badgeLower.includes('tac') || badgeLower.includes('easy')) badgeClasses += ' bg-indigo-100 text-indigo-700';
                          else badgeClasses += ' bg-slate-100 text-slate-700';

                          return (
                            <div key={`main-${s.id}`} className="rounded-md border border-slate-100 bg-slate-50 p-3 text-sm flex items-start justify-between">
                              <div>
                                <div className="font-medium">{s.title}</div>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className={badgeClasses}>{badge}</div>
                                  <div className="text-xs text-slate-400">{s.time || '—'}</div>
                                </div>
                              </div>
                              <button onClick={() => removeFromSection("main-workout", s.id)} className="text-xs text-slate-500">Remove</button>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="mt-3">
                      <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#E6E9FF] text-sm text-[#5954E6] bg-white">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#F0E9FF] text-[#6B52E6] text-xs">+</span>
                        <span> Add Exercise</span>
                      </button>
                    </div>
                  </section>

                  <section className="rounded-md border p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#F6F0FF] text-[#6B52E6]">
                          <svg suppressHydrationWarning width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2l2 4 4 .5-3 3 .8 4L12 12l-3.8 2.5.8-4-3-3 4-.5L12 2z" fill="#F3E8FF" />
                          </svg>
                        </div>
                        <div className="text-sm font-medium">Cool down</div>
                      </div>
                      <div className="text-xs font-semibold text-[#5954E6]">{getSectionDuration("cool-down")} MIN</div>
                    </div>

                    <div
                      className="space-y-3 min-h-[120px]"
                      onDragOver={onDragOver}
                      onDrop={(e) => onDropToSection(e, "cool-down")}
                    >
                      {(displayedSections["cool-down"] || []).length === 0 ? (
                        <div className="text-sm text-slate-400">Drag drills here from the Exercise Library</div>
                      ) : (
                        (displayedSections["cool-down"] || []).map((s: any) => {
                          const badge = s.badge || '';
                          const badgeLower = String(badge).toLowerCase();
                          let badgeClasses = 'text-xs px-2 py-1 rounded-full inline-block';
                          if (badgeLower.includes('low')) badgeClasses += ' bg-emerald-100 text-emerald-700';
                          else if (badgeLower.includes('high') || badgeLower.includes('difficult')) badgeClasses += ' bg-rose-100 text-rose-700';
                          else if (badgeLower.includes('med') || badgeLower.includes('moderate')) badgeClasses += ' bg-amber-100 text-amber-700';
                          else if (badgeLower.includes('tac') || badgeLower.includes('easy')) badgeClasses += ' bg-indigo-100 text-indigo-700';
                          else badgeClasses += ' bg-slate-100 text-slate-700';

                          return (
                            <div key={`cool-${s.id}`} className="rounded-md border border-slate-100 bg-slate-50 p-3 text-sm flex items-start justify-between">
                              <div>
                                <div className="font-medium">{s.title}</div>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className={badgeClasses}>{badge}</div>
                                  <div className="text-xs text-slate-400">{s.time || '—'}</div>
                                </div>
                              </div>
                              <button onClick={() => removeFromSection("cool-down", s.id)} className="text-xs text-slate-500">Remove</button>
                            </div>
                          );
                        })
                      )}
                    </div>

                    <div className="mt-3">
                      <button className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[#E6E9FF] text-sm text-[#5954E6] bg-white">
                        <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#F0E9FF] text-[#6B52E6] text-xs">+</span>
                        <span> Add Exercise</span>
                      </button>
                    </div>
                  </section>

              
                </div>
              </div>

              <div className="col-span-5">
                <p>Exercise Library</p>
                <aside className="rounded border p-4 bg-white">
                    <AppInput placeholder="Search drills..." value={asideSearch} onChange={(e: any) => setAsideSearch(e.target.value)} />
                    <div className="flex flex-wrap gap-2 mt-3">
                      <button onClick={() => setAsideFilter('All')} className={`px-3 py-1 text-sm rounded-full ${asideFilter === 'All' ? 'bg-[#f1f5ff]' : 'border'}`}>All</button>
                      {categoriesLoading ? (
                        <div className="px-3 py-1 text-sm text-slate-400">Loading...</div>
                      ) : (
                        (categories.length > 0 ? categories : []).map((c: any, idx: number) => {
                          const key = typeof c === 'string' ? c : (c.key ?? c.value ?? `cat-${idx}`);
                          const label = typeof c === 'string' ? c : (c.label ?? c.name ?? String(key));
                          return (
                            <button key={`aside-cat-${String(key)}`} onClick={() => setAsideFilter(String(key))} className={`px-3 py-1 text-sm rounded-full ${asideFilter === String(key) ? 'bg-[#f1f5ff]' : 'border'}`}>{label}</button>
                          );
                        })
                      )}
                    </div>

                    <div className="mt-4 space-y-3 max-h-[720px] overflow-auto pr-2">
                      {drillsLoading ? (
                        <div className="text-sm text-slate-400">Loading drills...</div>
                      ) : (
                      drills
                        .filter((d) => {
                          // filter by aside search (title) first
                          if (asideSearch && !String(d.title || '').toLowerCase().includes(asideSearch.toLowerCase())) return false;
                          if (asideFilter === 'All') return true;
                          // try matching by category key or label
                          const cat = d.category || '';
                          return (
                            normalize(cat) === normalize(asideFilter) ||
                            normalize(cat) === normalize(categories.find((c: any) => (c.key ?? c.value) === asideFilter)?.label)
                          );
                        })
                        .map((d) => {
                          const badge = d.badge || '';
                          const badgeLower = badge.toLowerCase();
                          let badgeClasses = 'text-xs px-2 py-1 rounded-full inline-block';
                          if (badgeLower.includes('low')) badgeClasses += ' bg-emerald-100 text-emerald-700';
                          else if (badgeLower.includes('high') || badgeLower.includes('difficult')) badgeClasses += ' bg-rose-100 text-rose-700';
                          else if (badgeLower.includes('med') || badgeLower.includes('moderate')) badgeClasses += ' bg-amber-100 text-amber-700';
                          else if (badgeLower.includes('tac') || badgeLower.includes('easy')) badgeClasses += ' bg-indigo-100 text-indigo-700';
                          else badgeClasses += ' bg-slate-100 text-slate-700';

                              return (
                                <div
                                  key={`drill-${d.id || d.title}`}
                                  className="rounded-lg border bg-white p-4 cursor-grab"
                                  draggable
                                  onDragStart={(e) => onDragStart(e, d.id)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div>
                                      <div className="text-sm font-medium text-slate-900">{d.title}</div>
                                      <div className="flex items-center gap-3 mt-2">
                                        <div className={badgeClasses}>{badge}</div>
                                        <div className="text-xs text-slate-400">{d.time}</div>
                                      </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                      <div className="text-slate-300">⋮</div>
                                    </div>
                                  </div>
                                </div>
                              );
                        })
                      )}
                    </div>

                    <div className="mt-4 text-center text-sm text-[#5954E6]">+ Create Custom Drill</div>
                </aside>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div>
            <div className="rounded-lg border bg-white p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Assign & Generate Sessions</h2>
                  <p className="text-sm text-slate-500 mt-1">Review your schedule and resolve conflicts.</p>
                </div>
                <div>
                  <button className="px-3 py-1 border rounded text-sm">Back to Details</button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded border bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">1. Selected Athletes & Teams</div>
                  <div className="text-sm text-slate-500"><button onClick={openUserModal} className="underline">Edit Selection</button></div>
                </div>
                  <div className="mt-3 flex items-center gap-3">
                  {selectedUsers && selectedUsers.slice(0, 3).map((u: any) => (
                    <div key={`sel-${u.id}`} className={`h-8 w-8 rounded-full flex items-center justify-center ${pickAvatarClass(u.name)}`}>
                      <span className="text-xs font-semibold">{getInitials(u.name)}</span>
                    </div>
                  ))}
                  {/* placeholders if fewer than 3 */}
                  {Array.from({ length: Math.max(0, 3 - (selectedUsers || []).length) }).map((_, i) => (
                    <div key={`ph-${i}`} className="h-8 w-8 rounded-full bg-slate-200" />
                  ))}
                  <div className="text-xs rounded-full bg-[#eef2ff] text-[#5b21b6] px-2 py-1">+{Math.max(0, (selectedUsers?.length || 0) - 3)}</div>
                  <div className="text-sm">Men's Varsity Football Squad ({(selectedUsers?.length || 0)} Total)</div>
                </div>
              </div>

              <div className="rounded border bg-orange-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="text-orange-600">⚠️</div>
                  <div>
                    <div className="font-medium text-orange-700">Conflict Warning</div>
                    <div className="text-sm text-orange-600 mt-1">4 sessions in this plan overlap with existing "Team Strategy" meetings. How would you like to handle these?</div>
                    <div className="mt-3 flex gap-2">
                      <button className="px-3 py-2 bg-orange-600 text-white rounded">Auto-Reschedule Conflicts</button>
                      <button className="px-3 py-2 border rounded">Skip Conflicting Days</button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded border bg-white p-4">
                <div className="text-sm font-medium mb-3">2. Generated Calendar Preview</div>
                <div className="space-y-3">
                  <div className="rounded bg-slate-50 p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-slate-500">Oct 30</div>
                      <div className="font-medium">Session 1: Power Foundations</div>
                      <div className="text-xs text-slate-400">08:00 AM - 09:30 AM • Weight Room</div>
                    </div>
                    <div className="text-xs text-slate-500">24 Total Sessions</div>
                  </div>

                  <div className="rounded border-l-4 border-orange-300 bg-orange-50 p-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs text-orange-600">Nov 01</div>
                      <div className="font-medium">Session 2: Hypertrophy Split A <span className="text-sm text-orange-600">CONFLICT</span></div>
                      <div className="text-xs text-slate-400">08:00 AM - 09:30 AM • Overlaps with: Team Strategy</div>
                    </div>
                    <div className="text-sm text-orange-600">Reschedule</div>
                  </div>

                  <div className="rounded bg-slate-50 p-3">
                    <div className="text-xs text-slate-500">Nov 03</div>
                    <div className="font-medium">Session 3: Cardiovascular Engine</div>
                    <div className="text-xs text-slate-400">07:30 AM - 09:00 AM • Main Track</div>
                  </div>
                </div>
                <div className="mt-3 text-center text-sm text-slate-500">View all 24 sessions</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <Link href="/coach/exercises/lesson-plan/list" className="text-sm text-slate-500">Discard</Link>
          </div>

          <div className="flex items-center gap-3">
            {step > 1 && (
              <AppButton variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1))}>Back</AppButton>
            )}
            {step < 3 ? (
              <>
                <AppButton variant="ghost">Save as Draft</AppButton>
                <AppButton onClick={() => setStep((s) => s + 1)}>Next Step →</AppButton>
              </>
            ) : (
              <>
                <AppButton variant="ghost">Generate &amp; Sync to Calendar</AppButton>
                <AppButton onClick={createPlan}>Start Training</AppButton>
              </>
            )}
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="mt-6 rounded-lg border bg-blue-50/60 p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg suppressHydrationWarning width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#bfdbfe"/>
                  <path d="M11 10h2v6h-2v-6zm0-4h2v2h-2V6z" fill="#1e3a8a"/>
                </svg>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium text-slate-900">Professional Tip</div>
              <div className="text-xs text-slate-700 mt-1">Defining a clear Target Outcome allows the platform to automatically suggest relevant training modules and analytics visualizations once the plan is active.</div>
            </div>
          </div>
        </div>
      )}
      {toast && (
        <div className={`fixed right-6 bottom-6 z-50 max-w-sm text-sm ${toast.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'} text-white px-4 py-3 rounded shadow-lg whitespace-pre-wrap`}>
          {toast.message}
        </div>
      )}

      {showUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowUserModal(false)} />
          <div className="relative z-10 w-[720px] max-w-full bg-white rounded shadow-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select Athletes</h3>
              <div>
                <button onClick={() => setShowUserModal(false)} className="text-sm text-slate-500">Close</button>
              </div>
            </div>

            <div className="mb-3">
              <AppInput placeholder="Filter users..." onChange={(e: any) => {
                const q = String(e.target.value || '').toLowerCase();
                if (!q) return fetchUsers();
                // local filter over already-fetched users
                setUsers((cur) => (cur || []).filter((u: any) => String(u.name || u.fullname || u.username || '').toLowerCase().includes(q)));
              }} />
            </div>

            <div className="max-h-[360px] overflow-auto border rounded">
              {usersLoading ? (
                <div className="p-4 text-sm text-slate-500">Loading users...</div>
              ) : (
                <ul>
                  {(users || []).map((u: any) => (
                    <li key={u.id} className="flex items-center gap-3 p-3 border-b last:border-b-0">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${pickAvatarClass(u.name || u.fullname || u.username)}`}>
                        <span className="text-xs font-semibold">{getInitials(u.name || u.fullname || u.username)}</span>
                      </div>
                      <div className="flex-1 text-sm">
                        <div className="font-medium">{u.name || u.fullname || u.username || `User ${u.id}`}</div>
                        <div className="text-xs text-slate-400">{u.email || ''}</div>
                      </div>
                      <div>
                        <input type="checkbox" checked={selectedUserIds.includes(Number(u.id))} onChange={() => toggleSelectUser(Number(u.id))} />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button onClick={() => setShowUserModal(false)} className="px-3 py-2 border rounded text-sm">Cancel</button>
              <button onClick={() => { saveUserSelection(); }} className="px-3 py-2 bg-[#5954E6] text-white rounded text-sm">Save Selection</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

