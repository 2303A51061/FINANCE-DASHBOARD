import { useAppContext } from "@/context/AppContext";
import { groupByMonth } from "@/utils/helpers";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BalanceLineChart = () => {
  const { transactions } = useAppContext();
  const data = groupByMonth(transactions);

  return (
    <div className="glass-card rounded-lg p-5 animate-fade-in">
      <h3 className="text-base font-bold font-heading text-card-foreground mb-4">Balance Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--success))" }}
              name="Income"
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="hsl(var(--destructive))"
              strokeWidth={2}
              dot={{ r: 4, fill: "hsl(var(--destructive))" }}
              name="Expenses"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BalanceLineChart;
