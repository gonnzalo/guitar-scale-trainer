import { useState } from 'react';
import type { Note, ScaleType, CAGEDPosition, Mode, PracticeSettings } from '../types';
import { ALL_NOTES, NOTE_DISPLAY_NAMES } from '../data/notes';

const SCALE_TYPES: ScaleType[] = [
  'Major',
  'Minor',
  'Pentatonic Major',
  'Pentatonic Minor',
  'Blues',
  'Harmonic Minor',
  'Melodic Minor'
];

const CAGED_POSITIONS: CAGEDPosition[] = ['C', 'A', 'G', 'E', 'D'];

const MODES: Mode[] = [
  'Ionian',
  'Dorian',
  'Phrygian',
  'Lydian',
  'Mixolydian',
  'Aeolian',
  'Locrian'
];

interface ScaleSelectorProps {
  settings: PracticeSettings;
  onUpdateSettings: (settings: Partial<PracticeSettings>) => void;
  onStartPractice: () => void;
}

export function ScaleSelector({ settings, onUpdateSettings, onStartPractice }: ScaleSelectorProps) {
  const [error, setError] = useState('');

  const toggleScale = (scale: ScaleType) => {
    const newScales = settings.selectedScales.includes(scale)
      ? settings.selectedScales.filter((s) => s !== scale)
      : [...settings.selectedScales, scale];
    onUpdateSettings({ selectedScales: newScales });
  };

  const toggleNote = (note: Note) => {
    const newNotes = settings.selectedNotes.includes(note)
      ? settings.selectedNotes.filter((n) => n !== note)
      : [...settings.selectedNotes, note];
    onUpdateSettings({ selectedNotes: newNotes });
  };

  const togglePosition = (position: CAGEDPosition) => {
    const newPositions = settings.selectedPositions.includes(position)
      ? settings.selectedPositions.filter((p) => p !== position)
      : [...settings.selectedPositions, position];
    onUpdateSettings({ selectedPositions: newPositions });
  };

  const selectAllNotes = () => {
    onUpdateSettings({ selectedNotes: [...ALL_NOTES] });
  };

  const deselectAllNotes = () => {
    onUpdateSettings({ selectedNotes: [] });
  };

  const handleStartPractice = () => {
    if (settings.selectedNotes.length === 0) {
      setError('Please select at least one root note');
      return;
    }
    if (settings.selectedScales.length === 0) {
      setError('Please select at least one scale type');
      return;
    }
    if (settings.selectedPositions.length === 0) {
      setError('Please select at least one CAGED position');
      return;
    }
    setError('');
    onStartPractice();
  };

  const totalCombinations =
    settings.selectedNotes.length *
    settings.selectedScales.length *
    settings.selectedPositions.length;

  return (
    <div className="card space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Scale Practice Setup</h2>

      {error && (
        <div
          className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-200 px-4 py-3 rounded"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {/* Scale Types */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Scale Types
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SCALE_TYPES.map((scale) => (
            <label
              key={scale}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={settings.selectedScales.includes(scale)}
                onChange={() => toggleScale(scale)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-900 dark:text-white">{scale}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Root Notes */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Root Notes
          </label>
          <div className="space-x-2">
            <button
              type="button"
              onClick={selectAllNotes}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={deselectAllNotes}
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
            >
              Deselect All
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {ALL_NOTES.map((note) => (
            <label
              key={note}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={settings.selectedNotes.includes(note)}
                onChange={() => toggleNote(note)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-sm text-gray-900 dark:text-white">
                {NOTE_DISPLAY_NAMES[note]}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* CAGED Positions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          CAGED Positions
        </label>
        <div className="grid grid-cols-5 gap-2">
          {CAGED_POSITIONS.map((position) => (
            <label
              key={position}
              className={`flex items-center justify-center space-x-2 p-3 rounded border-2 cursor-pointer transition-colors ${
                settings.selectedPositions.includes(position)
                  ? 'border-primary-600 dark:border-primary-500 bg-primary-100 dark:bg-primary-900/30'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 hover:border-primary-500'
              }`}
            >
              <input
                type="checkbox"
                checked={settings.selectedPositions.includes(position)}
                onChange={() => togglePosition(position)}
                className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
              />
              <span className="text-lg font-bold text-gray-900 dark:text-white">{position}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Mode Selector (Optional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Mode (Optional)
        </label>
        <select
          value={settings.selectedMode || ''}
          onChange={(e) =>
            onUpdateSettings({ selectedMode: (e.target.value as Mode) || undefined })
          }
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500"
        >
          <option value="">No specific mode</option>
          {MODES.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
      </div>

      {/* Stats and Start Button */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          <strong>{totalCombinations}</strong> possible combinations
        </div>
        <button
          onClick={handleStartPractice}
          className="btn-primary w-full text-lg py-3"
          disabled={totalCombinations === 0}
        >
          Start Practice
        </button>
      </div>
    </div>
  );
}
