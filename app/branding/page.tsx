import ProvanceLogo from "@/components/shared/ProvanceLogo";

export default function BrandingPage() {
   return (
      <main className="flex min-h-screen">
         {/* Dark side */}
         <div className="flex flex-1 items-center justify-center bg-ink">
            <ProvanceLogo className="text-sand w-48 h-auto" />
         </div>

         {/* Cream side */}
         <div className="flex flex-1 items-center justify-center bg-sand">
            <ProvanceLogo className="text-ink w-48 h-auto" />
         </div>
      </main>
   );
}
