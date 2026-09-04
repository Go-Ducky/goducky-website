"use client";

import { useState } from "react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");

      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch {
      setError(true);
    }
  }

  return (
    <section className="section">
      <div className="max-w-3xl mx-auto px-5">
        <h3 className="text-base font-bold text-text-strong mb-3 font-sans">
          Be the first to know when we release new products
        </h3>
        <p className="text-text mb-8">Join the waitlist for early access.</p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 bg-background-weak border border-border-weak rounded-md px-5 py-4 text-sm text-text placeholder:text-text-weak font-[family-name:var(--font-geist-mono)]"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">
            {submitted ? "You're on the list!" : "Subscribe"}
          </button>
        </form>
        {error && (
          <p className="text-red-500 text-sm mt-2">
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </section>
  );
}