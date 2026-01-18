"use client";
import Image from "next/image";
import { useState } from "react";
import TrainingCalendar from "./TrainingSchedule";

export default function Page() {
  const [selectedFilter, setSelectedFilter] = useState("all");

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-80px)]">
      {/* Calendar – 2 cột */}
      <div className="col-span-2 h-full overflow-hidden">
        <div className="h-full overflow-y-auto">
          <TrainingCalendar onFilterChange={setSelectedFilter} />
        </div>
      </div>

      {/* Sidebar – 1 cột */}
      <div className="col-span-1 h-full">
        <Image
          src={
            selectedFilter === "training"
              ? "/images/absolute.png"
              : "/images/match.png"
          }
          alt={selectedFilter === "training" ? "training" : "match"}
          width={400}
          height={400}
          className="w-full h-full object-contain rounded-lg bg-black"
        />
      </div>
    </div>
  );
}
