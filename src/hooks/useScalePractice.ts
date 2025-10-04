import { useState } from 'react';
import type {
  PracticeSettings,
  PracticeCombination,
  PracticeHistory
} from '../types';
import { generateRandomCombination } from '../utils/scaleGenerator';
import { useLocalStorage } from './useLocalStorage';

const SETTINGS_KEY = 'guitar-scale-practice-settings';
const HISTORY_KEY = 'guitar-scale-practice-history';

export function useScalePractice() {
  // Load settings from localStorage
  const [settings, setSettings] = useLocalStorage<PracticeSettings>(SETTINGS_KEY, {
    selectedScales: ['Pentatonic Minor'],
    selectedNotes: ['A'],
    selectedPositions: ['E'],
    showIntervals: false,
    showFingerNumbers: true
  });

  const [history, setHistory] = useLocalStorage<PracticeHistory[]>(HISTORY_KEY, []);
  
  const [currentCombination, setCurrentCombination] = useState<PracticeCombination | null>(null);
  const [showPattern, setShowPattern] = useState(false);
  const [practiceStartTime, setPracticeStartTime] = useState<number | null>(null);
  const [sessionCount, setSessionCount] = useState(0);

  // Update settings
  const updateSettings = (newSettings: Partial<PracticeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  // Generate next combination
  const nextCombination = () => {
    try {
      const combination = generateRandomCombination(
        settings.selectedNotes,
        settings.selectedScales,
        settings.selectedPositions,
        currentCombination || undefined
      );
      
      setCurrentCombination(combination);
      setShowPattern(false);
      setSessionCount(prev => prev + 1);
      
      // Add to history
      const newHistory: PracticeHistory = {
        combination,
        timestamp: Date.now(),
        practiced: false
      };
      setHistory(prev => [newHistory, ...prev].slice(0, 100)); // Keep last 100 entries
    } catch (error) {
      console.error('Error generating combination:', error);
    }
  };

  // Toggle pattern visibility
  const togglePattern = () => {
    setShowPattern(prev => !prev);
    
    // Mark as practiced when pattern is shown
    if (!showPattern && currentCombination) {
      setHistory(prev => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated[0] = { ...updated[0], practiced: true };
        }
        return updated;
      });
    }
  };

  // Start practice session
  const startPractice = () => {
    setPracticeStartTime(Date.now());
    nextCombination();
  };

  // Reset practice session
  const resetSession = () => {
    setCurrentCombination(null);
    setShowPattern(false);
    setPracticeStartTime(null);
    setSessionCount(0);
  };

  // Clear history
  const clearHistory = () => {
    setHistory([]);
  };

  // Calculate practice statistics
  const statistics = {
    totalPracticed: history.filter(h => h.practiced).length,
    totalAttempts: history.length,
    sessionCount,
    practiceTime: practiceStartTime ? Math.floor((Date.now() - practiceStartTime) / 1000) : 0
  };

  return {
    settings,
    updateSettings,
    currentCombination,
    showPattern,
    togglePattern,
    nextCombination,
    startPractice,
    resetSession,
    history,
    clearHistory,
    statistics
  };
}

export default useScalePractice;