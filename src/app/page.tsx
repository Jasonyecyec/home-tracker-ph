"use client";
// Externals
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
// Components
import AuthLayout from "@/components/layout/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { createClient } from "@/lib/supabase/client";
import { type LoginFormSchema, loginSchema } from "@/schemas/auth.schema";

const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin;

export default function Home() {
  const supabase = createClient();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: LoginFormSchema) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error(error.message);
      }
      if (data.user) {
        router.push("/dashboard");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleButton = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${getSiteUrl()}/auth/callback?next=/dashboard`,
        },
      });
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <div className="mb-8">
          <h2 className="text-4xl font-semibold leading-tight tracking-[-0.02em] text-brand-ink text-balance sm:text-5xl">
            Welcome back.
          </h2>
          <p className="mt-3 max-w-sm text-base leading-7 text-brand-muted">
            Sign in to review saved homes, compare details, and keep your next
            move organized.
          </p>
        </div>

        <div className="rounded-3xl border border-brand-border bg-white/80 p-4 shadow-[0_20px_70px_rgba(23,35,31,0.1)] backdrop-blur-xl sm:p-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-2.5">
              <Label
                htmlFor="email"
                className="text-sm font-semibold text-brand-ink-soft"
              >
                Email address
              </Label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-3.5 top-6 size-4 -translate-y-1/2 text-brand-muted-light"
                  aria-hidden="true"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  {...register("email")}
                  error={errors.email?.message}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.email)}
                  className="h-12 rounded-xl border-brand-input bg-brand-surface pl-10 text-brand-ink shadow-none transition-all placeholder:text-brand-muted-light focus-visible:border-brand-ring focus-visible:ring-brand-ring/15"
                />
              </div>
            </div>

            <div className="grid gap-2.5">
              <Label
                htmlFor="password"
                className="text-sm font-semibold text-brand-ink-soft"
              >
                Password
              </Label>
              <div className="relative">
                <LockKeyhole
                  className="pointer-events-none absolute left-3.5 top-6 size-4 -translate-y-1/2 text-brand-muted-light"
                  aria-hidden="true"
                />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  error={errors.password?.message}
                  {...register("password")}
                  disabled={isSubmitting}
                  aria-invalid={Boolean(errors.password)}
                  className="h-12 rounded-xl border-brand-input bg-brand-surface pl-10 pr-12 text-brand-ink shadow-none transition-all focus-visible:border-brand-ring focus-visible:ring-brand-ring/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((isVisible) => !isVisible)}
                  disabled={isSubmitting}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute right-2.5 top-6 inline-flex size-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-brand-muted-light transition hover:bg-brand-hover hover:text-brand-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-ring/25 disabled:pointer-events-none disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12 w-full rounded-xl bg-brand-ink text-base font-semibold text-white transition hover:bg-brand-primary-hover hover:shadow-[0_18px_36px_rgba(23,35,31,0.3)]"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
              {!isSubmitting && (
                <ArrowRight className="size-4" aria-hidden="true" />
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.18em] text-brand-muted-light">
            <div className="h-px flex-1 bg-brand-hover" />
            Or
            <div className="h-px flex-1 bg-brand-hover" />
          </div>

          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleButton}
            className="h-12 w-full rounded-xl border-brand-input bg-brand-surface text-base font-semibold text-brand-ink shadow-none transition hover:border-brand-muted-light hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </div>

        {/* Temporary Comment  */}
        {/* <p className="mt-6 text-center text-sm text-brand-muted">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-semibold text-emerald-800 underline-offset-4 transition hover:text-emerald-950 hover:underline"
          >
            Create one
          </Link>
        </p> */}
      </div>
    </AuthLayout>
  );
}
