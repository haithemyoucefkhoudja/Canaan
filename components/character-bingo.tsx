"use client"

import type React from "react"
import { useState, useCallback, useEffect, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Clock, ArrowRight, Save, Trash2, Star, Trophy, Target, RotateCcw, Home } from "lucide-react"
import { useGamification } from "../hooks/use-gamification"

interface Character {
  id: string
  name: string
  image: string
  description: string
}

interface SavedCharacter {
  id: string
  character: Character
  savedAt: number
}

interface BingoCell {
  id: string
  characterName: string
  isCompleted: boolean
  isCorrect: boolean | null
  animationClass: string
  wrongAttempts: number
}

interface RoundData {
  currentChance: number
  maxChances: number
  chanceTimer: number
  chanceStartTime: number
}

type GamePhase = "collecting" | "placing" | "roundTransition"

interface CharacterBingoProps {
  level: number
  onBack?: () => void
  onLevelComplete?: (level: number, stars: number) => void
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

type GameState = "start" | "preview" | "playing" | "levelComplete" | "levelFailed"

const characters: Character[] = [
  {
    id: "1",
    name: "Yasser Arafat",
    image: "/yasser-arafat-palestinian-leader.png",
    description: "Palestinian political leader and Nobel Peace Prize laureate",
  },
  {
    id: "2",
    name: "Haj Amin al-Husseini",
    image: "/haj-amin-al-husseini-palestinian-leader.png",
    description: "Grand Mufti of Jerusalem and Palestinian nationalist leader",
  },
  {
    id: "3",
    name: "Leila Khaled",
    image: "/leila-khaled-activist.png",
    description: "Palestinian activist and former PFLP member",
  },
  {
    id: "4",
    name: "George Habash",
    image: "/george-habash-pflp-leader.png",
    description: "Founder of the Popular Front for the Liberation of Palestine",
  },
  {
    id: "5",
    name: "Khalil al-Wazir",
    image: "/khalil-al-wazir-abu-jihad-palestinian-leader.png",
    description: "Palestinian military leader known as Abu Jihad",
  },
  {
    id: "6",
    name: "Hanan Ashrawi",
    image: "/hanan-ashrawi-palestinian-politician.png",
    description: "Palestinian politician and human rights activist",
  },
  {
    id: "7",
    name: "Marwan Barghouti",
    image: "/marwan-barghouti-palestinian-leader.png",
    description: "Palestinian political leader and activist",
  },
  {
    id: "8",
    name: "Mahmoud Darwish",
    image: "/mahmoud-darwish-palestinian-poet.png",
    description: "Renowned Palestinian poet and author",
  },
  {
    id: "9",
    name: "Edward Said",
    image: "/edward-said-intellectual.png",
    description: "Palestinian-American literary theorist and cultural critic",
  },
  {
    id: "10",
    name: "Ghassan Kanafani",
    image: "/ghassan-kanafani-writer.png",
    description: "Palestinian writer and journalist",
  },
  {
    id: "11",
    name: "Fadwa Tuqan",
    image: "/fadwa-tuqan-palestinian-poet.png",
    description: "Palestinian poet known as the 'Poet of Palestine'",
  },
  {
    id: "12",
    name: "Ibrahim Abu-Lughod",
    image: "/ibrahim-abu-lughod-palestinian-academic.png",
    description: "Palestinian academic and political scientist",
  },
  {
    id: "13",
    name: "Salim Tamari",
    image: "/salim-tamari-palestinian-sociologist.png",
    description: "Palestinian sociologist and historian",
  },
  {
    id: "14",
    name: "Rashid Khalidi",
    image: "/rashid-khalidi-palestinian-historian.png",
    description: "Palestinian-American historian",
  },
  {
    id: "15",
    name: "Sahar Khalifeh",
    image: "/sahar-khalifeh-palestinian-novelist.png",
    description: "Palestinian novelist and women's rights activist",
  },
]

const decoyCharacters = [
  { name: "Napoleon Bonaparte", image: "/napoleon-bonaparte-french-emperor.png" },
  { name: "Albert Einstein", image: "/albert-einstein-physicist.png" },
  { name: "William Shakespeare", image: "/william-shakespeare-playwright.png" },
  { name: "Leonardo da Vinci", image: "/leonardo-da-vinci-artist-inventor.png" },
  { name: "Cleopatra", image: "/cleopatra-egyptian-queen.png" },
  { name: "Julius Caesar", image: "/julius-caesar-roman-emperor.png" },
  { name: "Mozart", image: "/mozart-classical-composer.png" },
  { name: "Gandhi", image: "/gandhi-indian-independence-leader.png" },
]

function generateRandomCharacterNamesForGrid(gridSize: number): string[] {
  const totalCells = gridSize * gridSize
  const shuffled = [...characters].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, totalCells).map((char) => char.name)
}

function DraggableCharacter({
  character,
  hideNames = false,
  onClickSave,
  isInSavedArea = false,
}: {
  character: Character
  hideNames?: boolean
  onClickSave?: (character: Character) => void
  isInSavedArea?: boolean
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e: React.DragEvent) => {
    if (isInSavedArea) {
      e.dataTransfer.setData("savedCharacter", JSON.stringify({ character }))
    } else {
      e.dataTransfer.setData("character", JSON.stringify(character))
    }
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    if (onClickSave && !isInSavedArea) {
      onClickSave(character)
    }
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
      className={`bg-white rounded-xl p-4 border-2 border-green-300 cursor-move transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        isDragging ? "opacity-50 scale-95" : ""
      } ${onClickSave && !isInSavedArea ? "hover:bg-green-50 active:bg-green-100" : ""}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={character.image || "/placeholder.svg"}
          alt={hideNames ? "Character" : character.name}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
        />
        <div>
          <h3 className="font-bold text-gray-800">{hideNames ? "???" : character.name}</h3>
          {!hideNames && <p className="text-sm text-gray-600 line-clamp-2">{character.description}</p>}
        </div>
      </div>
      {onClickSave && !isInSavedArea && (
        <div className="text-xs text-green-600 mt-2 text-center font-medium">Click or drag to save</div>
      )}
    </div>
  )
}

function SavedCharactersArea({
  savedCharacters,
  maxCharacters = 5,
  onDeleteCharacter,
  hideCharacterNames = false,
}: {
  savedCharacters: SavedCharacter[]
  maxCharacters?: number
  onDeleteCharacter: (characterId: string) => void
  hideCharacterNames?: boolean
}) {
  const [isOver, setIsOver] = useState(false)
  const isFull = savedCharacters.length >= maxCharacters

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsOver(false)
    const characterData = e.dataTransfer.getData("character")
    if (characterData && !isFull) {
      const character = JSON.parse(characterData)
      const savedCharacter: SavedCharacter = {
        id: `saved-${character.id}-${Date.now()}`,
        character,
        savedAt: Date.now(),
      }
      // This would be handled by parent component
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDragEnter = () => {
    setIsOver(true)
  }

  const handleDragLeave = () => {
    setIsOver(false)
  }

  return (
    <div
      className={`border-4 border-dashed rounded-2xl p-4 min-h-[300px] transition-all duration-300 ${
        isOver && !isFull
          ? "border-green-600 bg-green-50"
          : isFull
            ? "border-red-400 bg-red-50"
            : "border-gray-400 bg-gray-50"
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <div className="text-center mb-4">
        <Save className={`h-8 w-8 mx-auto mb-2 ${isFull ? "text-red-400" : "text-gray-400"}`} />
        <p className={`text-sm font-medium ${isFull ? "text-red-600" : "text-gray-600"}`}>
          Saved Characters ({savedCharacters.length}/{maxCharacters})
        </p>
        <p className={`text-xs ${isFull ? "text-red-500" : "text-gray-500"}`}>
          {hideCharacterNames
            ? "Drag characters to the correct names"
            : isFull
              ? "Storage full! Place characters to save more"
              : "Drag characters here to save"}
        </p>
      </div>

      <div className="space-y-2 max-h-[200px] overflow-y-auto">
        {savedCharacters.map((saved) => (
          <div key={saved.id} className="relative group">
            <DraggableCharacter character={saved.character} hideNames={hideCharacterNames} isInSavedArea={true} />
            <button
              onClick={() => onDeleteCharacter(saved.id)}
              className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg border-2 border-white transition-all duration-200 hover:scale-110"
              title="Delete saved character"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function DroppableCell({ cell, onDrop }: { cell: BingoCell; onDrop: (cellId: string, character: Character) => void }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (cell.isCorrect === true) {
      return
    }

    const savedCharacterData = e.dataTransfer.getData("savedCharacter")
    if (savedCharacterData) {
      const savedCharacter = JSON.parse(savedCharacterData)
      onDrop(cell.id, savedCharacter.character)
    }
    setIsHovered(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (cell.isCorrect === true) {
      e.dataTransfer.dropEffect = "none"
    }
  }

  const handleDragEnter = () => {
    if (cell.isCorrect !== true) {
      setIsHovered(true)
    }
  }

  const handleDragLeave = () => {
    setIsHovered(false)
  }

  const getCellStyling = () => {
    const baseClasses =
      "aspect-square border-2 rounded-lg flex items-center justify-center p-2 transition-all duration-300 min-h-[80px]"

    if (cell.isCorrect === true) {
      // Green for correct answers - locked state
      return `${baseClasses} bg-green-100 border-green-500 cursor-not-allowed text-green-800 font-semibold ${cell.animationClass}`
    } else if (cell.isCorrect === false) {
      // Red for incorrect answers - can still be changed
      return `${baseClasses} bg-red-100 border-red-500 cursor-pointer text-red-800 hover:bg-red-200 ${cell.animationClass}`
    } else if (isHovered) {
      // Hover state for empty cells
      return `${baseClasses} border-green-500 bg-green-50 scale-105 cursor-pointer`
    } else {
      // Default empty cell
      return `${baseClasses} border-gray-300 bg-white cursor-pointer hover:border-gray-400 hover:bg-gray-50`
    }
  }

  return (
    <div
      className={getCellStyling()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <span className="text-sm text-center font-medium leading-tight">{cell.characterName}</span>
    </div>
  )
}

function CollectingPhase({
  currentCharacters,
  roundData,
  currentRound,
  savedCharacters,
  onDeleteCharacter,
  bingoGrid,
  onSaveCharacter,
}: {
  currentCharacters: Character[]
  roundData: RoundData
  currentRound: number
  savedCharacters: SavedCharacter[]
  onDeleteCharacter: (characterId: string) => void
  bingoGrid: BingoCell[]
  onSaveCharacter: (character: Character) => void
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
        {/* Current Characters */}
        <Card className="bg-white shadow-lg rounded-2xl border-2 border-gray-200">
          <CardHeader className="p-4 border-b">
            <CardTitle className="text-lg font-semibold">Available Characters</CardTitle>
            <p className="text-sm text-gray-600">Collect characters to save for the placing phase</p>
          </CardHeader>
          <CardContent className="p-4">
            {currentCharacters.length === 0 ? (
              <div className="text-center text-gray-500 py-6">Waiting for next characters...</div>
            ) : (
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                {currentCharacters.map((character, index) => (
                  <DraggableCharacter key={character.id} character={character} onClickSave={onSaveCharacter} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Saved Characters */}
        <SavedCharactersArea savedCharacters={savedCharacters} onDeleteCharacter={onDeleteCharacter} />
      </div>
    </div>
  )
}

function PlacingPhase({
  bingoGrid,
  savedCharacters,
  onDeleteCharacter,
  onNextRound,
  currentRound,
  gridSize,
  onCellDrop,
}: {
  bingoGrid: BingoCell[]
  savedCharacters: SavedCharacter[]
  onDeleteCharacter: (characterId: string) => void
  onNextRound: () => void
  currentRound: number
  gridSize: number
  onCellDrop: (cellId: string, character: Character) => void
}) {
  return (
    <div className="space-y-6">
      {/* Phase Header */}
      <Card className="bg-white shadow-lg rounded-2xl border-2 border-gray-200">
        <CardHeader className="p-4 border-b">
          <CardTitle className="text-xl font-semibold">Round {currentRound} - Placing Phase</CardTitle>
          <p className="text-gray-600">
            Drag your saved characters to match them with the correct names on the bingo grid!
          </p>
        </CardHeader>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6 max-w-6xl mx-auto">
        {/* Bingo Grid */}
        <div className="lg:w-3/5">
          <Card className="bg-white shadow-lg rounded-2xl border-2 border-gray-200">
            <CardHeader className="p-4 border-b">
              <CardTitle className="text-lg font-semibold">Bingo Grid - Match Characters</CardTitle>
              <p className="text-sm text-gray-600">
                Drag characters from the right to match them with the correct names
              </p>
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
                  <DroppableCell key={cell.id} cell={cell} onDrop={onCellDrop} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Saved Characters */}
        <div className="lg:w-2/5">
          <SavedCharactersArea
            savedCharacters={savedCharacters}
            onDeleteCharacter={onDeleteCharacter}
            hideCharacterNames={true}
          />
        </div>
      </div>

      {/* Next Round Button */}
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

function RoundTransitionModal({
  currentRound,
  onContinue,
  gamePhase,
}: {
  currentRound: number
  onContinue: () => void
  gamePhase: GamePhase
}) {
  if (gamePhase !== "roundTransition") {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-white shadow-2xl rounded-3xl border-4 border-green-500 max-w-md mx-4">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-2xl font-bold text-gray-800">Round {currentRound} Complete!</CardTitle>
          <p className="text-gray-600 mt-2">Ready to place your saved characters on the grid?</p>
        </CardHeader>
        <CardContent className="p-6 pt-0 text-center">
          <Button
            onClick={onContinue}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Placing Phase
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function LevelCompleteModal({
  levelData,
  stars,
  bingoGrid,
  totalRounds,
  onNextLevel,
  onRetryLevel,
  onBackToMenu,
}: {
  levelData: LevelData
  stars: number
  bingoGrid: BingoCell[]
  totalRounds: number
  onNextLevel: () => void
  onRetryLevel: () => void
  onBackToMenu: () => void
}) {
  const correctAnswers = bingoGrid.filter((cell) => cell.isCompleted && cell.isCorrect).length
  const totalCells = bingoGrid.length
  const wrongAttempts = bingoGrid.reduce((acc, cell) => acc + cell.wrongAttempts, 0)
  const accuracy = totalCells > 0 ? Math.round((correctAnswers / totalCells) * 100) : 0
  const hasWon = correctAnswers === totalCells || checkBingoFromGrid(bingoGrid, levelData.gridSize)

  // Generate performance feedback
  const getPerformanceFeedback = () => {
    if (stars === 5) {
      return "Outstanding performance! You achieved a perfect score with no mistakes."
    } else if (stars >= 4) {
      return "Excellent work! You showed great knowledge of Palestinian characters."
    } else if (stars >= 3) {
      return "Good job! You correctly identified most characters, but there's room for improvement."
    } else if (stars >= 2) {
      return "Not bad! You got some characters right, but try to study more about Palestinian history."
    } else {
      return "Keep practicing! Learning about Palestinian characters takes time and effort."
    }
  }

  const getMistakeFeedback = () => {
    if (wrongAttempts === 0) {
      return "Perfect! No wrong attempts made."
    } else if (wrongAttempts <= 2) {
      return `Only ${wrongAttempts} wrong attempt${wrongAttempts === 1 ? "" : "s"}. Great accuracy!`
    } else if (wrongAttempts <= 5) {
      return `${wrongAttempts} wrong attempts. Try to be more careful with character identification.`
    } else {
      return `${wrongAttempts} wrong attempts. Consider studying the characters more carefully before selecting.`
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-3xl p-8 max-w-lg mx-4 text-center shadow-2xl border-4 border-green-600 animate-scale-in">
        <div className="mb-6">
          <div className="relative mb-4">
            {hasWon ? (
              <Trophy className="h-16 w-16 mx-auto text-green-600 animate-bounce" />
            ) : (
              <Target className="h-16 w-16 mx-auto text-orange-600" />
            )}
            {stars === 5 && (
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold animate-pulse">
                ★
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-black font-serif mb-4">
            {hasWon ? `Level ${levelData.level} Complete!` : `Level ${levelData.level} Finished!`}
          </h2>

          <div className="mb-4">
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 ${star <= stars ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
            <p className="text-gray-600 text-lg">{stars} out of 5 stars!</p>
            {stars === 5 && <p className="text-yellow-600 font-bold text-sm animate-pulse">Perfect Score!</p>}
          </div>

          {/* Performance Stats */}
          <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span>Characters Identified:</span>
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
              <span className="font-semibold">{totalRounds}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Result:</span>
              <span className={`font-semibold ${hasWon ? "text-green-600" : "text-orange-600"}`}>
                {hasWon ? "Won!" : "Completed"}
              </span>
            </div>
          </div>

          {/* Performance Feedback */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-3 mb-4">
            <h3 className="font-bold text-blue-800 mb-2">Performance Feedback:</h3>
            <p className="text-blue-700 text-sm mb-2">{getPerformanceFeedback()}</p>
            <p className="text-blue-600 text-sm">{getMistakeFeedback()}</p>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 mb-4">
            <p className="text-green-800 font-bold text-lg">Level Score: {levelData.score} points</p>
          </div>
        </div>

        <div className="flex justify-center gap-3 mb-4">
          <Button
            onClick={onRetryLevel}
            variant="outline"
            className="bg-white border-2 border-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Play Again
          </Button>
          <Button
            onClick={onNextLevel}
            className="bg-green-600 hover:bg-green-700 text-white transform hover:scale-105 transition-all duration-200"
          >
            <ArrowRight className="h-4 w-4 mr-2" />
            Next Level
          </Button>
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
          >
            <Home className="h-4 w-4 mr-2" />
            Main Menu
          </Button>
        </div>
      </div>
    </div>
  )
}

function LevelFailedModal({
  levelData,
  onRetryLevel,
  onBackToMenu,
}: {
  levelData: LevelData
  onRetryLevel: () => void
  onBackToMenu: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="bg-white shadow-2xl rounded-3xl border-4 border-red-500 max-w-md mx-4">
        <CardHeader className="p-6 text-center">
          <CardTitle className="text-3xl font-bold text-red-600">Level Failed</CardTitle>
          <p className="text-gray-600 mt-2">
            You've used all {levelData.maxAttempts} attempts for Level {levelData.level}
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-0 space-y-3">
          <Button
            onClick={onRetryLevel}
            size="lg"
            className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white font-bold py-4 rounded-2xl"
          >
            Retry Level
          </Button>
          <Button
            onClick={onBackToMenu}
            variant="outline"
            size="lg"
            className="w-full border-red-600 text-red-700 hover:bg-red-50 bg-transparent"
          >
            Back to Menu
          </Button>
        </CardContent>
      </Card>
    </div>
  )
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

function getGridSizeForLevel(level: number): number {
  return 3 + Math.floor((level - 1) / 10)
}

function checkBingoFromGrid(bingoGrid: BingoCell[], gridSize: number): boolean {
  const correctCells = bingoGrid.map((cell) => cell.isCompleted && cell.isCorrect)

  // Check rows
  for (let i = 0; i < gridSize; i++) {
    if (correctCells.slice(i * gridSize, (i + 1) * gridSize).every(Boolean)) return true
  }

  // Check columns
  for (let i = 0; i < gridSize; i++) {
    const columnIndices = Array.from({ length: gridSize }, (_, row) => row * gridSize + i)
    if (columnIndices.every((index) => correctCells[index])) return true
  }

  // Check main diagonal
  const mainDiagonalIndices = Array.from({ length: gridSize }, (_, i) => i * gridSize + i)
  if (mainDiagonalIndices.every((index) => correctCells[index])) return true

  // Check anti-diagonal
  const antiDiagonalIndices = Array.from({ length: gridSize }, (_, i) => i * gridSize + (gridSize - 1 - i))
  if (antiDiagonalIndices.every((index) => correctCells[index])) return true

  return false
}

export default function CharacterBingo({ level, onBack, onLevelComplete }: CharacterBingoProps) {
  const [gameState, setGameState] = useState<GameState>("start")
  const [gamePhase, setGamePhase] = useState<GamePhase>("collecting")
  const [currentRound, setCurrentRound] = useState<number>(1)
  const [gameStartTime, setGameStartTime] = useState<number>(0)

  const [currentLevelData, setCurrentLevelData] = useState<LevelData>(() => ({
    level: level || 1,
    gridSize: getGridSizeForLevel(level || 1),
    attempts: 0,
    maxAttempts: 3,
    isCompleted: false,
    stars: 0,
    score: 0,
  }))

  const gridSize = currentLevelData.gridSize

  const [roundData, setRoundData] = useState<RoundData>({
    currentChance: 1,
    maxChances: 3,
    chanceTimer: 10,
    chanceStartTime: Date.now(),
  })

  const [bingoGrid, setBingoGrid] = useState<BingoCell[]>(() => {
    return generateRandomCharacterNamesForGrid(gridSize).map((name, i) => ({
      id: `cell-${i}`,
      characterName: name,
      isCompleted: false,
      isCorrect: null,
      animationClass: "",
      wrongAttempts: 0,
    }))
  })

  const [currentCharacters, setCurrentCharacters] = useState<Character[]>([])
  const [savedCharacters, setSavedCharacters] = useState<SavedCharacter[]>([])
  const [usedCharacters, setUsedCharacters] = useState<Set<string>>(new Set())

  const usedCharactersRef = useRef<Set<string>>(new Set())

  const gridCharacterNames = useMemo(() => bingoGrid.map((cell) => cell.characterName), [bingoGrid])

  const generateRandomCharacters = useCallback(() => {
    const gridCharacterNames = bingoGrid.map((cell) => cell.characterName)
    const placedCharacters = bingoGrid.filter((cell) => cell.isCompleted).map((cell) => cell.characterName)

    const availableRealCharacters = characters.filter((char) => {
      const isInGrid = gridCharacterNames.includes(char.name)
      const isPlaced = placedCharacters.includes(char.name)
      return isInGrid && !isPlaced
    })

    const shuffledAvailable = [...availableRealCharacters].sort(() => Math.random() - 0.5)
    const correctCharacters = shuffledAvailable.slice(0, Math.min(3, shuffledAvailable.length))

    if (correctCharacters.length < 3) {
      const allGridCharacters = characters.filter((char) => gridCharacterNames.includes(char.name))
      const shuffledAll = [...allGridCharacters].sort(() => Math.random() - 0.5)
      const additional = shuffledAll.filter((char) => !correctCharacters.some((c) => c.name === char.name))
      correctCharacters.push(...additional.slice(0, 3 - correctCharacters.length))
    }

    const randomDecoy = decoyCharacters[Math.floor(Math.random() * decoyCharacters.length)]

    const allCharacters = [...correctCharacters, randomDecoy]
    return allCharacters.sort(() => Math.random() - 0.5)
  }, [bingoGrid, characters, decoyCharacters])

  useEffect(() => {
    if (gamePhase !== "collecting" || roundData.chanceTimer <= 0) return

    const timer = setTimeout(() => {
      setRoundData((prev) => ({ ...prev, chanceTimer: prev.chanceTimer - 1 }))
    }, 1000)

    return () => clearTimeout(timer)
  }, [gamePhase, roundData.chanceTimer])

  useEffect(() => {
    if (gamePhase === "collecting" && roundData.chanceTimer === 0) {
      if (roundData.currentChance < roundData.maxChances) {
        setRoundData((prev) => ({
          ...prev,
          currentChance: prev.currentChance + 1,
          chanceTimer: 10,
          chanceStartTime: Date.now(),
        }))
        setCurrentCharacters([])
      } else {
        setGamePhase("roundTransition")
        setCurrentCharacters([])
      }
    }
  }, [gamePhase, roundData.chanceTimer, roundData.currentChance, roundData.maxChances])

  useEffect(() => {
    if (gamePhase === "collecting" && roundData.chanceTimer === 10 && roundData.currentChance <= roundData.maxChances) {
      const newCharacters = generateRandomCharacters()
      setCurrentCharacters(newCharacters)

      // Update both state and ref
      const newUsedIds = newCharacters.map((c) => c.id)
      usedCharactersRef.current = new Set([...usedCharactersRef.current, ...newUsedIds])
      setUsedCharacters(new Set(usedCharactersRef.current))
    }
  }, [gamePhase, roundData.currentChance, roundData.chanceTimer, generateRandomCharacters])

  const handleDeleteCharacter = useCallback((characterId: string) => {
    setSavedCharacters((prev) => prev.filter((saved) => saved.id !== characterId))
  }, [])

  const checkBingo = useCallback(() => {
    // Don't allow wins until all 3 rounds are completed
    if (currentRound < 3) {
      return false
    }

    const correctCells = bingoGrid.map((cell) => cell.isCompleted && cell.isCorrect)
    const gridSize = currentLevelData.gridSize

    // Check rows
    for (let i = 0; i < gridSize; i++) {
      if (correctCells.slice(i * gridSize, (i + 1) * gridSize).every(Boolean)) return true
    }

    // Check columns
    for (let i = 0; i < gridSize; i++) {
      const columnIndices = Array.from({ length: gridSize }, (_, row) => row * gridSize + i)
      if (columnIndices.every((index) => correctCells[index])) return true
    }

    // Check main diagonal
    const mainDiagonalIndices = Array.from({ length: gridSize }, (_, i) => i * gridSize + i)
    if (mainDiagonalIndices.every((index) => correctCells[index])) return true
    // Check anti-diagonal
    const antiDiagonalIndices = Array.from({ length: gridSize }, (_, i) => i * gridSize + (gridSize - 1 - i))
    if (antiDiagonalIndices.every((index) => correctCells[index])) return true

    return false
  }, [bingoGrid, currentLevelData.gridSize, currentRound])

  const { consumeHeart, recordGameResult, canPlayGame } = useGamification()

  const startGame = useCallback(() => {
    if (!canPlayGame()) return
    setGameState("preview")
  }, [canPlayGame])

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

  const nextRound = useCallback(() => {
    // Check if we've completed all rounds for this attempt
    if (currentRound >= 3) {
      // After 3 rounds, check for win condition (bingo achieved)
      if (checkBingo()) {
        const stars = calculateLevelStars(currentLevelData, bingoGrid)
        const updatedLevelData = {
          ...currentLevelData,
          isCompleted: true,
          stars,
          score: currentLevelData.score,
        }
        setCurrentLevelData(updatedLevelData)
        setGameState("levelComplete")

        const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000)
        const correctAnswers = bingoGrid.filter((cell) => cell.isCorrect).length
        const totalQuestions = bingoGrid.length
        const isPerfectGame = correctAnswers === totalQuestions && currentLevelData.attempts === 1

        recordGameResult({
          gameType: "Character Bingo",
          level: currentLevelData.level,
          basePoints: currentLevelData.score,
          finalPoints: currentLevelData.score + stars * 50,
          timeSpent,
          correctAnswers,
          totalQuestions,
          isWin: true,
          isPerfectGame,
          speedBonus: timeSpent < 120 ? 50 : 0,
          firstAttemptBonus: currentLevelData.attempts === 1 ? 25 : 0,
          perfectGameBonus: isPerfectGame ? 100 : 0,
        })

        return
      }

      // No bingo after 3 rounds - check if we've reached max attempts
      if (currentLevelData.attempts >= currentLevelData.maxAttempts) {
        const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000)
        const correctAnswers = bingoGrid.filter((cell) => cell.isCorrect).length
        const totalQuestions = bingoGrid.length

        recordGameResult({
          gameType: "Character Bingo",
          level: currentLevelData.level,
          basePoints: currentLevelData.score,
          finalPoints: currentLevelData.score,
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
    setSavedCharacters([])
    setCurrentCharacters([])
  }, [currentRound, bingoGrid, gridSize, currentLevelData, recordGameResult, level, checkBingo])

  const handleNextLevel = useCallback(() => {
    if (onLevelComplete) {
      onLevelComplete(currentLevelData.level, currentLevelData.stars)
      return
    }

    const newLevel = currentLevelData.level + 1
    const newGridSize = getGridSizeForLevel(newLevel)
    const newGrid = generateRandomCharacterNamesForGrid(newGridSize).map((name, i) => ({
      id: `cell-${i}`,
      characterName: name,
      isCompleted: false,
      isCorrect: null,
      animationClass: "",
      wrongAttempts: 0,
    }))

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

    setCurrentRound(1)
    setGamePhase("collecting")
    setGameState("playing")
    setSavedCharacters([])
    setCurrentCharacters([])
    usedCharactersRef.current = new Set()
    setUsedCharacters(new Set())

    setRoundData({
      currentChance: 1,
      maxChances: 3,
      chanceTimer: 10,
      chanceStartTime: Date.now(),
    })
  }, [currentLevelData, onLevelComplete])

  const handleRetryLevel = useCallback(() => {
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
    setCurrentRound(1)
    setSavedCharacters([])
    setBingoGrid(
      bingoGrid.map((cell) => ({
        ...cell,
        isCompleted: false,
        isCorrect: null,
        animationClass: "",
        wrongAttempts: 0,
      })),
    )
    usedCharactersRef.current = new Set()
    setUsedCharacters(new Set())
    setGamePhase("collecting")
    setRoundData({
      currentChance: 1,
      maxChances: 3,
      chanceTimer: 10,
      chanceStartTime: Date.now(),
    })
    setGameState("playing")
  }, [currentLevelData, bingoGrid])

  const continueToPlacing = useCallback(() => {
    setGamePhase("placing")
  }, [])

  const handleCellDrop = useCallback(
    (cellId: string, character: Character) => {
      const cellIndex = bingoGrid.findIndex((cell) => cell.id === cellId)
      if (cellIndex === -1) return

      const targetCell = bingoGrid[cellIndex]

      if (targetCell.isCorrect === true) {
        return
      }

      const isCorrect = targetCell.characterName === character.name
      const animationClass = isCorrect ? "animate-pulse-success" : "animate-shake"

      const newWrongAttempts = isCorrect ? targetCell.wrongAttempts : targetCell.wrongAttempts + 1

      const newGrid = [...bingoGrid]
      newGrid[cellIndex] = {
        ...targetCell,
        isCompleted: true,
        isCorrect,
        animationClass,
        wrongAttempts: newWrongAttempts,
      }

      setBingoGrid(newGrid)

      setTimeout(() => {
        setBingoGrid((prevGrid) => {
          const updatedGrid = [...prevGrid]
          if (updatedGrid[cellIndex]) {
            updatedGrid[cellIndex] = {
              ...updatedGrid[cellIndex],
              animationClass: "",
            }
          }
          return updatedGrid
        })
      }, 1000)

      const hasBingo = checkBingoFromGrid(newGrid, currentLevelData.gridSize)
      if (hasBingo) {
        const stars = calculateLevelStars({ ...currentLevelData, isCompleted: true }, newGrid)
        const updatedLevelData = {
          ...currentLevelData,
          isCompleted: true,
          stars,
          score:
            newGrid.filter((cell) => cell.isCorrect === true).length * 10 -
            newGrid.reduce((acc, cell) => acc + cell.wrongAttempts * 5, 0),
        }
        setCurrentLevelData(updatedLevelData)
        setGameState("levelComplete")

        const timeSpent = Math.floor((Date.now() - gameStartTime) / 1000)
        const correctAnswers = newGrid.filter((cell) => cell.isCorrect === true).length
        const totalQuestions = newGrid.length
        const isPerfectGame = correctAnswers === totalQuestions && newWrongAttempts === 0

        recordGameResult({
          gameType: "Character Bingo",
          level: currentLevelData.level,
          basePoints: updatedLevelData.score,
          finalPoints: updatedLevelData.score + stars * 50,
          timeSpent,
          correctAnswers,
          totalQuestions,
          isWin: true,
          isPerfectGame,
          speedBonus: timeSpent < 120 ? 50 : 0,
          firstAttemptBonus: newWrongAttempts === 0 ? 25 : 0,
          perfectGameBonus: isPerfectGame ? 100 : 0,
        })

        return
      }

      setSavedCharacters((prev) => prev.filter((char) => char.character.name !== character.name))
    },
    [bingoGrid, currentLevelData, recordGameResult, gameStartTime],
  )

  // const [bingoGridState, setBingoGrid] = useState<BingoCell[]>([])
  // useEffect(() => {
  //   setBingoGrid(bingoGrid)
  // }, [bingoGrid])

  useEffect(() => {
    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      const characterData = e.dataTransfer?.getData("character")
      if (characterData && gamePhase === "collecting" && savedCharacters.length < 5) {
        try {
          const character = JSON.parse(characterData)
          const savedCharacter: SavedCharacter = {
            id: `saved-${character.id}-${Date.now()}`,
            character,
            savedAt: Date.now(),
          }
          setSavedCharacters((prev) => [...prev, savedCharacter])
          setCurrentCharacters((prev) => prev.filter((c) => c.id !== character.id))
        } catch (error) {
          console.error("Error parsing character data:", error)
        }
      }
    }

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
    }

    if (gamePhase === "collecting") {
      document.addEventListener("drop", handleDrop)
      document.addEventListener("dragover", handleDragOver)
      return () => {
        document.removeEventListener("drop", handleDrop)
        document.removeEventListener("dragover", handleDragOver)
      }
    }
  }, [gamePhase, savedCharacters.length])

  const handleSaveCharacter = useCallback(
    (character: Character) => {
      if (savedCharacters.length < 5) {
        const savedCharacter: SavedCharacter = {
          id: `saved-${character.id}-${Date.now()}`,
          character,
          savedAt: Date.now(),
        }
        setSavedCharacters((prev) => [...prev, savedCharacter])
        setCurrentCharacters((prev) => prev.filter((c) => c.id !== character.id))
      }
    },
    [savedCharacters.length],
  )

  useEffect(() => {
    // Don't auto-start game anymore - let the intro screen handle it
  }, [])

  useEffect(() => {
    if (canPlayGame()) {
      startGame()
    }
  }, [startGame, canPlayGame])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-red-100 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 gap-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center gap-2 border-green-600 text-green-700 hover:bg-green-50 bg-white shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Button>
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 font-serif">
              Palestinian Historical Bingo
            </h1>
            <div className="flex items-center justify-center gap-4 mt-2 text-sm text-gray-600">
              <span>Level {currentLevelData.level}</span>
              <span>•</span>
              <span>
                Attempt {currentLevelData.attempts + 1}/{currentLevelData.maxAttempts}
              </span>
              <span>•</span>
              <span>
                {gridSize}×{gridSize} Grid
              </span>
            </div>
          </div>
          <div className="w-24 hidden sm:block" />
        </div>

        {/* Start Screen */}
        {gameState === "start" && (
          <div className="flex items-center justify-center">
            <div className="max-w-2xl mx-auto text-center">
              <Card className="bg-white border-4 border-green-600 shadow-2xl rounded-3xl overflow-hidden animate-fade-in">
                <CardHeader className="bg-green-800 text-white p-8">
                  <CardTitle className="text-4xl font-bold font-serif mb-4 text-white drop-shadow-lg">
                    Character Bingo - Level {currentLevelData.level}
                  </CardTitle>
                  <p className="text-xl opacity-90 text-white drop-shadow-lg">
                    Match Palestinian historical figures with their names
                  </p>
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
                            <strong>Collecting Phase (10 seconds per round):</strong> Historical figures appear briefly.
                            Drag them to save up to 5 characters for matching.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                            2
                          </div>
                          <div>
                            <strong>Placing Phase:</strong> Drag your saved characters to match them with the correct
                            names on the bingo grid.
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-black text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                            3
                          </div>
                          <div>
                            <strong>Win Condition:</strong> Complete a row, column, or diagonal to achieve BINGO! You
                            have 3 rounds per attempt.
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
                            Grid size: {currentLevelData.gridSize}×{currentLevelData.gridSize}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-600" />
                          <span>3 attempts per level • 3 rounds per attempt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-yellow-500" />
                          <span>Performance tracked for scoring and progression</span>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={startGame}
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-xl py-6 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                      disabled={!canPlayGame()}
                    >
                      {canPlayGame() ? (
                        <>
                          <Target className="h-6 w-6 mr-3" />
                          Start Character Bingo
                        </>
                      ) : (
                        <>
                          <Clock className="h-6 w-6 mr-3" />
                          No Hearts Available
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {gameState === "preview" && (
          <div className="flex items-center justify-center">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="bg-white border-4 border-green-600 shadow-2xl rounded-3xl overflow-hidden animate-fade-in">
                <CardHeader className="bg-green-800 text-white p-8">
                  <CardTitle className="text-4xl font-bold font-serif mb-4 text-white drop-shadow-lg">
                    Level {currentLevelData.level} - Your Character Bingo Board
                  </CardTitle>
                  <p className="text-xl opacity-90 text-white drop-shadow-lg">
                    Study these names carefully before you start collecting characters
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="space-y-6">
                    <p className="text-lg text-gray-700 mb-6">
                      These are the Palestinian historical figures you need to match during the game. Take a moment to
                      familiarize yourself with their names!
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
                            <div className="text-center">
                              <div className="text-sm font-bold text-black font-serif leading-tight">
                                {cell.characterName}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-4">
                      <p className="text-yellow-800 font-medium">
                        💡 <strong>Tip:</strong> Memorize these names! During the collecting phase, you'll see character
                        images and need to match them to these names.
                      </p>
                    </div>

                    <Button
                      onClick={startRoundOne}
                      size="lg"
                      className="w-full bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700 text-white text-xl py-6 rounded-2xl font-bold shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      <Target className="h-6 w-6 mr-3" />
                      Start Character Collection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Game Content */}
        {gameState === "playing" && (
          <>
            {gamePhase === "collecting" && (
              <CollectingPhase
                currentCharacters={currentCharacters}
                roundData={roundData}
                currentRound={currentRound}
                savedCharacters={savedCharacters}
                onDeleteCharacter={handleDeleteCharacter}
                bingoGrid={bingoGrid}
                onSaveCharacter={handleSaveCharacter}
              />
            )}

            {gamePhase === "placing" && (
              <PlacingPhase
                bingoGrid={bingoGrid}
                savedCharacters={savedCharacters}
                onDeleteCharacter={handleDeleteCharacter}
                onNextRound={nextRound}
                currentRound={currentRound}
                gridSize={gridSize}
                onCellDrop={handleCellDrop}
              />
            )}

            <RoundTransitionModal currentRound={currentRound} onContinue={continueToPlacing} gamePhase={gamePhase} />
          </>
        )}

        {/* Level Complete and Failed Modals */}
        {gameState === "levelComplete" && (
          <LevelCompleteModal
            levelData={currentLevelData}
            stars={currentLevelData.stars}
            bingoGrid={bingoGrid}
            totalRounds={currentRound}
            onNextLevel={handleNextLevel}
            onRetryLevel={handleRetryLevel}
            onBackToMenu={onBack || (() => {})}
          />
        )}

        {gameState === "levelFailed" && (
          <LevelFailedModal
            levelData={currentLevelData}
            onRetryLevel={handleRetryLevel}
            onBackToMenu={onBack || (() => {})}
          />
        )}
      </div>
    </div>
  )
}
