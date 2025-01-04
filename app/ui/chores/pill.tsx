import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { DirtinessStatus } from "./Chore";

const pillVariants = cva("py-1 px-4 rounded w-fit", {
  variants: {
    variant: {
      Clean: "bg-clean",
      "Ready to clean": "bg-dirty",
      Dirty: "bg-red-600",
      "Very dirty": "g-red-800",
    },
  },
  defaultVariants: {
    variant: "Clean",
  },
});

function Pill({ children, variant }: PillProps) {
  return (
    <div className={cn(pillVariants({ variant }))}>
      <p className="font-medium">{children}</p>
    </div>
  );
}

export default Pill;

interface PillProps {
  children: React.ReactNode;
  variant: DirtinessStatus;
}
