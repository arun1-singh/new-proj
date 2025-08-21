'use client';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Link from 'next/link';

export default function Header() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="backdrop-blur-sm border-b dark:border-gray-700/20 border-white/20 transition-colors duration-300 py-4 px-6 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          FlexiPlan
        </span>
      </Link>

      <button
        onClick={toggleTheme}
        className="p-2 rounded-xl transition-all duration-300 dark:bg-gray-800 bg-gray-100 dark:text-yellow-400 text-gray-600 hover:scale-105"
      >
        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </header>
  );
}
