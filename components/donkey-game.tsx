"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import Results from "./results";
import useHardMode from "@/utils/hooks/useHardMode";

const DonkeyGame: React.FC = () => {
  const resetGame = () => {
    setShowResults(false);
    setTailPosition({ x: 0, y: 0 });
  };

  const {
    flash,
    hardMode,
    setHardMode,
    countdown,
    setupHardMode,
    hardModeTransforms,
  } = useHardMode(resetGame)

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

  useEffect(() => {
    if (showResults) {
      setHardMode(false)
    }
  }, [showResults])

  return (
    <div className="flex flex-col space-y-8 h-full pt-32">
      <h1 className="text-center text-5xl lg:text-6xl font-bold mb-4 border-b-4 border-brown-800">
        Pin the Tail on the Donkey
      </h1>

      <div className="flex flex-col space-y-8 h-full" style={{
        transform: `translate(${hardModeTransforms.x}px, ${hardModeTransforms.y}px)`,
      }}>
        <div
          className="relative w-96 h-96 mx-auto cursor-pointer"
          onClick={handleClick}
        >
          {
            hardMode && !flash && (
              <div className="absolute inset-0 w-full h-full bg-black z-40 flex justify-center items-center">
                {
                  countdown > 0 && (
                    <span className="text-white text-2xl">{countdown}</span>
                  )
                }
              </div>
            )
          }

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
                className="origin-bottom-right absolute left-[calc(-25%-28px)] pointer-events-none"
                style={{
                  transform: `translate(${tailPosition.x}px, ${tailPosition.y}px)`,
                }}
              />

              {won && (
                <ConfettiExplosion
                  force={0.4}
                  duration={2000}
                  particleCount={30}
                  width={400}
                  style={{
                    transform: `translate(${tailPosition.x}px, ${tailPosition.y}px)`,
                  }}
                />
              )}
            </>
          )}
        </div>

        {showResults && <Results won={won} setupHardMode={setupHardMode} resetGame={resetGame} />}
      </div>
    </div>
  );
};

export default DonkeyGame;
