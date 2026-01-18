import RequireAuth from "@/shared/components/auth/RequireAuth";

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-slate-50 text-slate-900">
          <main>{children}</main>
        </div>
    </RequireAuth>
  );
}
