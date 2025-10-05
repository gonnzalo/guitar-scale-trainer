export type Note = 'A' | 'A#' | 'B' | 'C' | 'C#' | 'D' | 'D#' | 'E' | 'F' | 'F#' | 'G' | 'G#';

export type ScaleType =
  | 'Major'
  | 'Minor'
  | 'Pentatonic Major'
  | 'Pentatonic Minor'
  | 'Blues'
  | 'Harmonic Minor'
  | 'Melodic Minor';

export type CAGEDPosition = 'C' | 'A' | 'G' | 'E' | 'D';

export type Mode =
  | 'Ionian'
  | 'Dorian'
  | 'Phrygian'
  | 'Lydian'
  | 'Mixolydian'
  | 'Aeolian'
  | 'Locrian';

export interface ScaleInterval {
  interval: string;
  semitones: number;
}

export interface FretPosition {
  string: number; // 1-6 (high E to low E)
  fret: number; // 0-15
  finger?: number; // 1-4
  isRoot?: boolean;
  note?: Note;
  interval?: string;
}

export interface ScalePattern {
  scaleType: ScaleType;
  cagedPosition: CAGEDPosition;
  positions: FretPosition[];
  startFret: number;
  endFret: number;
}

export interface ScaleDefinition {
  name: ScaleType;
  intervals: number[]; // semitones from root
  intervalNames: string[];
}

export interface PracticeSettings {
  selectedScales: ScaleType[];
  selectedNotes: Note[];
  selectedPositions: CAGEDPosition[];
  selectedMode?: Mode;
  showIntervals: boolean;
  showFingerNumbers: boolean;
}

export interface PracticeCombination {
  rootNote: Note;
  scaleType: ScaleType;
  position: CAGEDPosition;
  mode?: Mode;
  pattern: ScalePattern;
}

export interface PracticeHistory {
  combination: PracticeCombination;
  timestamp: number;
  practiced: boolean;
}

export interface ScalePracticeHistory {
  scale: ScaleDefinition;
  timestamp: Date;
}
