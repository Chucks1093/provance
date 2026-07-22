"use client";

import { AlertCircle, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { forwardRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DashboardHeaderDropdownErrorProps {
   message: string;
}

export function DashboardHeaderDropdownError({
   message,
}: DashboardHeaderDropdownErrorProps) {
   return (
      <div className="flex items-center space-x-2 text-amber-900">
         <AlertCircle size={16} strokeWidth={1.5} />
         <p className="text-sm">{message}</p>
      </div>
   );
}

interface DashboardHeaderDropdownTriggerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   className?: string;
}

export const DashboardHeaderDropdownTriggerButton = forwardRef<
   HTMLButtonElement,
   DashboardHeaderDropdownTriggerButtonProps
>(({ className, ...props }, ref) => (
   <Button
      ref={ref}
      variant="text"
      size="tiny"
      className={cn(
         "px-1.5 py-4 ml-1 [&_svg]:w-5 [&_svg]:h-5 cursor-pointer",
         className,
      )}
      {...props}
   >
      <ChevronsUpDown strokeWidth={1.5} className="text-muted-foreground" />
   </Button>
));
DashboardHeaderDropdownTriggerButton.displayName =
   "DashboardHeaderDropdownTriggerButton";

export interface DashboardHeaderDropdownWithPopoverProps {
   linkHref: string;
   linkContent: ReactNode;
   linkClassName?: string;
   commandContent: ReactNode;
   open: boolean;
   onOpenChange: (open: boolean) => void;
   triggerButton?: ReactNode;
}

export function DashboardHeaderDropdownWithPopover({
   linkHref,
   linkContent,
   linkClassName = "flex items-center gap-2 shrink-0 text-sm",
   commandContent,
   open,
   onOpenChange,
   triggerButton,
}: DashboardHeaderDropdownWithPopoverProps) {
   return (
      <Popover open={open} onOpenChange={onOpenChange} modal={false}>
         <div className="flex items-center shrink-0">
            <Link href={linkHref} className={linkClassName}>
               {linkContent}
            </Link>
            <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
         </div>
         <PopoverContent className="p-0" side="bottom" align="start">
            {commandContent}
         </PopoverContent>
      </Popover>
   );
}
