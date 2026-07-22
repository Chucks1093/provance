import { TooltipProvider } from "@/components/ui/tooltip";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <TooltipProvider delayDuration={0}>
         <div className="h-screen flex flex-col overflow-hidden bg-ink text-sand">
            <DashboardHeader />
            <div className="flex flex-1 min-h-0 overflow-hidden">
               <DashboardSidebar />
               <main className="flex-1 overflow-y-auto min-w-0">
                  {children}
               </main>
            </div>
         </div>
      </TooltipProvider>
   );
}
