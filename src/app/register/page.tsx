import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import RegisterForm from "@/components/modules/auth/register/registerForm";
import Logo from "@/components/shared/Logo";

export default function Register() {
  return (
    <div className="flex min-h-screen bg-fh-green-deep">
      <div className="relative hidden flex-col justify-between overflow-hidden p-14 lg:flex lg:w-1/2">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 60% 40%,rgba(138,184,144,0.1) 0%,transparent 60%)",
          }}
        />
        <Logo foodColor="text-white" />
        <div className="relative z-10 space-y-5">
          <h2 className="font-display text-5xl font-bold leading-tight tracking-tight text-fh-cream">
            Join the{" "}
            <em className="font-light text-fh-green-light">community.</em>
          </h2>
          <p className="text-lg font-light text-fh-cream/50">
            Whether you love food or cook it, there&apos;s a place for you here.
          </p>
          <div className="space-y-3 pt-2">
            {[
              "Browse 340+ meals from local restaurants",
              "Real-time order tracking",
              "Leave reviews and discover new favorites",
              "Cash on delivery, no payment setup needed",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-fh-green-light/20">
                  <Check className="h-3 w-3 text-fh-green-light" />
                </div>
                <p className="text-sm text-fh-cream/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="relative z-10 text-xs text-white/25">
          2025 FoodHub, Chattogram, Bangladesh
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center overflow-y-auto bg-fh-cream px-6 py-10">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-fh-green-muted transition-colors hover:text-fh-green-deep"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h1 className="mb-1 font-display text-3xl font-bold tracking-tight text-fh-green-deep">
            Create account
          </h1>
          <p className="mb-7 text-sm text-fh-green-muted">
            Get started. It&apos;s free.
          </p>

          <RegisterForm />

          <div className="text-center">
            <p className="mt-6 text-center text-sm text-fh-green-muted">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-fh-coral hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
