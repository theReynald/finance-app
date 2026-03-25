import { useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateTotals } from './utils/helpers';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Charts from './components/Charts';
import TipOfTheDay from './components/TipOfTheDay';

export default function App() {
  const [transactions, setTransactions] = useLocalStorage('financeflow_transactions', []);
  const [darkMode, setDarkMode] = useLocalStorage('financeflow_darkmode', false);

  const totals = calculateTotals(transactions);

  const addTransaction = useCallback((transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  }, [setTransactions]);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, [setTransactions]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, [setDarkMode]);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-bg dark:bg-bg-dark transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          {/* Header with balance summary */}
          <Header totals={totals} darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

          {/* Tip of the Day */}
          <TipOfTheDay />

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left sidebar — Form + Transaction List */}
            <div className="lg:col-span-5 space-y-6">
              <TransactionForm onAdd={addTransaction} />
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            </div>

            {/* Right area — Charts */}
            <div className="lg:col-span-7">
              <Charts transactions={transactions} darkMode={darkMode} />
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center text-text-muted text-xs py-4">
            FinanceFlow &mdash; Track smarter, live better. Data stored locally in your browser.
          </footer>
        </div>
      </div>
    </div>
  );
}
