import { Search, ShieldCheck, UploadCloud, Mail, MoveDown } from "lucide-react";

const steps = [
   { number: "01", label: "RECEIVE REQUEST", icon: Search },
   { number: "02", label: "ASSIGN AGENT", icon: ShieldCheck },
   { number: "03", label: "EXECUTE TASK", icon: UploadCloud },
   { number: "04", label: "CONFIRM RESULT", icon: Mail },
];

const STRIPE = {
   backgroundImage:
      "repeating-linear-gradient(-45deg, var(--sand) 0, var(--sand) 1px, transparent 0, transparent 50%)",
   backgroundSize: "6px 6px",
   opacity: 0.2,
};

export default function Overview() {
   return (
      <section id="overview" className="w-full px-4 sm:px-8 py-3 sm:py-4 bg-ink">
         <div className="relative w-full overflow-hidden bg-ink-dark border border-sand-mid/10">

            {/* ── Video layer (absolute, fills container) ── */}
            <div className="absolute inset-0">
               <video
                  src="https://framerusercontent.com/assets/dfboIYKqIjVKKSg0iouAQ800g.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover bg-charcoal-light"
               />
               <div
                  className="absolute inset-0 bg-sand-mid"
                  style={{ mixBlendMode: "color" }}
               />
               <div
                  className="absolute inset-0 bg-ink-dark"
                  style={{
                     WebkitMaskImage:
                        "radial-gradient(circle at center, transparent 38%, black 38%)",
                     WebkitMaskSize: "4px 4px",
                     maskImage:
                        "radial-gradient(circle at center, transparent 38%, black 38%)",
                     maskSize: "4px 4px",
                  }}
               />
            </div>

            {/* ── Content overlay ── */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-9">

               {/* Left box */}
               <div className="flex flex-col gap-6 p-6 sm:p-8 bg-ink-dark">
                  {/* Badge */}
                  <div className="flex items-stretch border-t border-b border-sand/40">
                     <div className="flex items-center gap-2 py-2 pr-6 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                        <span className="text-sand text-xs font-mono uppercase">Overview</span>
                     </div>
                     <div className="flex-1" style={STRIPE} />
                  </div>

                  {/* Description */}
                  <p className="text-xl sm:text-2xl lg:text-3xl font-geist leading-snug text-sand">
                     Provance is an{" "}
                     <span className="text-orange">AI-powered agent workforce</span> that
                     hires, coordinates, and pays agents to complete{" "}
                     <span className="text-white">real tasks autonomously.</span>
                     <br />
                     <br />
                     It connects your tools and teams so agents can{" "}
                     <span className="text-orange">resolve requests, run workflows,</span>{" "}
                     and keep records accurate — with full visibility and control.
                  </p>
               </div>

               {/* Right — workflow steps */}
               <div className="flex flex-col gap-3 p-6 sm:p-8 bg-ink-dark relative overflow-hidden">
                  {/* Stripe background */}
                  <div
                     className="absolute inset-0 pointer-events-none"
                     style={{
                        backgroundImage:
                           "repeating-linear-gradient(-45deg, var(--sand) 0, var(--sand) 1px, transparent 0, transparent 50%)",
                        backgroundSize: "6px 6px",
                        opacity: 0.07,
                     }}
                  />

                  {/* Header */}
                  <div className="flex items-center gap-3 mb-1 relative">
                     <span className="text-sand text-xs font-mono whitespace-nowrap">
                        Task request
                     </span>
                     <div className="flex-1 h-px bg-sand/20" />
                     <span className="text-sand/40 text-xs font-mono whitespace-nowrap">
                        Workflow example
                     </span>
                  </div>

                  {/* Steps */}
                  {steps.map(({ number, label, icon: Icon }, i) => (
                     <div key={number} className="flex flex-col relative">
                        <div className="flex items-center gap-4 px-5 py-4 bg-ink border border-sand-mid/10">
                           <span className="text-sand/40 text-xs font-mono w-6 flex-shrink-0">
                              {number}
                           </span>
                           <span className="flex-1 text-center text-sand text-xs font-bold tracking-widest">
                              {label}
                           </span>
                           <Icon size={16} className="text-sand/40 flex-shrink-0" />
                        </div>
                        {i < steps.length - 1 && (
                           <div className="flex justify-center py-1">
                              <MoveDown size={14} className="text-sand/30" />
                           </div>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}
