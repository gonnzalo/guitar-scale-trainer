import type { PracticeSettings } from '../types';

interface SettingsPanelProps {
  settings: PracticeSettings;
  onUpdateSettings: (settings: Partial<PracticeSettings>) => void;
  onClose: () => void;
}

export default function SettingsPanel({ settings, onUpdateSettings, onClose }: SettingsPanelProps) {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {/* Display Options */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Display Options
          </h3>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showIntervals}
                onChange={(e) => onUpdateSettings({ showIntervals: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Show Intervals
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Display interval names (R, M3, 5, etc.) instead of note names
                </div>
              </div>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showFingerNumbers}
                onChange={(e) => onUpdateSettings({ showFingerNumbers: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <div>
                <div className="font-medium text-gray-900 dark:text-white">
                  Show Finger Numbers
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Display suggested finger positions (1-4) on the fretboard
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Practice Preferences */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Practice Tips
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <p>• Practice each scale slowly at first, focusing on accuracy</p>
            <p>• Use a metronome to build speed gradually</p>
            <p>• Play each scale ascending and descending</p>
            <p>• Try playing in different positions on the neck</p>
            <p>• Sing or hum the intervals as you play</p>
          </div>
        </div>

        {/* Keyboard Shortcuts Reference */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Keyboard Shortcuts
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Next scale</span>
              <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded font-mono text-sm">
                Space
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Show/Hide pattern</span>
              <kbd className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded font-mono text-sm">
                Enter
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
