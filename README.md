# 💰 Finance Dashboard

A modern, responsive finance dashboard built with React and TypeScript — designed to showcase strong frontend skills, clean architecture, and polished UI/UX.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4) ![Vite](https://img.shields.io/badge/Vite-5-646CFF)

## 🚀 Project Overview

A single-page finance dashboard that lets users track income, expenses, and financial health at a glance. It features interactive charts, role-based access control, smart insights, and full dark mode support — all powered by client-side state with localStorage persistence.

## ✨ Features

### Core
- **Dashboard Summary** — Total Balance, Income, and Expenses displayed in visually distinct cards
- **Balance Trend Chart** — Line chart showing cumulative balance over time (Recharts)
- **Spending Breakdown** — Pie chart visualizing expenses by category
- **Transaction Table** — Full CRUD with inline search, type filtering, and sorting (by date or amount)
- **Role-Based UI** — Toggle between Admin (full access) and Viewer (read-only) roles
- **Smart Insights** — Automated observations like savings rate, top spending category, and month-over-month comparisons

### Enhancements
- 🌙 **Dark Mode** — System-aware toggle with persistent preference
- 💾 **localStorage Persistence** — Transactions and theme saved across sessions
- 📤 **Export** — Download transactions as JSON or CSV
- 🎨 **Smooth Animations** — Hover effects, transitions, and interactive chart tooltips
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework (functional components + hooks) |
| **TypeScript** | Type safety and developer experience |
| **Vite 5** | Fast dev server and build tool |
| **Tailwind CSS 3** | Utility-first styling with custom design tokens |
| **Recharts** | Data visualization (Line & Pie charts) |
| **Context API** | Lightweight global state management |
| **shadcn/ui** | Accessible, composable UI primitives |
| **Lucide React** | Consistent icon system |

## 📁 Folder Structure

```
src/
├── components/
│   ├── Charts/
│   │   ├── BalanceLineChart.tsx   # Cumulative balance line chart
│   │   └── SpendingPieChart.tsx   # Category breakdown pie chart
│   ├── Filters.tsx               # Search, type filter, sort controls
│   ├── Insights.tsx              # Auto-generated financial insights
│   ├── RoleSwitcher.tsx          # Admin/Viewer role toggle
│   ├── SummaryCard.tsx           # Metric display card
│   ├── TransactionTable.tsx      # Transaction list with CRUD
│   └── ui/                      # shadcn/ui primitives
├── context/
│   └── AppContext.tsx            # Global state (transactions, filters, role, theme)
├── data/
│   └── mockData.ts              # 30 realistic transactions + type definitions
├── pages/
│   ├── Dashboard.tsx             # Main dashboard layout
│   ├── Index.tsx                 # Entry route
│   └── NotFound.tsx              # 404 page
├── utils/
│   └── helpers.ts               # Formatting, grouping, export utilities
├── index.css                    # Design tokens + Tailwind config
└── App.tsx                      # Router setup
```

## 🏃 Getting Started

```bash
# Clone the repository
git clone <repo-url>
cd finance-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Other Commands

```bash
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## 🎨 Design Decisions

### State Management
Chose **Context API** over Redux for simplicity — the app has a single global store with ~5 pieces of state. All update functions are memoized with `useCallback`, and derived data (filtered transactions) uses `useMemo` to avoid unnecessary recalculations.

### Design System
Built a custom semantic token system in `index.css` using CSS custom properties (HSL format). All components reference tokens like `--primary`, `--background`, and `--muted` rather than hardcoded colors — enabling seamless dark mode and consistent theming throughout.

### Component Architecture
Each component has a single responsibility:
- **SummaryCard** — Pure display, receives data via props
- **TransactionTable** — Reads from context, handles CRUD logic
- **Filters** — Writes filter state to context, decoupled from table rendering
- **Insights** — Derives observations from raw transaction data

### Role Simulation
Role-based access is implemented purely on the client side via context state. The Admin/Viewer toggle conditionally renders action buttons (add/edit/delete) without affecting data flow — demonstrating the pattern without backend complexity.

### Data Persistence
Transactions and dark mode preference are persisted to `localStorage` with `useEffect` syncing. On load, the app hydrates from storage or falls back to mock data, providing a realistic user experience across sessions.

## 📊 Mock Data

The project includes 30 realistic transactions spanning January–April 2024, covering 12 categories (Salary, Freelance, Food, Rent, Travel, Shopping, Entertainment, Utilities, Healthcare, Education, Investment, Gifts) with a mix of income and expense entries.

## 📄 License

MIT
