import HeroGraphic from "@/components/landing-page/HeroGraphic";

export default function Hero() {
   return (
      <section className="grid grid-cols-2 gap-8 min-h-screen bg-ink px-8 ">
         {/* Left */}
         <div className="flex flex-col gap-8 w-full max-w-2xl pt-25 border-x border-sand-faint px-8 pr-">
            {/* Badge */}
            <div className="flex items-center justify-between w-full max-w-lg  border-t border-b  py-3 border-sand/40 ">
               <div className="flex items-center gap-2  pr-6 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-orange flex-shrink-0" />
                  <p className="text-sand text-xs font-mono uppercase">
                     AI Support, automated
                  </p>
               </div>
               <div
                  className="w-full h-full"
                  style={{
                     backgroundImage:
                        "repeating-linear-gradient(-45deg, var(--sand) 0, var(--sand) 1px, transparent 0, transparent 50%)",
                     backgroundSize: "6px 6px",
                     opacity: 0.2,
                  }}
               />
            </div>

            <h1 className="font-geist text-7xl leading-tight text-sand tracking-tighter font-normal">
               Build Faster with
               <span className="text-white"> Agent Workflows</span>
            </h1>

            <p className="text-base text-sand leading-relaxed max-w-md">
               Connect your tools, data, and teams in one place.
               <br />
               Provance agents hire, coordinate, and execute tasks autonomously.
            </p>

            <div className="grid items-center gap-4 w-full max-w-lg">
               <a
                  href="#waitlist"
                  className="flex items-center justify-center flex-1 h-[56px] bg-sand text-ink-dark font-bold text-sm hover:bg-sand-light transition-colors"
                  style={{
                     clipPath:
                        "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                  }}
               >
                  JOIN WAITLIST
               </a>
               <div
                  className="flex-1 h-[56px] p-[2px]"
                  style={{
                     clipPath:
                        "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                     background: "var(--sand-mid)",
                  }}
               >
                  <a
                     href="#learn-more"
                     className="flex items-center justify-center w-full h-full text-sand font-bold text-sm hover:bg-sand-mid/10 transition-colors"
                     style={{
                        clipPath:
                           "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)",
                        background: "var(--ink-dark)",
                     }}
                  >
                     LEARN MORE
                  </a>
               </div>
            </div>
         </div>

         {/* Right */}
         <div className="relative flex items-center justify-center py-20 border-x border-sand-faint">
            <div className="hero-dots absolute inset-0" />
            <HeroGraphic />
         </div>
      </section>
   );
}
