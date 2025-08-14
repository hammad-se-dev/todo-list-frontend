import { cn } from "../../utils/cn";
import { CheckCircle } from "lucide-react";

const Input = ({ className, error, touched, isValid, ...props }) => {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          className={cn(
            "input pr-10",
            error && touched && "border-red-500 focus-visible:ring-red-500",
            isValid &&
              touched &&
              !error &&
              "border-green-500 focus-visible:ring-green-500",
            className
          )}
          {...props}
        />
        {isValid && touched && !error && (
          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
        )}
      </div>
      {error && touched && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {isValid && touched && !error && (
        <p className="mt-1 text-sm text-green-600">✓ Valid input</p>
      )}
    </div>
  );
};

export default Input;
