"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AddAthletePage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [position, setPosition] = useState("");
  const [jersey, setJersey] = useState("");
  const [status, setStatus] = useState("Active");

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    router.push("/coach/athletes");
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg border p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Add New Athlete</h1>
            <div className="text-sm text-slate-500 mt-1">Complete the profile to onboard a new player.</div>
          </div>
          <div>
            <Link href="/coach/athletes">
              <AppButton className="text-sm px-3 py-2 border rounded bg-slate-50"
                variant="outline">
                <ArrowLeft size={16} />
                Back to Roster
              </AppButton>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="flex flex-col items-center gap-4 py-6 border-b">
            <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">{/* avatar */}</div>
            <div className="text-sm text-slate-500">Athlete Profile Picture</div>
            <div className="text-xs text-slate-400">Recommended: Square image, max 2MB</div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-[#EEF0FF] flex items-center justify-center text-[#5954E6]">👤</div>
              <div className="text-sm font-medium">Personal Information</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500">First Name</label>
                <input value={firstName} onChange={(e) => setFirstName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g. Michael" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Last Name</label>
                <input value={lastName} onChange={(e) => setLastName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g. Jordan" />
              </div>

              <div>
                <label className="text-xs text-slate-500">Date of Birth</label>
                <Input value={dob} onChange={(e) => setDob(e.target.value)} type="date" className="mt-1 w-full border rounded px-3 py-2" />
              </div>

              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-slate-500">Height (cm)</label>
                  <input value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="198" />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-slate-500">Weight (kg)</label>
                  <input value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="98" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-[#EEF0FF] flex items-center justify-center text-[#5954E6]">🏅</div>
              <div className="text-sm font-medium">Professional Details</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500">Primary Position</label>
                <input value={position} onChange={(e) => setPosition(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g. 23" />
              </div>
              <div>
                <label className="text-xs text-slate-500">Jersey Number</label>
                <input value={jersey} onChange={(e) => setJersey(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g. 23" />
              </div>

              <div className="col-span-2">
                <label className="text-xs text-slate-500">Athlete Status</label>
                <div className="mt-2 flex gap-2">
                  <button type="button" onClick={() => setStatus("Active")} className={`px-4 py-2 rounded-full border ${status === "Active" ? "bg-white text-[#5954E6] border-[#5954E6]" : "bg-slate-50"}`}>Active</button>
                  <button type="button" onClick={() => setStatus("Injured")} className={`px-4 py-2 rounded-full border ${status === "Injured" ? "bg-white text-[#5954E6] border-[#5954E6]" : "bg-slate-50"}`}>Injured</button>
                  <button type="button" onClick={() => setStatus("Inactive")} className={`px-4 py-2 rounded-full border ${status === "Inactive" ? "bg-white text-[#5954E6] border-[#5954E6]" : "bg-slate-50"}`}>Inactive</button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/coach/athletes">
              <button type="button" className="px-4 py-2 rounded border">Cancel</button>
            </Link>
            <AppButton type="submit">Save Athlete</AppButton>
          </div>
        </form>
      </div>
    </div>
  );
}
