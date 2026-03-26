import { useMemo } from 'react';
import { motion } from 'framer-motion';
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
  '#6366f1', '#f87171', '#34d399', '#fbbf24', '#a78bfa',
  '#f472b6', '#22d3ee', '#fb923c', '#2dd4bf', '#818cf8',
  '#e11d48', '#a3e635', '#c084fc', '#38bdf8', '#e879f9',
];

const chartReveal = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.1 },
  },
};

export default function Charts({ transactions, darkMode }) {
  const monthlyData = useMemo(() => groupByMonth(transactions), [transactions]);
  const expensesByCategory = useMemo(
    () => groupByCategory(transactions.filter((t) => t.type === 'expense')),
    [transactions]
  );

  const textColor = darkMode ? '#e2e8f0' : '#1e293b';
  const gridColor = darkMode ? 'rgba(99, 102, 241, 0.08)' : 'rgba(148, 163, 184, 0.15)';

  const barData = {
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map((d) => d.income),
        backgroundColor: darkMode ? 'rgba(52, 211, 153, 0.8)' : '#34d399',
        borderRadius: 8,
        borderSkipped: false,
      },
      {
        label: 'Expenses',
        data: monthlyData.map((d) => d.expenses),
        backgroundColor: darkMode ? 'rgba(248, 113, 113, 0.8)' : '#f87171',
        borderRadius: 8,
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
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { family: "'Inter', sans-serif", weight: 600, size: 12 },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? '#1e1b4b' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: darkMode ? 'rgba(99,102,241,0.2)' : '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 14,
        titleFont: { family: "'Inter', sans-serif", weight: 700 },
        bodyFont: { family: "'JetBrains Mono', monospace" },
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: $${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: textColor, font: { family: "'Inter', sans-serif", size: 11 } },
        grid: { display: false },
      },
      y: {
        ticks: {
          color: textColor,
          font: { family: "'JetBrains Mono', monospace", size: 11 },
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
        hoverOffset: 10,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: textColor,
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 14,
          font: { family: "'Inter', sans-serif", size: 11, weight: 500 },
        },
      },
      tooltip: {
        backgroundColor: darkMode ? '#1e1b4b' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: darkMode ? 'rgba(99,102,241,0.2)' : '#e2e8f0',
        borderWidth: 1,
        cornerRadius: 12,
        padding: 14,
        bodyFont: { family: "'JetBrains Mono', monospace" },
        callbacks: {
          label: (ctx) => `${ctx.label}: $${ctx.raw.toLocaleString()}`,
        },
      },
    },
    cutout: '68%',
  };

  const hasExpenses = categoryLabels.length > 0;
  const hasMonthly = monthlyData.length > 0;

  return (
    <div className="space-y-8">
      <motion.div
        variants={chartReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="glass-card p-6"
      >
        <h2 className="text-headline text-text dark:text-text-dark mb-5">
          Income vs Expenses
        </h2>
        {hasMonthly ? (
          <div className="h-72">
            <Bar data={barData} options={barOptions} />
          </div>
        ) : (
          <div className="text-center py-10 text-text-muted text-sm">
            <div className="text-4xl mb-2">📈</div>
            Add transactions to see your monthly breakdown
          </div>
        )}
      </motion.div>

      <motion.div
        variants={chartReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        className="glass-card p-6"
      >
        <h2 className="text-headline text-text dark:text-text-dark mb-5">
          Expense Breakdown
        </h2>
        {hasExpenses ? (
          <div className="h-80">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        ) : (
          <div className="text-center py-10 text-text-muted text-sm">
            <div className="text-4xl mb-2">🍩</div>
            Add expenses to see category breakdown
          </div>
        )}
      </motion.div>
    </div>
  );
}
