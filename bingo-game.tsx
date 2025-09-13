"use client"

import { useState, useEffect, useCallback } from "react"
import { DndContext, type DragEndEvent, type DragStartEvent, DragOverlay, closestCenter } from "@dnd-kit/core"
import { useDraggable, useDroppable } from "@dnd-kit/core"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  GripVertical,
  Check,
  X,
  RotateCcw,
  Trophy,
  Target,
  Clock,
  Save,
  Play,
  ArrowRight,
  Trash2,
  Lock,
  Home,
} from "lucide-react"
import { CSS } from "@dnd-kit/utilities"

import { useGamification } from "./hooks/use-gamification"

interface PalestinianEvent {
  id: string
  title: string
  year: number
  description: string
  firstAppearance: boolean
}

interface BingoCell {
  id: string
  year: number
  isCompleted: boolean
  isCorrect: boolean | null
  animationClass?: string
  wrongAttempts: number
}

interface SavedEvent {
  id: string
  event: PalestinianEvent
  savedAt: number
}

interface LevelData {
  level: number
  gridSize: number
  attempts: number
  maxAttempts: number
  isCompleted: boolean
  stars: number
  score: number
}

interface GameProgress {
  currentLevel: number
  totalScore: number
  levelHistory: LevelData[]
  currentLevelData?: LevelData
  currentRound?: number
  currentAttempts?: number
}

type GameState = "mainMenu" | "levelSelect" | "preview" | "playing" | "levelComplete" | "levelFailed" | "gameOver"
type GamePhase = "collecting" | "placing" | "roundTransition"

interface RoundData {
  currentChance: number
  maxChances: number
  chanceTimer: number
  chanceStartTime: number
}

interface BingoGameProps {
  onBack?: () => void
  level?: number
  onLevelSelect?: (level: number) => void
  onLevelComplete?: (level: number, stars: number) => void
}

const palestinianEvents: PalestinianEvent[] = [
  {
    id: "1",
    title: "Balfour Declaration",
    year: 1917,
    description: "British support for Jewish homeland",
    firstAppearance: true,
  },
  {
    id: "2",
    title: "Nakba - Palestinian Exodus",
    year: 1948,
    description: "Mass displacement of Palestinians",
    firstAppearance: true,
  },
  {
    id: "3",
    title: "Six-Day War",
    year: 1967,
    description: "Israeli occupation of West Bank and Gaza",
    firstAppearance: true,
  },
  { id: "4", title: "First Intifada", year: 1987, description: "Palestinian uprising begins", firstAppearance: true },
  { id: "5", title: "Oslo Accords", year: 1993, description: "Peace agreement signed", firstAppearance: true },
  { id: "6", title: "Second Intifada", year: 2000, description: "Al-Aqsa Intifada begins", firstAppearance: true },
  {
    id: "7",
    title: "Gaza Disengagement",
    year: 2005,
    description: "Israeli withdrawal from Gaza",
    firstAppearance: true,
  },
  { id: "8", title: "Gaza War", year: 2008, description: "Operation Cast Lead", firstAppearance: true },
  {
    id: "9",
    title: "UN Recognition Bid",
    year: 2011,
    description: "Palestine seeks UN membership",
    firstAppearance: true,
  },
  { id: "10", title: "Gaza Conflict", year: 2014, description: "Operation Protective Edge", firstAppearance: true },
  { id: "11", title: "Great March of Return", year: 2018, description: "Gaza border protests", firstAppearance: true },
  { id: "12", title: "Abraham Accords", year: 2020, description: "Arab-Israeli normalization", firstAppearance: true },
  {
    id: "13",
    title: "Sheikh Jarrah Protests",
    year: 2021,
    description: "East Jerusalem evictions",
    firstAppearance: true,
  },
  { id: "14", title: "Al-Aqsa Clashes", year: 2021, description: "Jerusalem tensions escalate", firstAppearance: true },
  { id: "15", title: "Gaza Escalation", year: 2021, description: "11-day conflict", firstAppearance: true },
  { id: "16", title: "Jenin Operation", year: 2023, description: "Israeli military operation", firstAppearance: true },
  {
    id: "17",
    title: "West Bank Raids",
    year: 2023,
    description: "Increased military operations",
    firstAppearance: true,
  },
  { id: "18", title: "Al-Aqsa Tensions", year: 2023, description: "Holy site restrictions", firstAppearance: true },
  {
    id: "19",
    title: "Mandate Period Begins",
    year: 1920,
    description: "British Mandate established",
    firstAppearance: true,
  },
  {
    id: "20",
    title: "Arab Revolt",
    year: 1936,
    description: "Palestinian uprising against British",
    firstAppearance: true,
  },
  { id: "21", title: "UN Partition Plan", year: 1947, description: "UN Resolution 181", firstAppearance: true },
  {
    id: "22",
    title: "PLO Formation",
    year: 1964,
    description: "Palestine Liberation Organization",
    firstAppearance: true,
  },
  { id: "23", title: "Black September", year: 1970, description: "Jordan-PLO conflict", firstAppearance: true },
  { id: "24", title: "Lebanon War", year: 1982, description: "Israeli invasion of Lebanon", firstAppearance: true },
  {
    id: "25",
    title: "Palestinian Declaration",
    year: 1988,
    description: "Independence declaration",
    firstAppearance: true,
  },
]

function generateRandomYears(): number[] {
  const years = new Set<number>()
  while (years.size < 25) {
    years.add(Math.floor(Math.random() * (2025 - 1900 + 1)) + 1900)
  }
  return Array.from(years).sort((a, b) => a - b)
}

function DraggableEvent({
  event,
  hideYear = false,
}: {
  event: PalestinianEvent
  hideYear?: boolean
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: event.id,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white border-2 border-gray-300 rounded-xl p-3 cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-all duration-200 ${
        isDragging ? "opacity-50 scale-105 z-50" : ""
      }`}
    >
      {!hideYear && !isDragging && (
        <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full inline-block mb-2 font-bold">
          {event.year}
        </div>
      )}
      {event.firstAppearance && (
        <div className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full inline-block mb-2 ml-1 font-bold animate-pulse">
          First!
        </div>
      )}
      <h4 className="font-semibold text-sm text-gray-800 mb-1">{event.title}</h4>
      <p className="text-xs text-gray-600">{event.description}</p>
    </div>
  )
}

function DroppableCell({ cell }: { cell: BingoCell }) {
  const { isOver, setNodeRef } = useDroppable({
    id: cell.id,
  })

  return (
    <div
      ref={setNodeRef}
      className={`aspect-square border-3 rounded-2xl flex flex-col items-center justify-center p-4 min-h-[120px] transition-all duration-300 ${
        isOver ? "border-green-600 bg-green-50 scale-105 shadow-lg" : "border-gray-300"
      } ${
        cell.isCompleted
          ? cell.isCorrect
            ? "bg-green-100 border-green-600 shadow-md"
            : "bg-red-100 border-red-600 shadow-md"
          : "bg-white hover:border-green-400 hover:shadow-md"
      } ${cell.animationClass || ""}`}
    >
      <div className="text-center">
        <div className="text-2xl font-bold text-black mb-2 font-serif">{cell.year}</div>
        {cell.wrongAttempts > 0 && !cell.isCompleted && (
          <div className="text-xs text-red-500 mb-1">
            {cell.wrongAttempts} wrong attempt{cell.wrongAttempts > 1 ? "s" : ""}
          </div>
        )}
        {cell.isCompleted && (
          <div className="animate-bounce-in">
            {cell.isCorrect ? (
              <div className="flex flex-col items-center">
                <Check className="h-6 w-6 text-green-600 mb-1" />
                <span className="text-xs text-green-600 font-semibold">Correct!</span>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <X className="h-6 w-6 text-red-600 mb-1" />
                <span className="text-xs text-red-600 font-semibold">Try Again</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function SavedDatesArea({
  savedEvents,
  maxEvents = 5,
  onDeleteEvent,
  hideEventYears = false,
}: {
  savedEvents: SavedEvent[]
  maxEvents?: number
  onDeleteEvent: (eventId: string) => void
  hideEventYears?: boolean
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: "saved-area",
  })

  const isFull = savedEvents.length >= maxEvents

  return (
    <div
      ref={setNodeRef}
      className={`border-4 border-dashed rounded-2xl p-4 min-h-[300px] transition-all duration-300 ${
        isOver && !isFull
          ? "border-green-600 bg-green-50"
          : isFull
            ? "border-red-400 bg-red-50"
            : "border-gray-400 bg-gray-50"
      }`}
    >
      <div className="text-center mb-4">
        <Save className={`h-8 w-8 mx-auto mb-2 ${isFull ? "text-red-400" : "text-gray-400"}`} />
        <p className={`text-sm font-medium ${isFull ? "text-red-600" : "text-gray-600"}`}>
          Saved Events ({savedEvents.length}/{maxEvents})
        </p>
        <p className={`text-xs ${isFull ? "text-red-500" : "text-gray-500"}`}>
          {hideEventYears
            ? "Drag events to the correct years"
            : isFull
              ? "Storage full! Place events to save more"
              : "Drag events here to save"}
        </p>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {savedEvents.map((saved) => (
          <div key={saved.id} className="relative group">
            <DraggableEvent event={saved.event} hideYear={hideEventYears} />
            <button
              onClick={() => onDeleteEvent(saved.id)}
              className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg border-2 border-white transition-all duration-200 hover:scale-110"
              title="Delete saved event"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function LevelProgressDisplay({
  currentLevel,
  totalScore,
  gridSize,
  levelHistory,
}: {
  currentLevel: number
  totalScore: number
  gridSize: number
  levelHistory: LevelData[]
}) {
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-white">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-bold text-lg text-black">Level {currentLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 text-sm">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {gridSize}×{gridSize}
          </div>
          <div className="text-xs text-gray-600">Grid Size</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">{totalScore}</div>
          <div className="text-xs text-gray-600">Total Score</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">{levelHistory.length}</div>
          <div className="text-xs text-gray-600">Completed</div>
        </div>
      </div>
    </div>
  )
}

interface StarRatingProps {
  stars: number
  size?: "sm" | "lg"
}

function StarRating({ stars, size = "sm" | "lg" }: StarRatingProps) {
  return null
}

interface StarBreakdownProps {
  levelData: LevelData
  bingoGrid: BingoCell[]
}

function StarBreakdown({ levelData, bingoGrid }: StarBreakdownProps) {
  const allFirstAttempt = bingoGrid.every((cell) => !cell.isCompleted || (cell.isCorrect && cell.wrongAttempts === 0))
  const correctAnswers = bingoGrid.filter((cell) => cell.isCompleted && cell.isCorrect).length
  const halfGrid = Math.ceil((levelData.gridSize * levelData.gridSize) / 2)
  const allFilled = bingoGrid.every((cell) => cell.isCompleted && cell.isCorrect)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span>Level Completed:</span>
        <span className="font-semibold">{levelData.isCompleted ? "Yes" : "No"}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>All First Attempt:</span>
        <span className="font-semibold">{allFirstAttempt ? "Yes" : "No"}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>Correct Answers &gt; Half Grid:</span>
        <span className="font-semibold">{correctAnswers > halfGrid ? "Yes" : "No"}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>All Cells Filled:</span>
        <span className="font-semibold">{allFilled ? "Yes" : "No"}</span>
      </div>
      <div className="flex items-center justify-between">
        <span>All Filled &amp; First Attempt:</span>
        <span className="font-semibold">{allFilled && allFirstAttempt ? "Yes" : "No"}</span>
      </div>
    </div>
  )
}

function LevelCompleteModal({
  currentLevelData,
  gameProgress,
  onRestartLevel,
  onNextLevel,
  onBackToMenu,
  bingoGrid,
}: {
  currentLevelData: LevelData
  gameProgress: GameProgress
  onRestartLevel: () => void
  onNextLevel: () => void
  onBackToMenu: () => void
  bingoGrid: BingoCell[]
}) {
  const correctAnswers = bingoGrid.filter((cell) => cell.isCompleted && cell.isCorrect).length
  const totalCells = bingoGrid.length
  const wrongAttempts = bingoGrid.reduce((acc, cell) => acc + (cell.wrongAttempts || 0), 0)
  const accuracy = totalCells > 0 ? Math.round((correctAnswers / totalCells) * 100) : 0

  // Generate performance feedback
  const getPerformanceFeedback = () => {
    if (currentLevelData.stars === 5) {
      return "Outstanding performance! You achieved a perfect score with no mistakes."
    } else if (currentLevelData.stars >= 4) {
      return "Excellent work! You showed great knowledge of Palestinian history."
    } else if (currentLevelData.stars >= 3) {
      return "Good job! You correctly identified most events, but there's room for improvement."
    } else if (currentLevelData.stars >= 2) {
      return "Not bad! You got some events right, but try to study more about Palestinian history."
    } else {
      return "Keep practicing! Learning about Palestinian history takes time and effort."
    }
  }

  const getMistakeFeedback = () => {
    if (wrongAttempts === 0) {
      return "Perfect! No wrong attempts made."
    } else if (wrongAttempts <= 2) {
      return `Only ${wrongAttempts} wrong attempt${wrongAttempts === 1 ? "" : "s"}. Great accuracy!`
    } else if (wrongAttempts <= 5) {
      return `${wrongAttempts} wrong attempts. Try to be more careful with event placement.`
    } else {
      return `${wrongAttempts} wrong attempts. Consider studying the timeline more carefully before placing events.`
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-lg mx-4 text-center shadow-2xl border-4 border-green-600 animate-scale-in">
        <div className="mb-6">
          <div className="relative mb-4">
            <Trophy className="h-16 w-16 mx-auto text-green-600 animate-bounce" />
          </div>
          <h2 className="text-3xl font-bold text-black font-serif mb-4">Level {currentLevelData.level} Complete!</h2>

          {/* Performance Stats */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span>Events Placed:</span>
              <span className="font-semibold">
                {correctAnswers}/{totalCells}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Accuracy:</span>
              <span className="font-semibold">{accuracy}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Wrong Attempts:</span>
              <span className="font-semibold">{wrongAttempts}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Rounds Completed:</span>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Result:</span>
              <span className="font-semibold text-green-600">Won!</span>
            </div>
          </div>

          {/* Performance Feedback */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-4">
            <h3 className="font-bold text-blue-800 mb-2">Performance Feedback:</h3>
            <p className="text-blue-700 text-sm mb-2">{getPerformanceFeedback()}</p>
            <p className="text-blue-600 text-sm">{getMistakeFeedback()}</p>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-4">
            <p className="text-green-800 font-bold text-lg">Level Score: {currentLevelData.score} points</p>
            <p className="text-green-600 text-sm">
              Total Score: {gameProgress.totalScore + currentLevelData.score} points
            </p>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          <Button
            onClick={onRestartLevel}
            variant="outline"
            className="bg-white border-2 border-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
          {currentLevelData.level < 20 && (
            <Button
              onClick={onNextLevel}
              className="bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 transition-all duration-200"
            >
              <ArrowRight className="h-4 w-4 mr-2" />
              Next Level
            </Button>
          )}
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
          >
            <Home className="h-4 w-4 mr-2" />
            Level Menu
          </Button>
        </div>
      </div>
    </div>
  )
}

function GameOverModal({
  gameProgress,
  onRestartGame,
}: {
  gameProgress: GameProgress
  onRestartGame: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl border-4 border-red-600">
        <div className="mb-6">
          <X className="h-16 w-16 mx-auto mb-4 text-red-600" />
          <h2 className="text-3xl font-bold text-black font-serif mb-2">Game Over!</h2>
          <p className="text-gray-600 text-lg">Your total score is {gameProgress.totalScore}</p>
        </div>

        <Button
          onClick={onRestartGame}
          size="lg"
          className="w-full bg-red-600 hover:bg-red-700 text-white text-xl py-4 rounded-2xl font-bold shadow-lg"
        >
          <RotateCcw className="h-6 w-6 mr-3" />
          Restart Game
        </Button>
      </div>
    </div>
  )
}

function LevelFailedModal({
  currentLevelData,
  onRetryLevel,
  onBackToMenu,
}: {
  currentLevelData: LevelData
  onRetryLevel: () => void
  onBackToMenu: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl border-4 border-red-600">
        <div className="mb-6">
          <X className="h-16 w-16 mx-auto mb-4 text-red-600" />
          <h2 className="text-3xl font-bold text-black font-serif mb-2">Level Failed</h2>
          <p className="text-gray-600 text-lg mb-4">
            You used all {currentLevelData.maxAttempts} attempts for Level {currentLevelData.level}
          </p>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4">
            <p className="text-red-800 font-medium">
              Don't give up! You can retry this level or return to the main menu.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={onRetryLevel}
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-xl py-4 rounded-2xl font-bold shadow-lg"
          >
            <RotateCcw className="h-6 w-6 mr-3" />
            Try Level {currentLevelData.level} Again
          </Button>
          <Button
            onClick={onBackToMenu}
            variant="outline"
            size="lg"
            className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-xl py-4 rounded-2xl font-bold bg-transparent"
          >
            <Home className="h-6 w-6 mr-3" />
            Back to Level Menu
          </Button>
        </div>
      </div>
    </div>
  )
}

function getGridSizeForLevel(level: number): number {
  return 3 + Math.floor((level - 1) / 10)
}

function generateRandomYearsForGrid(gridSize: number): number[] {
  const totalCells = gridSize * gridSize
  const years = new Set<number>()
  while (years.size < totalCells) {
    years.add(Math.floor(Math.random() * (2025 - 1900 + 1)) + 1900)
  }
  return Array.from(years).sort((a, b) => a - b)
}

function calculateLevelStars(levelData: LevelData, bingoGrid: BingoCell[]): number {
  let stars = 0

  // Only give stars if the level was actually won (has bingo)
  if (!levelData.isCompleted) {
    return 0
  }

  // Base star for winning
  stars += 1

  const allFirstAttempt = bingoGrid.every((cell) => !cell.isCompleted || (cell.isCorrect && cell.wrongAttempts === 0))
  if (allFirstAttempt) {
    stars += 1
  }

  const correctAnswers = bingoGrid.filter((cell) => cell.isCompleted && cell.isCorrect).length
  const halfGrid = Math.ceil((levelData.gridSize * levelData.gridSize) / 2)
  if (correctAnswers > halfGrid) {
    stars += 1
  }

  const allFilled = bingoGrid.every((cell) => cell.isCompleted && cell.isCorrect)
  if (allFilled) {
    stars += 1
  }

  if (allFilled && allFirstAttempt) {
    stars += 1
  }

  return Math.min(stars, 5)
}

function MainMenu({
  onStartGame,
  gameProgress,
  selectLevel,
}: { onStartGame: () => void; gameProgress: GameProgress; selectLevel: (level: number) => void }) {
  const isFirstTime = gameProgress.levelHistory.length === 0 && gameProgress.currentLevel === 1

  return (
    <div className="min-h-screen p-4 palestinian-pattern flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="bg-white border-4 border-green-600 shadow-2xl rounded-3xl overflow-hidden animate-fade-in">
          <CardHeader className="bg-green-800 text-white p-8">
            <CardTitle className="text-5xl font-bold font-serif mb-4 text-white drop-shadow-lg">
              Palestinian Historical Bingo
            </CardTitle>
            <p className="text-xl opacity-90 text-white drop-shadow-md">Test your knowledge of Palestinian history</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Progress Overview */}
              <div className="bg-gradient-to-r from-green-100 to-red-100 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-black mb-4">Your Progress</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{gameProgress.currentLevel}</div>
                    <div className="text-sm text-gray-600">Current Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{gameProgress.totalScore}</div>
                    <div className="text-sm text-gray-600">Total Score</div>
                  </div>
                </div>
              </div>

              {/* Game Description */}
              <div className="text-left space-y-4">
                <h3 className="text-2xl font-bold text-black font-serif">How to Play:</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      1
                    </div>
                    <div>
                      <strong>3 Chances per Round:</strong> Each round gives you 3 chances (10 seconds each) to collect
                      events.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      2
                    </div>
                    <div>
                      <strong>Save & Place:</strong> Drag events to save them, then match them with correct years on the
                      bingo grid.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      3
                    </div>
                    <div>
                      <strong>Win Condition:</strong> Complete a row, column, or diagonal to achieve BINGO!
                    </div>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={
                    isFirstTime
                      ? onStartGame
                      : () => {
                          selectLevel(gameProgress.currentLevel)
                        }
                  }
                  size="lg"
                  className="w-full bg-red-700 hover:bg-red-800 text-white text-2xl py-8 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="h-8 w-8 mr-4" />
                  {isFirstTime ? "Start Game" : `Continue from Level ${gameProgress.currentLevel}`}
                </Button>

                <Button
                  onClick={onStartGame}
                  variant="outline"
                  className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200 bg-white"
                >
                  Level Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface LevelSelectionScreenProps {
  gameProgress: GameProgress
  onSelectLevel: (level: number) => void
  onBackToMenu: () => void
}

const LevelSelectionScreen = ({ gameProgress, onSelectLevel, onBackToMenu }: LevelSelectionScreenProps) => {
  const maxUnlockedLevel = Math.max(1, gameProgress.currentLevel)

  const getPathPosition = (level: number) => {
    const positions = [
      { x: 50, y: 100 }, // Level 1 - Start of trail
      { x: 120, y: 150 }, // Level 2
      { x: 200, y: 120 }, // Level 3
      { x: 280, y: 180 }, // Level 4
      { x: 350, y: 140 }, // Level 5
      { x: 320, y: 220 }, // Level 6
      { x: 240, y: 280 }, // Level 7
      { x: 160, y: 320 }, // Level 8
      { x: 80, y: 280 }, // Level 9
      { x: 40, y: 360 }, // Level 10 - Checkpoint
      { x: 120, y: 420 }, // Level 11
      { x: 200, y: 460 }, // Level 12
      { x: 280, y: 420 }, // Level 13
      { x: 340, y: 480 }, // Level 14
      { x: 300, y: 560 }, // Level 15
      { x: 220, y: 600 }, // Level 16
      { x: 140, y: 580 }, // Level 17
      { x: 60, y: 640 }, // Level 18
      { x: 120, y: 720 }, // Level 19
      { x: 200, y: 780 }, // Level 20 - Final destination
    ]
    return positions[level - 1] || { x: 200, y: 100 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-green-200 to-yellow-100 p-4 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        {/* Mountains in background */}
        <div
          className="absolute top-10 left-10 w-20 h-16 bg-gray-600 transform rotate-12"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>
        <div
          className="absolute top-8 left-24 w-16 h-12 bg-gray-500 transform -rotate-6"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>
        <div
          className="absolute top-12 right-20 w-24 h-18 bg-gray-600 transform rotate-6"
          style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        ></div>

        {/* Trees scattered around */}
        <div className="absolute top-32 left-8 w-4 h-6 bg-green-600 rounded-full"></div>
        <div className="absolute top-28 left-10 w-2 h-8 bg-amber-800"></div>
        <div className="absolute top-64 right-12 w-4 h-6 bg-green-600 rounded-full"></div>
        <div className="absolute top-60 right-14 w-2 h-8 bg-amber-800"></div>
        <div className="absolute bottom-32 left-16 w-4 h-6 bg-green-600 rounded-full"></div>
        <div className="absolute bottom-28 left-18 w-2 h-8 bg-amber-800"></div>

        {/* Clouds */}
        <div className="absolute top-16 right-32 w-12 h-6 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-20 right-28 w-8 h-4 bg-white rounded-full opacity-60"></div>
        <div className="absolute top-24 left-32 w-10 h-5 bg-white rounded-full opacity-60"></div>
      </div>

      <Card className="max-w-md mx-auto shadow-2xl border-4 border-green-600 bg-white/95 backdrop-blur relative z-10">
        <CardHeader className="bg-gradient-to-r from-black via-green-600 to-red-600 text-white text-center py-6">
          <div className="flex items-center justify-between">
            <Button onClick={onBackToMenu} variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
              <Home className="h-6 w-6" />
            </Button>
            <CardTitle className="text-2xl font-bold text-white drop-shadow-lg">Palestinian History Trail</CardTitle>
            <div className="w-10"></div>
          </div>
        </CardHeader>

        <CardContent className="p-6 bg-gradient-to-b from-white to-gray-50">
          <div className="relative h-[1000px] overflow-hidden bg-gradient-to-b from-green-100 to-yellow-50 rounded-xl border-2 border-green-300">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 1000" preserveAspectRatio="xMidYMin meet">
              <defs>
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b4513" stopOpacity="0.8" />
                  <stop offset={`${(maxUnlockedLevel / 20) * 100}%`} stopColor="#8b4513" stopOpacity="0.8" />
                  <stop offset={`${(maxUnlockedLevel / 20) * 100}%`} stopColor="#d1d5db" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#d1d5db" stopOpacity="0.4" />
                </linearGradient>
                <pattern id="roadPattern" patternUnits="userSpaceOnUse" width="20" height="10">
                  <rect width="20" height="10" fill="none" />
                  <rect x="8" y="4" width="4" height="2" fill="#fff" opacity="0.6" />
                </pattern>
              </defs>

              {/* Main trail/road */}
              <path
                d="M50 100 
                   Q85 125 120 150
                   Q160 135 200 120
                   Q240 150 280 180
                   Q315 160 350 140
                   Q335 180 320 220
                   Q280 250 240 280
                   Q200 300 160 320
                   Q120 300 80 280
                   Q60 320 40 360
                   Q80 390 120 420
                   Q160 440 200 460
                   Q240 440 280 420
                   Q320 450 340 480
                   Q320 520 300 560
                   Q260 580 220 600
                   Q180 580 140 580
                   Q100 620 60 640
                   Q90 680 120 720
                   Q160 750 200 780"
                stroke="url(#roadGradient)"
                strokeWidth="16"
                fill="none"
                className="drop-shadow-lg"
              />

              {/* Road center line */}
              <path
                d="M50 100 
                   Q85 125 120 150
                   Q160 135 200 120
                   Q240 150 280 180
                   Q315 160 350 140
                   Q335 180 320 220
                   Q280 250 240 280
                   Q200 300 160 320
                   Q120 300 80 280
                   Q60 320 40 360
                   Q80 390 120 420
                   Q160 440 200 460
                   Q240 440 280 420
                   Q320 450 340 480
                   Q320 520 300 560
                   Q260 580 220 600
                   Q180 580 140 580
                   Q100 620 60 640
                   Q90 680 120 720
                   Q160 750 200 780"
                stroke="url(#roadPattern)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="10,10"
                className="opacity-60"
              />
            </svg>

            <div className="absolute inset-0">
              {/* Palestinian olive trees */}
              <div className="absolute top-20 left-20 text-2xl">🫒</div>
              <div className="absolute top-40 right-20 text-2xl">🫒</div>
              <div className="absolute top-80 left-10 text-2xl">🫒</div>
              <div className="absolute bottom-40 right-30 text-2xl">🫒</div>

              {/* Small Palestinian flags along the trail */}
              <div className="absolute top-60 left-60">
                <div className="w-3 h-2 bg-gradient-to-r from-black via-white via-green-600 to-red-600 rounded-sm"></div>
                <div className="w-0.5 h-4 bg-gray-600 ml-0.5"></div>
              </div>
              <div className="absolute top-120 right-40">
                <div className="w-3 h-2 bg-gradient-to-r from-black via-white via-green-600 to-red-600 rounded-sm"></div>
                <div className="w-0.5 h-4 bg-gray-600 ml-0.5"></div>
              </div>
              <div className="absolute bottom-60 left-40">
                <div className="w-3 h-2 bg-gradient-to-r from-black via-white via-green-600 to-red-600 rounded-sm"></div>
                <div className="w-0.5 h-4 bg-gray-600 ml-0.5"></div>
              </div>

              {/* Road signs */}
              <div className="absolute top-32 right-8 w-6 h-6 bg-yellow-400 border-2 border-red-600 rounded-sm flex items-center justify-center text-xs font-bold">
                !
              </div>
              <div className="absolute top-72 left-4 w-6 h-6 bg-blue-400 border-2 border-white rounded-full flex items-center justify-center text-xs">
                i
              </div>
            </div>

            <div className="relative z-10">
              {Array.from({ length: 20 }, (_, i) => {
                const level = i + 1
                const isUnlocked = level <= maxUnlockedLevel
                const levelData = gameProgress.levelHistory.find((l) => l.level === level)
                const stars = levelData?.stars || 0
                const gridSize = getGridSizeForLevel(level)
                const isCurrentLevel = level === gameProgress.currentLevel
                const isCheckpoint = level % 10 === 0

                const pathPos = getPathPosition(level)

                return (
                  <div
                    key={level}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${pathPos.x}px`,
                      top: `${pathPos.y}px`,
                    }}
                  >
                    <div
                      className={`relative cursor-pointer transition-all duration-300 transform hover:scale-110 ${
                        isCurrentLevel ? "animate-pulse" : ""
                      }`}
                      onClick={() => isUnlocked && onSelectLevel(level)}
                    >
                      <div
                        className={`${isCheckpoint ? "w-18 h-18" : "w-14 h-14"} rounded-full border-4 flex flex-col items-center justify-center shadow-xl transition-all duration-300 ${
                          isUnlocked
                            ? isCurrentLevel
                              ? "bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-600 shadow-yellow-400"
                              : levelData?.isCompleted
                                ? "bg-gradient-to-br from-green-500 to-green-700 border-green-600 shadow-green-400"
                                : "bg-gradient-to-br from-red-500 to-red-700 border-red-600 shadow-red-400"
                            : "bg-gradient-to-br from-gray-400 to-gray-600 border-gray-500 shadow-gray-400"
                        }`}
                      >
                        {!isUnlocked ? (
                          <Lock className={`${isCheckpoint ? "h-6 w-6" : "h-4 w-4"} text-gray-200`} />
                        ) : isCheckpoint ? (
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-3 bg-gradient-to-r from-black via-white via-green-600 to-red-600 rounded-sm mb-1"></div>
                            <div className="text-sm font-bold text-white">{level}</div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <span className="text-sm font-bold text-white">{level}</span>
                            <div className="text-xs text-white/80">
                              {gridSize}×{gridSize}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Current level indicator */}
                      {isCurrentLevel && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center border-2 border-white">
                          <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                        </div>
                      )}

                      {/* Completion checkmark */}
                      {levelData?.isCompleted && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-600 rounded-full flex items-center justify-center border-2 border-white">
                          <Check className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Level info below */}
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center">
                      <div className="text-xs font-bold text-gray-800">Level {level}</div>
                      {levelData && (
                        <div className="text-xs text-green-700 bg-green-100 rounded-full px-1.5 py-0.5 mt-1">
                          {levelData.score} pts
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Progress section */}
          <div className="mt-6 bg-gradient-to-r from-green-50 via-white to-red-50 rounded-2xl p-4 text-center border-2 border-gray-200">
            <div className="flex items-center justify-center mb-3">
              <div className="w-6 h-4 bg-gradient-to-r from-black via-white via-green-600 to-red-600 rounded-sm mr-2"></div>
              <div className="text-lg font-bold text-gray-800">Progress: {maxUnlockedLevel}/20</div>
              <div className="w-6 h-4 bg-gradient-to-r from-black via-white via-green-600 to-red-600 rounded-sm ml-2"></div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
              <div
                className="bg-gradient-to-r from-green-600 to-red-600 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(maxUnlockedLevel / 20) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="mt-4 flex justify-center items-center space-x-4">
            <div className="bg-blue-100 rounded-full px-3 py-1 shadow-md">
              <span className="text-blue-700 font-bold">🏆 {gameProgress.totalScore} Points</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function LevelSelect({
  gameProgress,
  onSelectLevel,
  onBackToMenu,
}: {
  gameProgress: GameProgress
  onSelectLevel: (level: number) => void
  onBackToMenu: () => void
}) {
  return <LevelSelectionScreen gameProgress={gameProgress} onSelectLevel={onSelectLevel} onBackToMenu={onBackToMenu} />
}

function CollectingPhase({
  currentEvents,
  roundData,
  currentRound,
  savedEvents,
  onDeleteEvent,
  bingoGrid,
  gridSize,
}: {
  currentEvents: PalestinianEvent[]
  roundData: RoundData
  currentRound: number
  savedEvents: SavedEvent[]
  onDeleteEvent: (eventId: string) => void
  bingoGrid: BingoCell[]
  gridSize: number
}) {
  return (
    <div className="space-y-6">
      {/* Round Info Header */}
      <Card className="bg-white shadow-lg rounded-2xl border-2 border-gray-200">
        <CardHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">
              Round {currentRound} - Chance {roundData.currentChance}/{roundData.maxChances}
            </CardTitle>
            <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl">
              <Clock className="h-5 w-5" />
              <span className="font-bold text-lg">{roundData.chanceTimer}s</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Current Events */}
        <Card className="bg-white shadow-lg rounded-2xl border-2 border-gray-200">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-lg font-semibold">Available Events</CardTitle>
            <p className="text-sm text-gray-600">Collect events to save for the placing phase</p>
          </CardHeader>
          <CardContent className="p-4">
            {currentEvents.length === 0 ? (
              <div className="text-center text-gray-500 py-6">Waiting for next events...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentEvents.map((event) => (
                  <DraggableEvent key={event.id} event={event} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Events */}
        <SavedDatesArea savedEvents={savedEvents} onDeleteEvent={onDeleteEvent} />
      </div>
    </div>
  )
}

function PlacingPhase({
  bingoGrid,
  savedEvents,
  onDeleteEvent,
  onNextRound,
  currentRound,
  gridSize,
}: {
  bingoGrid: BingoCell[]
  savedEvents: SavedEvent[]
  onDeleteEvent: (eventId: string) => void
  onNextRound: () => void
  currentRound: number
  gridSize: number
}) {
  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <Card className="bg-white shadow-lg rounded-2xl border-2 border-gray-200">
        <CardHeader className="p-4 border-b">
          <CardTitle className="text-xl font-semibold">Round {currentRound} - Placing Phase</CardTitle>
          <p className="text-gray-600">
            Drag your saved events to the correct years on the bingo grid. Events are hidden to test your memory!
          </p>
        </CardHeader>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        {/* Bingo Grid - Larger during placing phase */}
        <div className="lg:w-3/5">
          <Card className="bg-white shadow-lg rounded-2xl border-2 border-gray-200">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg font-semibold">Bingo Grid - Place Your Events</CardTitle>
              <p className="text-sm text-gray-600">Drag events from the right to match them with the correct years</p>
            </CardHeader>
            <CardContent className="p-6">
              <div
                className="gap-3 mx-auto"
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                  maxWidth: `${gridSize * 80}px`,
                }}
              >
                {bingoGrid.map((cell) => (
                  <DroppableCell key={cell.id} cell={cell} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Events - Smaller during placing phase */}
        <div className="lg:w-2/5">
          <SavedDatesArea savedEvents={savedEvents} onDeleteEvent={onDeleteEvent} hideEventYears={true} />
        </div>
      </div>

      {/* Big Next Round Button */}
      <div className="flex justify-center">
        <Button
          onClick={onNextRound}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-2xl py-8 px-12 rounded-3xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-200 border-4 border-white"
        >
          <ArrowRight className="h-8 w-8 mr-4" />
          Check Bingo & Next Round
        </Button>
      </div>
    </div>
  )
}

interface RoundTransitionModalProps {
  currentRound: number
  onContinue: () => void
  gamePhase: GamePhase
}

function RoundTransitionModal({ currentRound, onContinue, gamePhase }: RoundTransitionModalProps) {
  if (gamePhase !== "roundTransition") {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl border-4 border-blue-600 animate-scale-in">
        <div className="mb-6">
          <RotateCcw className="h-16 w-16 mx-auto mb-4 text-blue-600 animate-spin" />
          <h2 className="text-3xl font-bold text-black font-serif mb-2">End of Round {currentRound}</h2>
          <p className="text-gray-600 text-lg">Time to place your saved events!</p>
        </div>

        <Button
          onClick={onContinue}
          size="lg"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xl py-4 rounded-2xl font-bold shadow-lg"
        >
          Continue to Placing Phase
        </Button>
      </div>
    </div>
  )
}

export default function BingoGame({ onBack, level, onLevelSelect, onLevelComplete }: BingoGameProps = {}) {
  const [gameState, setGameState] = useState<GameState>("mainMenu")
  const [gamePhase, setGamePhase] = useState<GamePhase>("collecting")
  const [currentRound, setCurrentRound] = useState<number>(1)

  const [roundData, setRoundData] = useState<RoundData>({
    currentChance: 1,
    maxChances: 3,
    chanceTimer: 10,
    chanceStartTime: Date.now(),
  })

  const [gameProgress, setGameProgress] = useState<GameProgress>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("palestinian-bingo-progress")
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          return parsed
        } catch (e) {
          console.error("Failed to load saved progress:", e)
        }
      }
    }
    return {
      currentLevel: 1,
      totalScore: 0,
      levelHistory: [],
    }
  })

  const [currentLevelData, setCurrentLevelData] = useState<LevelData>(() => {
    if (gameProgress.currentLevelData) {
      return gameProgress.currentLevelData
    }
    return {
      level: gameProgress.currentLevel,
      gridSize: getGridSizeForLevel(gameProgress.currentLevel),
      attempts: 0,
      maxAttempts: 3,
      score: 0,
      stars: 0,
      isCompleted: false,
    }
  })

  const [round, setRound] = useState(gameProgress.currentRound || 1)
  const [attempts, setAttempts] = useState(gameProgress.currentAttempts || 0)

  const [bingoGrid, setBingoGrid] = useState<BingoCell[]>(() => {
    const gridSize = getGridSizeForLevel(gameProgress.currentLevel)
    return generateRandomYearsForGrid(gridSize).map((year, i) => ({
      id: `cell-${i}`,
      year,
      isCompleted: false,
      isCorrect: null,
      animationClass: "",
      wrongAttempts: 0,
    }))
  })

  const [currentEvents, setCurrentEvents] = useState<PalestinianEvent[]>([])
  const [savedEvents, setSavedEvents] = useState<SavedEvent[]>([])
  const [eventTimer, setEventTimer] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [gameStartTime, setGameStartTime] = useState<number>(Date.now())
  const [elapsedTime, setElapsedTime] = useState<number>(0)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [usedEvents, setUsedEvents] = useState<Set<string>>(new Set())
  const [showLevelTransition, setShowLevelTransition] = useState(false)
  const [transitionFromLevel, setTransitionFromLevel] = useState(1)
  const [firstAppearanceEvents, setFirstAppearanceEvents] = useState<Set<string>>(new Set())

  const { consumeHeart, recordGameResult, canPlayGame } = useGamification()

  const generateRandomEvents = useCallback((count: number, gridYears: number[]): PalestinianEvent[] => {
    const minYear = Math.min(...gridYears)
    const maxYear = Math.max(...gridYears)
    const yearRange = maxYear - minYear

    // Create more varied event types based on historical periods
    const eventTemplates = [
      {
        type: "political",
        titles: [
          "Political Reform",
          "Government Change",
          "Constitutional Amendment",
          "Electoral Reform",
          "Administrative Restructure",
        ],
      },
      {
        type: "economic",
        titles: [
          "Economic Policy",
          "Trade Agreement",
          "Currency Reform",
          "Industrial Development",
          "Agricultural Initiative",
        ],
      },
      {
        type: "social",
        titles: [
          "Social Movement",
          "Educational Reform",
          "Healthcare Initiative",
          "Cultural Development",
          "Community Program",
        ],
      },
      {
        type: "technological",
        titles: [
          "Technological Advancement",
          "Infrastructure Project",
          "Communication System",
          "Transportation Development",
          "Scientific Discovery",
        ],
      },
      {
        type: "international",
        titles: [
          "International Treaty",
          "Diplomatic Relations",
          "Border Agreement",
          "Trade Partnership",
          "Cultural Exchange",
        ],
      },
    ]

    const events: PalestinianEvent[] = []

    // Generate correct events (within grid years)
    const correctEventCount = Math.ceil(count * 0.7) // 70% correct events
    for (let i = 0; i < correctEventCount; i++) {
      const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)]
      const title = template.titles[Math.floor(Math.random() * template.titles.length)]
      const year = gridYears[Math.floor(Math.random() * gridYears.length)]

      events.push({
        id: `generated-${Date.now()}-${i}`,
        title,
        year,
        description: `Important ${template.type} development that occurred`,
        firstAppearance: true,
      })
    }

    // Generate incorrect events (outside grid years)
    const incorrectEventCount = count - correctEventCount
    for (let i = 0; i < incorrectEventCount; i++) {
      const template = eventTemplates[Math.floor(Math.random() * eventTemplates.length)]
      const title = template.titles[Math.floor(Math.random() * template.titles.length)]

      // Generate years outside the grid range
      let year: number
      if (Math.random() < 0.5) {
        // Earlier than grid range
        year = minYear - Math.floor(Math.random() * Math.min(50, yearRange)) - 1
      } else {
        // Later than grid range
        year = maxYear + Math.floor(Math.random() * Math.min(50, yearRange)) + 1
      }

      events.push({
        id: `generated-incorrect-${Date.now()}-${i}`,
        title,
        year,
        description: `${template.type} event from outside the current period`,
        firstAppearance: true,
      })
    }

    return events.sort(() => 0.5 - Math.random())
  }, [])

  const showRandomEventsInner = useCallback(() => {
    if (gameState !== "playing" || gamePhase !== "collecting") return

    // Scale difficulty based on level
    const level = currentLevelData.level
    const baseEventCount = 4
    const eventCount = Math.min(baseEventCount + Math.floor(level / 5), 6) // Increase events every 5 levels, max 6

    // Generate level-appropriate events
    const gridYears = bingoGrid.map((cell) => cell.year)
    const generatedEvents = generateRandomEvents(eventCount, gridYears)

    // Mix with some Palestinian historical events if available
    const availablePalestinianEvents = palestinianEvents.filter((event) => !usedEvents.has(event.id))
    const palestinianEventCount = Math.min(2, availablePalestinianEvents.length)
    const selectedPalestinianEvents = availablePalestinianEvents
      .sort(() => 0.5 - Math.random())
      .slice(0, palestinianEventCount)

    // Combine generated and Palestinian events
    const allEvents = [...generatedEvents, ...selectedPalestinianEvents]
      .sort(() => 0.5 - Math.random())
      .slice(0, eventCount)

    setCurrentEvents(allEvents)

    // Scale event display time based on level (harder levels = less time)
    const baseEventTime = 10
    const levelAdjustment = Math.max(1, Math.floor(level / 3))
    const eventDisplayTime = Math.max(6, baseEventTime - levelAdjustment)
    setEventTimer(eventDisplayTime)
  }, [usedEvents, gameState, gamePhase, currentLevelData.level, bingoGrid, generateRandomEvents])

  useEffect(() => {
    if (gameState === "playing" && roundData.chanceTimer > 0 && gamePhase === "collecting") {
      const timer = setTimeout(() => setRoundData((prev) => ({ ...prev, chanceTimer: prev.chanceTimer - 1 })), 1000)
      return () => clearTimeout(timer)
    } else if (gameState === "playing" && roundData.chanceTimer === 0 && gamePhase === "collecting") {
      // Move to next chance or end round
      if (roundData.currentChance < roundData.maxChances) {
        setRoundData((prev) => ({
          ...prev,
          currentChance: prev.currentChance + 1,
          chanceTimer: 10,
          chanceStartTime: Date.now(),
        }))
        setCurrentEvents([])
      } else {
        setGamePhase("roundTransition")
        setCurrentEvents([])
      }
    }
  }, [roundData.chanceTimer, gameState, gamePhase, roundData.currentChance, roundData.maxChances])

  useEffect(() => {
    if (gameState === "playing" && gamePhase === "collecting" && roundData.chanceTimer === 10) {
      showRandomEventsInner()
    }
  }, [gameState, gamePhase, roundData.chanceTimer, roundData.currentChance, showRandomEventsInner])

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(Date.now() - gameStartTime)
    }, 1000)
    return () => clearInterval(timer)
  }, [gameStartTime])

  const saveProgress = useCallback(() => {
    if (typeof window !== "undefined") {
      const progressToSave: GameProgress = {
        currentLevel: gameProgress.currentLevel,
        totalScore: gameProgress.totalScore,
        levelHistory: gameProgress.levelHistory,
        currentLevelData: currentLevelData,
        currentRound: round,
        currentAttempts: attempts,
      }
      localStorage.setItem("palestinian-bingo-progress", JSON.stringify(progressToSave))
    }
  }, [gameProgress, currentLevelData, round, attempts])

  useEffect(() => {
    saveProgress()
  }, [saveProgress])

  const goToLevelSelect = () => {
    setGameState("levelSelect")
  }

  const backToMainMenu = () => {
    if (onBack) {
      onBack()
    } else {
      setGameState("mainMenu")
    }
  }

  const selectLevel = (level: number) => {
    if (!canPlayGame()) {
      return
    }

    if (onLevelSelect) {
      onLevelSelect(level)
      return
    }

    // Set up the selected level
    const gridSize = getGridSizeForLevel(level)
    const newGrid = generateRandomYearsForGrid(gridSize).map((year, i) => ({
      id: `cell-${i}`,
      year,
      isCompleted: false,
      isCorrect: null,
      animationClass: "",
      wrongAttempts: 0,
    }))

    setBingoGrid(newGrid)
    setCurrentLevelData({
      level,
      gridSize,
      attempts: 0,
      maxAttempts: 3,
      isCompleted: false,
      stars: 0,
      score: 0,
    })

    // Update game progress
    setGameProgress((prev) => ({ ...prev, currentLevel: level }))

    // Reset game state
    setCurrentEvents([])
    setSavedEvents([])
    setScore(0)
    setUsedEvents(new Set())
    setCurrentRound(1)
    setRoundData({
      currentChance: 1,
      maxChances: 3,
      chanceTimer: 10,
      chanceStartTime: Date.now(),
    })

    setGameState("preview")
  }

  const startRoundOne = () => {
    if (!consumeHeart()) {
      return // Can't start game without hearts
    }

    setGameState("playing")
    setGamePhase("collecting")
    setCurrentRound(1)
    setRoundData({
      currentChance: 1,
      maxChances: 3,
      chanceTimer: 10,
      chanceStartTime: Date.now(),
    })
    setGameStartTime(Date.now())
    setCurrentLevelData((prev) => ({ ...prev, attempts: prev.attempts + 1 }))
  }

  const nextRound = () => {
    // Check if we've completed all rounds for this attempt
    if (currentRound >= 3) {
      // After 3 rounds, check for win condition (bingo achieved)
      if (checkBingo()) {
        const stars = calculateLevelStars(currentLevelData, bingoGrid)
        const updatedLevelData = {
          ...currentLevelData,
          isCompleted: true,
          stars,
          score: score,
        }
        setCurrentLevelData(updatedLevelData)
        setGameState("levelComplete")

        const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000)
        const correctAnswers = bingoGrid.filter((cell) => cell.isCorrect).length
        const totalQuestions = bingoGrid.length
        const isPerfectGame = correctAnswers === totalQuestions && currentLevelData.attempts === 1

        recordGameResult({
          gameType: "Bingo",
          level: currentLevelData.level,
          basePoints: score,
          finalPoints: score + stars * 50, // Bonus points for stars
          timeSpent,
          correctAnswers,
          totalQuestions,
          isWin: true,
          isPerfectGame,
          speedBonus: timeSpent < 60 ? 50 : 0,
          firstAttemptBonus: currentLevelData.attempts === 1 ? 25 : 0,
          perfectGameBonus: isPerfectGame ? 100 : 0,
        })

        const newProgress = {
          ...gameProgress,
          currentLevel: Math.max(gameProgress.currentLevel, currentLevelData.level + 1),
          totalScore: gameProgress.totalScore + score,
          levelHistory: [
            ...gameProgress.levelHistory.filter((l) => l.level !== currentLevelData.level),
            updatedLevelData,
          ],
        }
        setGameProgress(newProgress)

        if (typeof window !== "undefined") {
          localStorage.setItem("palestinian-bingo-progress", JSON.stringify(newProgress))
        }

        return
      }

      // No bingo after 3 rounds - check if we've reached max attempts
      if (currentLevelData.attempts >= currentLevelData.maxAttempts) {
        const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000)
        const correctAnswers = bingoGrid.filter((cell) => cell.isCorrect).length
        const totalQuestions = bingoGrid.length

        recordGameResult({
          gameType: "Bingo",
          level: currentLevelData.level,
          basePoints: score,
          finalPoints: score,
          timeSpent,
          correctAnswers,
          totalQuestions,
          isWin: false,
          isPerfectGame: false,
          speedBonus: 0,
          firstAttemptBonus: 0,
          perfectGameBonus: 0,
        })

        setGameState("levelFailed")
        return
      }

      // Start a new attempt (reset to round 1)
      setCurrentRound(1)
      setCurrentLevelData((prev) => ({ ...prev, attempts: prev.attempts + 1 }))
    } else {
      // Continue to next round within the same attempt
      setCurrentRound((prev) => prev + 1)
    }

    // Reset for next round
    setGamePhase("collecting")
    setRoundData({
      currentChance: 1,
      maxChances: 3,
      chanceTimer: 10,
      chanceStartTime: Date.now(),
    })
    setSavedEvents([])
    setCurrentEvents([])
  }

  const retryLevel = () => {
    const resetLevelData: LevelData = {
      level: currentLevelData.level,
      gridSize: currentLevelData.gridSize,
      attempts: 0,
      maxAttempts: 3,
      score: 0,
      stars: 0,
      isCompleted: false,
    }

    setCurrentLevelData(resetLevelData)
    setRound(1)
    setAttempts(0)
    setScore(0)
    setSavedEvents([])
    setBingoGrid(generateRandomYearsForGrid(resetLevelData.gridSize))
    setGameState("preview")

    const updatedProgress = {
      ...gameProgress,
      currentLevelData: resetLevelData,
      currentRound: 1,
      currentAttempts: 0,
    }
    setGameProgress(updatedProgress)
    saveProgress()
  }

  const quitToMainMenu = () => {
    setGameState("start")
    setGamePhase("collecting")
    setCurrentRound(1)
    setRoundData({
      currentChance: 1,
      maxChances: 3,
      chanceTimer: 10,
      chanceStartTime: Date.now(),
    })

    // Don't reset progress, just return to main menu
    const gridSize = getGridSizeForLevel(gameProgress.currentLevel)
    setBingoGrid(
      generateRandomYearsForGrid(gridSize).map((year, i) => ({
        id: `cell-${i}`,
        year,
        isCompleted: false,
        isCorrect: null,
        animationClass: "",
        wrongAttempts: 0,
      })),
    )

    setCurrentLevelData({
      level: gameProgress.currentLevel,
      gridSize,
      attempts: 0,
      maxAttempts: 3,
      isCompleted: false,
      stars: 0,
      score: 0,
    })

    setCurrentEvents([])
    setSavedEvents([])
    setEventTimer(0)
    setScore(0)
    setGameStartTime(Date.now())
    setElapsedTime(0)
    setUsedEvents(new Set())

    palestinianEvents.forEach((event) => {
      event.firstAppearance = true
    })
  }

  const deleteEvent = (eventId: string) => {
    setSavedEvents((prev) => prev.filter((saved) => saved.id !== eventId))
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)

    if (!over) return

    const draggedEvent =
      currentEvents.find((e) => e.id === active.id) || savedEvents.find((saved) => saved.event.id === active.id)?.event

    if (!draggedEvent) return

    if (over.id === "saved-area") {
      if (savedEvents.length >= 5) {
        return
      }

      if (currentEvents.find((e) => e.id === active.id)) {
        const basePoints = draggedEvent.firstAppearance ? 20 : 10
        const levelMultiplier = 1 + (currentLevelData.level - 1) * 0.1 // 10% bonus per level
        const bonusPoints = Math.floor(basePoints * levelMultiplier)

        setScore((prev) => prev + bonusPoints)
        setSavedEvents((prev) => [...prev, { id: `saved-${Date.now()}`, event: draggedEvent, savedAt: Date.now() }])

        setCurrentEvents((prev) => prev.filter((e) => e.id !== active.id))

        const eventIndex = palestinianEvents.findIndex((e) => e.id === draggedEvent.id)
        if (eventIndex !== -1) {
          palestinianEvents[eventIndex].firstAppearance = false
        }
      }
      return
    }

    if (over.id.toString().startsWith("cell-")) {
      const cellIndex = Number.parseInt(over.id.toString().replace("cell-", ""))
      const targetCell = bingoGrid[cellIndex]

      if (targetCell.isCompleted && targetCell.isCorrect) return

      const isCorrect = draggedEvent.year === targetCell.year
      const animationClass = isCorrect ? "animate-pulse-success" : "animate-shake"

      const newWrongAttempts = isCorrect
        ? targetCell.wrongAttempts
        : targetCell.isCompleted && !targetCell.isCorrect
          ? targetCell.wrongAttempts // Don't increment if replacing an incorrect answer
          : targetCell.wrongAttempts + 1

      setBingoGrid((prev) =>
        prev.map((cell, index) =>
          index === cellIndex
            ? {
                ...cell,
                isCompleted: true,
                isCorrect,
                animationClass,
                wrongAttempts: newWrongAttempts,
              }
            : cell,
        ),
      )

      setTimeout(() => {
        setBingoGrid((prev) =>
          prev.map((cell, index) => (index === cellIndex ? { ...cell, animationClass: "" } : cell)),
        )
      }, 600)

      if (isCorrect) {
        const basePoints = draggedEvent.firstAppearance ? 50 : 25
        const levelMultiplier = 1 + (currentLevelData.level - 1) * 0.15 // 15% bonus per level
        const penaltyReduction = newWrongAttempts * 5
        const finalPoints = Math.max(Math.floor(basePoints * levelMultiplier) - penaltyReduction, 5)

        setScore((prev) => prev + finalPoints)
        setUsedEvents((prev) => new Set([...prev, draggedEvent.id]))
      }

      if (currentEvents.find((e) => e.id === active.id)) {
        setCurrentEvents((prev) => prev.filter((e) => e.id !== active.id))
      } else {
        setSavedEvents((prev) => prev.filter((saved) => saved.event.id !== active.id))
      }
    }
  }

  const resetGame = () => {
    setGameState("start")
    setGamePhase("collecting")
    setCurrentRound(1)
    setRoundData({
      currentChance: 1,
      maxChances: 3,
      chanceTimer: 10,
      chanceStartTime: Date.now(),
    })

    const gridSize = getGridSizeForLevel(gameProgress.currentLevel)
    setBingoGrid(
      generateRandomYearsForGrid(gridSize).map((year, i) => ({
        id: `cell-${i}`,
        year,
        isCompleted: false,
        isCorrect: null,
        animationClass: "",
        wrongAttempts: 0,
      })),
    )

    setCurrentLevelData({
      level: gameProgress.currentLevel,
      gridSize,
      attempts: 0,
      maxAttempts: 3,
      isCompleted: false,
      stars: 0,
      score: 0,
    })

    setCurrentEvents([])
    setSavedEvents([])
    setEventTimer(0)
    setScore(0)
    setGameStartTime(Date.now())
    setElapsedTime(0)
    setUsedEvents(new Set())

    palestinianEvents.forEach((event) => {
      event.firstAppearance = true
    })
  }

  const checkBingo = () => {
    const correctCells = bingoGrid.map((cell) => cell.isCompleted && cell.isCorrect)
    const gridSize = currentLevelData.gridSize

    for (let i = 0; i < gridSize; i++) {
      if (correctCells.slice(i * gridSize, (i + 1) * gridSize).every(Boolean)) return true
    }

    for (let i = 0; i < gridSize; i++) {
      const columnIndices = Array.from({ length: gridSize }, (_, row) => row * gridSize + i)
      if (columnIndices.every((index) => correctCells[index])) return true
    }

    const mainDiagonalIndices = Array.from({ length: gridSize }, (_, i) => i * gridSize + i)
    if (mainDiagonalIndices.every((index) => correctCells[index])) return true

    const antiDiagonalIndices = Array.from({ length: gridSize }, (_, i) => i * gridSize + (gridSize - 1 - i))
    if (antiDiagonalIndices.every((index) => correctCells[index])) return true

    return false
  }

  const nextLevel = () => {
    if (onLevelComplete) {
      onLevelComplete(currentLevelData.level, currentLevelData.stars)
      return
    }

    const newLevel = currentLevelData.level + 1
    const newGridSize = getGridSizeForLevel(newLevel)
    const newGrid = generateRandomYearsForGrid(newGridSize).map((year, i) => ({
      id: `cell-${i}`,
      year,
      isCompleted: false,
      isCorrect: null,
      animationClass: "",
      wrongAttempts: 0,
    }))

    setTransitionFromLevel(currentLevelData.level)
    setShowLevelTransition(true)

    setBingoGrid(newGrid)
    setCurrentLevelData({
      level: newLevel,
      gridSize: newGridSize,
      isCompleted: false,
      stars: 0,
      score: 0,
      attempts: 1,
      maxAttempts: 3,
    })

    setScore(0)
    setCurrentRound(1)
    setGamePhase("collecting")
    setGameState("playing")
    setUsedEvents(new Set())
    setSavedEvents([])
    setCurrentEvents([])

    setRoundData({
      currentChance: 1,
      maxChances: 3,
      chanceTimer: 10,
      chanceStartTime: Date.now(),
    })
    setGameStartTime(Date.now())

    setTimeout(() => {
      setShowLevelTransition(false)
      setTransitionFromLevel(null)
    }, 2000)
  }

  const backToMenu = () => {
    setGameState("levelSelect")
  }

  const continueLevelTransition = () => {
    setShowLevelTransition(false)
    setGameState("preview")
  }

  const hasBingo = checkBingo()
  const correctMatches = bingoGrid.filter((cell) => cell.isCompleted && cell.isCorrect).length
  const totalAttempts = bingoGrid.filter((cell) => cell.isCompleted).length
  const accuracy = totalAttempts > 0 ? Math.round((correctMatches / totalAttempts) * 100) : 0

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}:${(seconds % 60).toString().padStart(2, "0")}`
  }

  const activeEvent =
    currentEvents.find((e) => e.id === activeId) || savedEvents.find((saved) => saved.event.id === activeId)?.event

  const continueToPlacing = () => {
    setGamePhase("placing")
  }

  useEffect(() => {
    if (level) {
      selectLevel(level)
    }
  }, [level])

  if (gameState === "mainMenu") {
    return <MainMenu onStartGame={goToLevelSelect} gameProgress={gameProgress} selectLevel={selectLevel} />
  }

  if (gameState === "levelSelect") {
    return <LevelSelect gameProgress={gameProgress} onSelectLevel={selectLevel} onBackToMenu={backToMainMenu} />
  }

  if (gameState === "levelFailed") {
    return (
      <div className="min-h-screen p-4 palestinian-pattern flex items-center justify-center">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold mb-4 font-serif text-black">Palestinian Historical Bingo</h1>

          <div className="flex justify-center items-center gap-6 mb-6 flex-wrap">
            <div className="flex items-center gap-2 bg-green-600 text-white rounded-xl px-4 py-2 shadow-md">
              <Trophy className="h-5 w-5" />
              <span className="font-bold text-lg">{score}</span>
              <span className="font-medium">Points</span>
            </div>

            <div className="flex items-center gap-2 bg-red-600 text-white rounded-xl px-4 py-2 shadow-md">
              <Target className="h-5 w-5" />
              <span className="font-bold text-lg">{accuracy}%</span>
              <span className="font-medium">Accuracy</span>
            </div>

            <div className="flex items-center gap-2 bg-black text-white rounded-xl px-4 py-2 shadow-md">
              <Clock className="h-5 w-5" />
              <span className="font-bold text-lg">{formatTime(Math.floor(elapsedTime / 1000))}</span>
              <span className="font-medium">Total Time</span>
            </div>
          </div>
        </div>

        {/* Update modal calls to include onBackToMenu prop */}
        <LevelFailedModal currentLevelData={currentLevelData} onRetryLevel={retryLevel} onBackToMenu={backToMenu} />
      </div>
    )
  }

  if (gameState === "gameOver") {
    return (
      <div className="min-h-screen p-4 palestinian-pattern flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white border-4 border-red-600 shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-600 via-black to-green-600 text-white p-8">
              <CardTitle className="text-4xl font-bold font-serif mb-4 text-white drop-shadow-lg">
                Game Complete!
              </CardTitle>
              <p className="text-xl opacity-90 text-white">Your final score is {gameProgress.totalScore}</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <h4 className="text-lg font-bold text-black mb-3">Game Statistics:</h4>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span>Levels Completed:</span>
                      <span className="font-bold">{gameProgress.levelHistory.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Final Score:</span>
                      <span className="font-bold text-green-600">{gameProgress.totalScore}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={resetGame}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-xl py-6 rounded-2xl font-bold shadow-lg"
                >
                  <Play className="h-6 w-6 mr-3" />
                  Start New Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === "start") {
    return (
      <div className="min-h-screen p-4 palestinian-pattern flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="bg-white border-4 border-green-600 shadow-2xl rounded-3xl overflow-hidden animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-green-600 via-red-600 to-black text-white p-8">
              <CardTitle className="text-4xl font-bold font-serif mb-4 text-white drop-shadow-lg">
                Palestinian Historical Bingo
              </CardTitle>
              <p className="text-xl opacity-90 text-white">Test your knowledge of Palestinian history</p>

              <div className="mt-6">
                <LevelProgressDisplay
                  currentLevel={gameProgress.currentLevel}
                  totalScore={gameProgress.totalScore}
                  gridSize={currentLevelData.gridSize}
                  levelHistory={gameProgress.levelHistory}
                />
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-left space-y-4">
                  <h3 className="text-2xl font-bold text-black font-serif">How to Play:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        1
                      </div>
                      <div>
                        <strong>Collecting Phase (1 minute):</strong> Historical events appear for 8 seconds. Drag them
                        to save up to 5 events.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        2
                      </div>
                      <div>
                        <strong>Placing Phase:</strong> Drag your saved events to match them with the correct years on
                        the bingo grid.
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                        3
                      </div>
                      <div>
                        <strong>Win Condition:</strong> Complete a row, column, or diagonal to achieve BINGO!
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-lg font-bold text-black mb-3">Level System & Scoring:</h4>
                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <span>
                        Grid grows every 10 levels (currently {currentLevelData.gridSize}×{currentLevelData.gridSize})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-4 w-4 text-green-600" />
                      <span>3 attempts per level • Performance tracked internally</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      <span>Wrong attempts reduce future points by 5 each</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={startRoundOne}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-xl py-6 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="h-6 w-6 mr-3" />
                  Start Level {gameProgress.currentLevel}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === "preview") {
    return (
      <div className="min-h-screen p-4 palestinian-pattern">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white border-4 border-green-600 shadow-2xl rounded-3xl overflow-hidden animate-fade-in">
            <CardHeader className="bg-gradient-to-r from-green-600 via-red-600 to-black text-white p-8">
              <CardTitle className="text-4xl font-bold font-serif mb-4 text-white drop-shadow-lg">
                Level {currentLevelData.level} - Your Date Bingo Table
              </CardTitle>
              <p className="text-xl opacity-90 text-white">Be sure to take a good look at it before you start</p>

              <div className="mt-6">
                <LevelProgressDisplay
                  currentLevel={gameProgress.currentLevel}
                  totalScore={gameProgress.totalScore}
                  gridSize={currentLevelData.gridSize}
                  levelHistory={gameProgress.levelHistory}
                />
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <p className="text-lg text-gray-700 mb-6">
                  Study these years carefully! You'll need to match historical events to these dates during the game.
                </p>

                <div className="bg-gray-50 rounded-2xl p-6 animate-fade-in">
                  <div
                    className="gap-3 max-w-2xl mx-auto"
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${currentLevelData.gridSize}, 1fr)`,
                    }}
                  >
                    {bingoGrid.map((cell, index) => (
                      <div
                        key={cell.id}
                        className="aspect-square border-3 border-gray-300 rounded-2xl flex items-center justify-center p-4 min-h-[100px] bg-white shadow-md transform hover:scale-105 transition-all duration-200"
                        style={{
                          animationDelay: `${index * 50}ms`,
                        }}
                      >
                        <div className="text-2xl font-bold text-black font-serif">{cell.year}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-4">
                  <p className="text-yellow-800 font-medium">
                    💡 <strong>Tip:</strong> Take a moment to memorize these years. You'll have limited time to match
                    events during each round!
                  </p>
                </div>

                <Button
                  onClick={startRoundOne}
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-xl py-6 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <Play className="h-6 w-6 mr-3" />
                  Start Round One
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (gameState === "levelComplete") {
    return (
      <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="min-h-screen p-4 palestinian-pattern">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 font-serif text-black">Palestinian Historical Bingo</h1>

            <div className="flex justify-center items-center gap-6 mb-6 flex-wrap">
              <div className="flex items-center gap-2 bg-green-600 text-white rounded-xl px-4 py-2 shadow-md">
                <Trophy className="h-5 w-5" />
                <span className="font-bold text-lg">{score}</span>
                <span className="font-medium">Points</span>
              </div>

              <div className="flex items-center gap-2 bg-red-600 text-white rounded-xl px-4 py-2 shadow-md">
                <Target className="h-5 w-5" />
                <span className="font-bold text-lg">{accuracy}%</span>
                <span className="font-medium">Accuracy</span>
              </div>

              <div className="flex justify-center gap-4 mb-4">
                <Button
                  onClick={resetGame}
                  variant="outline"
                  className="bg-white border-2 border-black hover:bg-gray-100"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Game
                </Button>
              </div>
            </div>

            {hasBingo && (
              <div className="bg-gradient-to-r from-green-600 to-red-600 text-white rounded-2xl p-6 mb-6 animate-bounce-in shadow-xl">
                <Trophy className="h-12 w-12 mx-auto mb-3" />
                <h2 className="text-2xl font-bold font-serif mb-2">BINGO!</h2>
                <p className="text-lg">
                  Congratulations! You achieved Bingo in Round {currentRound} with {score} points!
                </p>
              </div>
            )}
          </div>

          <LevelCompleteModal
            currentLevelData={currentLevelData}
            gameProgress={gameProgress}
            onRestartLevel={startRoundOne}
            onNextLevel={nextLevel}
            onBackToMenu={backToMenu}
            bingoGrid={bingoGrid}
          />
        </div>

        <DragOverlay>
          {activeEvent ? (
            <div className="p-2 rounded-lg border-2 bg-white border-green-600 shadow-2xl scale-110">
              <div className="flex items-start gap-2">
                <GripVertical className="h-4 w-4 text-gray-600 mt-1" />
                <div className="flex-1">
                  <Badge className="bg-red-600 text-white text-xs font-medium mb-1 border-0">{activeEvent.year}</Badge>
                  <div className="text-xs font-bold text-black mb-1">{activeEvent.title}</div>
                  <div className="text-xs text-gray-700">{activeEvent.description}</div>
                </div>
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    )
  }

  if (gameState === "playing") {
    return (
      <DndContext collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="min-h-screen p-4 palestinian-pattern">
          <div className="max-w-7xl mx-auto">
            {/* Game Header */}
            <div className="text-center mb-6">
              <h1 className="text-4xl font-bold mb-4 font-serif text-black">Palestinian Historical Bingo</h1>

              <div className="flex justify-center items-center gap-6 mb-6 flex-wrap">
                <div className="flex items-center gap-2 bg-green-600 text-white rounded-xl px-4 py-2 shadow-md">
                  <Trophy className="h-5 w-5" />
                  <span className="font-bold text-lg">{score}</span>
                  <span className="font-medium">Points</span>
                </div>

                <div className="flex items-center gap-2 bg-red-600 text-white rounded-xl px-4 py-2 shadow-md">
                  <Target className="h-5 w-5" />
                  <span className="font-bold text-lg">{accuracy}%</span>
                  <span className="font-medium">Accuracy</span>
                </div>

                <div className="flex items-center gap-2 bg-black text-white rounded-xl px-4 py-2 shadow-md">
                  <span className="font-bold text-lg">Level {currentLevelData.level}</span>
                  <span className="font-medium">
                    ({currentLevelData.gridSize}×{currentLevelData.gridSize})
                  </span>
                </div>
              </div>
            </div>

            {/* Game Content */}
            {gamePhase === "collecting" && (
              <CollectingPhase
                currentEvents={currentEvents}
                roundData={roundData}
                currentRound={currentRound}
                savedEvents={savedEvents}
                onDeleteEvent={deleteEvent}
                bingoGrid={bingoGrid}
                gridSize={currentLevelData.gridSize}
              />
            )}

            {gamePhase === "placing" && (
              <PlacingPhase
                bingoGrid={bingoGrid}
                savedEvents={savedEvents}
                onDeleteEvent={deleteEvent}
                onNextRound={nextRound}
                currentRound={currentRound}
                gridSize={currentLevelData.gridSize}
              />
            )}
          </div>

          {/* Modals */}
          <RoundTransitionModal currentRound={currentRound} onContinue={continueToPlacing} gamePhase={gamePhase} />

          <DragOverlay>{activeEvent && <DraggableEvent event={activeEvent} />}</DragOverlay>
        </div>
      </DndContext>
    )
  }

  return null
}
