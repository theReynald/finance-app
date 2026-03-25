import { formatCurrency } from '../utils/helpers';
import { TrendingUp, TrendingDown, Wallet, Sun, Moon } from 'lucide-react';

export default function Header({ totals, darkMode, onToggleDarkMode }) {
  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Wallet className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">FinanceFlow</h1>
            <p className="text-primary-200 text-sm">Smart Budgeting & Financial Literacy</p>
          </div>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="bg-white/20 hover:bg-white/30 p-2.5 rounded-xl transition-colors backdrop-blur-sm"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-green-300" />
            <span className="text-primary-200 text-sm font-medium">Income</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totals.income)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="w-4 h-4 text-red-300" />
            <span className="text-primary-200 text-sm font-medium">Expenses</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(totals.expenses)}</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Wallet className="w-4 h-4 text-yellow-300" />
            <span className="text-primary-200 text-sm font-medium">Balance</span>
          </div>
          <p className={`text-2xl font-bold ${totals.balance >= 0 ? 'text-green-300' : 'text-red-300'}`}>
            {formatCurrency(totals.balance)}
          </p>
        </div>
      </div>
    </header>
  );
}
