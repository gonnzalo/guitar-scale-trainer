import { describe, it, expect } from 'vitest';
import { getNoteAtFret, getSemitoneDistance, ALL_NOTES, STANDARD_TUNING } from './notes';
import type { Note } from '../types';

describe('notes utilities', () => {
  describe('getNoteAtFret', () => {
    it('should return correct note for open strings', () => {
      expect(getNoteAtFret(1, 0)).toBe('E'); // High E
      expect(getNoteAtFret(2, 0)).toBe('B');
      expect(getNoteAtFret(3, 0)).toBe('G');
      expect(getNoteAtFret(4, 0)).toBe('D');
      expect(getNoteAtFret(5, 0)).toBe('A');
      expect(getNoteAtFret(6, 0)).toBe('E'); // Low E
    });

    it('should return correct note for various fret positions', () => {
      expect(getNoteAtFret(6, 5)).toBe('A'); // 5th fret low E string = A
      expect(getNoteAtFret(5, 5)).toBe('D'); // 5th fret A string = D
      expect(getNoteAtFret(4, 5)).toBe('G'); // 5th fret D string = G
      expect(getNoteAtFret(6, 3)).toBe('G'); // 3rd fret low E string = G
      expect(getNoteAtFret(1, 12)).toBe('E'); // 12th fret high E = E (octave)
    });

    it('should handle chromatic notes correctly', () => {
      expect(getNoteAtFret(6, 1)).toBe('F');
      expect(getNoteAtFret(6, 2)).toBe('F#');
      expect(getNoteAtFret(6, 4)).toBe('G#');
    });

    it('should wrap around octaves correctly', () => {
      // After 12 frets, we should get the same note (octave)
      for (let string = 1; string <= 6; string++) {
        const openNote = getNoteAtFret(string, 0);
        const octaveNote = getNoteAtFret(string, 12);
        expect(octaveNote).toBe(openNote);
      }
    });
  });

  describe('getSemitoneDistance', () => {
    it('should return 0 for same notes', () => {
      expect(getSemitoneDistance('A', 'A')).toBe(0);
      expect(getSemitoneDistance('C', 'C')).toBe(0);
      expect(getSemitoneDistance('G#', 'G#')).toBe(0);
    });

    it('should calculate correct intervals', () => {
      expect(getSemitoneDistance('C', 'D')).toBe(2); // Major 2nd
      expect(getSemitoneDistance('C', 'E')).toBe(4); // Major 3rd
      expect(getSemitoneDistance('C', 'G')).toBe(7); // Perfect 5th
      expect(getSemitoneDistance('A', 'C')).toBe(3); // Minor 3rd
    });

    it('should wrap around correctly', () => {
      expect(getSemitoneDistance('B', 'C')).toBe(1); // Half step
      expect(getSemitoneDistance('G#', 'A')).toBe(1); // Half step
      expect(getSemitoneDistance('C', 'B')).toBe(11); // Wraps around
    });

    it('should handle all chromatic intervals', () => {
      const intervals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      intervals.forEach((interval) => {
        const fromNote: Note = 'C';
        const toNote = ALL_NOTES[(ALL_NOTES.indexOf(fromNote) + interval) % 12];
        expect(getSemitoneDistance(fromNote, toNote)).toBe(interval);
      });
    });
  });

  describe('STANDARD_TUNING', () => {
    it('should have 6 strings', () => {
      expect(STANDARD_TUNING).toHaveLength(6);
    });

    it('should have correct tuning order (high E to low E)', () => {
      expect(STANDARD_TUNING).toEqual(['E', 'B', 'G', 'D', 'A', 'E']);
    });
  });

  describe('ALL_NOTES', () => {
    it('should have 12 notes (chromatic scale)', () => {
      expect(ALL_NOTES).toHaveLength(12);
    });

    it('should start with A', () => {
      expect(ALL_NOTES[0]).toBe('A');
    });

    it('should contain all natural notes', () => {
      const naturalNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
      naturalNotes.forEach((note) => {
        expect(ALL_NOTES).toContain(note);
      });
    });
  });
});
