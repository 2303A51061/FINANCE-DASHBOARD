import { LucideIcon } from "lucide-react";
import { formatCurrency } from "@/utils/helpers";

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "income" | "expense";
}

const variantStyles = {
  default: "border-l-primary",
  income: "border-l-success",
  expense: "border-l-destructive",
};

const SummaryCard = ({ title, amount, icon: Icon, trend, variant = "default" }: SummaryCardProps) => {
  return (
    <div
      className={`glass-card rounded-lg p-5 border-l-4 ${variantStyles[variant]} animate-fade-in transition-all duration-200 hover:shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold font-heading text-card-foreground">
            {formatCurrency(amount)}
          </p>
          {trend && (
            <p className="text-xs text-muted-foreground">{trend}</p>
          )}
        </div>
        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
          <Icon className="h-5 w-5 text-secondary-foreground" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
