"use client";

import React from "react";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function CoachDashboardPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-800">
              Coach Dashboard
            </h1>
            <div className="relative">
              <input
                placeholder="Search players, drills..."
                className="w-96 h-9 rounded-lg px-3 text-sm bg-white border border-slate-100 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button className="p-2 rounded-md bg-white shadow-sm">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="text-slate-400"
              >
                <path
                  d="M12 22s8-4 8-10V9"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 9v2c0 6 6 11 6 11"
                  stroke="#94A3B8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
            <AppButton className="bg-[#5954E6] text-white">
              + New Session
            </AppButton>
          </div>
        </div>

        {/* Top content: match card + right panels */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="rounded-lg bg-white p-4 grid grid-cols-12 gap-4 items-center shadow-sm">
              <div className="col-span-4">
                <div className="rounded overflow-hidden h-40">
                  <Image
                    src="/images/sample-match.jpg"
                    alt="match"
                    width={420}
                    height={240}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="col-span-6">
                <div className="text-sm text-indigo-600 font-semibold">
                  vs. Titans FC
                </div>
                <div className="text-xs text-slate-500">
                  Saturday, 3:00 PM • Memorial Stadium
                </div>

                <div className="mt-4 flex items-center gap-3">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="text-center bg-slate-50 rounded p-2">
                      <div className="text-xs text-slate-400">Countdown</div>
                      <div className="text-sm font-semibold">02</div>
                      <div className="text-xs text-slate-400">Days</div>
                    </div>
                    <div className="text-center bg-slate-50 rounded p-2">
                      <div className="text-xs text-slate-400">14</div>
                      <div className="text-xs text-slate-400">Hrs</div>
                    </div>
                    <div className="text-center bg-slate-50 rounded p-2">
                      <div className="text-xs text-slate-400">45</div>
                      <div className="text-xs text-slate-400">Min</div>
                    </div>
                    <div className="text-center bg-slate-50 rounded p-2">
                      <div className="text-xs text-slate-400">12</div>
                      <div className="text-xs text-slate-400">Sec</div>
                    </div>
                  </div>
                  <div className="flex-1" />
                </div>

                <div className="mt-4">
                  <AppButton className="bg-[#5954E6] text-white">
                    View Game Plan
                  </AppButton>
                </div>
              </div>

              <div className="col-span-2 flex items-center justify-end">
                <button className="p-2 rounded bg-white shadow-sm">
                  Share
                </button>
              </div>
            </div>

            {/* Weekly schedule */}
            <div className="mt-6 rounded-lg bg-white p-6 border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">
                  Weekly Training Schedule
                </h3>
                <div className="flex items-center gap-2">
                  <button className="p-1 rounded border">◀</button>
                  <button className="p-1 rounded border">▶</button>
                </div>
              </div>

              <div className="flex items-start gap-3 overflow-x-auto">
                {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(
                  (d, i) => (
                    <div
                      key={d}
                      className={`min-w-[120px] p-3 rounded ${
                        i === 2 ? "bg-indigo-50" : "bg-white"
                      } border`}
                    >
                      <div className="text-xs text-slate-400">
                        {d} Oct {21 + i}
                      </div>
                      <div className="mt-2 text-sm font-semibold">
                        {i === 2 ? "TODAY" : i === 5 ? "MATCH" : ""}
                      </div>
                      <div className="mt-3 text-xs text-slate-500">
                        09:00 AM
                        <br />
                        Warmup Drills
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Team readiness overview */}
            <div className="mt-6 rounded-lg bg-white p-4 border shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium">Team Readiness Overview</h4>
                <div className="text-sm text-indigo-600">Full Roster</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100" />
                    <div>
                      <div className="font-medium">Marcus Rashford</div>
                      <div className="text-xs text-slate-400">Left Wing</div>
                    </div>
                  </div>

                  <div className="flex-1 px-6">
                    <div className="w-full bg-slate-100 rounded h-3">
                      <div
                        className="h-3 bg-indigo-400 rounded"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </div>

                  <div className="w-24 text-right">
                    <span className="text-xs text-emerald-600">Optimal</span>
                  </div>
                  <div className="w-8">⋮</div>
                </div>

                <div className="flex items-center justify-between p-3 rounded border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100" />
                    <div>
                      <div className="font-medium">Kevin De Bruyne</div>
                      <div className="text-xs text-slate-400">Midfield</div>
                    </div>
                  </div>

                  <div className="flex-1 px-6">
                    <div className="w-full bg-slate-100 rounded h-3">
                      <div
                        className="h-3 bg-amber-400 rounded"
                        style={{ width: "38%" }}
                      />
                    </div>
                  </div>

                  <div className="w-24 text-right">
                    <span className="text-xs text-orange-500">Fatigued</span>
                  </div>
                  <div className="w-8">⋮</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-4 space-y-6">
            <div className="rounded-lg bg-white p-4 border shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Injury Report</div>
                <div className="text-xs text-rose-500">3 Active</div>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Smith (Knee), Diaz (Hamstring), Chen (Ankle)
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 border">
              <div className="text-sm font-medium">Performance Report</div>
              <div className="text-xs text-slate-400 mt-2">
                Team morale is high after last win
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 border">
              <div className="text-sm font-medium">AI Insights</div>
              <div className="mt-3 text-xs text-slate-500">Fatigue Alert</div>
              <div className="mt-2 text-sm">
                De Bruyne shows a{" "}
                <strong className="text-indigo-600">42% increase</strong> in
                injury markers. Recommendation: Reduce session load by 30%
                today.
              </div>
              <div className="mt-3">
                <AppButton className="bg-indigo-50 text-indigo-700">
                  Apply Selection
                </AppButton>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 border">
              <div className="text-sm font-medium">Opponent Analysis</div>
              <div className="text-xs text-slate-400 mt-2">
                Titans FC typically attack through
              </div>
              <div className="mt-4 text-lg font-semibold text-indigo-600">
                Left Flank (64%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
