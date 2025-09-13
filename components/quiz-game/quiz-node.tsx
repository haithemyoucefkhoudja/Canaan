"use client"

import { useState, useCallback } from "react"
import { Handle, Position, type NodeProps } from "reactflow"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check, X, EyeOff, HelpCircle } from "lucide-react"

interface QuizNodeData {
  label: string
  isHidden: boolean
  correctAnswer: string
  options: string[]
  category: string
  onCorrectAnswer: () => void
  onAnswerResult?: (isCorrect: boolean) => void
}

export function QuizNode({ data }: NodeProps<QuizNodeData>) {
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isRevealed, setIsRevealed] = useState(!data.isHidden)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  const handleReveal = useCallback(() => {
    if (data.isHidden && !isRevealed && data.options?.length > 0) {
      setShowOptions(true)
    }
  }, [data.isHidden, isRevealed, data.options])

  const handleOptionSelect = useCallback(
    (option: string) => {
      setSelectedOption(option)
      const correct = option === data.correctAnswer
      setIsCorrect(correct)

      if (data.onAnswerResult) {
        data.onAnswerResult(correct)
      }

      if (correct) {
        data.onCorrectAnswer()
        setTimeout(() => {
          setIsRevealed(true)
          setShowOptions(false)
        }, 800)
      } else {
        setTimeout(() => {
          setIsCorrect(null)
          setSelectedOption(null)
        }, 1500)
      }
    },
    [data.correctAnswer, data.onCorrectAnswer, data.onAnswerResult],
  )

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "decision":
        return "⚖️"
      case "acquisition":
        return "🏗️"
      case "resistance":
        return "✊"
      case "support":
        return "🤝"
      case "resolution":
        return "✅"
      case "consequence":
        return "⚡"
      case "date":
        return "📅"
      case "location":
        return "📍"
      case "context":
        return "📖"
      case "action":
        return "🎬"
      case "thesis":
        return "🧠"
      case "solution":
        return "💡"
      case "title":
        return "🏷️"
      default:
        return "📋"
    }
  }

  const getQuestionText = (category: string): string => {
    switch (category) {
      case "Actors":
        return "Who were the main actors involved?"
      case "Location":
        return "Where did this event primarily take place?"
      case "Date":
        return "When did this event happen?"
      default:
        return "What happened in this part of the story?"
    }
  }

  if (showOptions && !isRevealed) {
    return (
      <>
        <Handle type="target" position={Position.Top} className="!bg-transparent" />
        <Card className="p-4 min-w-[350px] max-w-[450px] shadow-lg border-2 border-dashed border-purple-300 bg-white dark:bg-gray-800 z-20">
          <div className="space-y-3">
            <div className="text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1 mb-2">
                {getCategoryIcon(data.category)}
                <span className="capitalize font-medium">{data.category}</span>
              </div>
              <div className="text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center justify-center gap-2 text-center px-2">
                <HelpCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{getQuestionText(data.category)}</span>
              </div>
            </div>
            <div className="space-y-2">
              {data.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  variant="outline"
                  className={`w-full text-left justify-start p-3 h-auto text-xs leading-relaxed hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all whitespace-normal ${
                    selectedOption === option
                      ? isCorrect
                        ? "bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-600 text-green-700 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900/50 border-red-300 dark:border-red-600 text-red-700 dark:text-red-300"
                      : ""
                  }`}
                  disabled={selectedOption !== null}
                >
                  <div className="flex items-start gap-2 w-full">
                    <span className="font-medium text-purple-500 dark:text-purple-400 mt-0.5">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span className="flex-1">{option}</span>
                    {selectedOption === option && (
                      <span className="ml-2 self-center">
                        {isCorrect ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <X className="w-4 h-4 text-red-500" />
                        )}
                      </span>
                    )}
                  </div>
                </Button>
              ))}
            </div>
            <Button
              onClick={() => setShowOptions(false)}
              size="sm"
              variant="ghost"
              className="w-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            >
              Cancel
            </Button>
            {isCorrect === false && (
              <div className="text-xs text-red-500 dark:text-red-400 text-center flex items-center justify-center gap-1">
                <X className="w-3 h-3" />
                Try again!
              </div>
            )}
          </div>
        </Card>
        <Handle type="source" position={Position.Bottom} className="!bg-transparent" />
      </>
    )
  }

  return (
    <Card
      className={`p-3 min-w-[140px] shadow-lg transition-all duration-200 cursor-pointer hover:shadow-xl ${
        data.isHidden && !isRevealed ? "border-2 border-dashed border-pink-300 hover:border-pink-400" : "border-0"
      }`}
      onClick={handleReveal}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      <div className="text-center">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1 flex items-center justify-center gap-1">
          {getCategoryIcon(data.category)}
          <span className="capitalize">{data.category}</span>
        </div>
        <div className="font-medium text-sm flex items-center justify-center gap-2">
          {data.isHidden && !isRevealed ? (
            <>
              <EyeOff className="w-4 h-4 text-pink-400" />
              <span className="text-pink-500 dark:text-pink-400">Click to reveal</span>
            </>
          ) : (
            <span
              className={`${isCorrect ? "text-green-600 dark:text-green-400 font-bold" : "dark:text-gray-200"} leading-tight text-center`}
            >
              {data.correctAnswer}
            </span>
          )}
        </div>
        {isCorrect && (
          <div className="text-xs text-green-500 dark:text-green-400 mt-1 flex items-center justify-center gap-1">
            <Check className="w-3 h-3" /> Correct!
          </div>
        )}
      </div>
    </Card>
  )
}