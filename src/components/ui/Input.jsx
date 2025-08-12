import { cn } from "../../utils/cn";

const Input = ({ className, ...props }) => {
  return <input className={cn("input", className)} {...props} />;
};

export default Input;
