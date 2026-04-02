import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Transaction, categories, Category, TransactionType } from "@/data/mockData";
import { Pencil, Trash2, Plus, X, Check, FileDown } from "lucide-react";
import { transactionsToCSV, downloadFile } from "@/utils/helpers";

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  description: "",
  amount: "",
  category: "Food" as Category,
  type: "expense" as TransactionType,
};

const TransactionTable = () => {
  const { filteredTransactions, role, addTransaction, editTransaction, deleteTransaction, transactions } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const isAdmin = role === "admin";

  const handleSubmit = () => {
    if (!form.description || !form.amount) return;
    if (editingId) {
      editTransaction(editingId, {
        date: form.date,
        description: form.description,
        amount: parseFloat(form.amount),
        category: form.category,
        type: form.type,
      });
      setEditingId(null);
    } else {
      addTransaction({
        date: form.date,
        description: form.description,
        amount: parseFloat(form.amount),
        category: form.category,
        type: form.type,
      });
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (t: Transaction) => {
    setEditingId(t.id);
    setForm({
      date: t.date,
      description: t.description,
      amount: t.amount.toString(),
      category: t.category,
      type: t.type,
    });
    setShowForm(true);
  };

  const handleExport = (format: "csv" | "json") => {
    if (format === "csv") {
      downloadFile(transactionsToCSV(transactions), "transactions.csv", "text/csv");
    } else {
      downloadFile(JSON.stringify(transactions, null, 2), "transactions.json", "application/json");
    }
  };

  return (
    <div className="glass-card rounded-lg animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-border">
        <div>
          <h2 className="text-lg font-bold font-heading text-card-foreground">Transactions</h2>
          <p className="text-sm text-muted-foreground">{filteredTransactions.length} records</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleExport("csv")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-accent transition-colors"
          >
            <FileDown className="h-3.5 w-3.5" /> CSV
          </button>
          <button
            onClick={() => handleExport("json")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm hover:bg-accent transition-colors"
          >
            <FileDown className="h-3.5 w-3.5" /> JSON
          </button>
          {isAdmin && (
            <button
              onClick={() => { setShowForm(!showForm); setEditingId(null); setForm(emptyForm); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity"
            >
              {showForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              {showForm ? "Cancel" : "Add"}
            </button>
          )}
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && isAdmin && (
        <div className="p-5 border-b border-border bg-secondary/30 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="px-3 py-2 rounded-lg bg-card text-card-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="px-3 py-2 rounded-lg bg-card text-card-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring lg:col-span-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="px-3 py-2 rounded-lg bg-card text-card-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
            className="px-3 py-2 rounded-lg bg-card text-card-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <div className="flex gap-2">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as TransactionType })}
              className="flex-1 px-3 py-2 rounded-lg bg-card text-card-foreground border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <button
              onClick={handleSubmit}
              className="px-3 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <Check className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <p className="text-lg font-medium">No transactions found</p>
            <p className="text-sm">Try adjusting your filters or add a new transaction</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Description</th>
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-left px-5 py-3 font-medium">Type</th>
                <th className="text-right px-5 py-3 font-medium">Amount</th>
                {isAdmin && <th className="text-right px-5 py-3 font-medium">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((t, i) => (
                <tr
                  key={t.id}
                  className="border-b border-border/50 hover:bg-secondary/50 transition-colors"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <td className="px-5 py-3 text-muted-foreground">{formatDate(t.date)}</td>
                  <td className="px-5 py-3 font-medium text-card-foreground">{t.description}</td>
                  <td className="px-5 py-3">
                    <span className="px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        t.type === "income"
                          ? "bg-success/10 text-success"
                          : "bg-destructive/10 text-destructive"
                      }`}
                    >
                      {t.type}
                    </span>
                  </td>
                  <td
                    className={`px-5 py-3 text-right font-semibold ${
                      t.type === "income" ? "text-success" : "text-destructive"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  {isAdmin && (
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => startEdit(t)}
                          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => deleteTransaction(t.id)}
                          className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;
