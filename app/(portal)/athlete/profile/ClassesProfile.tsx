"use client";

import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

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

export default function ClassesProfile() {
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
        <h1 className="text-2xl font-bold text-slate-900">Classes</h1>
        <Button
          size="icon"
          className="h-10 w-10 rounded-full bg-indigo-500 hover:bg-indigo-600"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Stats Card */}
      <Card className="mb-6 rounded-3xl shadow-sm">
        <CardContent className="p-5 flex">
          <Image src="" alt="" className="" width={50} height={100} />
          <span>
            <p className="text-xl font-bold">Class 2A</p>
            <p>Coach Alex</p>
          </span>
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
