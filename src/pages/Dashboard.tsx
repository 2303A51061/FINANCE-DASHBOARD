import { useAppContext } from "@/context/AppContext";
import { calcTotals } from "@/utils/helpers";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import SummaryCard from "@/components/SummaryCard";
import RoleSwitcher from "@/components/RoleSwitcher";
import Filters from "@/components/Filters";
import TransactionTable from "@/components/TransactionTable";
import BalanceLineChart from "@/components/Charts/BalanceLineChart";
import SpendingPieChart from "@/components/Charts/SpendingPieChart";
import Insights from "@/components/Insights";

const Dashboard = () => {
  const { transactions } = useAppContext();
  const { balance, income, expenses } = calcTotals(transactions);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
              Finance Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Track your income, expenses, and financial health
            </p>
          </div>
          <RoleSwitcher />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard title="Total Balance" amount={balance} icon={Wallet} variant="default" />
          <SummaryCard title="Total Income" amount={income} icon={TrendingUp} variant="income" />
          <SummaryCard title="Total Expenses" amount={expenses} icon={TrendingDown} variant="expense" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <BalanceLineChart />
          </div>
          <SpendingPieChart />
        </div>

        {/* Insights */}
        <Insights />

        {/* Transactions */}
        <div className="space-y-4">
          <Filters />
          <TransactionTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
