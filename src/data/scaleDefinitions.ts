import type { ScaleDefinition, ScaleType, CAGEDPosition, FretPosition } from '../types';

// Scale intervals (semitones from root)
export const SCALE_DEFINITIONS: Record<ScaleType, ScaleDefinition> = {
  'Major': {
    name: 'Major',
    intervals: [0, 2, 4, 5, 7, 9, 11],
    intervalNames: ['R', '2', 'M3', '4', '5', 'M6', 'M7']
  },
  'Minor': {
    name: 'Minor',
    intervals: [0, 2, 3, 5, 7, 8, 10],
    intervalNames: ['R', '2', 'm3', '4', '5', 'm6', 'm7']
  },
  'Pentatonic Major': {
    name: 'Pentatonic Major',
    intervals: [0, 2, 4, 7, 9],
    intervalNames: ['R', '2', 'M3', '5', 'M6']
  },
  'Pentatonic Minor': {
    name: 'Pentatonic Minor',
    intervals: [0, 3, 5, 7, 10],
    intervalNames: ['R', 'm3', '4', '5', 'm7']
  },
  'Blues': {
    name: 'Blues',
    intervals: [0, 3, 5, 6, 7, 10],
    intervalNames: ['R', 'm3', '4', 'b5', '5', 'm7']
  },
  'Harmonic Minor': {
    name: 'Harmonic Minor',
    intervals: [0, 2, 3, 5, 7, 8, 11],
    intervalNames: ['R', '2', 'm3', '4', '5', 'm6', 'M7']
  },
  'Melodic Minor': {
    name: 'Melodic Minor',
    intervals: [0, 2, 3, 5, 7, 9, 11],
    intervalNames: ['R', '2', 'm3', '4', '5', 'M6', 'M7']
  }
};

// CAGED position patterns for Pentatonic Minor
export const PENTATONIC_MINOR_CAGED: Record<CAGEDPosition, Omit<FretPosition, 'note' | 'interval'>[]> = {
  'E': [
    { string: 6, fret: 0, finger: 1, isRoot: true },
    { string: 6, fret: 3, finger: 4 },
    { string: 5, fret: 0, finger: 1 },
    { string: 5, fret: 2, finger: 3 },
    { string: 4, fret: 0, finger: 1 },
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 0, finger: 1 },
    { string: 3, fret: 2, finger: 3 },
    { string: 2, fret: 0, finger: 1 },
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 0, finger: 1, isRoot: true },
    { string: 1, fret: 3, finger: 4 }
  ],
  'D': [
    { string: 6, fret: 1, finger: 2 },
    { string: 6, fret: 3, finger: 4 },
    { string: 5, fret: 0, finger: 1, isRoot: true },
    { string: 5, fret: 3, finger: 4 },
    { string: 4, fret: 0, finger: 1 },
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 0, finger: 1 },
    { string: 3, fret: 2, finger: 3 },
    { string: 2, fret: 1, finger: 2 },
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 0, finger: 1, isRoot: true },
    { string: 1, fret: 3, finger: 4 }
  ],
  'C': [
    { string: 6, fret: 0, finger: 1 },
    { string: 6, fret: 3, finger: 4 },
    { string: 5, fret: 1, finger: 2 },
    { string: 5, fret: 3, finger: 4 },
    { string: 4, fret: 0, finger: 1, isRoot: true },
    { string: 4, fret: 3, finger: 4 },
    { string: 3, fret: 0, finger: 1 },
    { string: 3, fret: 2, finger: 3 },
    { string: 2, fret: 1, finger: 2 },
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 0, finger: 1 },
    { string: 1, fret: 3, finger: 4 }
  ],
  'A': [
    { string: 6, fret: 0, finger: 1 },
    { string: 6, fret: 2, finger: 3 },
    { string: 5, fret: 0, finger: 1 },
    { string: 5, fret: 2, finger: 3 },
    { string: 4, fret: 0, finger: 1, isRoot: true },
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 0, finger: 1 },
    { string: 3, fret: 2, finger: 3 },
    { string: 2, fret: 0, finger: 1 },
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 0, finger: 1 },
    { string: 1, fret: 2, finger: 3 }
  ],
  'G': [
    { string: 6, fret: 0, finger: 1 },
    { string: 6, fret: 2, finger: 3 },
    { string: 5, fret: 0, finger: 1 },
    { string: 5, fret: 2, finger: 3 },
    { string: 4, fret: 0, finger: 1 },
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 0, finger: 1, isRoot: true },
    { string: 3, fret: 3, finger: 4 },
    { string: 2, fret: 0, finger: 1 },
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 0, finger: 1 },
    { string: 1, fret: 2, finger: 3 }
  ]
};

// CAGED position patterns for Major Scale
export const MAJOR_SCALE_CAGED: Record<CAGEDPosition, Omit<FretPosition, 'note' | 'interval'>[]> = {
  'C': [
    { string: 6, fret: 0, finger: 2, isRoot: true },
    { string: 6, fret: 2, finger: 4 },
    { string: 5, fret: 0, finger: 1 },
    { string: 5, fret: 2, finger: 3 },
    { string: 5, fret: 3, finger: 4 },
    { string: 4, fret: 0, finger: 1 },
    { string: 4, fret: 2, finger: 3 },
    { string: 3, fret: 0, finger: 1 },
    { string: 3, fret: 2, finger: 4 },
    { string: 2, fret: 0, finger: 1 },
    { string: 2, fret: 1, finger: 2 },
    { string: 2, fret: 3, finger: 4 },
    { string: 1, fret: 0, finger: 1, isRoot: true },
    { string: 1, fret: 2, finger: 3 }
  ],
  'A': [
    { string: 6, fret: 2, finger: 3 },
    { string: 6, fret: 4, finger: 4 },
    { string: 5, fret: 0, finger: 1, isRoot: true },
    { string: 5, fret: 2, finger: 2 },
    { string: 5, fret: 4, finger: 4 },
    { string: 4, fret: 1, finger: 1 },
    { string: 4, fret: 2, finger: 2 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 1, finger: 1 },
    { string: 3, fret: 2, finger: 2 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 2, finger: 2 },
    { string: 2, fret: 4, finger: 4 },
    { string: 1, fret: 2, finger: 2, isRoot: true },
    { string: 1, fret: 4, finger: 4 }
  ],
  'G': [
    { string: 6, fret: 0, finger: 1 },
    { string: 6, fret: 2, finger: 3 },
    { string: 5, fret: 0, finger: 1 },
    { string: 5, fret: 2, finger: 3 },
    { string: 4, fret: 0, finger: 1 },
    { string: 4, fret: 2, finger: 4 },
    { string: 3, fret: 0, finger: 1, isRoot: true },
    { string: 3, fret: 2, finger: 3 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 0, finger: 1 },
    { string: 2, fret: 2, finger: 3 },
    { string: 1, fret: 0, finger: 1 },
    { string: 1, fret: 2, finger: 3 }
  ],
  'E': [
    { string: 6, fret: 0, finger: 1, isRoot: true },
    { string: 6, fret: 2, finger: 2 },
    { string: 6, fret: 4, finger: 4 },
    { string: 5, fret: 1, finger: 1 },
    { string: 5, fret: 2, finger: 2 },
    { string: 5, fret: 4, finger: 4 },
    { string: 4, fret: 1, finger: 1 },
    { string: 4, fret: 2, finger: 2 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 1, finger: 1 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 2, finger: 2 },
    { string: 2, fret: 4, finger: 4 },
    { string: 1, fret: 0, finger: 1, isRoot: true },
    { string: 1, fret: 2, finger: 2 },
    { string: 1, fret: 4, finger: 4 }
  ],
  'D': [
    { string: 6, fret: 2, finger: 2 },
    { string: 6, fret: 4, finger: 4 },
    { string: 5, fret: 0, finger: 1 },
    { string: 5, fret: 2, finger: 3 },
    { string: 5, fret: 4, finger: 4 },
    { string: 4, fret: 0, finger: 1 },
    { string: 4, fret: 2, finger: 3 },
    { string: 4, fret: 4, finger: 4 },
    { string: 3, fret: 1, finger: 1 },
    { string: 3, fret: 2, finger: 2 },
    { string: 3, fret: 4, finger: 4 },
    { string: 2, fret: 0, finger: 1, isRoot: true },
    { string: 2, fret: 2, finger: 3 },
    { string: 2, fret: 4, finger: 4 },
    { string: 1, fret: 2, finger: 3 },
    { string: 1, fret: 4, finger: 4 }
  ]
};

// Helper function to get pattern for scale type and position
export function getScalePattern(scaleType: ScaleType, position: CAGEDPosition): Omit<FretPosition, 'note' | 'interval'>[] {
  if (scaleType === 'Pentatonic Minor' || scaleType === 'Blues') {
    return PENTATONIC_MINOR_CAGED[position];
  } else if (scaleType === 'Major' || scaleType === 'Pentatonic Major') {
    return MAJOR_SCALE_CAGED[position];
  } else {
    return PENTATONIC_MINOR_CAGED[position];
  }
}