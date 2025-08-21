import { Suspense } from "react";
import ConfirmationClient from "./ConfirmationClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading confirmation...</div>}>
      <ConfirmationClient />
    </Suspense>
  );
}
