import { Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

export default function TransactionList({ transactions, onDelete }) {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  if (sorted.length === 0) {
    return (
      <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-sm border border-border dark:border-border-dark p-6">
        <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-4">
          Recent Transactions
        </h2>
        <div className="text-center py-8">
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
    <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-sm border border-border dark:border-border-dark p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text dark:text-text-dark">
          Recent Transactions
        </h2>
        <span className="text-xs text-text-muted bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
          {sorted.length} total
        </span>
      </div>

      <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
        {sorted.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors group"
          >
            <div
              className={`p-2 rounded-lg ${
                t.type === 'income'
                  ? 'bg-income-light dark:bg-emerald-900/40 text-income'
                  : 'bg-expense-light dark:bg-red-900/40 text-expense'
              }`}
            >
              {t.type === 'income' ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text dark:text-text-dark truncate">
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
              className={`text-sm font-semibold whitespace-nowrap ${
                t.type === 'income' ? 'text-income' : 'text-expense'
              }`}
            >
              {t.type === 'income' ? '+' : '-'}
              {formatCurrency(t.amount)}
            </p>

            <button
              onClick={() => onDelete(t.id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 text-text-muted hover:text-expense transition-all"
              aria-label="Delete transaction"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
