import { describe, it, expect } from 'vitest';
import { generateRandomCombination, generateScalePattern } from './scaleGenerator';
import type { Note, ScaleType, CAGEDPosition } from '../types';

describe('scaleGenerator', () => {
  describe('generateRandomCombination', () => {
    it('should generate a valid combination', () => {
      const notes: Note[] = ['A', 'C'];
      const scales: ScaleType[] = ['Pentatonic Minor'];
      const positions: CAGEDPosition[] = ['E', 'A'];

      const result = generateRandomCombination(notes, scales, positions);

      expect(result).toHaveProperty('rootNote');
      expect(result).toHaveProperty('scaleType');
      expect(result).toHaveProperty('position');
      expect(result).toHaveProperty('pattern');
      expect(notes).toContain(result.rootNote);
      expect(scales).toContain(result.scaleType);
      expect(positions).toContain(result.position);
    });

    it('should avoid repeating the same combination when possible', () => {
      const notes: Note[] = ['A', 'C', 'D'];
      const scales: ScaleType[] = ['Major', 'Minor'];
      const positions: CAGEDPosition[] = ['E', 'A'];

      const first = generateRandomCombination(notes, scales, positions);
      const second = generateRandomCombination(notes, scales, positions, first);

      // With enough options, should generate a different combination
      const isDifferent =
        first.rootNote !== second.rootNote ||
        first.scaleType !== second.scaleType ||
        first.position !== second.position;

      // This test might occasionally fail due to randomness, but is very unlikely with 12 combinations
      expect(isDifferent).toBe(true);
    });

    it('should throw error when no selections provided', () => {
      expect(() => generateRandomCombination([], ['Major'], ['E'])).toThrow();
      expect(() => generateRandomCombination(['A'], [], ['E'])).toThrow();
      expect(() => generateRandomCombination(['A'], ['Major'], [])).toThrow();
    });

    it('should work with single options', () => {
      const notes: Note[] = ['A'];
      const scales: ScaleType[] = ['Pentatonic Minor'];
      const positions: CAGEDPosition[] = ['E'];

      const result = generateRandomCombination(notes, scales, positions);

      expect(result.rootNote).toBe('A');
      expect(result.scaleType).toBe('Pentatonic Minor');
      expect(result.position).toBe('E');
    });
  });

  describe('generateScalePattern', () => {
    it('should generate a valid scale pattern', () => {
      const pattern = generateScalePattern('A', 'Pentatonic Minor', 'E');

      expect(pattern).toHaveProperty('scaleType', 'Pentatonic Minor');
      expect(pattern).toHaveProperty('cagedPosition', 'E');
      expect(pattern).toHaveProperty('positions');
      expect(pattern).toHaveProperty('startFret');
      expect(pattern).toHaveProperty('endFret');
      expect(Array.isArray(pattern.positions)).toBe(true);
      expect(pattern.positions.length).toBeGreaterThan(0);
    });

    it('should have positions with required properties', () => {
      const pattern = generateScalePattern('C', 'Major', 'C');

      pattern.positions.forEach((pos) => {
        expect(pos).toHaveProperty('string');
        expect(pos).toHaveProperty('fret');
        expect(pos).toHaveProperty('note');
        expect(pos).toHaveProperty('interval');
        expect(pos.string).toBeGreaterThanOrEqual(1);
        expect(pos.string).toBeLessThanOrEqual(6);
        expect(pos.fret).toBeGreaterThanOrEqual(0);
      });
    });

    it('should mark root notes correctly', () => {
      const pattern = generateScalePattern('A', 'Pentatonic Minor', 'E');
      const rootPositions = pattern.positions.filter((p) => p.isRoot);

      expect(rootPositions.length).toBeGreaterThan(0);
      rootPositions.forEach((pos) => {
        expect(pos.note).toBe('A');
      });
    });

    it('should work for all scale types', () => {
      const scaleTypes: ScaleType[] = [
        'Major',
        'Minor',
        'Pentatonic Major',
        'Pentatonic Minor',
        'Blues',
        'Harmonic Minor',
        'Melodic Minor'
      ];

      scaleTypes.forEach((scaleType) => {
        const pattern = generateScalePattern('C', scaleType, 'E');
        expect(pattern.scaleType).toBe(scaleType);
        expect(pattern.positions.length).toBeGreaterThan(0);
      });
    });

    it('should work for all CAGED positions', () => {
      const positions: CAGEDPosition[] = ['C', 'A', 'G', 'E', 'D'];

      positions.forEach((position) => {
        const pattern = generateScalePattern('A', 'Pentatonic Minor', position);
        expect(pattern.cagedPosition).toBe(position);
        expect(pattern.positions.length).toBeGreaterThan(0);
      });
    });

    it('should generate different patterns for different positions', () => {
      const patternE = generateScalePattern('A', 'Pentatonic Minor', 'E');
      const patternA = generateScalePattern('A', 'Pentatonic Minor', 'A');

      // Different positions should have different fret ranges
      expect(patternE.startFret).not.toBe(patternA.startFret);
    });
  });
});
