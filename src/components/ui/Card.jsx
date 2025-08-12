import { cn } from "../../utils/cn";

const Card = ({ className, ...props }) => (
  <div className={cn("card", className)} {...props} />
);

const CardHeader = ({ className, ...props }) => (
  <div className={cn("card-header", className)} {...props} />
);

const CardTitle = ({ className, ...props }) => (
  <h3 className={cn("card-title", className)} {...props} />
);

const CardDescription = ({ className, ...props }) => (
  <p className={cn("card-description", className)} {...props} />
);

const CardContent = ({ className, ...props }) => (
  <div className={cn("card-content", className)} {...props} />
);

const CardFooter = ({ className, ...props }) => (
  <div className={cn("card-footer", className)} {...props} />
);

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
