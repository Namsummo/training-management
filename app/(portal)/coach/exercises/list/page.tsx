"use client";

import React from "react";
import Link from "next/link";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";

const sampleExercises = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  title: [
    "Rondo 4v2 Pressing",
    "Box-to-Box Conditioning",
    "Tactical Shape 4-3-3",
    "Passing Triangle Drill",
    "Goalkeeper 1v1 Reflex",
    "Agility Ladder Circuit",
    "Counter Attack Drill",
    "Set Piece Defense A",
  ][i % 8],
  category: ["Technical", "Conditioning", "Tactical"][i % 3],
  duration: [15, 30, 45, 10, 20, 15, 25, 20][i % 8],
  difficulty: ["Easy", "Difficult"][i % 2],
  equipment: ["Bibs, Cones", "Footwork"][i % 2],
}));

export default function page() {
  return (
    <div className="min-h-screen bg-[#FAFBFF] py-10 px-6 lg:px-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold text-black">Exercise Library</h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage and organize your team's training drills.
            </p>
          </div>

          <div className="pt-1">
            {/* Link to create page */}
            <Link href="/coach/exercises/create">
              <AppButton size="sm" className="px-4" variant="default">
                + Tạo bài tập mới
              </AppButton>
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <AppInput
            label={undefined}
            placeholder="Search exercises by name, tag, or focus area..."
            fullWidth
            className="max-w-full"
          />
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Filters:</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm">
              Type: All
            </button>
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm">
              Intensity: Any
            </button>
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm">
              Equipment: Any
            </button>
            <button className="rounded-md border border-slate-200 bg-white px-3 py-1 text-sm">
              Contraindication: None
            </button>
          </div>

          <div className="ml-auto text-sm text-slate-500">Clear all</div>
        </div>

        {/* Grid of cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleExercises.map((ex) => (
            <article
              key={ex.id}
              className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden"
            >
              <div className="relative h-36 bg-slate-100">
                {/* image placeholder */}
                <div className="absolute right-3 top-3 rounded-md bg-slate-700 px-2 py-1 text-xs text-white">
                  {ex.duration} min
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-sm font-semibold text-slate-900">{ex.title}</h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-md bg-[#EDF2FF] px-2 py-1 text-xs text-[#4541b3]">
                    {ex.category}
                  </span>
                  <span className="rounded-md bg-[#FFF7ED] px-2 py-1 text-xs text-[#8a5a2b]">
                    {ex.equipment}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-80">
                        <circle cx="12" cy="12" r="10" stroke="#CBD5E1" strokeWidth="1.5" />
                      </svg>
                      <span>{ex.difficulty}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-80">
                        <rect x="3" y="6" width="18" height="12" rx="2" stroke="#CBD5E1" strokeWidth="1.5" />
                      </svg>
                      <span>{ex.equipment.split(",")[0]}</span>
                    </div>
                  </div>

                  <Link href="#" className="text-[#4541b3] text-sm font-medium">
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <button className="text-sm text-[#6B7280]">Load more exercises ▾</button>
        </div>
      </div>
    </div>
  );
}
