"use client";
import { wordPlacement } from '@/utils/wordPlacement';

export default function Home() {
  const words = [
    "AWARE", "COAT", "BARROW", "ARC", "AIR", "FORCE", "TWO", "SEE", "SORTED",
    "TEA", "SUMS", "SLOB", "SEAS", "BOLT", "GOO", "SKIP", "AWAIT", "WOOD",
    "EVIL", "STOP", "SEPHORA", "SMOKE", "SCREEN", "MINES", "SONG", "SEND",
    "WEEKEND", "LAST", "SEVEN",
    "JUMP", "CODE", "MOUSE", "BRAVE", "SHINE", "FLY", "WATER", "BRAIN", "LOVE",
    "SUNNY", "TRICK", "HAPPY", "PLANET", "FIGHT", "PEACE", "GLOW", "WATER", "CAT", "SUN"
  ];
  const grid = wordPlacement(words);

  // Ensure the grid is 15x15
  const gridSize = 15;
  const gridWithEmptyCells = Array.from({ length: gridSize }, (_, rowIndex) =>
    Array.from({ length: gridSize }, (_, cellIndex) => grid[rowIndex]?.[cellIndex] || '')
  );

  return (
    <div className="flex items-center justify-center flex-col">
      <div className='mt-10 mb-10'>
        <h1 className="text-2xl font-bold mb-5 text-center">Word Puzzle Grid</h1>
        <div
          className="grid"
          style={{
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gap: '0',
            width: '600px',
            height: '600px'
          }}
        >
          {gridWithEmptyCells.map((row, rowIndex) =>
            row.map((cell, cellIndex) => (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`border border-white-400 flex items-center justify-center text-sm ${cell ? 'bg-white text-black' : 'bg-black text-white'}`}
                style={{ width: '40px', height: '40px', fontSize: '14px' }}
              >
                {cell || ''}
              </div>
            ))
          )}
        </div>
      </div>
      <div className='mt-5 mb-5'>
        <h1 className="text-2xl font-bold mb-5 text-center">Word List</h1>
        <div
          className='flex flex-wrap gap-2 justify-center'
          style={{ width: '600px', height: '600px', overflowY: 'auto' }}
        >
          {words.map((word, index) => (
            <div
              key={index}
              className='p-2 text-center rounded border border-gray-300 k font-bold'
              style={{ minWidth: '100px', maxWidth: '100px' }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
