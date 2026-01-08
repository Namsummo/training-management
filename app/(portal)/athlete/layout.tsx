export default function AthleteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-6 border-b pb-4">
          <p className="text-xs font-semibold uppercase text-indigo-500">
            Athlete area
          </p>
          <h1 className="text-2xl font-bold text-slate-800">
            My training space
          </h1>
          <p className="text-sm text-slate-600">
            Track workouts, view schedules, and follow assigned programs.
          </p>
        </header>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
