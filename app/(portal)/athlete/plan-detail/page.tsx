"use client";

import {
  ArrowLeft,
  MoreHorizontal,
  Calendar,
  MapPin,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function PlanDetailPage() {
  const router = useRouter();

  return (
    <div className="mx-auto min-h-screen max-w-sm bg-slate-50 px-4 py-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Button onClick={() => router.back()} variant="outline">
          <ArrowLeft className="h-5 w-5 text-indigo-500" />
        </Button>
        <h1 className="text-sm font-semibold text-slate-900">17Jan Plan</h1>
        <MoreHorizontal className="h-5 w-5 text-slate-500" />
      </div>

      {/* Session Card */}
      <Card className="mb-6 rounded-3xl shadow-sm">
        <CardContent className="p-4">
          {/* Thumbnail */}
          <div className="mb-4 h-36 w-full rounded-2xl bg-slate-200" />

          <p className="mb-1 text-xs font-semibold text-indigo-500">
            Upcoming Session
          </p>

          <h2 className="mb-3 text-lg font-bold text-slate-900">
            Varsity Sprint Drills
          </h2>

          <div className="mb-2 flex items-center gap-2 text-sm text-slate-600">
            <Calendar className="h-4 w-4 text-indigo-500" />
            Today, 4:00 PM – 5:30 PM
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin className="h-4 w-4 text-indigo-500" />
            East Campus Track, Sector 4
          </div>
        </CardContent>
      </Card>

      {/* Availability Buttons */}
      <div className="mb-6 space-y-3">
        <Button
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-indigo-500 py-6 text-white hover:bg-indigo-600"
          onClick={() => router.push("./submit")}
        >
          <CheckCircle className="h-5 w-5" />
          Available
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-2xl border-yellow-300 bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
          >
            <AlertTriangle className="h-4 w-4" />
            Limited
          </Button>

          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-2xl border-red-300 bg-red-50 text-red-600 hover:bg-red-100"
          >
            <XCircle className="h-4 w-4" />
            Unavailable
          </Button>
        </div>
      </div>

      {/* Note */}
      <div>
        <p className="mb-2 text-sm font-semibold text-slate-900">
          Add a note (optional)
        </p>
        <Textarea
          placeholder="e.g. Slightly late due to traffic..."
          className="rounded-2xl"
        />
      </div>
    </div>
  );
}
