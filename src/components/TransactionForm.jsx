import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle } from 'lucide-react';
import { generateId, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/helpers';

export default function TransactionForm({ onAdd }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  function handleSubmit(e) {
    e.preventDefault();

    const parsedAmount = parseFloat(amount);
    if (!parsedAmount || parsedAmount <= 0 || !category || !date) return;

    onAdd({
      id: generateId(),
      type,
      amount: parsedAmount,
      category,
      description: description.trim(),
      date,
    });

    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  }

  const isIncome = type === 'income';

  const inputClass =
    'w-full px-4 py-3 rounded-xl border bg-white/60 dark:bg-white/5 text-text dark:text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:border-transparent transition-all backdrop-blur-sm ' +
    (isIncome
      ? 'border-income/20 dark:border-income/20 focus:ring-income/40'
      : 'border-expense/20 dark:border-expense/20 focus:ring-expense/40');

  return (
    <div className={`glass-card p-6 ${isIncome ? 'glow-ring-income' : 'glow-ring-expense'}`}>
      <h2 className="text-headline text-text dark:text-text-dark mb-5">
        Add Transaction
      </h2>

      <div className="flex gap-2 mb-5 bg-gray-100/80 dark:bg-white/5 p-1 rounded-xl">
        <motion.button
          type="button"
          onClick={() => { setType('income'); setCategory(''); }}
          whileTap={{ scale: 0.97 }}
          className={`relative flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors z-10 ${
            isIncome
              ? 'text-white'
              : 'text-text-muted hover:text-text dark:hover:text-text-dark'
          }`}
        >
          {isIncome && (
            <motion.div
              layoutId="type-pill"
              className="absolute inset-0 bg-income rounded-lg shadow-sm"
              style={{ zIndex: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          Income
        </motion.button>
        <motion.button
          type="button"
          onClick={() => { setType('expense'); setCategory(''); }}
          whileTap={{ scale: 0.97 }}
          className={`relative flex-1 py-2.5 rounded-lg font-semibold text-sm transition-colors z-10 ${
            !isIncome
              ? 'text-white'
              : 'text-text-muted hover:text-text dark:hover:text-text-dark'
          }`}
        >
          {!isIncome && (
            <motion.div
              layoutId="type-pill"
              className="absolute inset-0 bg-expense rounded-lg shadow-sm"
              style={{ zIndex: -1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          Expense
        </motion.button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="Amount ($)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className={inputClass}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={inputClass}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={100}
              className={inputClass}
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputClass}
            />
          </motion.div>
        </AnimatePresence>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl ${
            isIncome
              ? 'bg-gradient-to-r from-income to-emerald-500'
              : 'bg-gradient-to-r from-expense to-rose-500'
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          Add {isIncome ? 'Income' : 'Expense'}
        </motion.button>
      </form>
    </div>
  );
}
