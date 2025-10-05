/**
 * Helper functions for localStorage operations
 */

export function saveToLocalStorage<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function loadFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) {
      return defaultValue;
    }
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
}

export function removeFromLocalStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
}

export function clearLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

// Legacy functions for backwards compatibility
export const savePracticeHistory = (history: string[]) => {
  saveToLocalStorage('practiceHistory', history);
};

export const getPracticeHistory = (): string[] => {
  return loadFromLocalStorage('practiceHistory', []);
};

export const clearPracticeHistory = () => {
  removeFromLocalStorage('practiceHistory');
};
