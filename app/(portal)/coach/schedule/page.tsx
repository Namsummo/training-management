"use client";
import Image from "next/image";
import { useState } from "react";
import TrainingCalendar from "./TrainingSchedule";
import { Button } from "@/components/ui/button";
import { CalendarRange, Cross, Dumbbell, Tv2Icon } from "lucide-react";

export default function Page() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  function renderMaskGroup() {
    return (
      <div className="w-full rounded-2xl bg-white shadow-md p-4 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <span className="size-6 rounded-md bg-indigo-100 flex items-center justify-center">
            <CalendarRange size={16} />
          </span>
          Next Match
        </div>

        {/* Stadium image */}
        <div className="rounded-xl overflow-hidden">
          <Image
            src="/images/mask.png"
            alt="Stadium"
            width={283}
            height={153}
            className="object-cover"
          />
        </div>

        {/* Teams */}
        <div className="flex items-center justify-between px-4">
          <div className="flex flex-col items-center gap-1">
            <div className="size-12 rounded-full bg-gray-300" />
            <span className="text-xs font-semibold">ARS</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-sm font-bold uppercase">VS</span>
            <span className="text-[10px] px-2 py-[2px] rounded-full bg-red-500 text-white">
              PL
            </span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="size-12 rounded-full bg-gray-300" />
            <span className="text-xs font-semibold">MCI</span>
          </div>
        </div>

        {/* Match info */}
        <div className="text-center">
          <p className="text-xs text-gray-500">Emirates Stadium</p>
          <p className="font-semibold">Oct 11, 16:30</p>
        </div>

        <button className="mx-auto text-xs px-4 py-1 rounded-full border border-gray-300 text-gray-600">
          3 Days to kick-off
        </button>

        {/* Squad Availability */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span className="size-5 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <Cross size={16} />
            </span>
            Squad Availability
          </div>

          <div className="flex items-center gap-3">
            <div className="relative size-10">
              <div className="absolute inset-0 rounded-full border-4 border-green-500" />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                88%
              </span>
            </div>

            <div className="text-xs">
              <p className="font-semibold">22 Players Available</p>
              <p className="text-gray-500">3 Unavailable</p>
            </div>
          </div>
        </div>

        {/* Injuries */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
            <div className="size-8 rounded-full bg-gray-300" />
            <div className="flex flex-col text-xs">
              <span className="font-semibold">B. Saka</span>
              <span className="text-green-600">Hamstring (2 weeks)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
            <div className="size-8 rounded-full bg-gray-300" />
            <div className="flex flex-col text-xs">
              <span className="font-semibold">J. Timber</span>
              <span className="text-yellow-600">Rehab (Doubtful)</span>
            </div>
          </div>
        </div>

        {/* Team load */}
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Tv2Icon className="text-blue-600" size={16} />
          Team Load
        </div>

        <Image
          src="/images/bgwhite.png"
          alt="Chart"
          width={283}
          height={120}
          className="rounded-xl"
        />
      </div>
    );
  }

  function renderPowerStrength() {
    return (
      <div className="w-full bg-white px-4 py-5 space-y-5 text-gray-400">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-black">Power & Strength</h1>
          <p className="text-sm">Oct 5, 2025 · 14:00 - 16:00</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b text-sm">
          <span className="font-semibold text-primary border-b-2 border-primary pb-2">
            Attendance
          </span>
          <span className="pb-2">Drill Plan</span>
          <span className="pb-2">Notes</span>
        </div>

        {/* Session Card */}
        <div className="bg-gray-100 rounded-lg p-3 space-y-3">
          <div className="flex items-center gap-2 font-semibold text-black">
            <Dumbbell size={18} />
            <span>Power & Strength Session</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {["U-18 First Team", "Indoor Gym", "Coach Miller"].map((item) => (
              <span
                key={item}
                className="px-3 py-1 text-xs rounded-full border border-gray-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Players Header */}
        <div className="flex justify-between items-center">
          <p className="font-semibold text-black">Players (18/22)</p>
          <p className="text-primary text-sm font-medium">Mark all present</p>
        </div>

        {/* Players list (IMAGE BASED) */}
        <div className="space-y-2">
          {/* Dashed line */}
          <div className="top-0 bottom-0" />

          {[
            "/images/items1.png",
            "/images/items2.png",
            "/images/items2.png",
            "/images/items1.png",
            "/images/items2.png",
            "/images/items1.png",
            "/images/items1.png",
            "/images/items1.png",
            "/images/items1.png",
            "/images/items1.png",
            "/images/items1.png",
          ].map((src, i) => (
            <div key={i} className="ml-6">
              <Image
                src={src}
                alt="Player item"
                width={335}
                height={36}
                className="rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Edit Session</Button>
          <Button>Save Updates</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-80px)] gap-8 px-6 bg-gray-50">
      {/* Calendar – chiếm toàn bộ phần còn lại */}
      <div className="flex-1 h-full bg-white rounded-2xl shadow-sm">
        <TrainingCalendar onFilterChange={setSelectedFilter} />
      </div>

      {/* Sidebar – width cố định */}
      <div className="w-[320px] h-full">
        {selectedFilter === "training"
          ? renderPowerStrength()
          : renderMaskGroup()}
      </div>
    </div>
  );
}
