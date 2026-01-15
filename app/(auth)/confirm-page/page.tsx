// Server component: render the client-side confirm page
import React, { Suspense } from "react";
import ConfirmPageClient from "./ConfirmPageClient";

export const metadata = {
  title: "Confirm - Reset Password",
};

export default function ConfirmPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConfirmPageClient />
    </Suspense>
  );
}
