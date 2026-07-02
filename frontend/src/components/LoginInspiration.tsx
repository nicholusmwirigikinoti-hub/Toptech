'use client';

import { useEffect, useState } from 'react';
import { useRandomInspiration } from '@/hooks/useInspiration';

interface LoginInspirationProps {
  autoRotate?: boolean;
  rotateInterval?: number;
}

export default function LoginInspiration({
  autoRotate = true,
  rotateInterval = 8000,
}: LoginInspirationProps) {
  const { data: inspiration, refetch, isLoading } = useRandomInspiration();
  const [displayIndex, setDisplayIndex] = useState(0);

  // Auto-rotate inspirations
  useEffect(() => {
    if (!autoRotate) return;

    const interval = setInterval(() => {
      refetch();
    }, rotateInterval);

    return () => clearInterval(interval);
  }, [autoRotate, rotateInterval, refetch]);

  if (isLoading && !inspiration) {
    return (
      <div className="flex items-center justify-center min-h-48">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">Loading inspiration...</p>
        </div>
      </div>
    );
  }

  if (!inspiration) {
    return null;
  }

  const isJoke = inspiration.type === 'joke';
  const isMoneyRelated = inspiration.category === 'money';

  return (
    <div
      className={`relative overflow-hidden rounded-lg p-6 min-h-48 flex flex-col justify-between
        ${
          isMoneyRelated
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border border-emerald-200 dark:border-emerald-700'
            : 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700'
        }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 text-4xl animate-bounce">
          {isMoneyRelated ? '💰' : isJoke ? '😂' : '💡'}
        </div>
        <div className="absolute bottom-2 left-2 text-5xl opacity-20">
          {isMoneyRelated ? '💵' : '✨'}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide
            ${
              isMoneyRelated
                ? 'bg-emerald-200 text-emerald-800 dark:bg-emerald-800 dark:text-emerald-200'
                : isJoke
                  ? 'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                  : 'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200'
            }`}
          >
            {isJoke ? '�� Joke' : '💭 Wisdom'}
          </span>
          <span
            className={`inline-block px-2 py-1 text-xs font-medium rounded capitalize
            ${
              isMoneyRelated
                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            }`}
          >
            {inspiration.category}
          </span>
        </div>

        {/* Main Text */}
        <p
          className={`text-lg font-semibold leading-relaxed mb-4 transition-all duration-500
          ${
            isMoneyRelated
              ? 'text-emerald-900 dark:text-emerald-50'
              : 'text-blue-900 dark:text-blue-50'
          }`}
        >
          {inspiration.text}
        </p>

        {/* Author (for quotes) */}
        {inspiration.author && (
          <p
            className={`text-sm italic font-medium
          ${
            isMoneyRelated
              ? 'text-emerald-700 dark:text-emerald-200'
              : 'text-blue-700 dark:text-blue-200'
          }`}
          >
            — {inspiration.author}
          </p>
        )}
      </div>

      {/* Action Button */}
      <div className="relative z-10 mt-6">
        <button
          onClick={() => refetch()}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
            transition-all duration-200 hover:shadow-lg
            ${
              isMoneyRelated
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          <span>🔄</span>
          <span>Next Inspiration</span>
        </button>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full transition-all duration-300 ${
            isMoneyRelated ? 'bg-emerald-500' : 'bg-blue-500'
          }`}
          style={{
            width: isLoading ? '100%' : '0%',
          }}
        ></div>
      </div>
    </div>
  );
}
