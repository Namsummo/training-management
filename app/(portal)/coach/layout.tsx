export default function CoachLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <header className="mb-6 border-b pb-4">
          <p className="text-xs font-semibold uppercase text-slate-500">
            Coach area
          </p>
          <h1 className="text-2xl font-bold text-slate-800">
            Training Management
          </h1>
          <p className="text-sm text-slate-600">
            Full control over athletes, workouts, and programs.
          </p>
        </header>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
