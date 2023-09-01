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

  const playAgain = () => {
    setHardMode(false)
    resetGame()
  }

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
    y1: 122,
    y2: 167,
  };

  const checkPinnedTheAss = (x: number, y: number): boolean => {
    return x > winningCoordinates.x1 && x < winningCoordinates.x2 && y > winningCoordinates.y1 && y < winningCoordinates.y2;
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

  return (
    <div className="flex flex-col space-y-8 h-full pt-32">
      {
        hardMode && !flash && !showResults && (
          <div className="fixed inset-0 w-full h-full bg-black z-40 flex justify-center items-center pointer-events-none">
            {
              countdown > 0 && (
                <span className="text-white text-2xl">{countdown}</span>
              )
            }
          </div>
        )
      }
      <h1 className="text-center text-5xl lg:text-6xl font-bold mb-4 border-b-4 border-brown-800">
        Pin the Tail on the Donkey
      </h1>

      <div className="flex flex-col space-y-8 h-full" style={{
        transform: `translate(${hardModeTransforms.x}px, ${hardModeTransforms.y}px)`,
      }}>
        <div
          className={`relative w-96 h-96 mx-auto ${!hardMode ? 'cursor-pointer' : ''}`}
          onClick={handleClick}
        >
          <Image
            src="/donkey.jpg"
            alt="Donkey"
            className="w-full h-full object-cover"
            fill
          />

          {
            hardMode && <Image
              className="absolute right-0 top-10 -rotate-12"
              src="/sunglasses.png"
              alt="Yooooo"
              width={153}
              height={102}
            />
          }

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

        {showResults && <Results won={won} setupHardMode={setupHardMode} playAgain={playAgain} />}
      </div>
    </div>
  );
};

export default DonkeyGame;
