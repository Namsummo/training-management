"use client";

import React from "react";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  ClipboardPlusIcon,
  EllipsisVerticalIcon,
  Share2Icon,
  TrendingUp,
} from "lucide-react";

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
              <AppInput
                placeholder="Search players, drills..."
                className="h-9 rounded-lg px-3 text-sm bg-gray-200 border border-slate-100 shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AppButton
              className="p-2 rounded-md bg-gray-200 shadow-sm w-[50px]"
              variant="outline"
            >
              <Bell size={16} />
            </AppButton>
            <AppButton className="bg-[#5954E6] text-white">
              + New Session
            </AppButton>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="rounded-2xl bg-white p-5 shadow-sm flex gap-5 items-center">
              {/* Image */}
              <div className="rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/maskdasboard.png"
                  alt="match"
                  width={284}
                  height={270}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-3">
                {/* Title */}
                <div>
                  <div className="text-sm font-semibold text-indigo-600">
                    vs. Titans FC
                  </div>
                  <div className="text-xs text-slate-500">
                    Saturday, 3:00 PM • Memorial Stadium
                  </div>
                </div>

                {/* Countdown */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-slate-600 font-medium">
                    Countdown
                  </span>

                  <div className="grid grid-cols-4 gap-3">
                    {[
                      { value: "02", label: "Days" },
                      { value: "14", label: "Hrs" },
                      { value: "45", label: "Min" },
                      { value: "12", label: "Sec" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="bg-slate-200 rounded-lg py-2 text-center"
                      >
                        <div className="text-lg font-semibold text-slate-800">
                          {item.value}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-2">
                  <AppButton className="flex-1 text-white">
                    View Game Plan
                  </AppButton>

                  <AppButton
                    variant="outline"
                    className="w-10 h-10 flex items-center justify-center"
                  >
                    <Share2Icon size={16} />
                  </AppButton>
                </div>
              </div>
            </div>

            {/* Weekly Training Schedule */}
            <div className="mt-6 rounded-2xl bg-white p-6 border shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-xl">Weekly Training Schedule</h3>

                <div className="flex gap-2">
                  <Button variant="outline" className="h-8 w-8 p-0 rounded-lg">
                    <ChevronLeft size={16} />
                  </Button>
                  <Button variant="outline" className="h-8 w-8 p-0 rounded-lg">
                    <ChevronRight size={16} />
                  </Button>
                </div>
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-3">
                {[
                  { day: "MON", date: "Oct 21" },
                  { day: "TUE", date: "Oct 22" },
                  { day: "WED", date: "TODAY", active: true },
                  { day: "THU", date: "Oct 24" },
                  { day: "FRI", date: "Oct 25" },
                  { day: "SAT", date: "MATCH", match: true },
                  { day: "SUN", date: "Oct 27" },
                ].map((item, i) => (
                  <div key={item.day} className="space-y-2">
                    {/* Day pill */}
                    <div
                      className={`rounded-xl px-3 py-2 text-center text-xs font-semibold ${item.active ? "bg-indigo-600 text-white" : item.match ? "bg-green-600 text-white" : "bg-slate-50 text-slate-700"}`}
                    >
                      <div>{item.day}</div>
                      <div className="text-[10px] font-normal">{item.date}</div>
                    </div>

                    {/* Sessions */}
                    <div className="space-y-2">
                      {item.active && (
                        <>
                          <div className="rounded-lg bg-indigo-50 p-2 text-xs">
                            <span className="font-semibold text-indigo-600">
                              09:30 AM
                            </span>
                            <div className="text-slate-600">Ball Control</div>
                          </div>

                          <div className="rounded-lg bg-slate-100 p-2 text-xs">
                            <span className="font-semibold text-slate-700">
                              02:00 PM
                            </span>
                            <div className="text-slate-600">Gym Session</div>
                          </div>
                        </>
                      )}

                      {i === 0 && (
                        <div className="rounded-lg bg-blue-50 p-2 text-xs">
                          <span className="font-semibold text-blue-600">
                            09:00 AM
                          </span>
                          <div className="text-slate-600">Warmup Drills</div>
                        </div>
                      )}

                      {i === 1 && (
                        <div className="rounded-lg bg-orange-50 p-2 text-xs">
                          <span className="font-semibold text-orange-600">
                            10:30 AM
                          </span>
                          <div className="text-slate-600">Tactical Review</div>
                        </div>
                      )}

                      {i === 3 && (
                        <div className="rounded-lg bg-green-50 p-2 text-xs">
                          <span className="font-semibold text-green-600">
                            11:00 AM
                          </span>
                          <div className="text-slate-600">Set Pieces</div>
                        </div>
                      )}

                      {i === 4 && (
                        <div className="rounded-lg bg-slate-50 p-2 text-xs text-slate-400 text-center">
                          Rest Day
                          <br />
                          No Session
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Readiness Overview */}
            <div className="mt-6 rounded-2xl bg-white border shadow-sm">
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h4 className="font-semibold text-base">
                  Team Readiness Overview
                </h4>
                <button className="text-sm text-indigo-600 font-medium">
                  Full Roster
                </button>
              </div>

              {/* Table header */}
              <div className="grid grid-cols-12 px-5 py-3 text-xs text-slate-400">
                <div className="col-span-5">Player</div>
                <div className="col-span-4">Load</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-1 text-center">Action</div>
              </div>

              {/* Rows */}
              <div className="divide-y">
                {/* Row 1 */}
                <div className="grid grid-cols-12 items-center px-5 py-4">
                  {/* Player */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200" />
                    <div>
                      <div className="font-medium text-sm">Leon</div>
                      <div className="text-xs text-slate-400">Left Wing</div>
                    </div>
                  </div>

                  {/* Load */}
                  <div className="col-span-4">
                    <div className="w-full h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-2 bg-indigo-500 rounded-full"
                        style={{ width: "60%" }}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600">
                      Optimal
                    </span>
                  </div>

                  {/* Action */}
                  <div className="col-span-1 text-center text-slate-400 cursor-pointer">
                    ⋮
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-12 items-center px-5 py-4">
                  {/* Player */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200" />
                    <div>
                      <div className="font-medium text-sm">Kevin De Bruyne</div>
                      <div className="text-xs text-slate-400">Midfield</div>
                    </div>
                  </div>

                  {/* Load */}
                  <div className="col-span-4">
                    <div className="w-full h-2 bg-slate-100 rounded-full">
                      <div
                        className="h-2 bg-amber-400 rounded-full"
                        style={{ width: "38%" }}
                      />
                    </div>
                  </div>

                  {/* Status */}
                  <div className="col-span-2 text-center">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600">
                      Fatigued
                    </span>
                  </div>

                  {/* Action */}
                  <div className="col-span-1 text-center text-slate-400 cursor-pointer">
                    <EllipsisVerticalIcon size={16} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-4 space-y-6">
            <div className="rounded-lg bg-white p-4 px-2 border space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <ClipboardPlusIcon size={20} className="text-red-500" />
                <button className="text-xs text-rose-500 bg-red-100 rounded-md px-2 font-bold">
                  3 Active
                </button>
              </div>
              <div className="text-xl font-bold">Injury Report</div>
              <div className="text-xs text-slate-500 mt-2">
                Smith (Knee), Diaz (Hamstring), Chen (Ankle)
              </div>
            </div>
            <div className="rounded-lg bg-white p-4 px-2 border space-y-2 shadow-sm">
              <div className="flex items-center justify-between">
                <TrendingUp size={20} className="text-green-500" />
                <button className="text-xs text-green-500 bg-green-100 uppercase rounded-md px-2 font-bold">
                  w-w-d
                </button>
              </div>
              <div className="text-xl font-bold">Performance Report</div>
              <div className="text-xs text-slate-500 mt-2">
                Team morale is high after last win
              </div>
            </div>
            <div className="rounded-2xl bg-blue-50 p-4 border border-blue-100">
              {/* Alert header */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold">
                  i
                </div>

                <div className="flex-1">
                  <div className="text-sm font-semibold text-indigo-600">
                    Fatigue Alert
                  </div>

                  <div className="mt-1 text-sm text-slate-700">
                    <span className="font-semibold">De Bruyne</span> shows a{" "}
                    <span className="font-semibold text-orange-500">
                      42% increase
                    </span>{" "}
                    in injury markers. Recommendation: Reduce session load by{" "}
                    <span className="font-semibold">30%</span> today.
                  </div>
                </div>
              </div>

              {/* Suggested lineup */}
              <div className="mt-5">
                <div className="text-sm font-semibold text-indigo-600 mb-3">
                  Suggested Line-up
                </div>

                <div className="space-y-2">
                  {/* Player 1 */}
                  <div className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-slate-400 w-4">1</span>
                      <span className="font-medium">Martinez (GK)</span>
                    </div>
                    <span className="text-emerald-600 font-semibold text-sm">
                      98%
                    </span>
                  </div>

                  {/* Player 2 */}
                  <div className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-slate-400 w-4">4</span>
                      <span className="font-medium">Van Dijk (CB)</span>
                    </div>
                    <span className="text-emerald-600 font-semibold text-sm">
                      95%
                    </span>
                  </div>

                  {/* Player 3 */}
                  <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border">
                    <div className="flex items-center gap-3 text-sm text-slate-400">
                      <span className="w-4">17</span>
                      <span className="font-medium">Foden (LW)</span>
                    </div>
                    <span className="text-orange-500 font-semibold text-sm">
                      Sub
                    </span>
                  </div>
                </div>

                {/* Action */}
                <button className="mt-4 w-full rounded-xl border border-indigo-300 py-2 text-sm font-semibold text-indigo-600 bg-white hover:bg-indigo-50 transition">
                  Apply Selection
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 border h-[300px]">
              <div className="text-xl font-medium">Opponent Analysis</div>
              <div className="mt-6 h-[200px] rounded-lg bg-gray-100 flex items-center justify-center">
                <div className="flex flex-col items-center text-center gap-2">
                  <p className="text-xs text-slate-400">
                    Titans FC typically attack through
                  </p>
                  <p className="text-lg font-semibold text-indigo-600">
                    Left Flank (64%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
