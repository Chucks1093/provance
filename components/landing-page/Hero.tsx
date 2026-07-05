import HeroGraphic from "@/components/landing-page/HeroGraphic";

export default function Hero() {
   return (
      <section className="flex min-h-screen bg-ink-dark px-8 py-20">
         {/* Left */}
         <div className="flex flex-col justify-center gap-8 flex-1 max-w-2xl">
            <h1 className="font-manrope text-7xl leading-tight text-sand">
               Build Faster
               <br />
               with AI
               <br />
               <span className="font-bold">Agent Workflows</span>
            </h1>

            <p className="text-base text-sand leading-relaxed max-w-md">
               Connect your tools, data, and teams in one place.
               <br />
               Provance agents hire, coordinate, and execute tasks autonomously.
            </p>

            <a
               href="#get-started"
               className="flex items-center justify-center w-full max-w-md h-[72px] bg-sand text-ink font-bold text-sm tracking-widest hover:bg-sand-light transition-colors"
               style={{
                  clipPath:
                     "polygon(0 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%)",
               }}
            >
               GET STARTED
            </a>
         </div>

         {/* Right */}
         <div className="flex-1 relative flex items-center justify-center">
            <div className="hero-dots absolute inset-0" />
            <HeroGraphic />
         </div>
      </section>
   );
}
