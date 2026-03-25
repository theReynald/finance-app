export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function calculateTotals(transactions) {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses, balance: income - expenses };
}

export function groupByCategory(transactions) {
  return transactions.reduce((groups, t) => {
    const key = t.category;
    groups[key] = (groups[key] || 0) + t.amount;
    return groups;
  }, {});
}

export function groupByMonth(transactions) {
  const months = {};
  transactions.forEach((t) => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!months[key]) {
      months[key] = { income: 0, expenses: 0 };
    }
    if (t.type === 'income') {
      months[key].income += t.amount;
    } else {
      months[key].expenses += t.amount;
    }
  });

  const sortedKeys = Object.keys(months).sort();
  return sortedKeys.map((key) => ({
    month: formatMonthLabel(key),
    ...months[key],
  }));
}

function formatMonthLabel(yearMonth) {
  const [year, month] = yearMonth.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investments',
  'Rental Income',
  'Side Hustle',
  'Gifts',
  'Other Income',
];

export const EXPENSE_CATEGORIES = [
  'Housing',
  'Food & Groceries',
  'Transportation',
  'Utilities',
  'Healthcare',
  'Entertainment',
  'Shopping',
  'Education',
  'Insurance',
  'Savings',
  'Debt Payments',
  'Personal Care',
  'Travel',
  'Subscriptions',
  'Other',
];
