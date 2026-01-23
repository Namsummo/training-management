"use client";

import { AppButton } from "@/shared/components/ui/button/AppButton";
import Link from "next/link";
import Image from "next/image";
import { useAthleteDetailQuery } from "@/shared/service/hooks/queries/useAthleteDetail.query";
import { usePositionEnumQuery } from "@/shared/service/hooks/queries/usePositionEnum.query";

type Props = { params: { athlete: string } };

export default function AthleteDetailPage({ params }: Props) {
  const id = params?.athlete ?? "unknown";
  const { data: athleteData, isLoading, isError } = useAthleteDetailQuery(id);
  const { data: positions = [] } = usePositionEnumQuery();

  const athlete = athleteData?.data;

  // Get position label
  const positionLabel = athlete?.position_relevance
    ? positions.find((p) => p.key === athlete.position_relevance)?.label ||
      athlete.position_relevance
    : "N/A";

  // Format status
  const getStatusInfo = (status: string | null | undefined) => {
    const statusValue = status || null;
    if (!statusValue)
      return { label: "Unknown", className: "bg-slate-50 text-slate-700" };
    switch (statusValue.toLowerCase()) {
      case "available":
        return { label: "Available", className: "bg-green-50 text-green-700" };
      case "injured":
        return { label: "Injured", className: "bg-rose-50 text-black " };
      case "inactive":
        return { label: "Inactive", className: "bg-slate-50 text-black" };
      default:
        return { label: statusValue, className: "bg-slate-50 text-black" };
    }
  };

  const statusInfo = getStatusInfo(
    athlete?.fitness_status || athlete?.athlete_status,
  );

  // Format date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-center py-12">Loading athlete profile...</div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !athlete) {
    return (
      <div className="p-6 bg-slate-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="text-center py-12 text-rose-600">
              Failed to load athlete profile
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                {athlete.avatar ? (
                  <div className="w-28 h-28 rounded-full overflow-hidden relative">
                    <Image
                      src={athlete.avatar}
                      alt={athlete.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
                    {athlete.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#5954E6] border-2 border-white flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-semibold">{athlete.name}</h1>
                <div className="text-sm text-slate-500 mt-1">
                  {positionLabel !== "N/A" && `Position: ${positionLabel}`}
                  {athlete.jersey_number !== null &&
                    athlete.jersey_number !== undefined && (
                      <span>
                        {positionLabel !== "N/A" ? " • " : ""}Jersey #
                        {athlete.jersey_number}
                      </span>
                    )}
                </div>
                <div className="flex items-center gap-3 mt-3 text-sm">
                  <span
                    className={`inline-block text-xs px-3 py-1 rounded-full ${statusInfo.className}`}
                  >
                    {statusInfo.label}
                  </span>
                  {athlete.updated_at && (
                    <span className="text-xs text-slate-400">
                      Updated: {formatDate(athlete.updated_at)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href={`/coach/athletes/${id}/edit`}>
                <AppButton
                  variant="ghost"
                  className="text-[#5954E6] border border-[#5954E6]"
                >
                  Edit Profile
                </AppButton>
              </Link>
              <AppButton>Export PDF</AppButton>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left column */}
          <div className="col-span-8 space-y-6">
            {/* Stat cards */}
            <div className="grid grid-cols-4 gap-4">
              <div className="rounded-lg bg-white p-4 border">
                <div className="text-xs text-slate-400">Duration</div>
                <div className="text-lg font-semibold mt-2">85 min</div>
                <div className="text-xs text-slate-400 mt-2">5% vs plan</div>
              </div>

              <div className="rounded-lg bg-white p-4 border">
                <div className="text-xs text-slate-400">Distance</div>
                <div className="text-lg font-semibold mt-2">9.2 km</div>
                <div className="text-xs text-rose-600 mt-2">-2% vs plan</div>
              </div>

              <div className="rounded-lg bg-white p-4 border">
                <div className="text-xs text-slate-400">Max HR</div>
                <div className="text-lg font-semibold mt-2">188 bpm</div>
                <div className="text-xs text-slate-400 mt-2">Stable</div>
              </div>

              <div className="rounded-lg bg-white p-4 border">
                <div className="text-xs text-slate-400">Compliance</div>
                <div className="text-lg font-semibold mt-2">94%</div>
                <div className="text-xs text-rose-600 mt-2">Lower</div>
              </div>
            </div>

            {/* Subjective Trends */}
            <div className="rounded-lg bg-white p-6 border">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-medium">Subjective Trends</div>
                  <div className="text-xs text-slate-400">
                    Last 5 Sessions: RPE (Load) vs. Pain Levels
                  </div>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5954E6]" /> RPE
                    Score
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-400" /> Pain
                    Score
                  </div>
                </div>
              </div>

              <svg
                className="w-full h-48"
                viewBox="0 0 600 180"
                preserveAspectRatio="none"
              >
                <polyline
                  fill="none"
                  stroke="#c7d2fe"
                  strokeWidth="3"
                  points="0,120 100,100 200,130 300,90 400,110 500,80 600,60"
                />
                <polyline
                  fill="none"
                  stroke="#fda4af"
                  strokeWidth="3"
                  strokeDasharray="4 4"
                  points="0,140 100,130 200,135 300,120 400,130 500,115 600,110"
                />
              </svg>
            </div>

            {/* Drill breakdown */}
            <div className="rounded-lg bg-white p-4 border">
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium">
                  Latest Drill Breakdown
                </div>
                <a className="text-sm text-[#5954E6]">Download Detailed CSV</a>
              </div>

              <table className="w-full text-sm">
                <thead className="text-left text-xs text-slate-500">
                  <tr>
                    <th className="pb-2">Drill Name</th>
                    <th className="pb-2">Time</th>
                    <th className="pb-2">Intensity</th>
                    <th className="pb-2">Perf</th>
                  </tr>
                </thead>
                <tbody className="text-sm text-slate-700">
                  <tr className="border-t">
                    <td className="py-2">Warm-up & Activation</td>
                    <td>15m</td>
                    <td>Low</td>
                    <td>Good</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2">4v4 Possession + Neutrals</td>
                    <td>30m</td>
                    <td>High</td>
                    <td>Medium</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2">Counter-Attack Sprints</td>
                    <td>20m</td>
                    <td>Max</td>
                    <td>Great</td>
                  </tr>
                  <tr className="border-t">
                    <td className="py-2">Cool-down</td>
                    <td>10m</td>
                    <td>Low</td>
                    <td>Low</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right column */}
          <div className="col-span-4 space-y-6">
            {/* Basic Information */}
            <div className="rounded-lg border bg-white p-4">
              <div className="text-sm font-semibold mb-4">
                Basic Information
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="text-xs text-slate-500">Email</div>
                  <div className="text-slate-700 mt-1">{athlete.email}</div>
                </div>
                {athlete.birthday && (
                  <div>
                    <div className="text-xs text-slate-500">Date of Birth</div>
                    <div className="text-slate-700 mt-1">
                      {formatDate(athlete.birthday)}
                    </div>
                  </div>
                )}
                {athlete.gender && (
                  <div>
                    <div className="text-xs text-slate-500">Gender</div>
                    <div className="text-slate-700 mt-1 capitalize">
                      {athlete.gender}
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  {athlete.height !== null && (
                    <div>
                      <div className="text-xs text-slate-500">Height</div>
                      <div className="text-slate-700 mt-1">
                        {athlete.height} cm
                      </div>
                    </div>
                  )}
                  {athlete.weight !== null && (
                    <div>
                      <div className="text-xs text-slate-500">Weight</div>
                      <div className="text-slate-700 mt-1">
                        {athlete.weight} kg
                      </div>
                    </div>
                  )}
                </div>
                {athlete.position_relevance && (
                  <div>
                    <div className="text-xs text-slate-500">Position</div>
                    <div className="text-slate-700 mt-1">{positionLabel}</div>
                  </div>
                )}
                {athlete.jersey_number !== null && (
                  <div>
                    <div className="text-xs text-slate-500">Jersey Number</div>
                    <div className="text-slate-700 mt-1">
                      #{athlete.jersey_number}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4 ring-2 ring-[#EEF2FF]">
              <div className="text-sm font-semibold">AI Insight</div>
              <div className="text-sm text-slate-500 mt-3 space-y-2">
                <div>- Fatigue levels are peaking</div>
                <div>
                  - Marcus reported increased tightness in the left hamstring
                </div>
                <div>- Recommend reducing high-speed running by 15%</div>
                <div>- Recovery session recommended for tomorrow</div>
              </div>
              <div className="mt-4 p-3 bg-[#EEF2FF] rounded-lg border border-[#D0D7FF]">
                <div className="text-sm font-bold gap-2"> Recommendation</div>

                <div className="text-xs font-medium text-[#5954E6] space-y-2">
                  <div>✓ Reduce high-speed drills by 15%</div>
                  <div>✓ Schedule recovery session for tomorrow</div>
                  <div>✓ Monitor left hamstring closely</div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-4">
              <div className="text-sm font-semibold">Injury Snapshot</div>
              <div className="mt-3 grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-20 bg-slate-100 rounded flex items-center justify-center">
                    {/* silhouette */}
                  </div>
                  <div>
                    <div className="text-xs text-rose-600 font-semibold">
                      LEFT HAMSTRING
                    </div>
                    <div className="text-xs text-slate-500">
                      Grade 1 Strain (Minor)
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      Status: Restricted Load
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded">
                  <div className="text-xs text-slate-500">RIGHT ANKLE</div>
                  <div className="text-sm font-medium">No pain reported</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
