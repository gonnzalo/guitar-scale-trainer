import type { ScalePattern, PracticeSettings, FretPosition } from '../types';
import { STANDARD_TUNING } from '../data/notes';

interface ScaleDiagramProps {
  pattern: ScalePattern;
  settings: PracticeSettings;
}

export default function ScaleDiagram({ pattern, settings }: ScaleDiagramProps) {
  const FRETS_TO_SHOW = 5;
  const startFret = pattern.startFret;
  const endFret = startFret + FRETS_TO_SHOW;

  // Create a map for quick lookup of positions
  const positionMap = new Map<string, FretPosition>();
  pattern.positions.forEach(pos => {
    const key = `${pos.string}-${pos.fret}`;
    positionMap.set(key, pos);
  });

  const renderFretMarker = (string: number, fret: number) => {
    const key = `${string}-${fret}`;
    const position = positionMap.get(key);

    if (!position) {
      return null;
    }

    const isRoot = position.isRoot;
    const displayText = settings.showIntervals ? position.interval : position.note;
    const fingerNumber = settings.showFingerNumbers ? position.finger : null;

    return (
      <div
        className={`fret-marker ${
          isRoot ? 'fret-marker-root' : 'fret-marker-note'
        }`}
        title={`${position.note} - ${position.interval}${fingerNumber ? ` (Finger ${fingerNumber})` : ''}`}
      >
        <div className="text-center">
          <div className="font-bold">{displayText}</div>
          {fingerNumber && (
            <div className="text-xs opacity-75">{fingerNumber}</div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Fretboard Pattern - {pattern.cagedPosition} Position
      </h3>
      
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Fret numbers */}
          <div className="flex mb-2">
            <div className="w-16 flex-shrink-0"></div>
            {Array.from({ length: FRETS_TO_SHOW + 1 }, (_, i) => startFret + i).map(fretNum => (
              <div
                key={fretNum}
                className="flex-1 text-center text-sm font-semibold text-gray-600 dark:text-gray-400"
              >
                {fretNum === 0 ? 'Nut' : fretNum}
              </div>
            ))}
          </div>

          {/* Strings and frets */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6].map(string => (
              <div key={string} className="flex items-center">
                {/* String label */}
                <div className="w-16 flex-shrink-0 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {STANDARD_TUNING[string - 1]}
                  <span className="text-xs text-gray-500 ml-1">({string})</span>
                </div>

                {/* Frets */}
                <div className="flex-1 flex">
                  {Array.from({ length: FRETS_TO_SHOW + 1 }, (_, i) => startFret + i).map(fret => {
                    const hasNote = positionMap.has(`${string}-${fret}`);
                    
                    return (
                      <div
                        key={fret}
                        className="flex-1 relative"
                        style={{
                          borderRight: fret !== endFret ? '2px solid #cbd5e0' : 'none',
                          background: fret % 2 === 0 ? 'rgba(0,0,0,0.02)' : 'transparent',
                          minHeight: '60px'
                        }}
                      >
                        {/* String line */}
                        <div
                          className="absolute top-1/2 left-0 right-0 bg-gray-400 dark:bg-gray-600"
                          style={{
                            height: `${7 - string}px`,
                            transform: 'translateY(-50%)'
                          }}
                        />

                        {/* Note marker */}
                        {hasNote && (
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                            {renderFretMarker(string, fret)}
                          </div>
                        )}

                        {/* Fret marker dots (3rd, 5th, 7th, 9th, 12th frets) */}
                        {string === 3 && [3, 5, 7, 9].includes(fret) && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                          </div>
                        )}
                        {string === 4 && fret === 12 && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="fret-marker fret-marker-root w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300">Root Note</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="fret-marker fret-marker-note w-6 h-6" />
              <span className="text-gray-700 dark:text-gray-300">Scale Note</span>
            </div>
            {settings.showFingerNumbers && (
              <div className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">Numbers show finger positions (1-4)</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
