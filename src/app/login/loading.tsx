import { LoaderIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export default function LoginPageLoading({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className="w-full min-h-svh flex items-center justify-center">
      <LoaderIcon
        role="status"
        aria-label="Loading"
        className={cn("size-10 animate-spin", className)}
        {...props}
      />
    </div>
  );
}
