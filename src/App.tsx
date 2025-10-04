import { useState } from 'react';
import ScaleSelector from './components/ScaleSelector';
import PracticeView from './components/PracticeView';
import SettingsPanel from './components/SettingsPanel';
import { useScalePractice } from './hooks/useScalePractice';

function App() {
  const {
    settings,
    updateSettings,
    currentCombination,
    showPattern,
    togglePattern,
    nextCombination,
    startPractice,
    resetSession,
    statistics
  } = useScalePractice();

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
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="btn-secondary"
              title="Settings"
            >
              ⚙️ Settings
            </button>
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
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                How to Use
              </h2>
              <div className="space-y-3 text-gray-700 dark:text-gray-300">
                <p>
                  <strong>1.</strong> Select one or more scale types (Major, Minor, Pentatonic, etc.)
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
                    <br />
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs ml-2">Space</kbd> - Next scale
                    <br />
                    <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded text-xs ml-2">Enter</kbd> - Show/Hide pattern
                  </p>
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
              onReset={resetSession}
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

export default App;