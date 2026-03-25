/**
 * App.jsx — Root component for the FinanceFlow budgeting application.
 *
 * This is the top-level component that:
 *  1. Manages global state (transactions list and dark mode preference)
 *  2. Persists all data to localStorage so it survives page refreshes
 *  3. Computes derived data (income/expense/balance totals)
 *  4. Composes the full page layout from child components
 *
 * State architecture:
 *  - useLocalStorage hook is used instead of useState so that transactions
 *    and the dark mode flag are automatically saved to / loaded from the
 *    browser's localStorage on every change.
 *  - Callback functions (addTransaction, deleteTransaction, toggleDarkMode)
 *    are wrapped in useCallback to prevent unnecessary re-renders of child
 *    components that receive them as props.
 *
 * Layout (responsive):
 *  - Single column on mobile, 12-column grid on large screens (lg:)
 *  - Left column (5/12): transaction form + transaction list
 *  - Right column (7/12): charts (bar + doughnut)
 */

import { useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateTotals } from './utils/helpers';

// --- UI Components ---
import Header from './components/Header';            // Top banner: income, expenses, balance summary + dark mode toggle
import TransactionForm from './components/TransactionForm';  // Form to add a new income or expense entry
import TransactionList from './components/TransactionList';  // Scrollable list of all transactions with delete
import Charts from './components/Charts';            // Bar chart (monthly income vs expenses) & doughnut (expense breakdown)
import TipOfTheDay from './components/TipOfTheDay';  // Financial literacy tip card with "New Tip" button

export default function App() {
  // --- Global State ---

  // All income & expense transactions. Each transaction is an object:
  // { id: string, type: 'income'|'expense', amount: number, category: string, description: string, date: string }
  // Persisted under the key 'financeflow_transactions' in localStorage.
  const [transactions, setTransactions] = useLocalStorage('financeflow_transactions', []);

  // Dark mode toggle state (true = dark theme, false = light theme).
  // Persisted under 'financeflow_darkmode' so the user's preference is remembered.
  const [darkMode, setDarkMode] = useLocalStorage('financeflow_darkmode', false);

  // --- Derived Data ---

  // Calculate aggregate totals from the transactions array.
  // Returns { income: number, expenses: number, balance: number }
  const totals = calculateTotals(transactions);

  // --- Event Handlers ---

  // Appends a new transaction to the end of the transactions array.
  // Called by <TransactionForm /> when the user submits a valid entry.
  const addTransaction = useCallback((transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  }, [setTransactions]);

  // Removes a transaction by its unique ID.
  // Called by <TransactionList /> when the user clicks the delete button on a row.
  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, [setTransactions]);

  // Flips the dark mode boolean. Called by the sun/moon button in <Header />.
  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  // --- Render ---

  return (
    // The outermost div carries the 'dark' class when dark mode is active.
    // Tailwind's dark: variants (configured via @custom-variant in index.css)
    // use this class to swap colors throughout the entire component tree.
    <div className={darkMode ? 'dark' : ''}>

      {/* Full-page background wrapper — switches between light (bg-bg) and dark (bg-bg-dark) */}
      <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors">

        {/* Centered content container with responsive horizontal padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

          {/* ──── Header ────
              Displays total income, total expenses, and net balance.
              Also contains the dark mode toggle button (sun/moon icon). */}
          <Header totals={totals} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

          {/* ──── Tip of the Day ────
              Shows a random financial literacy tip from a curated list of 54 tips.
              Persists the currently shown tip in localStorage so the user sees a
              fresh tip each calendar day, with a "New Tip" button to cycle manually. */}
          <TipOfTheDay />

          {/* ──── Main Content Grid ────
              Responsive 12-column layout:
              • Mobile: single stacked column
              • Desktop (lg+): 5-col sidebar + 7-col main area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left column: input form + transaction history */}
            <div className="lg:col-span-5 space-y-6">
              {/* Form for adding new income/expense entries.
                  Emits a complete transaction object via the onAdd callback. */}
              <TransactionForm onAdd={addTransaction} />

              {/* Chronological list of all transactions (newest first).
                  Each row shows category, description, date, and amount.
                  Delete button appears on hover for each row. */}
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>

            {/* Right column: visual analytics */}
            <div className="lg:col-span-7">
              {/* Two charts:
                  1. Bar chart — monthly income vs expenses side by side
                  2. Doughnut chart — expense breakdown by category
                  Both update reactively as transactions are added or removed.
                  darkMode prop is passed so chart colors adapt to the current theme. */}
              <Charts transactions={transactions} darkMode={darkMode} />
            </div>
          </div>

          {/* ──── Footer ──── */}
          <footer className="text-center text-text-muted text-xs py-4">
            FinanceFlow &mdash; Track smarter, live better. Data stored locally in your browser.
          </footer>
        </div>
      </div>
    </div>
  );
}
