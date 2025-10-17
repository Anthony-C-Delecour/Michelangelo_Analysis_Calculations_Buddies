// pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in (example: token in localStorage)
    const token = localStorage.getItem("token");

    if (token) {
      // If logged in, redirect to dashboard
      router.push("/dashboard_page");
    } else {
      // If not logged in, redirect to login page
      router.push("/login_page");
    }
  }, [router]);

  // Show nothing while redirecting
  return null;
}