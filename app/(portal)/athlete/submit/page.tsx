"use client";

import { useState } from "react";
import { ArrowLeft, Zap, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SubmitFeedback() {
  const [rpe, setRpe] = useState(7);
  const [pain, setPain] = useState(2);
  const [note, setNote] = useState("");
  const router = useRouter();

  function hanleClick() {
    toast.success("Feedback submitted successfully!");
    router.push("./dashboard");
  }
  return (
    <div className="max-w-sm mx-auto min-h-screen bg-slate-50 p-4 flex flex-col">
      {/* Header */}
      <div
        className="flex items-center gap-2 mb-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="w-5 h-5" />
        <h1 className="font-semibold text-lg">Submit & Feedback</h1>
      </div>

      {/* Training Completed */}
      <Card className="mb-4 h-32 flex items-start p-4 bg-slate-200">
        <span className="text-sm font-semibold tracking-wide">
          TRAINING
          <br />
          COMPLETED
        </span>
      </Card>

      {/* Duration */}
      <Card className="mb-4 p-4 flex items-center gap-3">
        <Clock className="w-5 h-5 text-indigo-500" />
        <div>
          <div className="text-xs text-muted-foreground">Total Duration</div>
          <div className="font-semibold">1h 15m</div>
        </div>
      </Card>

      {/* RPE */}
      <Card className="mb-4 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Zap className="w-4 h-4 text-orange-500" />
            RPE (Effort) 1–10
          </div>
          <span className="font-semibold text-indigo-600">{rpe}</span>
        </div>

        <Slider
          value={[rpe]}
          min={1}
          max={10}
          step={1}
          onValueChange={(v) => setRpe(v[0])}
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Rest</span>
          <span>Max Effort</span>
        </div>
      </Card>

      {/* Pain */}
      <Card className="mb-4 p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <AlertTriangle className="w-4 h-4 text-green-500" />
            Pain Level 0–10
          </div>
          <span className="font-semibold text-green-600">{pain}</span>
        </div>

        <Slider
          value={[pain]}
          min={0}
          max={10}
          step={1}
          onValueChange={(v) => setPain(v[0])}
        />

        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>None</span>
          <span>Extreme</span>
        </div>
      </Card>

      {/* Notes */}
      <Card className="mb-6 p-4">
        <div className="text-sm font-medium mb-2">Notes for Coach</div>
        <Textarea
          placeholder="How did you feel? Any specific breakthroughs or issues?"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </Card>

      {/* Submit */}
      <Button
        className="mt-auto h-12 text-base rounded-xl"
        onClick={hanleClick}
      >
        Send to Coach
        <ArrowRight size={16} />
      </Button>
    </div>
  );
}
