"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { authHeaders, mapPhysicalIntensity, mapTechnicalDifficulty } from "@/shared/lib/api";

export default function EditExercisePage() {
  const params = useParams() as { exercise?: string };
  const exerciseId = params?.exercise;
  const router = useRouter();

  // form state (same fields as create)
  const [title, setTitle] = useState<string>("");
  const [subtitle, setSubtitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [physicalIntensity, setPhysicalIntensity] = useState<string | null>(null);
  const [technicalDifficulty, setTechnicalDifficulty] = useState<string | null>(null);
  const [videoPath, setVideoPath] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<string>("");
  const [youtubeId, setYoutubeId] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [equipmentInput, setEquipmentInput] = useState<string>("");
  const [positionsSelected, setPositionsSelected] = useState<string[]>([]);
  const [isVisibleToCoaches, setIsVisibleToCoaches] = useState<boolean>(true);
  const [addToDailyPlanner, setAddToDailyPlanner] = useState<boolean>(false);

  // UI state
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 4000);
  };

  // derive baseUrl
  const baseUrlRaw = (process.env.NEXT_PUBLIC_API_BASE_URL as string) || "";
  const baseUrl = (baseUrlRaw || "http://vitex.duckdns.org/api/v1").replace(/\/$/, "");

  // fetch data
  useEffect(() => {
    if (!exerciseId) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
    const headers = authHeaders();
    const res = await fetch(`${baseUrl}/exercises/${encodeURIComponent(exerciseId)}`, { headers });
        if (!mounted) return;
        if (!res.ok) {
          showToast("error", `Failed to load exercise (${res.status})`);
          setLoading(false);
          return;
        }
        const json = await res.json();
        // API returns { success, message, data: { ... } }
        const payload = json?.data ?? json;
        if (!payload) {
          showToast("error", "No exercise data returned from API.");
          setLoading(false);
          return;
        }

  // map API fields to form (use payload which is the nested data object)
  setTitle(payload.title || "");
        setSubtitle(payload.subtitle || "");
        setCategory(payload.category || "");
        setDescription(payload.description || "");
        setVideoPath(payload.video_path || "");
        setVideoUrl(payload.video_url || "");
        setThumbnail(payload.thumbnail || "");
        setDuration(payload.duration ? String(payload.duration) : "");
        // equipment may come back as an array — join into a comma-separated string for the input
        setEquipmentInput(Array.isArray(payload.equipment) ? (payload.equipment as string[]).join(",") : (payload.equipment || ""));
        // positions may be provided as `positions` (array) or `position_relevance` (single value)
        if (Array.isArray(payload.positions)) {
          setPositionsSelected(payload.positions as string[]);
        } else if (payload.position_relevance) {
          setPositionsSelected([String(payload.position_relevance)]);
        } else if (payload.positions) {
          setPositionsSelected([String(payload.positions)]);
        } else {
          setPositionsSelected([]);
        }
  // intensity / difficulty: normalize to UI keys
  setPhysicalIntensity(mapPhysicalIntensity(payload.physical_intensity ?? null));
  setTechnicalDifficulty(mapTechnicalDifficulty(payload.technical_difficulty ?? null));
        setIsVisibleToCoaches(Boolean(payload.is_visible_to_coaches));
        setAddToDailyPlanner(Boolean(payload.add_to_daily_planner));

        // attempt to extract youtube id like create page
        try {
          const id = extractYouTubeId(payload.video_path || payload.video_url || "");
          if (id) {
            setYoutubeId(id);
            // try to fetch thumbnail and duration (best-effort)
            fetchYouTubeMeta(id, payload.video_path || payload.video_url || "");
          }
        } catch (e) {
          /* ignore */
        }
      } catch (err: any) {
        showToast("error", `Network error: ${err?.message || String(err)}`);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [exerciseId]);

  // YouTube id extraction (same as create)
  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    try {
      if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
      const u = new URL(url);
      const hostname = u.hostname.replace("www.", "");
      if (hostname === "youtu.be") {
        const id = u.pathname.slice(1);
        return id || null;
      }
      if (hostname.endsWith("youtube.com")) {
        const v = u.searchParams.get("v");
        if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
        const parts = u.pathname.split("/").filter(Boolean);
        const embedIndex = parts.indexOf("embed");
        if (embedIndex >= 0 && parts[embedIndex + 1]) {
          const id = parts[embedIndex + 1];
          if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
        }
      }
    } catch (e) {
      // ignore
    }
    const m = url.match(/(?:v=|vi=|v%3D|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  };

  const isDirectVideo = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  // fetch additional metadata for YouTube id: better thumbnail and duration
  const fetchYouTubeMeta = async (id: string, originalUrl?: string) => {
    try {
      const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
        originalUrl || `https://www.youtube.com/watch?v=${id}`
      )}&format=json`;
      const r = await fetch(oembedUrl);
      if (r.ok) {
        const j = await r.json();
        if (j.thumbnail_url) {
          setThumbnail(j.thumbnail_url);
        }
      }
    } catch (e) {
      // ignore
    }

    try {
      const watchUrl = `https://www.youtube.com/watch?v=${id}`;
      const r2 = await fetch(watchUrl);
      if (r2.ok) {
        const text = await r2.text();
        let m = text.match(/"lengthSeconds"\s*:\s*"?(\d+)"?/);
        if (m && m[1]) {
          setDuration(String(Math.max(0, parseInt(m[1], 10))));
          return;
        }
        m = text.match(/"approxDurationMs"\s*:\s*"?(\d+)"?/);
        if (m && m[1]) {
          const secs = Math.round(parseInt(m[1], 10) / 1000);
          setDuration(String(Math.max(0, secs)));
          return;
        }
      }
    } catch (e) {
      // ignore
    }
  };

  // submit via PUT to update
  const submitUpdate = async () => {
    if (!exerciseId) return;
    setSubmitting(true);
    setErrors({});
    try {
      const body = new URLSearchParams();
      body.append("title", title);
      body.append("description", description || "");
      if (videoPath) body.append("video_path", videoPath);
      if (videoUrl) body.append("video_url", videoUrl);
      if (thumbnail) body.append("thumbnail", thumbnail);
      if (duration) body.append("duration", String(parseInt(duration || "0", 10)));

      const items = equipmentInput.split(",").map((s) => s.trim()).filter(Boolean);
      items.forEach((it) => body.append("equipment[]", it));

      positionsSelected.forEach((p) => body.append("positions[]", p));

      if (physicalIntensity) body.append("physical_intensity", physicalIntensity.toLowerCase());
      if (technicalDifficulty) body.append("technical_difficulty", technicalDifficulty.toLowerCase());

      body.append("is_visible_to_coaches", isVisibleToCoaches ? "1" : "0");
      body.append("add_to_daily_planner", addToDailyPlanner ? "1" : "0");

      const putHeaders = authHeaders("application/x-www-form-urlencoded");
      const res = await fetch(`${baseUrl}/exercises/${encodeURIComponent(exerciseId)}`, {
        method: "PUT",
        headers: putHeaders,
        body: body.toString(),
      });

      let data = null;
      try {
        data = await res.json();
      } catch (e) {
        // ignore
      }

      if (!res.ok) {
        if (data && data.errors && typeof data.errors === "object") {
          setErrors(data.errors as Record<string, string[]>);
          const msgs = Object.values(data.errors).flat().filter(Boolean) as string[];
          showToast("error", msgs.join(" \u2022 ") || data.message || `Update failed (${res.status})`);
        } else {
          showToast("error", data?.message || `Update failed (${res.status})`);
        }
        return;
      }

      showToast("success", "Exercise updated.");
      // navigate back to list
      try {
        router.push("/coach/exercises/list");
      } catch (e) {
        // ignore
      }
    } catch (err: any) {
      showToast("error", `Network error: ${err?.message || String(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!exerciseId) {
    return <div className="p-6">Missing exercise id in route.</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-10 px-6 lg:px-12">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-5 space-y-6">
          <div>
            <nav className="text-xs text-slate-500">Exercises / <span className="text-slate-400">Edit</span></nav>
            <h1 className="mt-2 text-2xl font-semibold text-black">Edit Exercise</h1>
            <p className="mt-2 text-sm text-slate-600">Update exercise details and media.</p>
          </div>

          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold">Basic Information</h2>

            <div className="mt-4 space-y-3">
              <AppInput label="Exercise Title" placeholder="e.g. High Intensity Dribbling Drill" value={title} onChange={(e: any) => setTitle(e.target.value)} />
              {errors.title && (
                <div className="mt-1 text-xs text-rose-600">{errors.title.join(" ")}</div>
              )}

              <AppInput label="Exercise Subtitle" placeholder="e.g. High Intensity Dribbling Drill" value={subtitle} onChange={(e: any) => setSubtitle(e.target.value)} />

              <div>
                <label className="text-sm font-medium">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm outline-none">
                  <option value="">Select category</option>
                  <option value="training">training</option>
                  <option value="diet">diet</option>
                  <option value="other">other</option>
                  <option value="warm-up">warm-up</option>
                  <option value="technical">technical</option>
                  <option value="tactical">tactical</option>
                  <option value="match-simulation">match-simulation</option>
                  <option value="recovery">recovery</option>
                  <option value="injury-prevention">injury-prevention</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-black">Description & Instructions</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2 w-full min-h-[88px] rounded-md border border-slate-200 bg-background px-3 py-2 text-sm outline-none placeholder:text-slate-400" placeholder="Describe how to perform this exercise step by step..." />
              </div>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold">Exercise Media</h2>
            <div className="mt-4 flex flex-col gap-3">
              <AppInput label="Video URL (Optional)" placeholder="https://youtube.com/watch?v=..." value={videoPath} onChange={(e: any) => setVideoPath(e.target.value)} />
              <AppInput label="Thumbnail URL (Optional)" placeholder="Thumbnail url" value={thumbnail} onChange={(e: any) => setThumbnail(e.target.value)} />
              <AppInput label="Duration (seconds)" placeholder="Duration in seconds" value={duration} onChange={(e: any) => setDuration(e.target.value)} />
            </div>
          </section>

        </aside>

        <main className="lg:col-span-7">
          <div className="rounded-2xl bg-[#2B2B34] p-6 text-white h-full">
            <div className="relative rounded-md overflow-hidden bg-black">
              {thumbnail ? (
                <img src={thumbnail} alt="video thumbnail" className="w-full h-auto object-cover" />
              ) : (
                <Image src="/images/exercise-video-placeholder.svg" alt="video" width={880} height={420} className="w-full h-auto object-cover" />
              )}

              <div className="absolute left-4 bottom-4 rounded-full bg-white/90 p-1">
                <button className="h-8 w-8 rounded-full bg-[#4541b3] flex items-center justify-center text-white">▶</button>
              </div>

              {isDirectVideo(videoPath) && (
                <video ref={videoRef} src={videoPath} className="hidden" preload="metadata" />
              )}
            </div>

            <div className="mt-8">
              <div className="relative rounded-lg bg-[#0f1724] p-6">
                <div className="relative">
                  <div className="flex items-center gap-4 px-4">
                    <div className="h-12 rounded-md bg-[#FACC15] flex items-center justify-center text-sm text-black" style={{ flexBasis: '28%' }}>Clip 1</div>
                    <div className="h-12 rounded-md bg-[#93C5FD] flex items-center justify-center text-sm text-black" style={{ flexBasis: '18%' }}>Clip 2</div>
                    <div className="h-12 rounded-md bg-[#93C5FD] flex items-center justify-center text-sm text-black" style={{ flexBasis: '16%' }}>Clip 3</div>
                    <div className="h-12 rounded-md bg-[#93C5FD] flex items-center justify-center text-sm text-black" style={{ flexBasis: '22%' }}>Clip 4</div>
                  </div>

                  <div className="mt-8 px-4">
                    <div className="h-14 rounded-md bg-[#4F46E5]/30 flex items-center overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 400 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline fill="none" stroke="#C7D2FE" strokeWidth="2" points="0,28 20,14 40,35 60,12 80,28 100,10 120,34 140,20 160,40 180,18 200,28 220,12 240,36 260,20 280,34 300,12 320,40 340,18 360,28 380,10 400,28" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-5">
                    <button className="text-sm">✂</button>
                    <button className="text-sm">🗑️</button>
                    <button className="text-sm">🔥</button>
                  </div>
                  <div className="text-sm">Share • Delete • More</div>
                </div>
              </div>
            </div>

          </div>
        </main>

        <section className="lg:col-span-8">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold">Equipment & Intensity</h2>
            <div className="mt-4 space-y-3">
              <AppInput label="Required Equipment" placeholder="Comma-separated, e.g. cones,balls" value={equipmentInput} onChange={(e: any) => setEquipmentInput(e.target.value)} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Physical Intensity</label>
                  <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Physical intensity">
                    {[
                      { key: "Low", label: "Low" },
                      { key: "Medium", label: "Medium" },
                      { key: "High", label: "High" },
                    ].map((opt) => {
                      const selected = physicalIntensity === opt.key;
                      return (
                        <button
                          key={opt.key}
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setPhysicalIntensity(opt.key)}
                          className={`rounded-full px-3 py-1 text-xs transition-colors focus:outline-none ${selected ? "bg-[#5954E6] text-white border-transparent" : "border border-slate-200 bg-white text-slate-700"}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Technical Difficulty</label>
                  <div className="mt-2 flex gap-2" role="radiogroup" aria-label="Technical difficulty">
                    {[
                      { key: "Easy", label: "Easy" },
                      { key: "Moderate", label: "Moderate" },
                      { key: "Difficult", label: "Difficult" },
                    ].map((opt) => {
                      const selected = technicalDifficulty === opt.key;
                      return (
                        <button
                          key={opt.key}
                          role="radio"
                          aria-checked={selected}
                          onClick={() => setTechnicalDifficulty(opt.key)}
                          className={`rounded-full px-3 py-1 text-xs transition-colors focus:outline-none ${selected ? "bg-[#5954E6] text-white border-transparent" : "border border-slate-200 bg-white text-slate-700"}`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold">Publishing</h2>
            <div className="mt-4 space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" checked={isVisibleToCoaches} onChange={(e) => setIsVisibleToCoaches(e.target.checked)} />
                <span>Visible to all coaches</span>
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="h-4 w-4" checked={addToDailyPlanner} onChange={(e) => setAddToDailyPlanner(e.target.checked)} />
                <span>Add to Daily Planner</span>
              </label>

              <div className="flex flex-col gap-3">
                <AppButton className="w-full" variant="default" disabled={submitting} onClick={submitUpdate}>{submitting ? 'Updating...' : 'Update Exercise'}</AppButton>
                <AppButton className="w-full" variant="light" disabled={submitting} onClick={() => router.push('/coach/exercises/list')}>Cancel</AppButton>
              </div>
            </div>
          </div>
        </section>
      </div>

      {toast && (
        <div className={`fixed right-6 bottom-6 z-50 max-w-sm text-sm ${toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"} text-white px-4 py-3 rounded shadow-lg`}>
          {toast.message}
        </div>
      )}
    </div>
  );
}
