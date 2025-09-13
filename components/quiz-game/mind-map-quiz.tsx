"use client" // This directive is crucial for using hooks like useState and useEffect

import { useState, useCallback, useEffect } from "react"
import ReactFlow, {
  type Node,
  type Edge,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  type NodeTypes,
} from "reactflow"
import "reactflow/dist/style.css"

import { QuizNode } from "./quiz-node"
import { ResultCard } from "./result-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Target, CheckCircle, Network, ArrowLeft, ArrowRight, Loader2, Shield } from "lucide-react"
import type { HistoricalEvent } from "@/lib/my-events"
import { saveScore } from "@/lib/supabase/quiz-supabase"

const nodeTypes: NodeTypes = {
  quiz: QuizNode,
}

interface MindMapQuizProps {
  gameMode?: "single" | "multiplayer"
}

export function MindMapQuiz({ gameMode = "single" }: MindMapQuizProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([])
  const [edges, setEdges, onEdgesChange] = useEdgesState([])
  const [events, setEvents] = useState<HistoricalEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [showResultCard, setShowResultCard] = useState(false)
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [playerName, setPlayerName] = useState<string>("")
  const [quizKey, setQuizKey] = useState(0) // ADDED: Key state for resetting ReactFlow
  const [attemptsLeft, setAttemptsLeft] = useState(0) // <-- ADD THIS LINE
  useEffect(() => {
    const name = localStorage.getItem("quizPlayerName") || `Player_${Date.now()}`
    setPlayerName(name)
    localStorage.setItem("quizPlayerName", name)
  }, [])
  // This Effect hook is the single source of truth for ending the game.
  useEffect(() => {
    // Don't check for game over if there are no questions or the card is already shown.
    if (totalQuestions === 0 || showResultCard) {
      return
    }

    // Condition 1: The user has run out of attempts.
    if (attemptsLeft <= 0) {
      setShowResultCard(true)
      return // End the game
    }

    // Condition 2: The user has answered all the questions.
    if (answeredQuestions > 0 && answeredQuestions === totalQuestions) {
      setShowResultCard(true)
    }
  }, [answeredQuestions, attemptsLeft, totalQuestions, showResultCard])
  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges])

  // In components/mind-map-quiz.tsx

  // In components/mind-map-quiz.tsx

  const handleCorrectAnswer = useCallback(() => {
    setCorrectAnswers((prev) => prev + 1)
    setScore((prev) => prev + 10)
  }, [])

   const handleAnswerResult = useCallback(
    (isCorrect: boolean) => {
      // This function is called for every answer.
      setAnsweredQuestions((prev) => prev + 1)
      setLastAnswerCorrect(isCorrect)

      if (!isCorrect) {
        setAttemptsLeft((prev) => prev - 1)
      }
    },
    [],
  )
  const handleNextLevel = useCallback(async () => {
    setShowResultCard(false)
    if (totalQuestions > 0) {
      const percentage = (correctAnswers / totalQuestions) * 100
      try {
        await saveScore({
          player_name: playerName,
          level: currentEventIndex + 1,
          score: correctAnswers,
          total_questions: totalQuestions,
          percentage: percentage,
          is_multiplayer: gameMode === "multiplayer",
        })
        console.log("[v0] Score saved successfully to Supabase")
      } catch (error) {
        console.error("[v0] Failed to save score:", error)
      }
    }
    handleNextEvent()
  }, [correctAnswers, totalQuestions, currentEventIndex, playerName, gameMode])

  const handleRetry = useCallback(() => {
    setShowResultCard(false)
    setAnsweredQuestions(0)
    setCorrectAnswers(0)
    setScore(0)
    if (events.length > 0) {
      const currentEvent = events[currentEventIndex]
      createMindMapNodes(currentEvent)
    }
    setQuizKey((prev) => prev + 1) // ADDED: Increment key to force reset
  }, [events, currentEventIndex])

  const handleNextEvent = () => {
    if (events.length > 0) {
      setAnsweredQuestions(0)
      setCorrectAnswers(0)
      setScore(0)
      setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length)
      setQuizKey((prev) => prev + 1) // ADDED: Increment key to force reset
    }
  }

  const handlePreviousEvent = () => {
    if (events.length > 0) {
      setAnsweredQuestions(0)
      setCorrectAnswers(0)
      setScore(0)
      setCurrentEventIndex((prevIndex) => (prevIndex - 1 + events.length) % events.length)
      setQuizKey((prev) => prev + 1) // ADDED: Increment key to force reset
    }
  }

  const createMindMapNodes = useCallback(
    (event: HistoricalEvent) => {
      const centerNode: Node = {
        id: "center",
        type: "quiz",
        position: { x: 450, y: 250 },
        data: {
          label: event.title,
          isHidden: false,
          correctAnswer: event.title,
          options: [],
          category: "title",
           onCorrectAnswer: handleCorrectAnswer,   
           onAnswerResult: handleAnswerResult,
        },
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          border: "none",
          borderRadius: "15px",
          fontSize: "13px",
          fontWeight: "bold",
          width: 300,
          height: 90,
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }
      const allNodes: Node[] = [centerNode]
      const allEdges: Edge[] = []
      let nodeId = 1
      let hiddenCount = 0
      const elementsToHide = [0, 1, 2, 3, 4]
      event.storyElements.forEach((element, index) => {
        const shouldHide = elementsToHide.includes(index) && element.options.length > 0
        if (shouldHide) hiddenCount++
        const node: Node = {
          id: `story-${nodeId}`,
          type: "quiz",
          position: element.position,
          data: {
            label: shouldHide ? `${element.category}?` : element.text,
            isHidden: shouldHide,
            // CHANGED: Use the correct answer
            correctAnswer: element.correctAnswer,
            options: shouldHide ? element.options : [],
            category: element.category,
             onCorrectAnswer: handleCorrectAnswer,    
             onAnswerResult: handleAnswerResult,
          },
          style: {
            background: shouldHide ? "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" : element.style.background,
            color: shouldHide ? "white" : element.style.color,
            border: "none",
            borderRadius: "12px",
            fontSize: "11px",
            width: element.style.width,
            height: element.style.height,
          },
        }
        allNodes.push(node)
        allEdges.push({
          id: `edge-center-story-${nodeId}`,
          source: "center",
          target: `story-${nodeId}`,
          style: { stroke: element.style.edgeColor, strokeWidth: 2 },
          animated: true,
        })
        nodeId++
      })
      event.storyConnections.forEach((connection) => {
        allEdges.push({
          id: `edge-story-${connection.from}-${connection.to}`,
          source: `story-${connection.from + 1}`,
          target: `story-${connection.to + 1}`,
          style: { stroke: connection.color, strokeWidth: 1.5, strokeDasharray: "5,5" },
          animated: false,
          label: connection.relationship,
          labelStyle: { fontSize: "10px", fill: "#666" },
        })
      })
      hiddenCount++
      allNodes.push({
        id: `date-${nodeId}`,
        type: "quiz",
        position: { x: 450, y: 50 },
        data: {
          label: "Date Range?",
          isHidden: true,
          // CHANGED: The correct date is the first option in dateOptions
          correctAnswer: event.date,
          options: event.dateOptions,
          category: "date",
           onCorrectAnswer: handleCorrectAnswer,    
           onAnswerResult: handleAnswerResult,
        },
        style: {
          background: "linear-gradient(135deg, #ff9a9e 0%, #fef9d7 100%)",
          color: "white",
          border: "none",
          borderRadius: "12px",
          fontSize: "12px",
          width: 200,
          height: 60,
        },
      })
      allEdges.push({
        id: `edge-center-date-${nodeId}`,
        source: "center",
        target: `date-${nodeId}`,
        style: { stroke: "#a8edea", strokeWidth: 2 },
        animated: true,
      })
      setTotalQuestions(hiddenCount)
      setAttemptsLeft(hiddenCount * 2)
      setNodes(allNodes)
      setEdges(allEdges)
    },
    [handleCorrectAnswer, handleAnswerResult, setNodes, setEdges],
  )

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError(null)
        setIsLoading(true)
        const response = await fetch("/quiz-game/api/events")
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`)
        }
        const data: HistoricalEvent[] = await response.json()
        setEvents(data)
      } catch (err: any) {
        setError(err.message)
        console.error("Failed to fetch events:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEvents()
  }, [])

  useEffect(() => {
    if (events.length > 0) {
      setScore(0)
      setCorrectAnswers(0)
      setTotalQuestions(0)
      setAnsweredQuestions(0)
      const currentEvent = events[currentEventIndex]
      createMindMapNodes(currentEvent)
    }
  }, [currentEventIndex, events, createMindMapNodes])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-slate-50 dark:bg-gray-900">
        <Loader2 className="w-12 h-12 text-purple-600 dark:text-blue-500 animate-spin" />
        <p className="ml-4 text-lg text-gray-700 dark:text-gray-200">Loading Historical Quiz...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-red-50 dark:bg-red-900">
        <p className="text-lg text-red-600 dark:text-white">Error: {error}</p>
      </div>
    )
  }

  const progress = totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0
  const currentEvent = events[currentEventIndex]

  return (
    <div className="h-screen w-full relative">
      <ResultCard
        isCorrect={lastAnswerCorrect}
        currentScore={score}
        totalQuestions={totalQuestions}
        correctAnswers={correctAnswers}
        onNextLevel={handleNextLevel}
        onRetry={handleRetry}
        isVisible={showResultCard}
      />

      <Card className="absolute top-4 left-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg w-64">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2 dark:text-white">
            <Trophy className="w-5 h-5 text-yellow-500" />
            Palestinian History Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
  <div className="flex items-center gap-2">
    <span className="text-xs text-gray-500 dark:text-gray-400">Player: {playerName}</span>
  </div>
  <div className="flex items-center gap-2">
    <Network className="w-4 h-4 text-purple-500" />
    <span className="text-sm font-medium dark:text-gray-200">{currentEvent.title}</span>
  </div>
  <div className="flex items-center gap-2">
    <Target className="w-4 h-4 text-blue-500" />
    <span className="text-sm font-medium dark:text-gray-200">Score: {score}</span>
  </div>

  {/* --- THIS IS THE NEW PART I ADDED --- */}
  <div className="flex items-center gap-2">
    <Shield className="w-4 h-4 text-red-500" />
    <span className="text-sm font-medium dark:text-gray-200">
      {attemptsLeft} Attempts Left
    </span>
  </div>
  {/* ------------------------------------- */}
  
  <div className="flex items-center gap-2">
    <CheckCircle className="w-4 h-4 text-green-500" />
    <span className="text-sm font-medium dark:text-gray-200">
      {correctAnswers}/{totalQuestions} Correct
    </span>
  </div>
  <Progress value={progress} className="w-full" />
  {progress === 100 && totalQuestions > 0 && (
    <Badge className="bg-green-500 text-white animate-pulse">🎉 History Mastered!</Badge>
  )}
</CardContent>
      </Card>

      <Card className="absolute top-4 right-4 z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-2 flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handlePreviousEvent}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Event {currentEventIndex + 1} of {events.length}
          </div>
          <Button variant="ghost" size="icon" onClick={handleNextEvent}>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </CardContent>
      </Card>

      <ReactFlow
        key={quizKey} // ADDED: Key prop to force re-render
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900"
      >
        <Controls className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg" />
        <Background color="#e0e7ff" gap={20} />
      </ReactFlow>
    </div>
  )
}