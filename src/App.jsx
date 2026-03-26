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
import { motion } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateTotals } from './utils/helpers';

// --- UI Components ---
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import TipOfTheDay from './components/TipOfTheDay';

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
};

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
    <div className={darkMode ? 'dark' : ''}>
      <div className="app-bg bg-bg dark:bg-bg-dark transition-colors">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeUp}>
              <Header totals={totals} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
            </motion.div>

            <motion.div variants={fadeUp}>
              <TipOfTheDay />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <motion.div variants={fadeUp} className="lg:col-span-5 space-y-8">
                <TransactionForm onAdd={addTransaction} />
                <TransactionList transactions={transactions} onDelete={deleteTransaction} />
              </motion.div>

              <motion.div variants={fadeUp} className="lg:col-span-7">
                <Charts transactions={transactions} darkMode={darkMode} />
              </motion.div>
            </div>

            <motion.footer
              variants={fadeUp}
              className="text-center text-text-muted text-xs py-6 font-medium tracking-wide"
            >
              FinanceFlow &mdash; Track smarter, live better. Data stored locally in your browser.
            </motion.footer>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
