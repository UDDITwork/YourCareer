import * as React from "react"
import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle } from "lucide-react"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  validation?: {
    isValid?: boolean;
    message?: string;
  };
  showValidation?: boolean;
  isTouched?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, validation, showValidation = true, isTouched = false, ...props }, ref) => {
    const isValid = validation?.isValid;
    const showStatus = showValidation && typeof isValid !== 'undefined' && isTouched;

    return (
      <div className="relative w-full">
        <input
          type={type}
          className={cn(
            // Base styles - Magazine editorial style
            "flex h-11 w-full border-2 bg-card px-4 py-2 text-base font-body",
            "placeholder:text-muted-foreground/60",
            "transition-all duration-200",

            // Default state
            "border-border",

            // Hover state
            "hover:border-foreground/50",

            // Focus state
            "focus:border-primary focus:ring-2 focus:ring-primary/20 focus:ring-offset-0",
            "focus-visible:outline-none",

            // Validation states - only show when touched
            showStatus && isValid && "border-primary/50 focus:border-primary focus:ring-primary/10",
            showStatus && !isValid && "border-destructive/50 focus:border-destructive focus:ring-destructive/10",

            // Icon padding
            showStatus && "pr-10",

            // Disabled state
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-secondary",

            // File input styles
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",

            className
          )}
          ref={ref}
          aria-invalid={showStatus && !isValid}
          {...props}
        />

        {/* Validation Icons */}
        {showStatus && (
          <div
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none",
              "transition-opacity duration-200",
              isTouched ? "opacity-100" : "opacity-0"
            )}
          >
            {isValid ? (
              <CheckCircle2 className="w-5 h-5 text-primary transition-transform duration-200" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive transition-transform duration-200" />
            )}
          </div>
        )}

        {/* Validation Message */}
        {showStatus && validation?.message && !isValid && (
          <p
            className={cn(
              "text-xs text-destructive mt-1 ml-1 font-body",
              "transition-all duration-200",
              isTouched ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"
            )}
          >
            {validation.message}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
