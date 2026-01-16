"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";

export default function CreateDrillPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [youtubeId, setYoutubeId] = useState<string | null>(null);

  // Load management state
  const [sets, setSets] = useState<number>(3);
  const [repsOrDuration, setRepsOrDuration] = useState<number>(3);
  const [restPeriod, setRestPeriod] = useState<string>("90s");
  const [playerCount, setPlayerCount] = useState<string>("10");

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const timerRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    try {
      if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url;
      const u = new URL(url);
      const hostname = u.hostname.replace("www.", "");
      if (hostname === "youtu.be") {
        return u.pathname.slice(1) || null;
      }
      if (hostname.endsWith("youtube.com")) {
        const v = u.searchParams.get("v");
        if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      }
    } catch (e) {
      return null;
    }
    const m = url.match(/(?:v=|vi=|v%3D|embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  };

  const handleVideoUrlChange = (v: string) => {
    setVideoUrl(v);
    const id = extractYouTubeId(v);
    if (id) {
      setYoutubeId(id);
      setThumbnail(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
    } else {
      setYoutubeId(null);
      setThumbnail("");
    }
  };

  // helper to detect direct video file URLs
  const isDirectVideo = (url: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);

  const startSimulated = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => setCurrentTime((t) => t + 0.25), 250) as unknown as number;
  };
  const stopSimulated = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const togglePlay = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (e) {
          setIsPlaying(true);
          startSimulated();
        }
      }
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      stopSimulated();
    } else {
      setIsPlaying(true);
      startSimulated();
    }
  };

  useEffect(() => {
    return () => stopSimulated();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFBFF] py-10 px-6 lg:px-12">
      <div className="mx-auto max-w-[1200px] grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 space-y-6">
          <div className="rounded-lg border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Drill Basics</h2>
            <p className="text-sm text-slate-500 mt-2">Define the core objectives and setup.</p>

            <div className="mt-4 space-y-3">
              <AppInput label="Drill Name" placeholder="e.g., 4v4 High Press Transition" value={name} onChange={(e: any) => setName(e.target.value)} />

              <div>
                <label className="text-sm font-medium">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 w-full rounded-md border border-slate-200 bg-background px-3 py-2 text-sm outline-none">
                  <option value="">Select category</option>
                  <option value="training">training</option>
                  <option value="warm-up">warm-up</option>
                  <option value="technical">technical</option>
                  <option value="tactical">tactical</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Step-by-step Instructions</label>
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} className="mt-2 w-full min-h-[120px] rounded-md border border-slate-200 bg-background px-3 py-2 text-sm outline-none" placeholder="1. Set up a 20x20m grid..." />
              </div>

              <div>
                <label className="text-sm font-medium">Reference Video</label>
                <div className="mt-2 flex gap-2">
                  <AppInput placeholder="https://youtube.com/..." value={videoUrl} onChange={(e: any) => handleVideoUrlChange(e.target.value)} />
                  <AppButton variant="ghost" onClick={() => { /* test */ }}>Test</AppButton>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md border-t pt-4">
              <h3 className="text-sm font-semibold">Load Management</h3>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="text-xs text-slate-500">Sets</label>
                  <div className="mt-1 flex items-center gap-2">
                    <button onClick={() => setSets((s) => Math.max(0, s - 1))} className="px-2 py-1 border rounded">-</button>
                    <div className="px-3 py-1 border rounded">{sets}</div>
                    <button onClick={() => setSets((s) => s + 1)} className="px-2 py-1 border rounded">+</button>
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Reps / Duration</label>
                  <div className="mt-1 flex items-center gap-2">
                    <button onClick={() => setRepsOrDuration((r) => Math.max(0, r - 1))} className="px-2 py-1 border rounded">-</button>
                    <div className="px-3 py-1 border rounded">{repsOrDuration}</div>
                    <button onClick={() => setRepsOrDuration((r) => r + 1)} className="px-2 py-1 border rounded">+</button>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-500">Rest Period</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input value={restPeriod} onChange={(e) => setRestPeriod(e.target.value)} className="w-full rounded-md border px-3 py-1 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-500">Player Count</label>
                  <div className="mt-1 flex items-center gap-2">
                    <input value={playerCount} onChange={(e) => setPlayerCount(e.target.value)} className="w-full rounded-md border px-3 py-1 text-sm" />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="text-xs text-slate-500">Intensity Level</label>
                <div className="mt-2 flex gap-2">
                  <button className="px-3 py-1 rounded-full border">Low</button>
                  <button className="px-3 py-1 rounded-full border">Medium</button>
                  <button className="px-3 py-1 rounded-full border bg-[#5954E6] text-white">High</button>
                </div>
              </div>
            </div>

          </div>
        </aside>

        <main className="lg:col-span-8">
          <div className="rounded-2xl bg-[#2B2B34] p-6 text-white h-full">
            <div className="relative rounded-md overflow-hidden bg-black">
              {thumbnail ? (
                <img src={thumbnail} alt="thumbnail" className="w-full h-auto object-cover" />
              ) : (
                <Image src="/images/exercise-video-placeholder.svg" alt="video" width={880} height={420} className="w-full h-auto object-cover" />
              )}

              <div className="absolute left-4 bottom-4 rounded-full bg-white/90 p-1">
                <button onClick={togglePlay} className="h-8 w-8 rounded-full bg-[#4541b3] flex items-center justify-center text-white">{isPlaying ? '❚❚' : '▶'}</button>
              </div>

              {isDirectVideo(videoUrl) && (
                <video ref={videoRef} src={videoUrl} className="hidden" preload="metadata" />
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

                  <div className="absolute top-0 bottom-0 left-0 w-full pointer-events-none">
                    <div className="absolute top-0 h-full" style={{ left: `${Math.min(100, (currentTime / 60) * 100)}%`, transform: 'translateX(-50%)' }}>
                      <div className="-mt-8 bg-yellow-400 text-black text-xs rounded-full px-2 py-1">{new Date(currentTime * 1000).toISOString().substr(14, 5)} / 01:00</div>
                      <div className="absolute top-8 h-full border-l-2 border-yellow-400" />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between text-slate-300">
                  <div className="flex items-center gap-5">
                    <button className="text-sm">✂</button>
                    <button className="text-sm">🗑️</button>
                    <button className="text-sm">🔥</button>
                    <button className="text-sm">🔲</button>
                  </div>
                  <div className="text-sm">Share • Delete • More</div>
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
