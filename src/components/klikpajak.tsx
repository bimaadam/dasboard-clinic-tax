import { useState } from "react";

export default function KlikPajakLogin() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const loginKlikPajak = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/klikpajak/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // Sesuaikan body kalau ada
      });

      const data = await res.json();
      setResponse(data);
      console.log("Auth Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <button onClick={loginKlikPajak} disabled={loading}>
        {loading ? "Logging in..." : "Login KlikPajak"}
      </button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
}
