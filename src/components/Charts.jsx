import { useMemo } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { groupByMonth, groupByCategory } from '../utils/helpers';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const CATEGORY_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#6366f1',
  '#e11d48', '#84cc16', '#a855f7', '#0ea5e9', '#d946ef',
];

export default function Charts({ transactions, darkMode }) {
  const monthlyData = useMemo(() => groupByMonth(transactions), [transactions]);
  const expensesByCategory = useMemo(
    () => groupByCategory(transactions.filter((t) => t.type === 'expense')),
    [transactions]
  );

  const textColor = darkMode ? '#e2e8f0' : '#334155';
  const gridColor = darkMode ? 'rgba(148, 163, 184, 0.1)' : 'rgba(148, 163, 184, 0.2)';

  const barData = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map((d) => d.income),
        backgroundColor: '#10b981',
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Expenses',
        data: monthlyData.map((d) => d.expenses),
        backgroundColor: '#ef4444',
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: textColor, usePointStyle: true, pointStyle: 'circle', padding: 16 },
      },
      tooltip: {
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: darkMode ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: $${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: { ticks: { color: textColor }, grid: { display: false } },
      y: {
        ticks: {
          color: textColor,
          callback: (val) => `$${val.toLocaleString()}`,
        },
        grid: { color: gridColor },
      },
    },
  };

  const categoryLabels = Object.keys(expensesByCategory);
  const doughnutData = {
    labels: categoryLabels,
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: categoryLabels.map(
          (_, i) => CATEGORY_COLORS[i % CATEGORY_COLORS.length]
        ),
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: textColor, usePointStyle: true, pointStyle: 'circle', padding: 12, font: { size: 11 } },
      },
      tooltip: {
        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: darkMode ? '#334155' : '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: (ctx) => `${ctx.label}: $${ctx.raw.toLocaleString()}`,
        },
      },
    },
    cutout: '65%',
  };

  const hasExpenses = categoryLabels.length > 0;
  const hasMonthly = monthlyData.length > 0;

  return (
    <div className="space-y-6">
      {/* Bar Chart — Income vs Expenses by Month */}
      <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-sm border border-border dark:border-border-dark p-6">
        <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-4">
          Income vs Expenses
        </h2>
        {hasMonthly ? (
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted text-sm">
            <div className="text-4xl mb-2">📈</div>
            Add transactions to see your monthly breakdown
          </div>
        )}
      </div>

      {/* Doughnut Chart — Expense Breakdown */}
      <div className="bg-surface dark:bg-surface-dark rounded-2xl shadow-sm border border-border dark:border-border-dark p-6">
        <h2 className="text-lg font-semibold text-text dark:text-text-dark mb-4">
          Expense Breakdown
        </h2>
        {hasExpenses ? (
          <div className="h-72">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        ) : (
          <div className="text-center py-8 text-text-muted text-sm">
            <div className="text-4xl mb-2">🍩</div>
            Add expenses to see category breakdown
          </div>
        )}
      </div>
    </div>
  );
}
