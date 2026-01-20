import Image from "next/image";
import { AppButton } from "@/shared/components/ui/button/AppButton";
import { ArrowLeft, LockKeyholeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppInput } from "@/shared/components/ui/input/AppInput";

export default function LoginMobile() {
  return (
    // Web background
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      {/* Mobile frame */}
      <div className="relative w-full max-w-sm h-screen bg-black from-black via-neutral-900 to-black text-white px-6 overflow-hidden">
        {/* Header */}
        <div className="relative pt-6 flex items-center justify-center">
          <Button
            variant="link"
            className="absolute left-0 text-gray-300 cursor-pointer"
          >
            <ArrowLeft size={22} />
          </Button>

          <h2 className="uppercase tracking-widest text-sm">Login</h2>
        </div>

        {/* Content */}
        <div className="mt-14 space-y-6">
          <h1 className="text-3xl font-semibold tracking-wide">WELCOME BACK</h1>

          {/* Form */}
          <div className="space-y-4">
            <AppInput
              label="Username"
              fullWidth
              type="text"
              placeholder="Username"
            />

            <AppInput
              label="Password"
              fullWidth
              type="password"
              placeholder="Password"
            />

            <Button
              variant="link"
              className="flex items-center gap-2 text-xs text-gray-400 uppercase"
            >
              <LockKeyholeIcon size={16} className="text-gray-400" />
              Forget password?
            </Button>
          </div>

          {/* Login button */}
          <AppButton className="w-full rounded-full py-5 bg-indigo-500 hover:bg-indigo-600 uppercase">
            Login
          </AppButton>

          {/* Divider */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex-1 h-px bg-gray-700" />
            <span className="text-xs text-gray-400 uppercase">Or</span>
            <div className="flex-1 h-px bg-gray-700" />
          </div>

          {/* Social login */}
          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-gray-700 hover:bg-gray-600 text-sm">
              <Image
                src="/icons/google.svg"
                alt="google"
                width={18}
                height={18}
              />
              SIGN WITH GOOGLE
            </button>

            <button className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-gray-700 hover:bg-gray-600 text-sm">
              <Image
                src="/icons/facebook.svg"
                alt="facebook"
                width={18}
                height={18}
              />
              SIGN WITH FACEBOOK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
