import Link from "next/link";

export const metadata = {
  title: "Custom Order Confirmed — Proper Polymer",
};

export default function CustomOrderSuccessPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-20">
      <div className="flex flex-col items-center text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-3xl">
          ✓
        </div>
        <p className="mb-1 text-sm font-medium uppercase tracking-widest text-accent">
          Order Confirmed
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Thank you, your order is confirmed!
        </h1>
        <p className="mt-3 text-muted">
          You&apos;ll receive a confirmation email from{" "}
          <span className="text-foreground">hello@properpolymer.com</span>{" "}
          shortly.
        </p>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-block rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
