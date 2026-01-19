"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { authFetch } from "@/shared/lib/api";

export default function CreateExercisePage() {
  // form state
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
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const [equipmentInput, setEquipmentInput] = useState<string>("");
  const [isVisibleToCoaches, setIsVisibleToCoaches] = useState<boolean>(true);
  const [addToDailyPlanner, setAddToDailyPlanner] = useState<boolean>(false);
  const [positionsSelected, setPositionsSelected] = useState<string[]>([]);

  // API / UI state
  const [apiToken, setApiToken] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const router = useRouter();

  // small toast system (local to this page)
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 4000);
  };

  // submit handler: sends URL-encoded form data to the API endpoint
  const submitExercise = async (status: "draft" | "published") => {
    setSubmitting(true);
    setMessage(null);
    setErrors({});
    try {
  const baseUrlRaw = (process.env.NEXT_PUBLIC_API_BASE_URL as string) || "";
  const baseUrl = (baseUrlRaw || "http://vitex.duckdns.org/api/v1").replace(/\/$/, "");

      const body = new URLSearchParams();
      body.append("title", title);
      body.append("description", description || "");
  if (videoPath) body.append("video_path", videoPath);
      if (videoUrl) body.append("video_url", videoUrl);
      if (thumbnail) body.append("thumbnail", thumbnail);
      // If the user didn't provide a duration, send a reasonable random duration (10-30)
      if (duration) {
        body.append("duration", String(parseInt(duration || "0", 10)));
      } else {
        const rand = Math.floor(Math.random() * 21) + 10; // 10..30
        body.append("duration", String(rand));
      }

      // equipment as array: allow comma-separated input
      const items = equipmentInput.split(",").map((s) => s.trim()).filter(Boolean);
      items.forEach((it) => body.append("equipment[]", it));

  // include selected positions
  positionsSelected.forEach((p) => body.append("positions[]", p));

      if (physicalIntensity) body.append("physical_intensity", physicalIntensity.toLowerCase());
      if (technicalDifficulty) body.append("technical_difficulty", technicalDifficulty.toLowerCase());

      body.append("is_visible_to_coaches", isVisibleToCoaches ? "1" : "0");
      body.append("add_to_daily_planner", addToDailyPlanner ? "1" : "0");
      body.append("status", status);

      // Use authFetch which attaches Authorization header when available
      let data: any = null;
      try {
        data = await authFetch(`${baseUrl}/exercises`, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
      } catch (err: any) {
        // authFetch throws for non-2xx with err.payload available
        const status = err?.status ?? 500;
        const payload = err?.payload ?? null;
        if (payload && payload.errors && typeof payload.errors === "object") {
          setErrors(payload.errors as Record<string, string[]>);
          const msgs = Object.values(payload.errors).flat().filter(Boolean) as string[];
          const combined = msgs.join(" \u2022 ");
          setMessage(payload.message || "Validation error");
          showToast("error", combined || payload.message || `Save failed (${status})`);
        } else {
          setMessage(payload?.message || `Save failed (${status})`);
          showToast("error", payload?.message || `Save failed (${status})`);
        }
        return;
      }

      // success
      setErrors({});
      setMessage("Exercise saved successfully.");
      showToast("success", "Exercise saved successfully.");
      try {
        router.push("/coach/exercises/list");
      } catch (e) {
        /* ignore */
      }
    } catch (err: any) {
      setMessage(`Network error: ${err?.message || String(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  // extract YouTube ID from common URL forms
  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    try {
      // handle plain id
      if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
      const u = new URL(url);
      const hostname = u.hostname.replace("www.", "");
      if (hostname === "youtu.be") {
        const id = u.pathname.slice(1);
        return id || null;
      }
      if (hostname.endsWith("youtube.com")) {
        // try v= param
        const v = u.searchParams.get("v");
        if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
        // embed path
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
    // fallback regex
    const m = url.match(/(?:v=|vi=|v%3D|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  };

  const handleVideoPathChange = (value: string) => {
    setVideoPath(value);
    const id = extractYouTubeId(value.trim());
    if (id) {
      setYoutubeId(id);
      // try maxres first, fallback handled by onError
      setThumbnail(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
      // try to enhance metadata (better thumbnail + duration)
      fetchYouTubeMeta(id, value.trim());
    } else {
      setYoutubeId(null);
      setThumbnail("");
    }
  };

  // fetch additional metadata for YouTube id: better thumbnail and duration
  const fetchYouTubeMeta = async (id: string, originalUrl?: string) => {
    // prefer oEmbed thumbnail if available
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
      // ignore oembed failures
    }

    // try to read duration from the video's watch page (best-effort, may fail due to CORS)
    try {
      const watchUrl = `https://www.youtube.com/watch?v=${id}`;
      const r2 = await fetch(watchUrl);
      if (r2.ok) {
        const text = await r2.text();
        // try to extract lengthSeconds or approxDurationMs
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
      // ignore duration fetch errors (CORS likely)
    }
  };

  // determine if path points to a direct video file
  const isDirectVideo = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  // total duration in seconds (fallback if not provided)
  const totalDuration = (() => {
    const d = parseInt(duration || "0", 10);
    return d > 0 ? d : 75; // fallback 75s
  })();

  // start simulated playback (used for YouTube links or when no direct video element)
  const startSimulatedPlayback = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setCurrentTime((t) => {
        const next = t + 0.25;
        if (next >= totalDuration) {
          // stop
          setIsPlaying(false);
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return totalDuration;
        }
        return next;
      });
    }, 250);
  };

  const stopSimulatedPlayback = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // handle play/pause toggle
  const togglePlay = async () => {
    // if direct video is available, control the element
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          // fallback to simulated
          setIsPlaying(true);
          startSimulatedPlayback();
        }
      }
      return;
    }

    // otherwise simulate (e.g., YouTube)
    if (isPlaying) {
      setIsPlaying(false);
      stopSimulatedPlayback();
    } else {
      setIsPlaying(true);
      startSimulatedPlayback();
    }
  };

  // if there is a direct video element, attach listeners
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    const onTime = () => setCurrentTime(vid.currentTime || 0);
    const onEnded = () => setIsPlaying(false);
    vid.addEventListener("timeupdate", onTime);
    vid.addEventListener("ended", onEnded);
    return () => {
      vid.removeEventListener("timeupdate", onTime);
      vid.removeEventListener("ended", onEnded);
    };
  }, [videoRef.current]);

  // cleanup simulated timer on unmount
  useEffect(() => {
    return () => {
      stopSimulatedPlayback();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-10 px-6 lg:px-12">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-8">
  {/* Left column: form (Basic Info + Media) */}
  <aside className="lg:col-span-5 space-y-6">
          <div>
            <nav className="text-xs text-slate-500">Exercises / <span className="text-slate-400">Create New</span></nav>
            <h1 className="mt-2 text-2xl font-semibold text-black">Create New Exercise</h1>
            <p className="mt-2 text-sm text-slate-600">Digitize your training drills with media and AI insights.</p>
          </div>

          <section className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold">Basic Information</h2>

            <div className="mt-4 space-y-3">
              <AppInput label="Exercise Title" placeholder="e.g. High Intensity Dribbling Drill" value={title} onChange={(e: any) => setTitle(e.target.value)} />
              {errors.title && (
                <div className="mt-1 text-xs text-rose-600">
                  {errors.title.map((m, i) => (
                    <div key={i}>{m}</div>
                  ))}
                </div>
              )}
              <AppInput label="Exercise Subtitle" placeholder="e.g. High Intensity Dribbling Drill" value={subtitle} onChange={(e: any) => setSubtitle(e.target.value)} />

              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm outline-none"
                >
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
                <label className="text-sm font-medium text-black">Position Relevance</label>
                <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-label="Position relevance">
                  {[
                    { key: "Forward", label: "Forward" },
                    { key: "Defense", label: "Defense" },
                    { key: "Goalkeeper", label: "Goalkeeper" },
                    { key: "Midfielder", label: "Midfielder" },
                  ].map((pos) => {
                    const selected = positionsSelected.includes(pos.key);
                    return (
                      <button
                        key={pos.key}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => {
                          // enforce single selection (radio behavior)
                          setPositionsSelected([pos.key]);
                        }}
                        className={`rounded-full px-3 py-1 text-xs transition-colors focus:outline-none ${
                          selected
                            ? "bg-[#5954E6] text-white border-transparent"
                            : "border border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {pos.label}
                      </button>
                    );
                  })}
                </div>
                  {errors.position && (
                    <div className="mt-1 text-xs text-rose-600">{errors.position.join(" ")}</div>
                  )}
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
              <div className="rounded-md border border-dashed border-slate-200 bg-[#FBFBFF] p-6 text-center">
                <div className="mx-auto max-w-[220px]">
                  <div className="h-12 w-12 mx-auto rounded-full bg-[#EEF2FF] flex items-center justify-center">🎬</div>
                  <p className="mt-3 text-sm text-slate-600">Upload Video</p>
                  <p className="mt-1 text-xs text-slate-400">Drag and drop or click to browse</p>
                </div>
              </div>

              <AppInput label="Video URL (Optional)" placeholder="https://youtube.com/watch?v=..." value={videoPath} onChange={(e: any) => handleVideoPathChange(e.target.value)} />
              {/* <AppInput label="Video Embed URL (Optional)" placeholder="Alternative video url" value={videoUrl} onChange={(e: any) => setVideoUrl(e.target.value)} /> */}
            </div>
          </section>

          {/* Equipment & Publishing sections moved below */}
        </aside>

        {/* Right column: video player + timeline */}
        <main className="lg:col-span-7">
          <div className="rounded-2xl bg-[#2B2B34] p-6 text-white h-full">
            <div className="relative rounded-md overflow-hidden bg-black">
              {thumbnail ? (
                // use plain img to avoid Next.js external image config; onError falls back to hqdefault
                <img
                  src={thumbnail}
                  alt="video thumbnail"
                  width={880}
                  height={420}
                  className="w-full h-auto object-cover"
                  onError={(e) => {
                    if (youtubeId) {
                      const el = e.currentTarget as HTMLImageElement;
                      // if maxres failed, try hqdefault
                      if (el.src.includes("maxresdefault")) {
                        el.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                      }
                    }
                  }}
                />
              ) : (
                <Image src="/images/exercise-video-placeholder.svg" alt="video" width={880} height={420} className="w-full h-auto object-cover" />
              )}

              {/* Play/pause control overlay */}
              <div className="absolute left-4 bottom-4 rounded-full bg-white/90 p-1">
                <button onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'} className="h-8 w-8 rounded-full bg-[#4541b3] flex items-center justify-center text-white">
                  {isPlaying ? '❚❚' : '▶'}
                </button>
              </div>

              {/* hidden direct video element for mp4/webm playback (if available) */}
              {isDirectVideo(videoPath) && (
                <video ref={videoRef} src={videoPath} className="hidden" preload="metadata" />
              )}
            </div>

            {/* timeline mock (visual preview similar to the attached screenshot) - expanded spacing */}
            <div className="mt-8">
              <div className="relative rounded-lg bg-[#0f1724] p-6">
                {/* clips row + waveform */}
                <div className="relative">
                  {/* clips track */}
                  <div className="flex items-center gap-4 px-4">
                      <div className="h-12 rounded-md bg-[#FACC15] flex items-center justify-center text-sm text-black" style={{flexBasis: '28%'}}>Clip 1</div>
                      <div className="h-12 rounded-md bg-[#93C5FD] flex items-center justify-center text-sm text-black" style={{flexBasis: '18%'}}>Clip 2</div>
                      <div className="h-12 rounded-md bg-[#93C5FD] flex items-center justify-center text-sm text-black" style={{flexBasis: '16%'}}>Clip 3</div>
                      <div className="h-12 rounded-md bg-[#93C5FD] flex items-center justify-center text-sm text-black" style={{flexBasis: '22%'}}>Clip 4</div>
                  </div>

                  {/* waveform bar under clips */}
                  <div className="mt-8 px-4">
                    <div className="h-14 rounded-md bg-[#4F46E5]/30 flex items-center overflow-hidden">
                      {/* simple waveform imitation using SVG lines */}
                      <svg className="w-full h-full" viewBox="0 0 400 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline fill="none" stroke="#C7D2FE" strokeWidth="2" points="0,28 20,14 40,35 60,12 80,28 100,10 120,34 140,20 160,40 180,18 200,28 220,12 240,36 260,20 280,34 300,12 320,40 340,18 360,28 380,10 400,28" />
                      </svg>
                    </div>
                  </div>

                  {/* vertical playhead and time bubble (positioned by currentTime) */}
                  <div className="absolute top-0 bottom-0 left-0 w-full pointer-events-none" aria-hidden>
                    <div
                      className="absolute top-0 h-full"
                      style={{ left: `${Math.min(100, (currentTime / Math.max(1, totalDuration)) * 100)}%`, transform: 'translateX(-50%)' }}
                    >
                      <div className="-mt-8 bg-yellow-400 text-black text-xs rounded-full px-2 py-1">{new Date(currentTime * 1000).toISOString().substr(14, 5)} / {new Date(totalDuration * 1000).toISOString().substr(14, 5)}</div>
                      <div className="absolute top-8 h-full border-l-2 border-yellow-400" />
                    </div>
                  </div>
                </div>

                {/* controls row (icons) */}
                <div className="mt-8 flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-5">
                    <button className="text-sm">✂</button>
                    <button className="text-sm">🗑️</button>
                    <button className="text-sm">🔥</button>
                    <button className="text-sm">�</button>
                    <button className="text-sm">🔲</button>
                  </div>
                  <div className="text-sm">Share • Delete • More</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Equipment (8 columns) */}
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
                          className={`rounded-full px-3 py-1 text-xs transition-colors focus:outline-none ${
                            selected
                              ? "bg-[#5954E6] text-white border-transparent"
                              : "border border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.physical_intensity && (
                    <div className="mt-1 text-xs text-rose-600">{errors.physical_intensity.join(" ")}</div>
                  )}
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
                          className={`rounded-full px-3 py-1 text-xs transition-colors focus:outline-none ${
                            selected
                              ? "bg-[#5954E6] text-white border-transparent"
                              : "border border-slate-200 bg-white text-slate-700"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.technical_difficulty && (
                    <div className="mt-1 text-xs text-rose-600">{errors.technical_difficulty.join(" ")}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publishing (4 columns) */}
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
              {message && <div className="mt-3 text-sm text-slate-700">{message}</div>}

              <div className="flex flex-col gap-3">
                <AppButton className="w-full" variant="default" disabled={submitting} onClick={() => submitExercise('published')}>{submitting ? 'Publishing...' : 'Publish Exercise'}</AppButton>
                <AppButton className="w-full" variant="light" disabled={submitting} onClick={() => submitExercise('draft')}>{submitting ? 'Saving...' : 'Save as Draft'}</AppButton>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-6 bottom-6 z-50 max-w-sm text-sm ${
            toast.type === "success" ? "bg-emerald-600" : "bg-rose-600"
          } text-white px-4 py-3 rounded shadow-lg`}
        >
          {toast.message}
        </div>
      )}

    </div>
  );
}
