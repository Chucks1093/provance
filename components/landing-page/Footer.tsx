import ProvanceLogo from "@/components/shared/ProvanceLogo";

const links = {
   Product: ["Features", "Overview", "Pricing", "Changelog"],
   Company: ["About", "Blog", "Careers", "Contact"],
   Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

const CLIP = "polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)";

export default function Footer() {
   return (
      <section className="w-full px-4 sm:px-8 py-12 sm:py-20 bg-ink">
         <footer
            className="w-full bg-orange relative overflow-hidden"
            style={{ clipPath: CLIP }}
         >
            {/* Diagonal stripe overlay */}
            <div
               className="absolute inset-0 pointer-events-none"
               style={{
                  backgroundImage:
                     "repeating-linear-gradient(-45deg, var(--ink-dark) 0, var(--ink-dark) 1px, transparent 0, transparent 50%)",
                  backgroundSize: "6px 6px",
                  opacity: 0.08,
               }}
            />

            <div className="relative z-10 px-4 sm:px-12 py-16">
               {/* Top row */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-12 border-b border-ink-dark/20">
                  {/* Brand */}
                  <div className="flex flex-col gap-6">
                     <ProvanceLogo className="text-ink-dark" />
                     <p className="text-ink-dark/70 text-sm max-w-xs leading-relaxed">
                        An autonomous AI agent workforce. Agents hire, coordinate, and execute
                        real tasks so your team ships faster.
                     </p>
                  </div>

                  {/* Links */}
                  <div className="grid grid-cols-3 gap-8">
                     {Object.entries(links).map(([category, items]) => (
                        <div key={category} className="flex flex-col gap-4">
                           <p className="text-ink-dark text-xs font-bold tracking-widest uppercase">
                              {category}
                           </p>
                           <ul className="flex flex-col gap-3">
                              {items.map((item) => (
                                 <li key={item}>
                                    <a
                                       href="#"
                                       className="text-ink-dark/60 text-sm hover:text-ink-dark transition-colors"
                                    >
                                       {item}
                                    </a>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Bottom row */}
               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8">
                  <p className="text-ink-dark/50 text-xs">
                     © {new Date().getFullYear()} Provance. All rights reserved.
                  </p>
                  <p className="text-ink-dark/50 text-xs">
                     Built with AI agents, for AI teams.
                  </p>
               </div>
            </div>
         </footer>
      </section>
   );
}
