import Header from "@/components/landing-page/Header";

const STRIPE = {
   backgroundImage:
      "repeating-linear-gradient(-45deg, var(--sand) 0, var(--sand) 1px, transparent 0, transparent 50%)",
   backgroundSize: "6px 6px",
   opacity: 0.07,
};

const principles = [
   {
      number: "01",
      title: "Agents as workers, not tools",
      body: "Most AI products give you a smarter interface. Provance gives you a workforce. Each agent has a role, a scope, and the ability to delegate — just like a human team.",
   },
   {
      number: "02",
      title: "Coordination is the hard part",
      body: "Running a single task with AI is solved. Running ten interdependent tasks across systems, with approvals, fallbacks, and audit trails — that's what Provance is built for.",
   },
   {
      number: "03",
      title: "Full visibility, always",
      body: "Every action an agent takes is logged, explainable, and reversible. You set the rules. Agents operate within them. Nothing happens in a black box.",
   },
   {
      number: "04",
      title: "Built for real workflows",
      body: "Not demos. Not toy examples. Provance agents connect to your actual tools — your CRM, helpdesk, databases — and complete work that moves your business forward.",
   },
];

export default function AboutPage() {
   return (
      <main className="min-h-screen bg-ink">
         <Header />

         {/* Hero */}
         <section className="w-full px-4 sm:px-8 pt-16 pb-4 bg-ink">
            <div className="w-full bg-ink-dark border border-sand-mid/10 relative overflow-hidden">
               <div className="absolute inset-0 pointer-events-none" style={STRIPE} />

               {/* Badge */}
               <div className="relative flex items-stretch border-b border-sand-mid/10">
                  <div className="flex items-center gap-2 py-3 px-6 flex-shrink-0">
                     <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                     <span className="text-sand text-xs font-mono uppercase">About Provance</span>
                  </div>
                  <div className="flex-1 relative">
                     <div className="absolute inset-0" style={{ ...STRIPE, opacity: 0.18 }} />
                  </div>
               </div>

               <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left — headline */}
                  <div className="flex flex-col justify-between p-8 sm:p-14 border-b lg:border-b-0 lg:border-r border-sand-mid/10">
                     <h1 className="font-geist text-4xl sm:text-6xl font-normal text-sand leading-tight">
                        Work shouldn't require<br />
                        <span className="text-white">a human for every step</span>
                     </h1>
                     <p className="mt-10 text-sand/50 text-xs font-mono uppercase tracking-widest">
                        Provance — {new Date().getFullYear()}
                     </p>
                  </div>

                  {/* Right — mission */}
                  <div className="flex flex-col gap-8 p-8 sm:p-14">
                     <p className="text-sand/70 text-base leading-relaxed">
                        Provance is building the infrastructure for autonomous AI agent teams —
                        systems where agents can hire each other, coordinate tasks, handle
                        approvals, and complete real work end-to-end without constant human
                        intervention.
                     </p>
                     <p className="text-sand/70 text-base leading-relaxed">
                        We started from a simple observation: most businesses run the same
                        workflows over and over, and almost none of them require human
                        judgement at every step. The bottleneck isn't capability — it's
                        coordination.
                     </p>
                     <p className="text-sand/70 text-base leading-relaxed">
                        Provance is the layer that makes coordination automatic.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* What we're building */}
         <section className="w-full px-4 sm:px-8 py-3 bg-ink">
            <div className="w-full bg-ink-dark border border-sand-mid/10">
               {/* Badge */}
               <div className="flex items-stretch border-b border-sand-mid/10">
                  <div className="flex items-center gap-2 py-3 px-6 flex-shrink-0">
                     <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                     <span className="text-sand text-xs font-mono uppercase">What we're building</span>
                  </div>
                  <div className="flex-1 relative">
                     <div className="absolute inset-0" style={{ ...STRIPE, opacity: 0.18 }} />
                  </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-b border-sand-mid/10">
                  <div className="lg:col-span-1 p-8 sm:p-12 lg:border-r border-sand-mid/10 border-b lg:border-b-0">
                     <h2 className="font-geist text-3xl sm:text-4xl font-normal text-sand leading-tight">
                        An agent workforce<br />platform
                     </h2>
                  </div>
                  <div className="lg:col-span-2 flex flex-col gap-6 p-8 sm:p-12">
                     <p className="text-sand/65 text-sm leading-relaxed">
                        Think of Provance as the operating system for AI work. You define the
                        outcome — resolve this ticket, process this request, update these records.
                        Provance figures out which agents are needed, spins them up, coordinates
                        their work, and delivers the result.
                     </p>
                     <p className="text-sand/65 text-sm leading-relaxed">
                        Agents in Provance are not static. They can spawn sub-agents for
                        specialized tasks, request human approval when they hit a policy
                        boundary, and report back with a full audit trail. The system is
                        designed to be trusted — not just used.
                     </p>
                     <p className="text-sand/65 text-sm leading-relaxed">
                        We're starting with customer support and operations workflows — the
                        highest-volume, most repetitive work in any business. But the
                        architecture is built for anything that can be broken into steps,
                        routed through systems, and validated against rules.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* Principles */}
         <section className="w-full px-4 sm:px-8 py-3 bg-ink">
            <div className="w-full bg-ink-dark border border-sand-mid/10">
               {/* Badge */}
               <div className="flex items-stretch border-b border-sand-mid/10">
                  <div className="flex items-center gap-2 py-3 px-6 flex-shrink-0">
                     <div className="w-2 h-2 rounded-full bg-orange flex-shrink-0" />
                     <span className="text-sand text-xs font-mono uppercase">Principles</span>
                  </div>
                  <div className="flex-1 relative">
                     <div className="absolute inset-0" style={{ ...STRIPE, opacity: 0.18 }} />
                  </div>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                  {principles.map((p, i) => {
                     const isLastRow = i >= principles.length - 2;
                     const isRightCol = i % 2 === 1;
                     return (
                        <div
                           key={p.number}
                           className={[
                              "flex flex-col gap-4 p-8 sm:p-10",
                              !isRightCol ? "sm:border-r border-sand-mid/10" : "",
                              !isLastRow ? "border-b border-sand-mid/10" : "",
                           ].join(" ")}
                        >
                           <span className="text-sand/25 text-xs font-mono">{p.number}</span>
                           <h3 className="font-geist text-lg font-normal text-sand">{p.title}</h3>
                           <p className="text-sand/55 text-sm leading-relaxed">{p.body}</p>
                        </div>
                     );
                  })}
               </div>
            </div>
         </section>

         {/* CTA */}
         <section className="w-full px-4 sm:px-8 py-3 pb-8 bg-ink">
            <div className="w-full bg-ink-dark border border-sand-mid/10 relative overflow-hidden">
               <div className="absolute inset-0 pointer-events-none" style={STRIPE} />
               <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-8 sm:px-12 py-10">
                  <div className="flex flex-col gap-2">
                     <p className="text-sand font-geist text-2xl font-normal">
                        Want to be part of it?
                     </p>
                     <p className="text-sand/50 text-sm">
                        We're in early access. Join the waitlist and we'll reach out directly.
                     </p>
                  </div>
                  <a
                     href="/#waitlist"
                     className="flex-shrink-0 px-8 py-4 bg-sand text-ink-dark font-bold text-xs tracking-widest hover:bg-sand-light transition-colors"
                     style={{
                        clipPath:
                           "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                     }}
                  >
                     JOIN WAITLIST
                  </a>
               </div>
            </div>
         </section>
      </main>
   );
}
