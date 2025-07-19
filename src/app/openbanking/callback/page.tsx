import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OpenBankingCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status") || searchParams.get("result");

    if (status === "success") {
      // Example: You could log an event here
      console.log("✅ Open Banking Success");
      // Redirect with indicator to subscriptions
    //   router.replace("/subscriptions?ob=success");
    } else if (status === "failure") {
      console.log("❌ Open Banking Failed");
    //   router.replace("/subscriptions?ob=failure");
    } else {
      // No relevant status — just go back
    //   router.replace("/subscriptions");
    }
  }, [searchParams, router]);

  return <p>Processing your bank connection...</p>;

}