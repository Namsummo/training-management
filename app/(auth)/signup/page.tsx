import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4 py-12 text-slate-900">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Auth
        </p>
        <h1 className="text-2xl font-bold">Sign up</h1>
        <p className="text-sm text-slate-600">
          Tạo tài khoản mới để bắt đầu quản lý/training.
        </p>
      </header>
      <form className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none ring-0 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="you@example.com"
            type="email"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm outline-none ring-0 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            placeholder="••••••••"
            type="password"
          />
        </div>
        <button
          type="button"
          className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
        >
          Sign up
        </button>
        <p className="text-center text-xs text-slate-500">
          (Placeholder form sẽ nối API sau)
        </p>
        <Image
          src="/images/logoLogin.png"
          alt="logo"
          width={100}
          height={100}
        />
      </form>
    </main>
  );
}
