import { useAppContext } from "@/context/AppContext";
import { calcTotals, groupByCategory, groupByMonth, formatCurrency } from "@/utils/helpers";
import { TrendingUp, TrendingDown, AlertTriangle, BarChart3 } from "lucide-react";

const Insights = () => {
  const { transactions } = useAppContext();
  const { income, expenses } = calcTotals(transactions);
  const topCategory = groupByCategory(transactions, "expense")[0];
  const monthly = groupByMonth(transactions);

  // Monthly comparison insight
  let monthlyInsight = "";
  if (monthly.length >= 2) {
    const curr = monthly[monthly.length - 1];
    const prev = monthly[monthly.length - 2];
    if (prev.expenses > 0) {
      const pctChange = ((curr.expenses - prev.expenses) / prev.expenses) * 100;
      if (pctChange > 0) {
        monthlyInsight = `You spent ${Math.abs(pctChange).toFixed(0)}% more this month compared to last month`;
      } else {
        monthlyInsight = `You saved ${Math.abs(pctChange).toFixed(0)}% this month compared to last month`;
      }
    }
  }

  // Savings rate
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const insights = [
    {
      icon: TrendingDown,
      title: "Top Spending Category",
      value: topCategory ? `${topCategory.name} — ${formatCurrency(topCategory.value)}` : "N/A",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      icon: BarChart3,
      title: "Monthly Trend",
      value: monthlyInsight || "Not enough data for comparison",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      icon: savingsRate >= 20 ? TrendingUp : AlertTriangle,
      title: "Savings Rate",
      value: `${savingsRate.toFixed(1)}% of income saved`,
      color: savingsRate >= 20 ? "text-success" : "text-warning",
      bgColor: savingsRate >= 20 ? "bg-success/10" : "bg-warning/10",
    },
  ];

  return (
    <div className="glass-card rounded-lg p-5 animate-fade-in">
      <h3 className="text-base font-bold font-heading text-card-foreground mb-4">Financial Insights</h3>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50 transition-all hover:bg-secondary"
          >
            <div className={`h-8 w-8 rounded-lg ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
              <insight.icon className={`h-4 w-4 ${insight.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-card-foreground">{insight.title}</p>
              <p className="text-sm text-muted-foreground">{insight.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
