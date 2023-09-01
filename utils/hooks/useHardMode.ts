import { useEffect, useState } from "react";

const flashDurationInMs = 75

export default function useHardMode(resetGame: () => void) {
  const [hardMode, setHardMode] = useState<boolean>(false);
  const [flash, setFlash] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(3);
  const [hardModeTransforms, setHardModeTransforms] = useState<{ x: number; y: number }>({ x: 0, y: 0, });

  const setupHardMode = () => {
    resetGame();
    setHardMode(true);
  };

  useEffect(() => {
    if (hardMode) {
      // shift the image around so you can't just memorize the position
      setHardModeTransforms({
        x: Math.floor(Math.random() * 200) * (Math.round(Math.random()) ? 1 : -1), // random between -200 and 200
        y: Math.floor(Math.random() * 200) * (Math.round(Math.random()) ? 1 : -1), // random between -200 and 200
      })

      // start a timer before the image will flash
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    // reset for next time
    setCountdown(3);
    setHardModeTransforms({
      x: 0,
      y: 0,
    })
  }, [hardMode]);

  useEffect(() => {
    if (countdown === 0) {
      setFlash(true)
    }
  }, [countdown])

  useEffect(() => {
    if (flash) {
      setTimeout(() => {
        setFlash(false)
      }, flashDurationInMs)
    }
  }, [flash])

  return {
    flash,
    hardMode,
    setHardMode,
    countdown,
    setupHardMode,
    hardModeTransforms,
  }
}
