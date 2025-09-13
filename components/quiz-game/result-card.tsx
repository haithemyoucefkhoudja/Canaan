"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, RotateCcw, ArrowRight, CheckCircle, XCircle } from "lucide-react"

interface ResultCardProps {
  isCorrect: boolean
  currentScore: number
  totalQuestions: number
  correctAnswers: number
  onNextLevel: () => void
  onRetry: () => void
  isVisible: boolean
}

export function ResultCard({
  isCorrect,
  currentScore,
  totalQuestions,
  correctAnswers,
  onNextLevel,
  onRetry,
  isVisible,
}: ResultCardProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [showSadAnimation, setShowSadAnimation] = useState(false)

  useEffect(() => {
    if (isVisible) {
      if (isCorrect) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 5000) // Increased time for animation
      } else {
        setShowSadAnimation(true)
        setTimeout(() => setShowSadAnimation(false), 2000)
      }
    }
  }, [isVisible, isCorrect])

  if (!isVisible) return null

  return (
    <>
      {/* --- NEW, CORRECTED CONFETTI IMPLEMENTATION --- */}
      {showConfetti && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
          {[...Array(60)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-4" // Shape of the ribbon
              style={{
                left: `${Math.random() * 100}%`, // Random horizontal start position
                top: '-5%', // Start just above the visible screen
                backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3'][Math.floor(Math.random() * 6)],
                // All animation properties are now cleanly combined here
                animation: `fall ${3 + Math.random() * 3}s ${Math.random() * 2}s linear infinite`,
                // These variables provide random values to the CSS animation below
                '--translateX-end': `${(Math.random() - 0.5) * 400}px`,
                '--rotate-end': `${(Math.random() - 0.5) * 720}deg`,
              }}
            />
          ))}
        </div>
      )}

      {/* Result Card (No changes here) */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40 p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm animate-in zoom-in-95 duration-300">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center">
              {isCorrect ? (
                <div className="bg-green-100 dark:bg-green-900/50 w-16 h-16 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="bg-red-100 dark:bg-red-900/50 w-16 h-16 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <CardTitle
                className={`text-2xl font-bold ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                {isCorrect ? "Correct!" : "Wrong Answer"}
              </CardTitle>

              <div className="text-4xl">
                {isCorrect ? (
                  <span className="inline-block animate-bounce">😊</span>
                ) : (
                  <span className={`inline-block ${showSadAnimation ? "animate-pulse" : ""}`}>😔</span>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/50 dark:to-blue-900/50 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Score:</span>
                <Badge
                  variant="secondary"
                  className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300"
                >
                  <Trophy className="w-3 h-3 mr-1" />
                  {currentScore} points
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {correctAnswers}/{totalQuestions} correct
                </span>
              </div>

              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={onRetry}
                variant="outline"
                className="flex-1 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry
              </Button>

              <Button
                onClick={onNextLevel}
                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
              >
                Next Level
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* --- NEW, CORRECTED CSS ANIMATION --- */}
      <style jsx>{`
        @keyframes fall {
          from {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
          }
          to {
            transform: translateY(105vh) translateX(var(--translateX-end)) rotate(var(--rotate-end));
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  )
}