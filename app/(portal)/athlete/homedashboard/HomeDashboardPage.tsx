"use client";

import { Bell, Plus, Clock, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomeDashboardPage() {
  const router = useRouter();
  return (
    <div className="mx-auto min-h-screen max-w-sm bg-slate-50 px-4 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest text-slate-400">
          JULY 17, 2024
        </span>
        <Bell className="h-5 w-5 text-slate-500" />
      </div>

      {/* Greeting */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Hi, Leon</h1>
        <Button
          size="icon"
          className="h-10 w-10 rounded-full bg-indigo-500 hover:bg-indigo-600"
        >
          <Clock className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Coach Announcement */}
      <Card className="mb-6 rounded-3xl shadow-sm">
        <CardContent className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-semibold text-slate-900">Coach Announcements</p>
            <button className="text-sm font-medium text-indigo-500">
              Read All
            </button>
          </div>

          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-300" />
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Coach Alex</p>
              <p className="text-xs text-slate-400">Head Coach • 2h ago</p>
              <p className="mt-2 text-sm text-slate-600">
                Don&apos;t forget to bring your recovery kits for the
                post-session stretch. See you all at 4!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-4">
        <Card className="rounded-3xl shadow-sm">
          <CardContent className="p-4">
            <p className="mb-4 font-semibold text-slate-900">
              Upcoming session
            </p>
            <p className="text-xs font-medium text-slate-400">GYM RECOVERY</p>
            <p className="mt-1 text-sm font-semibold text-indigo-500">
              TOMORROW
            </p>
            <p className="text-sm font-semibold text-slate-900">9:00 AM</p>
          </CardContent>
        </Card>

        <Card className="relative rounded-3xl shadow-sm">
          <CardContent className="p-4">
            <p className="mb-4 font-semibold text-slate-900">Today schedule</p>
            <p className="text-3xl font-bold text-slate-900">12</p>
            <p className="text-xs font-semibold text-indigo-500">
              TOTAL: 8H30M
            </p>
          </CardContent>

          <Button
            size="icon"
            className="absolute right-3 top-3 h-8 w-8 rounded-full bg-indigo-500 hover:bg-indigo-600"
          >
            <Plus className="h-4 w-4 text-white" />
          </Button>
        </Card>
      </div>

      {/* Session Detail */}
      <Card className="rounded-3xl shadow-sm">
        <CardContent className="p-5">
          {/* Fake chart */}
          <div className="mb-5 h-24 w-full">
            <svg viewBox="0 0 300 80" className="h-full w-full" fill="none">
              <path
                d="M0 40 C20 10, 40 70, 60 40
                   C80 10, 100 70, 120 30
                   C140 10, 160 70, 180 40
                   C200 10, 220 60, 240 30
                   C260 10, 280 60, 300 40"
                stroke="#6366F1"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="mb-3 flex justify-between text-sm">
            <div>
              <p className="text-xs text-slate-400">Type</p>
              <p className="font-semibold text-slate-900">🏋️ Technical</p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Time</p>
              <p className="font-semibold text-slate-900">4:00 PM - 5:30 PM</p>
            </div>
          </div>

          <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-900">
            <MapPin className="h-4 w-4 text-indigo-500" />
            Stadium Pitch 1
          </div>

          <Button
            className="w-full rounded-xl bg-indigo-500 py-6 text-white hover:bg-indigo-600"
            onClick={() => router.push("./plan-detail")}
          >
            VIEW SESSION PLAN
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
