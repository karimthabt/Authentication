"use client";
import { useState } from "react";

export default function TestRatePage() {
  const [response, setResponse] = useState<string>("");

  const handleTest = async () => {
    const res = await fetch("/api/test");
    const data = await res.json();
    setResponse(JSON.stringify(data));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>اختبار Rate Limit لكل بريد</h1>
      <button
        onClick={handleTest}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "blue",
          color: "white",
          borderRadius: "5px",
          marginTop: "1rem",
        }}
      >
        أرسل طلب
      </button>
      <div style={{ marginTop: "1rem", whiteSpace: "pre-wrap" }}>
        {response}
      </div>
    </div>
  );
}
