import { AppButton } from "@/shared/components/ui/button/AppButton";
type Props = { params: { athlete: string } };

export default function AthleteDetailPage({ params }: Props) {
  const id = params?.athlete ?? "unknown";
  const name =
    id === "ATH-0922" || id === "ATH-0922" ? "Marcus Thorne" : "Marcus Johnson";

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-28 h-28 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
                  {/* avatar */}
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#5954E6] border-2 border-white flex items-center justify-center text-white text-xs">
                  ✓
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-semibold">{name}</h1>
                <div className="text-sm text-slate-500 mt-1">
                  Position: Elite Striker • Jersey #9
                </div>
                <div className="flex items-center gap-3 mt-3 text-sm">
                  <span className="inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full">
                    Available
                  </span>
                  <span className="text-xs text-slate-400">
                    Oct 24, 2023 • Review
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <AppButton variant="ghost">Edit Profile</AppButton>
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
            <div className="rounded-lg border bg-white p-4 ring-2 ring-[#EEF2FF]">
              <div className="text-sm font-semibold">AI Insight</div>
              <div className="text-xs text-slate-500 mt-3">
                “Fatigue levels are peaking and Marcus reported increased
                tightness in the left hamstring. Recommend reducing high-speed
                running by 15% for tomorrow is recovery session.”
              </div>
              <div className="mt-4">
                <AppButton>View Recommendation</AppButton>
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
