import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <div className="glass-card relative overflow-hidden p-6">
      {/* Warm ambient glow */}
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-amber-400/10 dark:bg-amber-400/5 blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-400/15 dark:to-orange-400/15 p-2.5 rounded-xl backdrop-blur-sm">
              <Lightbulb className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-headline text-text dark:text-text-dark">
                Tip of the Day
              </h2>
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/30 px-2.5 py-0.5 rounded-full">
                {tip.category}
              </span>
            </div>
          </div>
          <motion.button
            onClick={getNewTip}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95, rotate: 180 }}
            className="flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 bg-amber-100/80 dark:bg-amber-900/30 hover:bg-amber-200/80 dark:hover:bg-amber-900/50 px-3.5 py-2 rounded-xl transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            New Tip
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tipIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h3 className="font-bold text-text dark:text-text-dark mb-2">
              {tip.title}
            </h3>
            <p className="text-sm text-text dark:text-text-dark/80 leading-relaxed">
              {tip.tip}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
