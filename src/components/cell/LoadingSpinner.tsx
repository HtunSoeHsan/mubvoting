import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx"; // Ensure you install clsx: npm install clsx
import { Loader2 } from "lucide-react";

const SpinnerVarient = cva(
  "border-4 rounded-full border-brand-200 border-t-brand-700 animate-spin duration-700",
  {
    variants: {
      size: {
        sm: "w-4 h-4 border-2",
        md: "w-6 h-6 border-4",
        lg: "w-8 h-8 border-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

interface LoadingSpinnerProps extends VariantProps<typeof SpinnerVarient> {
  className?: string;
}

function LoadingSpinner({ size, className }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <div className={clsx(SpinnerVarient({ size }), className)}>
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
}

export default LoadingSpinner;
