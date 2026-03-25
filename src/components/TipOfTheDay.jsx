import { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import financialTips from '../data/financialTips';

export default function TipOfTheDay() {
  const [tipIndex, setTipIndex] = useState(() => {
    const saved = localStorage.getItem('financeflow_tip');
    if (saved) {
      const { index, date } = JSON.parse(saved);
      const today = new Date().toDateString();
      if (date === today) return index;
    }
    const dailyIndex = Math.floor(Date.now() / 86400000) % financialTips.length;
    return dailyIndex;
  });

  useEffect(() => {
    localStorage.setItem(
      'financeflow_tip',
      JSON.stringify({ index: tipIndex, date: new Date().toDateString() })
    );
  }, [tipIndex]);

  function getNewTip() {
    let next;
    do {
      next = Math.floor(Math.random() * financialTips.length);
    } while (next === tipIndex && financialTips.length > 1);
    setTipIndex(next);
  }

  const tip = financialTips[tipIndex];

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl shadow-sm border border-amber-200 dark:border-amber-800/40 p-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="bg-amber-400/20 p-2 rounded-lg">
            <Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-text dark:text-text-dark">
              Tip of the Day
            </h2>
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/40 px-2 py-0.5 rounded-full">
              {tip.category}
            </span>
          </div>
        </div>
        <button
          onClick={getNewTip}
          className="flex items-center gap-1.5 text-sm font-medium text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 bg-amber-100 dark:bg-amber-900/40 hover:bg-amber-200 dark:hover:bg-amber-900/60 px-3 py-2 rounded-xl transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          New Tip
        </button>
      </div>

      <h3 className="font-semibold text-text dark:text-text-dark mb-2">
        {tip.title}
      </h3>
      <p className="text-sm text-text dark:text-text-dark/80 leading-relaxed">
        {tip.tip}
      </p>
    </div>
  );
}
