"use client";

import { useState } from "react";

const STRIPE = {
   backgroundImage:
      "repeating-linear-gradient(-45deg, var(--sand) 0, var(--sand) 1px, transparent 0, transparent 50%)",
   backgroundSize: "6px 6px",
   opacity: 0.07,
};

export default function Waitlist() {
   const [email, setEmail] = useState("");
   const [submitted, setSubmitted] = useState(false);

   function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      if (!email) return;
      setSubmitted(true);
   }

   return (
      <section className="w-full px-4 sm:px-8 py-3 sm:py-4 bg-ink">
         <div className="w-full bg-ink-dark border border-sand-mid/10 relative overflow-hidden">
            {/* Stripe background */}
            <div className="absolute inset-0 pointer-events-none" style={STRIPE} />

            {/* Badge */}
            <div className="relative flex items-stretch border-b border-sand-mid/10">
               <div className="flex items-center gap-2 py-3 px-6 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                  <span className="text-sand text-xs font-mono uppercase">Early Access</span>
               </div>
               <div className="flex-1 relative">
                  <div className="absolute inset-0" style={{ ...STRIPE, opacity: 0.18 }} />
               </div>
            </div>

            {/* Content */}
            <div className="relative flex flex-col items-center text-center px-6 sm:px-12 py-16 sm:py-24 gap-8">
               <h2 className="font-geist text-4xl sm:text-6xl font-normal text-sand leading-tight max-w-2xl">
                  Be first when the<br />
                  <span className="text-white">agents go live</span>
               </h2>

               <p className="text-sand/55 text-sm leading-relaxed max-w-sm">
                  Join the waitlist and get early access to Provance — the autonomous AI
                  agent workforce that runs your workflows so you don't have to.
               </p>

               {submitted ? (
                  <div className="flex items-center gap-3 border border-sand-mid/20 px-8 py-4">
                     <div className="w-2 h-2 rounded-full bg-orange" />
                     <p className="text-sand text-sm font-mono">You're on the list. We'll be in touch.</p>
                  </div>
               ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 w-full max-w-md">
                     <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 h-[52px] bg-ink-heavy border border-sand-mid/20 border-r-0 px-5 text-sand text-sm placeholder-sand/30 outline-none focus:border-sand-mid/50 transition-colors"
                     />
                     <button
                        type="submit"
                        className="h-[52px] px-8 bg-sand text-ink-dark font-bold text-xs tracking-widest hover:bg-sand-light transition-colors flex-shrink-0"
                        style={{
                           clipPath:
                              "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)",
                        }}
                     >
                        JOIN WAITLIST
                     </button>
                  </form>
               )}

               <p className="text-sand/25 text-xs font-mono">
                  No spam. Unsubscribe anytime.
               </p>
            </div>
         </div>
      </section>
   );
}
