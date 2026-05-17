import { Building2, CheckCircle2, MapPin, TrendingUp } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-svh bg-brand-canvas text-brand-ink">
      <div className="grid min-h-svh grid-cols-1 p-3 lg:grid-cols-12 lg:gap-3">
        <section className="relative hidden overflow-hidden rounded-[1.75rem] lg:col-span-7 lg:flex">
          <Image
            src="/images/auth-bg.avif"
            alt="Modern residential exterior"
            fill
            className="absolute inset-0 z-0 h-full w-full object-cover"
            priority
          />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(135deg,rgba(8,24,20,0.86)_0%,rgba(8,24,20,0.44)_48%,rgba(222,167,79,0.2)_100%)]" />
          <div className="absolute inset-0 z-10 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

          <div className="relative z-20 flex min-h-full w-full flex-col justify-between p-10 xl:p-14">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/12 px-3 py-2 text-sm font-medium text-white shadow-2xl backdrop-blur-md">
              <Building2 className="size-4" aria-hidden="true" />
              Home Tracker PH
            </div>

            <div className="max-w-3xl pb-6 text-white">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-amber-100/90">
                Property search command center
              </p>
              <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] text-balance xl:text-7xl">
                Compare homes with calmer, clearer context.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/82">
                Keep listings, status, and next actions organized while you move
                through your property shortlist.
              </p>
            </div>

            <div className="grid max-w-3xl grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/18 bg-white/12 p-4 text-white shadow-2xl backdrop-blur-md">
                <MapPin
                  className="mb-5 size-5 text-amber-100"
                  aria-hidden="true"
                />
                <p className="text-2xl font-semibold">PH</p>
                <p className="mt-1 text-sm leading-5 text-white/72">
                  Location-first tracking
                </p>
              </div>
              <div className="rounded-2xl border border-white/18 bg-white/12 p-4 text-white shadow-2xl backdrop-blur-md">
                <TrendingUp
                  className="mb-5 size-5 text-emerald-100"
                  aria-hidden="true"
                />
                <p className="text-2xl font-semibold">Live</p>
                <p className="mt-1 text-sm leading-5 text-white/72">
                  Search progress view
                </p>
              </div>
              <div className="rounded-2xl border border-white/18 bg-white/12 p-4 text-white shadow-2xl backdrop-blur-md">
                <CheckCircle2
                  className="mb-5 size-5 text-sky-100"
                  aria-hidden="true"
                />
                <p className="text-2xl font-semibold">Ready</p>
                <p className="mt-1 text-sm leading-5 text-white/72">
                  Decisions in one place
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex min-h-[calc(100svh-1.5rem)] items-center justify-center rounded-[1.75rem] border border-brand-border bg-brand-surface px-5 py-8 shadow-[0_24px_80px_rgba(23,35,31,0.1)] lg:col-span-5 lg:px-8">
          <div className="w-full max-w-116">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-border bg-white px-3 py-2 text-sm font-semibold text-brand-ink shadow-sm">
                <Building2
                  className="size-4 text-emerald-800"
                  aria-hidden="true"
                />
                Home Tracker PH
              </div>
            </div>
            {children}
          </div>
        </section>
      </div>
    </main>
  );
}
