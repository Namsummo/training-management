import { AppButton } from "@/shared/components/ui/button/AppButton";
import Image from "next/image";

export default function WelcomeMobile() {
  return (
    // Web background
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center">
      {/* Mobile frame */}
      <div className="relative w-full max-w-sm h-screen bg-black text-white overflow-hidden">
        {/* Logo */}
        <div className="absolute top-6 left-6 size-16 overflow-hidden rounded-2xl bg-gray-700">
          <Image
            src="/images/logoSignin.png"
            alt="logo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-10 left-6 space-y-4 w-[85%]">
          <h1 className="uppercase text-5xl font-semibold tracking-wider">
            Leona
          </h1>

          <p className="text-gray-500 text-base uppercase">
            Welcome to the app
          </p>

          <div className="flex gap-3 pt-2">
            <AppButton className="flex-1 uppercase rounded-full py-5">
              Join us
            </AppButton>

            <AppButton className="flex-1 uppercase rounded-full py-5 bg-gray-700 hover:bg-gray-600">
              Login
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
