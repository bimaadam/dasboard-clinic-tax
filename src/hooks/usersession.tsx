"use client";

import { useEffect, useState } from "react";

export default function useUserSession() {
  const [session, setSession] = useState<{ nama: string } | null>(null);

  useEffect(() => {
    async function getSession() {
      const res = await fetch("/api/auth/session");
      if (res.ok) {
        const data = await res.json();
        setSession(data);
      }
    }
    getSession();
  }, []);

  return session;
}
