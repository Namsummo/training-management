"use client";

import React, { useState } from "react";
import { AppButton } from "@/shared/components/ui/button/AppButton";

const TABS = [
  "Overview",
  "Physicality",
  "Tactical Heatmaps",
  "Conditioning Trends",
  "Historical",
];

export default function PerformanceAnalyticsPage() {
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Advanced Performance Analytics</h1>
            <div className="text-sm text-slate-500 mt-1">Real-time player tracking and injury risk assessment | Last updated 2 mins ago</div>

            {/* tabs */}
            <nav className="mt-4">
              <div className="flex items-center gap-2 bg-white rounded-md px-1 py-1 shadow-sm">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={`text-sm px-3 py-2 rounded-md transition-colors ${
                      activeTab === t
                        ? "bg-[#5954E6] text-white font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <select className="border rounded px-3 py-2 text-sm bg-white">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
            <AppButton className="bg-[#5954E6] text-white">Export Report</AppButton>
          </div>
        </div>

        {/* stat cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="rounded-lg bg-white p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">🏃</div>
                <div>
                  <div className="text-xs text-slate-400">Avg. Distance</div>
                  <div className="text-lg font-semibold mt-1">10.2 km</div>
                </div>
              </div>
              <div className="text-xs text-green-600">+4.5%</div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">⚡</div>
                <div>
                  <div className="text-xs text-slate-400">High Intensity Sprints</div>
                  <div className="text-lg font-semibold mt-1">42</div>
                </div>
              </div>
              <div className="text-xs text-rose-600">-2.1%</div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">💪</div>
                <div>
                  <div className="text-xs text-slate-400">Team Readiness</div>
                  <div className="text-lg font-semibold mt-1">88%</div>
                </div>
              </div>
              <div className="text-xs text-green-600">+1.0%</div>
            </div>
          </div>

          <div className="rounded-lg bg-white p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">❤️</div>
                <div>
                  <div className="text-xs text-slate-400">Avg. Heart Rate</div>
                  <div className="text-lg font-semibold mt-1">162 bpm</div>
                </div>
              </div>
              <div className="text-xs text-green-600">+3.5%</div>
            </div>
          </div>
        </div>

        {/* main content */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8 space-y-6">
            {/* top row: radar + heatmap */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-7 rounded-lg bg-white p-6 border">
                <div className="text-sm font-medium">Physicality Benchmark</div>
                <div className="mt-4 flex items-center">
                  <div className="w-72 h-56">
                    {/* radar placeholder */}
                    <svg viewBox="0 0 200 160" className="w-full h-full">
                      <polygon points="100,10 160,60 140,130 60,130 40,60" fill="#eef2ff" stroke="#5954E6" strokeWidth="2" />
                    </svg>
                  </div>
                  <div className="ml-6 text-xs text-slate-500">
                    <div className="font-medium">Current Player vs Team Average</div>
                    <div className="mt-3">Speed, Power, Stamina, Skill, Flexibility</div>
                  </div>
                </div>
              </div>

              <div className="col-span-5 rounded-lg bg-white p-6 border">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Tactical Positioning</div>
                  <div className="text-xs text-slate-400">Heatmap</div>
                </div>
                <div className="mt-4 h-56 bg-slate-50 rounded flex items-center justify-center text-slate-400">Heatmap placeholder</div>
              </div>
            </div>

            {/* fitness trend */}
            <div className="rounded-lg bg-white p-6 border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-medium">Fitness Trend (Last 8 Matches)</div>
                  <div className="text-xs text-slate-400">Small increases in recent matches</div>
                </div>
                <div className="text-xs text-slate-400">Export</div>
              </div>

              <svg className="w-full h-36" viewBox="0 0 600 140" preserveAspectRatio="none">
                <polyline fill="none" stroke="#5954E6" strokeWidth="3" points="0,100 75,90 150,95 225,80 300,95 375,85 450,75 525,85 600,70" />
                <polyline fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" points="0,110 75,105 150,110 225,105 300,110 375,108 450,102 525,105 600,100" />
              </svg>
            </div>
          </div>

          <div className="col-span-4 space-y-6">
            <div className="rounded-lg bg-white p-4 border shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">AI Coach's Briefing</div>
                <div className="text-xs text-rose-600 font-semibold">Warning</div>
              </div>
              <div className="text-xs text-slate-500 mt-3">Marcus Johnson is showing a 15% increase in high-speed meters. <span className="font-medium text-rose-600">Hamstring risk detected.</span></div>
              <div className="mt-4">
                <AppButton>View All Insights</AppButton>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 border">
              <div className="text-sm font-medium">Targeted Player Performance</div>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div>
                      <div className="font-medium">Marcus Johnson</div>
                      <div className="text-xs text-slate-400">Forward • High Efficiency</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-green-600">A+</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div>
                      <div className="font-medium">David Smith</div>
                      <div className="text-xs text-slate-400">Midfielder • Risk Identified</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-rose-600">C</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100" />
                    <div>
                      <div className="font-medium">Lucas Mordi</div>
                      <div className="text-xs text-slate-400">Defender • Stable</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-slate-700">B+</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
