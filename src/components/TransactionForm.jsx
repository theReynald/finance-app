import { useState } from 'react';
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

  return (
    <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-sm border border-border dark:border-border-dark p-6">
      <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-4">
        Add Transaction
      </h2>

      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => { setType('income'); setCategory(''); }}
          className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
            type === 'income'
              ? 'bg-income text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-text-muted hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => { setType('expense'); setCategory(''); }}
          className={`flex-1 py-2.5 rounded-xl font-medium text-sm transition-all ${
            type === 'expense'
              ? 'bg-expense text-white shadow-sm'
              : 'bg-gray-100 dark:bg-gray-800 text-text-muted hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Expense
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-border-dark bg-white dark:bg-gray-800 text-text dark:text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-border-dark bg-white dark:bg-gray-800 text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
            className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-border-dark bg-white dark:bg-gray-800 text-text dark:text-text-dark placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full px-4 py-2.5 rounded-xl border border-border dark:border-border-dark bg-white dark:bg-gray-800 text-text dark:text-text-dark focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md ${
            type === 'income'
              ? 'bg-income hover:bg-emerald-600'
              : 'bg-expense hover:bg-red-600'
          }`}
        >
          <PlusCircle className="w-5 h-5" />
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
}
