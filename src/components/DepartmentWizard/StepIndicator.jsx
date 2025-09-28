import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

export const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                currentStep > step.number
                  ? "bg-step-completed text-white"
                  : currentStep === step.number
                  ? "bg-step-active text-white"
                  : "bg-step-inactive text-muted-foreground"
              )}
            >
              {currentStep > step.number ? (
                <Check className="w-4 h-4" />
              ) : (
                step.number
              )}
            </div>
            <span className="mt-2 text-sm font-medium text-foreground">
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-px bg-border mx-4 mt-[-16px]" />
          )}
        </div>
      ))}
    </div>
  );
};
