"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { AppButton } from "@/shared/components/ui/button/AppButton";

export default function CreateLessonPlanPage() {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Create New Training Plan</h1>
          <p className="text-sm text-slate-500 mt-1">Define the foundational framework for your athlete's upcoming performance phase.</p>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Plan Name</label>
              <AppInput placeholder="e.g., Pre-Season Endurance Phase 1" />
            </div>

            <div className="flex gap-4 mb-4 items-start">
              <div className="flex-1 flex gap-4">
                <AppInput placeholder="Start Date" />
                <AppInput placeholder="End Date" />
              </div>

              <div className="min-w-[220px]">
                <label className="block text-sm font-medium mb-2">Target Outcome</label>
                <div className="flex gap-2 flex-wrap">
                  {['Conditioning','Technical','Rehab','Strength'].map((t) => (
                    <button key={t} className="px-3 py-1 border rounded-full text-sm">{t}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description & Notes</label>
              <textarea rows={6} placeholder="Outline specific goals, intensity levels, or athlete constraints for this phase..." className="w-full rounded border p-3 text-sm bg-slate-50" />
            </div>
            
            
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            {/* Header card */}
            <div className="rounded-lg border bg-white p-6 mb-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">New Season Prep - Week 1</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded">U-18 Elite</span>
                    <span className="text-xs px-2 py-1 bg-slate-100 rounded">Pre-Season</span>
                    <span className="text-sm text-slate-400">Created by Coach Marcus • Oct 12, 2023</span>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="px-2 py-1 rounded-full bg-slate-50 text-xs">⚡ High Intensity</span>
                    <span className="px-2 py-1 rounded-full bg-slate-50 text-xs">Difficult</span>
                    <button className="px-3 py-1 border rounded-full text-xs">+ Add Tag</button>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="rounded-lg bg-slate-50 px-4 py-3 text-center">
                    <div className="text-xs text-slate-500">Duration</div>
                    <div className="text-lg font-semibold text-[#5954E6]">45 MIN</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-7">
                {/* Sections */}
                <div className="space-y-6">
                  <section className="rounded border p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">Warm-up</div>
                        <div className="text-xs text-slate-400">10 MIN</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded bg-slate-50 p-3 text-sm">Dynamic Stretching Routine<div className="text-xs text-slate-400 mt-1">1 set • 8 mins</div></div>
                      <div className="rounded bg-slate-50 p-3 text-sm">Dynamic Stretching Routine<div className="text-xs text-slate-400 mt-1">1 set • 8 mins</div></div>
                    </div>

                    <div className="mt-3">
                      <button className="px-3 py-2 border rounded text-sm text-[#5954E6]">+ Add Exercise</button>
                    </div>
                  </section>

                  <section className="rounded border p-4 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium">Technical / Power</div>
                        <div className="text-xs text-slate-400">25 MIN</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="rounded bg-slate-50 p-3 text-sm">Barbell Clean & Jerk<div className="text-xs text-slate-400 mt-1">5 sets • 3 reps • 85% 1RM</div></div>
                      <div className="rounded bg-slate-50 p-3 text-sm">Barbell Clean & Jerk<div className="text-xs text-slate-400 mt-1">5 sets • 3 reps • 85% 1RM</div></div>
                    </div>

                    <div className="mt-3">
                      <button className="px-3 py-2 border rounded text-sm text-[#5954E6]">+ Add Exercise</button>
                    </div>
                  </section>

                  <div className="flex justify-center">
                    <button className="px-4 py-2 rounded-full border text-sm text-[#5954E6]">+ Add Section</button>
                  </div>
                </div>
              </div>

              <div className="col-span-5">
                <aside className="rounded border p-4 bg-white">
                  <AppInput placeholder="Search drills..." />
                  <div className="flex gap-2 mt-3">
                    {['All','Warm-up','Technical'].map((f) => (
                      <button key={f} className={`px-3 py-1 text-sm rounded-full ${f === 'All' ? 'bg-[#f1f5ff]' : 'border'}`}>{f}</button>
                    ))}
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      {title: '5v2 Rondo Transition', badge: 'Low Int', time: '15m'},
                      {title: 'Box Entry & Finish', badge: 'High Int', time: '25m'},
                      {title: 'Possession Game 8v8', badge: 'Med Int', time: '20m'},
                      {title: '11v11 Shadow Play', badge: 'Tac Focus', time: '30m'},
                    ].map((d) => (
                      <div key={d.title} className="flex items-center justify-between p-3 rounded bg-slate-50">
                        <div>
                          <div className="text-sm font-medium">{d.title}</div>
                          <div className="text-xs text-slate-400">{d.time}</div>
                        </div>
                        <div className="text-xs px-2 py-1 rounded" style={{background: '#eef2ff', color: '#5b21b6'}}>{d.badge}</div>
                      </div>
                    ))}
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
                  <div className="text-sm text-slate-500">Edit Selection</div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-200" />
                  <div className="h-8 w-8 rounded-full bg-slate-200" />
                  <div className="h-8 w-8 rounded-full bg-slate-200" />
                  <div className="text-xs rounded-full bg-[#eef2ff] text-[#5b21b6] px-2 py-1">+12</div>
                  <div className="text-sm">Men's Varsity Football Squad (15 Total)</div>
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
                <AppButton>Start Training</AppButton>
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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
    </div>
  );
}
