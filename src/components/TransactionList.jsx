import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const listItem = {
  initial: { opacity: 0, x: -16 },
  animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  exit: { opacity: 0, x: 16, transition: { duration: 0.2 } },
};

export default function TransactionList({ transactions, onDelete }) {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sorted.length === 0) {
    return (
      <div className="glass-card p-6">
        <h2 className="text-headline text-text dark:text-text-dark mb-4">
          Recent Transactions
        </h2>
        <div className="text-center py-10">
          <div className="text-5xl mb-3">📊</div>
          <p className="text-text-muted text-sm">No transactions yet.</p>
          <p className="text-text-muted text-xs mt-1">
            Add your first income or expense to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-headline text-text dark:text-text-dark">
          Recent Transactions
        </h2>
        <span className="text-xs font-semibold text-text-muted bg-gray-100/80 dark:bg-white/5 px-3 py-1.5 rounded-full backdrop-blur-sm">
          {sorted.length} total
        </span>
      </div>

      <div className="space-y-1.5 max-h-[420px] overflow-y-auto pr-1 custom-scrollbar">
        <AnimatePresence initial={false}>
          {sorted.map((t) => (
            <motion.div
              key={t.id}
              variants={listItem}
              initial="initial"
              animate="animate"
              exit="exit"
              layout
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50/80 dark:hover:bg-white/5 transition-colors group"
            >
              <div
                className={`p-2 rounded-xl ${
                  t.type === 'income'
                    ? 'bg-income/10 dark:bg-income/15 text-income'
                    : 'bg-expense/10 dark:bg-expense/15 text-expense'
                }`}
              >
                {t.type === 'income' ? (
                  <ArrowUpRight className="w-4 h-4" />
                ) : (
                  <ArrowDownRight className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-text dark:text-text-dark truncate">
                  {t.category}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {t.description || t.category} &middot;{' '}
                  {new Date(t.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <p
                className={`text-sm font-bold whitespace-nowrap text-mono ${
                  t.type === 'income' ? 'text-income' : 'text-expense'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </p>

              <motion.button
                onClick={() => onDelete(t.id)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-text-muted hover:text-expense transition-all"
                aria-label="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
