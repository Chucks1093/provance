import ProvanceLogo from "@/components/shared/ProvanceLogo";

const navLinks = [
   { label: "Home", href: "#" },
   { label: "About", href: "#about" },
   { label: "Updates", href: "#updates" },
   { label: "Blog", href: "#blog" },
];

export default function Header() {
   return (
      <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-ink-dark">
         <ProvanceLogo className="text-white" />

         <nav className="flex items-center gap-10">
            {navLinks.map((link) => (
               <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-sand-mid hover:text-sand transition-colors"
               >
                  {link.label}
               </a>
            ))}

            <a
               href="#get-started"
               className="px-6 py-3 text-sm font-bold tracking-wider bg-orange text-ink-dark hover:bg-orange-dark transition-colors"
            >
               GET STARTED
            </a>
         </nav>
      </header>
   );
}
