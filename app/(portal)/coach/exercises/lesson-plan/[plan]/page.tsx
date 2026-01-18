"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { AppButton } from "@/shared/components/ui/button/AppButton";

type Props = {
  params: { plan: string };
};

export default function PlanDetailPage({ params }: Props) {
  // Static mock content for the detail view
  const planName = "Matchday -2 (MD-2)";
  const created = "Tuesday, Oct 24 • Microcycle 12 • Focus: Transition & Finishing";
  const router = useRouter();

  return (
    <div className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9">
          <div className="rounded-lg border bg-white p-6 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-semibold">{planName}</h1>
                <div className="text-sm text-slate-500 mt-1">{created}</div>
              </div>

              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-slate-50 px-4 py-3 text-center">
                  <div className="text-xs text-slate-500">Duration</div>
                  <div className="text-lg font-semibold text-[#5954E6]">45 MIN</div>
                </div>
                <AppButton onClick={() => router.push(`/coach/exercises/lesson-plan/${params.plan}/edit`)}>✏️ Edit Plan</AppButton>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Section 1 */}
            <div className="rounded border bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">RAMP Warm-up</div>
                  <div className="text-xs text-slate-500">Dynamic stretching & activation</div>
                </div>
                <div className="text-sm text-slate-500">10:00 AM Start</div>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                <div className="flex gap-6">
                  <div>
                    <div className="text-xs text-slate-400">Duration</div>
                    <div className="font-medium">15 min</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">Intensity</div>
                    <div className="mt-1 text-green-600">Low (RPE 3)</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-slate-400">Notes</div>
                  <div className="mt-1 text-slate-600">Focus on glute activation.</div>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="rounded border bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">Possession Game 6v6+2</div>
                  <div className="text-xs text-slate-500">Quick transition focus</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-2 py-1 rounded bg-yellow-50 text-yellow-700 text-xs">High Load</div>
                </div>
              </div>

              <div className="mt-4 text-sm text-slate-600">
                <div className="flex gap-6">
                  <div>
                    <div className="text-xs text-slate-400">Duration</div>
                    <div className="font-medium">25 min</div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400">Intensity</div>
                    <div className="mt-1 text-amber-600">Moderate (RPE 6)</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs text-slate-400">Dimensions</div>
                  <div className="mt-1 text-slate-600">40×30m Grid</div>
                </div>
              </div>
            </div>

            {/* Section 3 with timeline-like intensity */}
            <div className="rounded border bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium">10v8 Attack vs Defence</div>
                  <div className="text-xs text-slate-500">Breakdown of low block</div>
                </div>
                <div className="text-sm text-slate-500">—</div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-slate-400 mb-2">Duration</div>
                <div className="w-full bg-slate-100 h-3 rounded relative">
                  <div className="absolute left-[20%] w-[40%] h-3 rounded bg-[#c7d2fe]" />
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <div className="text-xs text-slate-400">Intensity</div>
                  <div className="flex gap-2 items-center">
                    <div className="px-2 py-1 rounded text-xs bg-slate-50">Low</div>
                    <div className="px-2 py-1 rounded text-xs bg-slate-50">Med</div>
                    <div className="px-2 py-1 rounded text-xs bg-red-50 text-red-600">High</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <aside className="space-y-4">
            <div className="rounded-lg border bg-white p-4">
              <div className="text-sm font-medium">Squad Status</div>
              <div className="text-xs text-slate-400 mt-1">24 Available</div>
            </div>

            <div className="rounded border bg-red-50 p-4">
              <div className="text-sm font-semibold text-red-700">High Injury Risk</div>
              <div className="text-xs text-red-600 mt-2">Me:Rapidly increasing strain risk due to accumulated sprint distance in MD-3.</div>
              <div className="mt-3 bg-white p-3 rounded border">
                <div className="text-xs text-slate-600">AI Recommendation</div>
                <div className="text-sm font-medium mt-1">Reduce sprinting in 10v8 Attack drill.</div>
                <div className="mt-3">
                  <AppButton>Apply Modification</AppButton>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
