import { AppButton } from "@/shared/components/ui/button/AppButton";
import { AppInput } from "@/shared/components/ui/input/AppInput";
import { EyeIcon, MailboxIcon } from "lucide-react";

export default function SignInPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-4 py-12 text-slate-900">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Auth
        </p>
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-sm text-slate-600">
          Đăng nhập để truy cập không gian coach/athlete.
        </p>
      </header>
      <form className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <AppInput label="Email" placeholder="you@example.com" fullWidth />
        </div>
        <div className="space-y-1">
          <AppInput
            label="Password"
            placeholder="••••••••"
            fullWidth
            leftIcon={<EyeIcon size={12} />}
            rightIcon={<MailboxIcon size={12} />}
          />
        </div>
        <AppButton type="button" fullWidth>
          Sign in
        </AppButton>
        <p className="text-center text-xs text-slate-500">
          (Placeholder form – hook up API later)
        </p>
      </form>
    </main>
  );
}
