"use client";

import { useState, FormEvent } from "react";

export default function CustomOrderPage() {
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [sentTo, setSentTo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/custom-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price,
          description,
          customerName,
          customerEmail,
          notes,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await res.json();
      setSentTo(data.email);
      setStatus("sent");
      setPrice("");
      setDescription("");
      setCustomerName("");
      setCustomerEmail("");
      setNotes("");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-md border border-border bg-[#1a1a1a] px-4 py-2.5 text-sm text-foreground placeholder:text-[#555] focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div className="mx-auto max-w-lg px-6 py-20">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-accent">
          Internal
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          Custom Order
        </h1>
        <p className="mt-2 text-sm text-muted">
          Create a payment link and send it to a customer.
        </p>
      </div>

      {status === "sent" ? (
        <div className="rounded-lg border border-green-800/50 bg-green-950/30 p-6">
          <p className="font-semibold text-green-400">Payment link sent</p>
          <p className="mt-1 text-sm text-green-400/80">
            The checkout link has been emailed to{" "}
            <span className="font-medium text-green-300">{sentTo}</span>.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-4 text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            Create another order
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Price ($)
            </label>
            <input
              type="number"
              step="0.01"
              min="0.50"
              required
              placeholder="25.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Product Description
            </label>
            <input
              type="text"
              required
              placeholder="Tacoma Glove Box Organizer — Black PLA"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Customer Name
            </label>
            <input
              type="text"
              required
              placeholder="John Smith"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Customer Email
            </label>
            <input
              type="email"
              required
              placeholder="john@example.com"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Notes{" "}
              <span className="font-normal text-muted">(optional)</span>
            </label>
            <textarea
              rows={3}
              placeholder="Any details about the order..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputClass}
            />
          </div>

          {status === "error" && (
            <p className="text-sm text-red-400">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
          >
            {status === "sending"
              ? "Creating & Sending..."
              : "Create Order & Send Payment Link"}
          </button>
        </form>
      )}
    </div>
  );
}
