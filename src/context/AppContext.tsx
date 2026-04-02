import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Transaction, Role, TransactionType, mockTransactions } from "@/data/mockData";

interface Filters {
  search: string;
  type: TransactionType | "all";
  sortBy: "date" | "amount";
  sortOrder: "asc" | "desc";
}

interface AppState {
  transactions: Transaction[];
  role: Role;
  filters: Filters;
  darkMode: boolean;
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<Filters>) => void;
  addTransaction: (t: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, t: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  toggleDarkMode: () => void;
  filteredTransactions: Transaction[];
}

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEY = "finance-dashboard-data";
const DARK_MODE_KEY = "finance-dashboard-dark";

function loadTransactions(): Transaction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return mockTransactions;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions);
  const [role, setRole] = useState<Role>("admin");
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem(DARK_MODE_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [filters, setFiltersState] = useState<Filters>({
    search: "",
    type: "all",
    sortBy: "date",
    sortOrder: "desc",
  });

  // Persist transactions
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const setFilters = useCallback((partial: Partial<Filters>) => {
    setFiltersState((prev) => ({ ...prev, ...partial }));
  }, []);

  const addTransaction = useCallback((t: Omit<Transaction, "id">) => {
    const id = "t" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    setTransactions((prev) => [{ ...t, id }, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), []);

  // Derived: filtered + sorted transactions
  const filteredTransactions = React.useMemo(() => {
    let result = [...transactions];

    // Filter by type
    if (filters.type !== "all") {
      result = result.filter((t) => t.type === filters.type);
    }

    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.amount.toString().includes(q)
      );
    }

    // Sort
    result.sort((a, b) => {
      const mul = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortBy === "date") return mul * a.date.localeCompare(b.date);
      return mul * (a.amount - b.amount);
    });

    return result;
  }, [transactions, filters]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        filters,
        darkMode,
        setRole,
        setFilters,
        addTransaction,
        editTransaction,
        deleteTransaction,
        toggleDarkMode,
        filteredTransactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
