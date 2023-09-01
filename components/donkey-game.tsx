"use client";

import Image from "next/image";
import React, { useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";

const DonkeyGame: React.FC = () => {
  const [won, setWon] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [tailPosition, setTailPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const winningCoordinates = {
    x1: 50,
    x2: 70,
    y: 134,
    y2: 167,
  };

  const checkPinnedTheAss = (x: number, y: number): boolean => {
    return x > winningCoordinates.x1 && x < winningCoordinates.x2;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    console.log(x, y);

    setTailPosition({ x, y });
    setShowResults(true);

    setWon(checkPinnedTheAss(x, y));
  };

  const resetGame = () => {
    setShowResults(false);
    setTailPosition({ x: 0, y: 0 });
  };

  return (
    <div className="text-center flex flex-col space-y-8">
      <h1 className="text-3xl font-bold mb-4">Pin the Tail on the Donkey</h1>

      <div
        className="relative w-96 h-96 mx-auto cursor-pointer"
        onClick={handleClick}
      >
        <Image
          src="/donkey.jpg"
          alt="Donkey"
          className="w-full h-full object-cover"
          fill
        />

        {showResults && (
          <>
            <Image
              src="/donkey-tail.png"
              alt="Donkey Tail"
              width={133}
              height={256}
              className="origin-bottom-right absolute left-[calc(-25%-28px)]"
              style={{
                transform: `translate(${tailPosition.x}px, ${tailPosition.y}px)`,
              }}
            />

            {won && (
              <ConfettiExplosion
                force={0.8}
                duration={3000}
                particleCount={350}
                width={1600}
                style={{
                  transform: `translate(${tailPosition.x}px, ${tailPosition.y}px)`,
                }}
              />
            )}
          </>
        )}
      </div>
      {showResults && (
        <>
          <h2 className="text-5xl font-bold">YOU {won ? "won" : "suck"}</h2>

          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetGame}
          >
            Play Again
          </button>
        </>
      )}
    </div>
  );
};

export default DonkeyGame;
