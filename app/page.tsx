import { AppButton } from "@/shared/components/ui/button/AppButton";
import Link from "next/link";

export default function Page() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-4 py-12 text-slate-900">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Training management
        </p>
        <h1 className="mt-1 text-3xl font-bold">Chọn không gian làm việc</h1>
        <p className="mt-2 text-sm text-slate-600">
          Coach có toàn quyền. Athlete chỉ xem/ghi nhận theo phân quyền.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/coach/dashboard"
          className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase text-slate-500">
            Coach
          </p>
          <h2 className="text-lg font-semibold text-slate-800">Coach portal</h2>
          <p className="mt-1 text-sm text-slate-600">
            Quản lý athletes, chương trình, lịch tập.
          </p>
        </Link>

        <Link
          href="/athlete/dashboard"
          className="rounded-lg border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <p className="text-xs font-semibold uppercase text-indigo-500">
            Athlete
          </p>
          <h2 className="text-lg font-semibold text-slate-800">
            Athlete portal
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Xem kế hoạch, log buổi tập, theo dõi nhắc nhở.
          </p>
        </Link>
        <AppButton>SiginUp</AppButton>
      </div>
    </main>
  );
}
