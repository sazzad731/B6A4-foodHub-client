import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import RegisterForm from "@/components/modules/auth/register/registerForm";
import Logo from "@/components/shared/Logo";

export default function Register() {
   return (
     <div className="min-h-screen flex bg-fh-green-deep">
       {/* Left panel */}
       <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden">
         <div className="absolute inset-0" style={{
             background:
               "radial-gradient(ellipse 60% 60% at 60% 40%,rgba(138,184,144,0.1) 0%,transparent 60%)",
           }}
         />
         <Logo foodColor="text-white"/>
         <div className="relative z-10 space-y-5">
           <h2 className="font-display text-5xl font-bold text-fh-cream leading-tight tracking-tight">
             Join the{" "}
             <em className="font-light text-fh-green-light">community.</em>
           </h2>
           <p className="text-fh-cream/50 text-lg font-light">
             Whether you love food or cook it — there's a place for you here.
           </p>
           <div className="space-y-3 pt-2">
             {[
               "Browse 340+ meals from local restaurants",
               "Real-time order tracking",
               "Leave reviews & discover new favorites",
               "Cash on delivery — no payment setup needed",
             ].map((t) => (
               <div key={t} className="flex items-center gap-3">
                 <div className="w-5 h-5 rounded-full bg-fh-green-light/20 flex items-center justify-center shrink-0">
                   <Check className="h-3 w-3 text-fh-green-light" />
                 </div>
                 <p className="text-fh-cream/70 text-sm">{t}</p>
               </div>
             ))}
           </div>
         </div>
         <p className="text-white/25 text-xs relative z-10">
           © 2025 FoodHub · Chattogram, Bangladesh
         </p>
       </div>

       {/* Right form */}
       <div className="flex-1 flex items-center justify-center px-6 py-10 bg-fh-cream overflow-y-auto">
         <div className="w-full max-w-md">
           <Link
             href="/"
             className="inline-flex items-center gap-1.5 text-sm text-fh-green-muted hover:text-fh-green-deep mb-8 transition-colors"
           >
             <ArrowLeft className="h-4 w-4" /> Back to home
           </Link>
           <h1 className="font-display text-3xl font-bold text-fh-green-deep tracking-tight mb-1">
             Create account
           </h1>
           <p className="text-fh-green-muted text-sm mb-7">
             Get started — it&apos;s free.
           </p>
           <RegisterForm/>
         </div>
       </div>
     </div>
   );
}
