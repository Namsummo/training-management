"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const BAR_DATA = [6, 7, 5, 6, 4, 5, 4, 5, 6, 7, 6, 4];

const HISTORY = [
  { date: "WED 11 JUL, 2024", exs: 5 },
  { date: "WED 4 JUL, 2024", exs: 15 },
  { date: "WED 28 JUN, 2024", exs: 6 },
  { date: "WED 21 JUN, 2024", exs: 8 },
  { date: "WED 14 JUN, 2024", exs: 3 },
  { date: "WED 7 JUN, 2024", exs: 5 },
  { date: "TUE 30 MAY, 2024", exs: 9 },
  { date: "TUE 23 MAY, 2024", exs: 10 },
];

export default function MyWeightPage() {
  return (
    <div className="mx-auto min-h-screen max-w-sm bg-slate-50 px-4 py-6">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <ArrowLeft className="h-5 w-5 text-slate-500" />
        <span className="text-xs font-semibold tracking-widest text-slate-400">
          PROFILE
        </span>
      </div>

      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">My weight</h1>
        <Button
          size="icon"
          className="h-10 w-10 rounded-full bg-indigo-500 hover:bg-indigo-600"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Stats Card */}
      <Card className="mb-6 rounded-3xl shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-medium text-slate-400">DAY TRAINED</p>
              <p className="text-2xl font-bold text-slate-900">133</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-400">
                EXERCISE DONE
              </p>
              <p className="text-2xl font-bold text-slate-900">245</p>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex items-end justify-between gap-2">
            {BAR_DATA.map((v, i) => (
              <div
                key={i}
                className="relative h-12 w-full overflow-hidden rounded-full bg-slate-200"
              >
                <div
                  className="absolute bottom-0 w-full rounded-full bg-indigo-500"
                  style={{ height: `${v * 12}%` }}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* History */}
      <Card className="rounded-3xl shadow-sm">
        <CardContent className="p-5">
          <p className="mb-4 text-xs font-semibold tracking-wide text-slate-400">
            HISTORY
          </p>

          <div className="space-y-4">
            {HISTORY.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-none last:pb-0"
              >
                <span className="text-sm font-medium text-slate-700">
                  {item.date}
                </span>
                <span className="text-sm font-semibold text-indigo-500">
                  {item.exs} EXS
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
