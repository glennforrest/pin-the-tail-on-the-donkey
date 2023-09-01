export default function Results({
  won,
  resetGame,
  setupHardMode,
}: {
  won: boolean
  resetGame: () => void
  setupHardMode: () => void
}) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-5xl font-bold">
        {
          won ? (
            <span>You Won!</span>
          ) : (
            <span>You&apos;re Shit!</span>
          )
        }
      </h2>

      <div className="flex justify-center space-x-2">
        <button
          className="font-inter mt-4 bg-brown-800 hover:bg-brown-800 text-white font-medium py-2 px-4 rounded transition"
          onClick={resetGame}
        >
          Play Again
        </button>

        <button
          className="font-inter mt-4 bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded transition"
          onClick={setupHardMode}
        >
          Hard Mode
        </button>
      </div>
    </div>
  )
}
