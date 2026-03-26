import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginForm from "@/components/modules/auth/login/LoginForm";
import Logo from "@/components/shared/Logo";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-fh-green-deep">
      {/* Left art panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 40% 50%,rgba(232,75,42,0.12) 0%,transparent 60%)",
          }}
        />
        <Logo foodColor="text-white" />
        <div className="relative z-10">
          <h2 className="font-display text-5xl font-bold text-fh-cream leading-tight tracking-tight mb-4">
            Welcome <em className="font-light text-fh-coral">back.</em>
          </h2>
          <p className="text-fh-cream/50 text-lg font-light">
            Your favourite meals are just a few clicks away.
          </p>
        </div>
        <div className="flex gap-3 relative z-10">
          {["🍕", "🍔", "🍣", "🍜", "🥗", "🍝"].map((e) => (
            <div
              key={e}
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-white/7"
            >
              {e}
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex-1 flex items-center justify-center px-6 bg-fh-cream">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-fh-green-muted hover:text-fh-green-deep mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <h1 className="font-display text-3xl font-bold text-fh-green-deep tracking-tight mb-1">
            Log in
          </h1>
          <p className="text-fh-green-muted text-sm mb-8">
            Enter your credentials to access your account.
          </p>

          <div className="bg-fh-cream-mid rounded-xl p-4 mb-6 border border-fh-cream-dark text-sm">
            <p className="font-semibold text-fh-green-deep mb-1">
              Demo credentials
            </p>
            <p className="text-fh-green-muted">
              <strong>Admin:</strong> admin@foodhub.com / admin123
            </p>
            <p className="text-fh-green-muted">
              <strong>Provider:</strong> chef@pizzeria.com / provider123
            </p>
            <p className="text-fh-green-muted">
              <strong>Customer:</strong> john@example.com / password123
            </p>
          </div>

          <LoginForm/>
          
          <p className="text-center text-sm text-fh-green-muted mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-fh-coral font-semibold hover:underline"
            >
              Create one →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;