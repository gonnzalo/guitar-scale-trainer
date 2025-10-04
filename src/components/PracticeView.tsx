import React from 'react';
import type { PracticeCombination, PracticeSettings } from '../types';
import { NOTE_DISPLAY_NAMES } from '../data/notes';
import ScaleDiagram from './ScaleDiagram';


interface PracticeViewProps {
  combination: PracticeCombination | null;
  showPattern: boolean;
  settings: PracticeSettings;
  statistics: {
    sessionCount: number;
    practiceTime: number;
    totalPracticed: number;
  };
  onTogglePattern: () => void;
  onNext: () => void;
  onReset: () => void;
}

export default function PracticeView({
  combination,
  showPattern,
  settings,
  statistics,
  onTogglePattern,
  onNext,
  onReset
}: PracticeViewProps) {

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle keyboard shortcuts
  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        onNext();
      } else if (event.code === 'Enter') {
        event.preventDefault();
        onTogglePattern();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onNext, onTogglePattern]);

    if (!combination) {
    return (
      <div className="card text-center">
        <div className="py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Practice?
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Configure your settings and click "Start Practice" to begin!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Combination Card */}
      <div className="card">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {NOTE_DISPLAY_NAMES[combination.rootNote]} {combination.scaleType}
          </h2>
          <p className="text-xl text-primary-600 dark:text-primary-400 mb-6">
            Position: <span className="font-bold">{combination.position}</span>
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center mb-6">
            <button
              onClick={onTogglePattern}
              className="btn-primary px-6 py-3 text-lg"
            >
              {showPattern ? '🙈 Hide Pattern' : '👁️ Show Pattern'}
            </button>
            <button
              onClick={onNext}
              className="btn-secondary px-6 py-3 text-lg"
            >
              Next →
            </button>
          </div>

          {/* Keyboard Shortcuts Hint */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Space</kbd> Next •
            <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded ml-2">Enter</kbd> Show/Hide
          </div>
        </div>
      </div>

      {/* Scale Diagram */}
      {showPattern && (
        <div className="animate-fade-in">
          <ScaleDiagram
            pattern={combination.pattern}
            settings={settings}
          />
        </div>
      )}

      {/* Statistics */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Session Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {statistics.sessionCount}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Scales</div>
          </div>
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {formatTime(statistics.practiceTime)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Time</div>
          </div>
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {statistics.totalPracticed}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total</div>
          </div>
          <div className="text-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <button
              onClick={onReset}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Reset Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
