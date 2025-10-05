import type {
  Note,
  ScaleType,
  CAGEDPosition,
  PracticeCombination,
  ScalePattern,
  FretPosition
} from '../types';
import { ALL_NOTES, getNoteAtFret, getSemitoneDistance } from '../data/notes';
import { SCALE_DEFINITIONS } from '../data/scaleDefinitions';

/**
 * Generate a random practice combination based on user selections
 */
export function generateRandomCombination(
  selectedNotes: Note[],
  selectedScales: ScaleType[],
  selectedPositions: CAGEDPosition[],
  previousCombination?: PracticeCombination
): PracticeCombination {
  if (selectedNotes.length === 0 || selectedScales.length === 0 || selectedPositions.length === 0) {
    throw new Error('Please select at least one note, scale, and position');
  }

  let rootNote: Note;
  let scaleType: ScaleType;
  let position: CAGEDPosition;

  // Ensure we don't repeat the same combination
  do {
    rootNote = selectedNotes[Math.floor(Math.random() * selectedNotes.length)];
    scaleType = selectedScales[Math.floor(Math.random() * selectedScales.length)];
    position = selectedPositions[Math.floor(Math.random() * selectedPositions.length)];
  } while (
    previousCombination &&
    rootNote === previousCombination.rootNote &&
    scaleType === previousCombination.scaleType &&
    position === previousCombination.position &&
    (selectedNotes.length > 1 || selectedScales.length > 1 || selectedPositions.length > 1)
  );

  const pattern = generateScalePattern(rootNote, scaleType, position);

  return {
    rootNote,
    scaleType,
    position,
    pattern
  };
}

/**
 * Generate the full scale pattern with notes and intervals
 * This version generates patterns dynamically based on scale intervals
 */
export function generateScalePattern(
  rootNote: Note,
  scaleType: ScaleType,
  position: CAGEDPosition
): ScalePattern {
  const scaleDefinition = SCALE_DEFINITIONS[scaleType];
  const scaleNotes = calculateScaleNotes(rootNote, scaleDefinition.intervals);

  // Determine the fret range for this position
  const fretRange = getPositionFretRange(rootNote, position);

  // Extend the range by 1 fret on each side for better context
  const extendedStart = Math.max(0, fretRange.start - 1);
  const extendedEnd = Math.min(fretRange.end + 1, 15);

  // Find all occurrences of scale notes within this extended fret range
  const positions: FretPosition[] = [];

  for (let string = 1; string <= 6; string++) {
    for (let fret = extendedStart; fret <= extendedEnd; fret++) {
      const noteAtPosition = getNoteAtFret(string, fret);

      // Check if this note is in our scale
      if (scaleNotes.includes(noteAtPosition)) {
        const semitoneDistance = getSemitoneDistance(rootNote, noteAtPosition);
        const intervalIndex = scaleDefinition.intervals.indexOf(semitoneDistance);
        const interval = intervalIndex >= 0 ? scaleDefinition.intervalNames[intervalIndex] : '';
        const isRoot = noteAtPosition === rootNote;

        // Simple finger assignment (can be improved)
        const relFret = fret - fretRange.start;
        const finger =
          relFret === 0 ? 1 : relFret === 1 ? 1 : relFret === 2 ? 2 : relFret === 3 ? 3 : 4;

        positions.push({
          string,
          fret,
          finger,
          isRoot,
          note: noteAtPosition,
          interval
        });
      }
    }
  }

  return {
    scaleType,
    cagedPosition: position,
    positions,
    startFret: fretRange.start,
    endFret: fretRange.end
  };
}

/**
 * Get the fret range for a CAGED position based on the root note
 * The CAGED system moves through positions: E -> D -> C -> A -> G (repeating every 12 frets)
 * Each position overlaps slightly with neighbors
 */
function getPositionFretRange(
  rootNote: Note,
  position: CAGEDPosition
): { start: number; end: number } {
  // Find where the root note appears on the 6th string (low E) between frets 0-11
  const rootOn6thString = findNoteOnString(rootNote, 6, 0, 11);

  let startFret: number;

  // The positions follow this pattern relative to where the root appears on the 6th string:
  switch (position) {
    case 'E':
      // E shape: root on 6th string - this IS the starting point
      startFret = rootOn6thString;
      break;

    case 'D':
      // D shape: comes ~2 frets after E shape
      // Root appears on the 4th string
      startFret = rootOn6thString + 2;
      if (startFret > 12) startFret -= 12;
      break;

    case 'C':
      // C shape: comes ~2 frets after D shape (4 frets after E)
      // Root appears on the 5th string
      startFret = rootOn6thString + 3;
      if (startFret > 12) startFret -= 12;
      break;

    case 'A':
      // A shape: comes ~2 frets after C shape (5-7 frets after E)
      // Root appears on the 5th string
      startFret = rootOn6thString + 5;
      if (startFret > 12) startFret -= 12;
      break;

    case 'G':
      // G shape: comes ~2-3 frets after A shape (7-9 frets after E)
      // Root appears on the 3rd string
      startFret = rootOn6thString + 8;
      if (startFret > 12) startFret -= 12;
      break;

    default:
      startFret = 0;
  }

  return {
    start: startFret,
    end: Math.min(startFret + 4, 15)
  };
}

/**
 * Find the fret where a note appears on a specific string
 */
function findNoteOnString(note: Note, string: number, minFret: number, maxFret: number): number {
  for (let fret = minFret; fret <= maxFret; fret++) {
    if (getNoteAtFret(string, fret) === note) {
      return fret;
    }
  }
  return 0;
}

/**
 * Calculate all notes in a scale given the root note and intervals
 */
export function calculateScaleNotes(rootNote: Note, intervals: number[]): Note[] {
  const rootIndex = ALL_NOTES.indexOf(rootNote);
  return intervals.map((interval) => {
    const noteIndex = (rootIndex + interval) % 12;
    return ALL_NOTES[noteIndex];
  });
}

/**
 * Get a list of all possible combinations
 */
export function getAllCombinations(
  notes: Note[],
  scales: ScaleType[],
  positions: CAGEDPosition[]
): number {
  return notes.length * scales.length * positions.length;
}

/**
 * Shuffle an array (Fisher-Yates algorithm)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
