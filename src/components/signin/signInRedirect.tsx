"use client";

import { useEffect } from "react";
import { useUser } from "@/contexts/UserContext/UserProvider";

// SignInRedirect component checks if the user is logged in
// and redirects them to the dashboard if they are.
// it nested on the login page to handle redirection after login
// its purpose is to prevent logged-in users from viewing the login page
export default function SignInRedirect() {
  const { user } = useUser();


  useEffect(() => {
    // If user goes to the login page and is already logged in,
    // redirect them to the dashboard - i'm having to use window.location.href
    // because useRouter doesn't work in this context
    if (user) {
       window.location.href = "/dashboard"; // Redirect to dashboard if user is logged in
    }
  }, [user]);

  return null;
}