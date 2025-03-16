"use client";

import { useEffect, useState } from "react";
import LoadingPage from "@/components/Loading";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingPage /> : children;
}
