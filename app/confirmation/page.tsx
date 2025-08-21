// app/signup/page.tsx
import ConfirmationPage from "./ConfirmationClient";

export const dynamic = "force-dynamic"; // ✅ important

export default function Page() {
  return <ConfirmationPage />;
}
