export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Food"
  | "Rent"
  | "Travel"
  | "Shopping"
  | "Entertainment"
  | "Utilities"
  | "Healthcare"
  | "Education"
  | "Investment"
  | "Gifts";

export interface Transaction {
  id: string;
  date: string; // ISO date string
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export type Role = "viewer" | "admin";

// Generate 30 realistic transactions across multiple months
export const mockTransactions: Transaction[] = [
  { id: "t1", date: "2024-01-05", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "t2", date: "2024-01-08", description: "Grocery Shopping", amount: 145.5, category: "Food", type: "expense" },
  { id: "t3", date: "2024-01-10", description: "Apartment Rent", amount: 1400, category: "Rent", type: "expense" },
  { id: "t4", date: "2024-01-12", description: "Netflix & Spotify", amount: 28.99, category: "Entertainment", type: "expense" },
  { id: "t5", date: "2024-01-15", description: "Freelance Web Project", amount: 800, category: "Freelance", type: "income" },
  { id: "t6", date: "2024-01-18", description: "Electric Bill", amount: 95, category: "Utilities", type: "expense" },
  { id: "t7", date: "2024-01-22", description: "Doctor Visit", amount: 120, category: "Healthcare", type: "expense" },
  { id: "t8", date: "2024-01-25", description: "Online Course", amount: 49.99, category: "Education", type: "expense" },
  { id: "t9", date: "2024-02-05", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "t10", date: "2024-02-07", description: "Restaurant Dinner", amount: 78.5, category: "Food", type: "expense" },
  { id: "t11", date: "2024-02-10", description: "Apartment Rent", amount: 1400, category: "Rent", type: "expense" },
  { id: "t12", date: "2024-02-14", description: "Valentine Gift", amount: 65, category: "Gifts", type: "expense" },
  { id: "t13", date: "2024-02-16", description: "Weekend Trip", amount: 320, category: "Travel", type: "expense" },
  { id: "t14", date: "2024-02-20", description: "New Headphones", amount: 199, category: "Shopping", type: "expense" },
  { id: "t15", date: "2024-02-22", description: "Freelance Design Work", amount: 650, category: "Freelance", type: "income" },
  { id: "t16", date: "2024-02-25", description: "Internet Bill", amount: 60, category: "Utilities", type: "expense" },
  { id: "t17", date: "2024-03-05", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "t18", date: "2024-03-07", description: "Groceries", amount: 132, category: "Food", type: "expense" },
  { id: "t19", date: "2024-03-10", description: "Apartment Rent", amount: 1400, category: "Rent", type: "expense" },
  { id: "t20", date: "2024-03-12", description: "Stock Investment", amount: 500, category: "Investment", type: "expense" },
  { id: "t21", date: "2024-03-15", description: "Freelance Consulting", amount: 1200, category: "Freelance", type: "income" },
  { id: "t22", date: "2024-03-18", description: "Flight Tickets", amount: 450, category: "Travel", type: "expense" },
  { id: "t23", date: "2024-03-20", description: "Gas Bill", amount: 75, category: "Utilities", type: "expense" },
  { id: "t24", date: "2024-03-22", description: "Birthday Gift", amount: 50, category: "Gifts", type: "expense" },
  { id: "t25", date: "2024-03-25", description: "Gym Membership", amount: 45, category: "Healthcare", type: "expense" },
  { id: "t26", date: "2024-03-28", description: "New Jacket", amount: 89, category: "Shopping", type: "expense" },
  { id: "t27", date: "2024-04-05", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "t28", date: "2024-04-08", description: "Takeout Food", amount: 42, category: "Food", type: "expense" },
  { id: "t29", date: "2024-04-10", description: "Apartment Rent", amount: 1400, category: "Rent", type: "expense" },
  { id: "t30", date: "2024-04-12", description: "Concert Tickets", amount: 150, category: "Entertainment", type: "expense" },
];

export const categories: Category[] = [
  "Salary", "Freelance", "Food", "Rent", "Travel", "Shopping",
  "Entertainment", "Utilities", "Healthcare", "Education", "Investment", "Gifts",
];
