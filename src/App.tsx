import { useState } from 'react';
import { ScaleSelector } from './components/ScaleSelector';
import { PracticeView } from './components/PracticeView';
import { SettingsPanel } from './components/SettingsPanel';
import { useScalePractice } from './hooks/useScalePractice';
import { useTheme } from './hooks/useTheme';

export function App() {
  const {
    settings,
    updateSettings,
    currentCombination,
    showPattern,
    togglePattern,
    nextCombination,
    startPractice,
    resetSession,
    clearHistory,
    statistics
  } = useScalePractice();

  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);
  const [isPracticing, setIsPracticing] = useState(false);

  const handleStartPractice = () => {
    setIsPracticing(true);
    startPractice();
  };

  const handleBackToSetup = () => {
    setIsPracticing(false);
    resetSession();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                🎸 Guitar Scale Trainer
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Master your scales with randomized practice
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={toggleTheme}
                className="btn-secondary"
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="btn-secondary"
                title="Settings"
                aria-label="Toggle settings panel"
                aria-expanded={showSettings}
              >
                ⚙️ Settings
              </button>
            </div>
          </div>
        </header>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-6">
            <SettingsPanel
              settings={settings}
              onUpdateSettings={updateSettings}
              onClose={() => setShowSettings(false)}
            />
          </div>
        )}

        {/* Main Content */}
        {!isPracticing ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScaleSelector
              settings={settings}
              onUpdateSettings={updateSettings}
              onStartPractice={handleStartPractice}
            />
            <div className="card">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use</h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>1.</strong> Select one or more scale types (Major, Minor, Pentatonic,
                  etc.)
                </p>
                <p>
                  <strong>2.</strong> Choose which root notes you want to practice
                </p>
                <p>
                  <strong>3.</strong> Select CAGED positions to focus on
                </p>
                <p>
                  <strong>4.</strong> Click "Start Practice" to begin!
                </p>
                <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <p className="text-sm">
                    <strong>💡 Tip:</strong> Use keyboard shortcuts during practice:
                  </p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">
                        Space
                      </kbd>
                      <span className="text-xs">- Next scale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs">
                        Enter
                      </kbd>
                      <span className="text-xs">- Show/Hide pattern</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <button onClick={handleBackToSetup} className="btn-secondary">
                ← Back to Setup
              </button>
            </div>
            <PracticeView
              combination={currentCombination}
              showPattern={showPattern}
              settings={settings}
              statistics={statistics}
              onTogglePattern={togglePattern}
              onNext={nextCombination}
              onClearHistory={clearHistory}
            />
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>Practice consistently to build muscle memory and fretboard knowledge!</p>
        </footer>
      </div>
    </div>
  );
}
