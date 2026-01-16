"use client";

import React from "react";
import { AppButton } from "@/shared/components/ui/button/AppButton";

export default function InjuryRisksPage() {
  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">AI Injury Risk Report</h1>
            <div className="text-sm text-slate-500 mt-1">Live · Last updated 5 minutes ago based on wearable data</div>
          </div>

          <div className="flex items-center gap-3">
            <select className="border rounded px-3 py-2 text-sm bg-white">
              <option>Past 30 Days</option>
              <option>Past 7 Days</option>
            </select>
            <AppButton className="bg-[#5954E6] text-white">Export Report</AppButton>
          </div>
        </div>

        {/* top cards */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 rounded-lg bg-white p-6 border shadow-sm">
            <div className="text-sm text-slate-500">Squad Health Readiness</div>
            <div className="flex items-center gap-6 mt-4">
              <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center text-2xl font-bold">88%</div>
              <div className="text-sm text-slate-600">
                <div className="font-medium">Optimal performance zone for upcoming match</div>
                <div className="text-xs text-green-600 mt-2">+2.4%</div>
              </div>
            </div>
          </div>

          <div className="col-span-4 rounded-lg bg-white p-6 border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Risk Levels Distribution</div>
              <div className="text-xs text-slate-400">Breakdown</div>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs text-rose-600">
                  <div>High Risk (2)</div>
                  <div>8%</div>
                </div>
                <div className="w-full bg-slate-100 rounded h-2 mt-1">
                  <div className="h-2 bg-rose-200 rounded" style={{ width: '8%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-amber-600">
                  <div>Moderate Risk (6)</div>
                  <div>25%</div>
                </div>
                <div className="w-full bg-slate-100 rounded h-2 mt-1">
                  <div className="h-2 bg-amber-200 rounded" style={{ width: '25%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-emerald-600">
                  <div>Low Risk (16)</div>
                  <div>67%</div>
                </div>
                <div className="w-full bg-slate-100 rounded h-2 mt-1">
                  <div className="h-2 bg-emerald-200 rounded" style={{ width: '67%' }} />
                </div>
              </div>

              <div className="mt-3 bg-indigo-50 border rounded p-3 text-sm text-indigo-700">
                <strong>AI Insight:</strong> High hamstring load detected in defensive unit. Recommend rotation for tomorrow's drill.
              </div>
            </div>
          </div>

          <div className="col-span-4 rounded-lg bg-white p-6 border shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Frequency vs. Load</div>
              <div className="text-xs text-slate-400">Trend</div>
            </div>

            <div className="mt-4 h-40">
              <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                <polyline fill="none" stroke="#5954E6" strokeWidth="3" points="0,120 80,100 160,110 240,80 320,95 400,70" />
                <polyline fill="none" stroke="#F59E0B" strokeWidth="2" points="0,110 80,115 160,100 240,95 320,105 400,90" />
              </svg>
            </div>
            <div className="text-xs text-slate-400 mt-3">Coach Note: Squad workload has increased by 15% over the last 3 days. Monitor recovery.</div>
          </div>
        </div>

        {/* High risk athletes table */}
        <div className="rounded-lg bg-white p-6 border">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm font-medium">High Risk Athletes</div>
            <div className="text-sm text-indigo-600">View All Squad</div>
          </div>

          <div className="space-y-3">
            {/* row */}
            <div className="flex items-center justify-between p-3 rounded border bg-white">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100" />
                <div>
                  <div className="font-medium">Marcus V.</div>
                  <div className="text-xs text-slate-400">Forward • Jersey #10</div>
                </div>
              </div>

              <div className="flex-1 px-6">
                <div className="text-xs text-slate-500">Key Risk Factor</div>
                <div className="text-sm text-rose-600">Over-training</div>
              </div>

              <div className="w-40">
                <div className="text-xs text-slate-500">Fatigue Index</div>
                <div className="w-full bg-slate-100 rounded h-3 mt-1">
                  <div className="h-3 bg-rose-500 rounded" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="w-36 text-right">
                <AppButton className="bg-rose-100 text-rose-700">Suggest Rest</AppButton>
              </div>
            </div>

            {/* second row */}
            <div className="flex items-center justify-between p-3 rounded border bg-white">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100" />
                <div>
                  <div className="font-medium">David K.</div>
                  <div className="text-xs text-slate-400">Defender • Jersey #4</div>
                </div>
              </div>

              <div className="flex-1 px-6">
                <div className="text-xs text-slate-500">Key Risk Factor</div>
                <div className="text-sm text-amber-600">Muscle Strain</div>
              </div>

              <div className="w-40">
                <div className="text-xs text-slate-500">Fatigue Index</div>
                <div className="w-full bg-slate-100 rounded h-3 mt-1">
                  <div className="h-3 bg-amber-400 rounded" style={{ width: '78%' }} />
                </div>
              </div>

              <div className="w-36 text-right">
                <AppButton className="bg-indigo-50 text-indigo-700">Lower Intensity</AppButton>
              </div>
            </div>
          </div>
        </div>

        {/* bottom row with recovery and quick actions + alerts */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-4">
            <div className="rounded-lg bg-white p-6 border">
              <div className="text-sm font-medium">Recovery Efficiency</div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <div className="text-3xl font-bold">94%</div>
                  <div className="text-xs text-slate-500 mt-2">Team sleep quality and heart rate variability (HRV) are trending positively.</div>
                </div>
                <div>
                  <AppButton className="bg-indigo-600 text-white">Plan Training Session</AppButton>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 border flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Quick Actions</div>
                <div className="text-xs text-slate-500">Fast tools for incident response</div>
              </div>
              <div className="flex gap-3">
                <AppButton className="bg-slate-50">Medical Incident Report</AppButton>
                <AppButton className="bg-slate-50">Position Load Analysis</AppButton>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="rounded-lg bg-white p-4 border space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">AI Alerts</div>
                <div className="text-xs text-slate-400">Real-time risk notifications</div>
              </div>

              <div className="rounded border-l-4 border-rose-200 bg-rose-50 p-3">
                <div className="text-sm font-semibold text-rose-700">CRITICAL RISK DETECTED</div>
                <div className="text-xs text-slate-600 mt-1">Player Marcus V. reached 92% injury risk threshold.</div>
                <div className="text-xs text-slate-400 mt-2">2 minutes ago</div>
              </div>

              <div className="rounded border-l-4 border-amber-200 bg-amber-50 p-3">
                <div className="text-sm font-semibold text-amber-700">MODERATE RISK ALERT</div>
                <div className="text-xs text-slate-600 mt-1">Player David K. showing high metabolic stress trends.</div>
                <div className="text-xs text-slate-400 mt-2">1 hour ago</div>
              </div>

              <div className="rounded border-l-4 border-emerald-200 bg-emerald-50 p-3">
                <div className="text-sm font-semibold text-emerald-700">SESSION COMPLETE</div>
                <div className="text-xs text-slate-600 mt-1">Morning recovery metrics processed for 18 athletes.</div>
                <div className="text-xs text-slate-400 mt-2">3 hours ago</div>
              </div>

              <div className="text-center text-xs text-indigo-600 mt-2">Mark all as read</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
