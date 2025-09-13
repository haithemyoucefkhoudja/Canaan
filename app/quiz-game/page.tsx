"use client"

import { useState } from "react"
import { MindMapQuiz } from "@/components/quiz-game/mind-map-quiz"
import { GameModeSelector } from "@/components/quiz-game/game-mode-selector"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Network } from "lucide-react"
import { ThemeToggle } from "@/components/quiz-game/theme-toggle"

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameKey, setGameKey] = useState(0)
  const [showModeSelector, setShowModeSelector] = useState(false)
  const [gameMode, setGameMode] = useState<"single" | "multiplayer">("single")

  const startNewGame = () => {
    setShowModeSelector(true)
  }

  const handleModeSelect = (mode: "single" | "multiplayer") => {
    setGameMode(mode)
    setShowModeSelector(false)
    if (mode === "multiplayer") {
      window.location.href = "/quiz-game/multiplayer"
      return
    }
    setGameStarted(true)
    setGameKey((prev) => prev + 1)
  }

  const resetGame = () => {
    setGameStarted(false)
    setShowModeSelector(false)
    setGameKey((prev) => prev + 1)
  }

  if (showModeSelector) {
    return (
      <>
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>
        <GameModeSelector onModeSelect={handleModeSelect} onBack={() => setShowModeSelector(false)} />
      </>
    )
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4 z-10">
          <ThemeToggle />
        </div>

        <Card className="w-full max-w-2xl shadow-2xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
              <Network className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Palestinian History Mind Map
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
              Learn about the roots of Palestinian peasant resistance and its steadfastness over time(1900-2025)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Historical Event:</h3>
              <p className="text-base text-gray-600 dark:text-gray-300 mb-3">
                "A century of Palestinian resistance to land seizure"
              </p>
              <ul className="text-base text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Trace the intertwined history of land grabs and defiance</li>
                <li>• 6 story elements are hidden - complete the historical narrative</li>
                <li>• Explor Ottoman policies,native resistance and Imperial influence</li>
                <li>• See how one event led to another in this complex historical moment</li>
              </ul>
            </div>
            <Button
              onClick={startNewGame}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Play className="w-5 h-5 mr-2" />
              Explore the Story Network
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* Note: The UI for this view is handled inside the MindMapQuiz component */}
      <MindMapQuiz key={gameKey} gameMode={gameMode} />
    </div>
  )
}