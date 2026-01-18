import React from "react";
import Link from "next/link";
import { AppButton } from "@/shared/components/ui/button/AppButton";

type Props = {
  params?: { plan?: string } | Promise<{ plan?: string }>; // accept promise as well
};

export default function PlanEditPage({ params }: Props) {
  // params may be a Promise in some Next setups; safely resolve synchronously when possible
  // and fall back to '1' when not provided.
  // If params is a Promise it will be resolved by the server component layer; here we
  // defensively handle both shapes.
  const planId = (params && typeof (params as any).then !== "function") ? (params as any).plan ?? "1" : "1";

  const planName = "Matchday -2 (MD-2)";

  return (
    <div className="p-6">
      <div className="max-w-5xl mx-auto">
        <div className="rounded-lg border bg-white p-6 mb-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Edit — {planName}</h1>
              <div className="text-sm text-slate-500 mt-1">Editing plan ID: {planId}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-lg bg-slate-50 px-4 py-3 text-center">
                <div className="text-xs text-slate-500">Duration</div>
                <div className="text-lg font-semibold text-[#5954E6]">85 MIN</div>
              </div>
              <AppButton>Save Plan</AppButton>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {[{ color: 'bg-green-500', dot: 'bg-green-500', durationLabel: '15 min', durationLeft: 'left-[10%] w-[30%]' }, { color: 'bg-purple-500', dot: 'bg-purple-500', durationLabel: '30 min', durationLeft: 'left-[25%] w-[40%]' }, { color: 'bg-red-500', dot: 'bg-red-500', durationLabel: '30 min', durationLeft: 'left-[20%] w-[50%]' }].map((s, idx) => (
            <div key={idx} className="relative pl-12">
              {/* left vertical bar and colored marker */}
              <div className={`absolute left-4 top-4 bottom-4 w-1 rounded ${s.color}`} />
              <div className={`absolute left-2 top-6 w-3 h-3 rounded-full ${s.dot}`} />

              <div className="rounded border bg-white p-6 pl-8 ml-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium">10v8 Attack vs Defence</div>
                    <div className="text-xs text-slate-500">Breakdown of low block</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-full bg-[#EEF0FF] text-[#5954E6] text-sm">✏️</button>
                    <button className="p-1.5 rounded-full bg-[#F7EAEA] text-[#C62828] text-sm">🗑️</button>
                  </div>
                </div>

                {/* Duration + Intensity on one row */}
                <div className="mt-4">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="text-xs text-slate-400 mb-2">Duration</div>
                      <div className="flex items-center gap-4">
                        <div className="text-xs text-slate-400 w-12">10m</div>
                        <div className="flex-1">
                          <div className="w-full bg-slate-100 h-2 rounded relative">
                            <div className={`${s.durationLeft} absolute h-2 rounded ${s.color}`} />
                          </div>
                          <div className="flex justify-between text-xs text-slate-400 mt-1">
                            <div>10m</div>
                            <div className="text-slate-500">30 min</div>
                            <div>45m</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-48">
                      <div className="text-xs text-slate-400 mb-2">Intensity</div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 rounded-full text-xs bg-slate-50 border">Low</button>
                        <button className="px-3 py-1 rounded-full text-xs bg-slate-50 border">Med</button>
                        <button className="px-3 py-1 rounded-full text-xs bg-red-50 text-red-600 border">High</button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coaching points box */}
                <div className="mt-4">
                  <div className="text-xs text-slate-400">Coaching Points</div>
                  <div className="mt-2 bg-white border rounded p-3 text-sm text-slate-700">Speed of play in wide areas. Full backs overlapping runs.</div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Link href="/coach/exercises/lesson-plan/list">
              <AppButton variant="ghost">Back to Plans</AppButton>
            </Link>
          </div>
        </div>

        {/* Floating Save Plan button to match screenshot placement */}
        <div className="fixed right-8 bottom-8">
          <AppButton className="bg-[#5954E6] text-white px-6 py-3 rounded-full shadow-lg">Save Plan</AppButton>
        </div>
      </div>
    </div>
  );
}
