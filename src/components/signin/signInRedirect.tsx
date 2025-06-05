"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext/UserProvider";

// SignInRedirect component checks if the user is logged in
// and redirects them to the dashboard if they are.
// it nested on the login page to handle redirection after login
export default function SignInRedirect() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
       router.push("/dashboard");
    }
  }, [user]);

  return null;
}