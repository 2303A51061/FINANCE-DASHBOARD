import { Transaction, TransactionType } from "@/data/mockData";

/** Format a number as USD currency */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

/** Format an ISO date string to readable format */
export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/** Calculate totals from transactions */
export const calcTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses, balance: income - expenses };
};

/** Group transactions by category and sum amounts */
export const groupByCategory = (
  transactions: Transaction[],
  type?: TransactionType
) => {
  const filtered = type ? transactions.filter((t) => t.type === type) : transactions;
  const map = new Map<string, number>();
  filtered.forEach((t) => {
    map.set(t.category, (map.get(t.category) || 0) + t.amount);
  });
  return Array.from(map.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

/** Group transactions by month and calculate income/expenses */
export const groupByMonth = (transactions: Transaction[]) => {
  const map = new Map<string, { income: number; expenses: number }>();
  transactions.forEach((t) => {
    const month = t.date.slice(0, 7); // "YYYY-MM"
    const entry = map.get(month) || { income: 0, expenses: 0 };
    if (t.type === "income") entry.income += t.amount;
    else entry.expenses += t.amount;
    map.set(month, entry);
  });
  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => {
      const label = new Date(month + "-01").toLocaleDateString("en-US", {
        month: "short",
        year: "2-digit",
      });
      return { month: label, income: data.income, expenses: data.expenses, balance: data.income - data.expenses };
    });
};

/** Generate a unique ID */
export const generateId = (): string => {
  return "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
};

/** Export transactions to CSV string */
export const transactionsToCSV = (transactions: Transaction[]): string => {
  const header = "Date,Description,Category,Type,Amount";
  const rows = transactions.map(
    (t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`
  );
  return [header, ...rows].join("\n");
};

/** Download a string as a file */
export const downloadFile = (content: string, filename: string, mime: string) => {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
