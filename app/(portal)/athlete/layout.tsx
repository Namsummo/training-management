import RequireAuth from "@/shared/components/auth/RequireAuth";

export default function AthleteLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireAuth>
      <div className="min-h-screen bg-white text-slate-900">
   
          <main>{children}</main>
        </div>
    </RequireAuth>
  );
}
