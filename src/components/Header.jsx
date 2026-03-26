import { formatCurrency } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, Sun, Moon } from 'lucide-react';

const statCard = {
  rest: { scale: 1 },
  hover: { scale: 1.03, transition: { type: 'spring', stiffness: 400, damping: 20 } },
};

export default function Header({ totals, darkMode, onToggleDarkMode }) {
  return (
    <header className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white p-8 shadow-xl">
      {/* Decorative orbs */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white/5 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-accent-500/10 blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/15 p-3 rounded-2xl backdrop-blur-md border border-white/10">
              <Wallet className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-display text-white">FinanceFlow</h1>
              <p className="text-primary-200 text-sm font-medium tracking-wide mt-0.5">
                Smart Budgeting & Financial Literacy
              </p>
            </div>
          </div>

          <motion.button
            onClick={onToggleDarkMode}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className="bg-white/15 hover:bg-white/25 p-3 rounded-2xl transition-colors backdrop-blur-md border border-white/10"
            aria-label="Toggle dark mode"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={darkMode ? 'sun' : 'moon'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            variants={statCard}
            initial="rest"
            whileHover="hover"
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-green-300" />
              <span className="text-primary-200 text-xs font-semibold uppercase tracking-wider">Income</span>
            </div>
            <p className="stat-value text-white">{formatCurrency(totals.income)}</p>
          </motion.div>

          <motion.div
            variants={statCard}
            initial="rest"
            whileHover="hover"
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="w-4 h-4 text-red-300" />
              <span className="text-primary-200 text-xs font-semibold uppercase tracking-wider">Expenses</span>
            </div>
            <p className="stat-value text-white">{formatCurrency(totals.expenses)}</p>
          </motion.div>

          <motion.div
            variants={statCard}
            initial="rest"
            whileHover="hover"
            className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-yellow-300" />
              <span className="text-primary-200 text-xs font-semibold uppercase tracking-wider">Balance</span>
            </div>
            <p className={`stat-value ${totals.balance >= 0 ? 'text-green-300' : 'text-red-300'}`}>
              {formatCurrency(totals.balance)}
            </p>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
