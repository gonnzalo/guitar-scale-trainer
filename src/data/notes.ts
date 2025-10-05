import type { Note } from '../types';

export const ALL_NOTES: Note[] = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

export const NOTE_DISPLAY_NAMES: Record<Note, string> = {
  A: 'A',
  'A#': 'A♯/B♭',
  B: 'B',
  C: 'C',
  'C#': 'C♯/D♭',
  D: 'D',
  'D#': 'D♯/E♭',
  E: 'E',
  F: 'F',
  'F#': 'F♯/G♭',
  G: 'G',
  'G#': 'G♯/A♭'
};

// Standard guitar tuning (high E to low E)
export const STANDARD_TUNING: Note[] = ['E', 'B', 'G', 'D', 'A', 'E'];

// Get note at specific fret on specific string
export function getNoteAtFret(stringNumber: number, fret: number): Note {
  const openNote = STANDARD_TUNING[stringNumber - 1];
  const openNoteIndex = ALL_NOTES.indexOf(openNote);
  const noteIndex = (openNoteIndex + fret) % 12;
  return ALL_NOTES[noteIndex];
}

// Get semitone distance between two notes
export function getSemitoneDistance(from: Note, to: Note): number {
  const fromIndex = ALL_NOTES.indexOf(from);
  const toIndex = ALL_NOTES.indexOf(to);
  return (toIndex - fromIndex + 12) % 12;
}
