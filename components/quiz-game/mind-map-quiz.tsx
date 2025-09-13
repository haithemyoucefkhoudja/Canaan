"use client"; // This directive is crucial for using hooks like useState and useEffect

import { useState, useCallback, useEffect } from "react";
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
} from "reactflow";
import "reactflow/dist/style.css";

import { QuizNode } from "./quiz-node";
import { ResultCard } from "./result-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
	Trophy,
	Target,
	CheckCircle,
	Network,
	ArrowLeft,
	ArrowRight,
	Loader2,
	Shield,
} from "lucide-react";
import { testEvents, type HistoricalEvent } from "@/lib/my-events";
import { saveScore } from "@/lib/supabase/quiz-supabase";
import { Error as ErrorComponent } from "../error-handlers";
import { Loader } from "../ui/loader";
import { useAuth } from "../firebase-auth/AuthContext";

const nodeTypes: NodeTypes = {
	quiz: QuizNode,
};

interface MindMapQuizProps {
	gameMode?: "single" | "multiplayer";
}

export function MindMapQuiz({ gameMode = "single" }: MindMapQuizProps) {
	const { user } = useAuth();
	if (!user) return null;
	const [nodes, setNodes, onNodesChange] = useNodesState([]);
	const [edges, setEdges, onEdgesChange] = useEdgesState([]);
	const [events, setEvents] = useState<HistoricalEvent[]>(testEvents);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [score, setScore] = useState(0);
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [currentEventIndex, setCurrentEventIndex] = useState(0);
	const [showResultCard, setShowResultCard] = useState(false);
	const [lastAnswerCorrect, setLastAnswerCorrect] = useState(false);
	const [answeredQuestions, setAnsweredQuestions] = useState(0);
	const playerName = user.display_name;
	const [quizKey, setQuizKey] = useState(0);
	const [attemptsLeft, setAttemptsLeft] = useState(0);

	useEffect(() => {
		if (totalQuestions === 0 || showResultCard) {
			return;
		}
		if (attemptsLeft <= 0) {
			setShowResultCard(true);
			return;
		}
		if (answeredQuestions > 0 && answeredQuestions === totalQuestions) {
			setShowResultCard(true);
		}
	}, [answeredQuestions, attemptsLeft, totalQuestions, showResultCard]);

	const onConnect = useCallback(
		(params: Connection) => setEdges((eds: any) => addEdge(params, eds)),
		[setEdges]
	);

	const handleCorrectAnswer = useCallback(() => {
		setCorrectAnswers((prev) => prev + 1);
		setScore((prev) => prev + 10);
	}, []);

	const handleAnswerResult = useCallback((isCorrect: boolean) => {
		setAnsweredQuestions((prev) => prev + 1);
		setLastAnswerCorrect(isCorrect);
		if (!isCorrect) {
			setAttemptsLeft((prev) => prev - 1);
		}
	}, []);

	const handleNextLevel = useCallback(async () => {
		setShowResultCard(false);
		if (totalQuestions > 0) {
			const percentage = (correctAnswers / totalQuestions) * 100;
			try {
				await saveScore({
					player_name: playerName,
					level: currentEventIndex + 1,
					score: correctAnswers,
					total_questions: totalQuestions,
					percentage: percentage,
					is_multiplayer: gameMode === "multiplayer",
				});
				console.log("[v0] Score saved successfully to Supabase");
			} catch (error) {
				console.error("[v0] Failed to save score:", error);
			}
		}
		handleNextEvent();
	}, [correctAnswers, totalQuestions, currentEventIndex, playerName, gameMode]);

	const handleRetry = useCallback(() => {
		setShowResultCard(false);
		setAnsweredQuestions(0);
		setCorrectAnswers(0);
		setScore(0);
		if (events.length > 0) {
			const currentEvent = events[currentEventIndex];
			createMindMapNodes(currentEvent);
		}
		setQuizKey((prev) => prev + 1);
	}, [events, currentEventIndex]);

	const handleNextEvent = () => {
		if (events.length > 0) {
			setAnsweredQuestions(0);
			setCorrectAnswers(0);
			setScore(0);
			setCurrentEventIndex((prevIndex) => (prevIndex + 1) % events.length);
			setQuizKey((prev) => prev + 1);
		}
	};

	const handlePreviousEvent = () => {
		if (events.length > 0) {
			setAnsweredQuestions(0);
			setCorrectAnswers(0);
			setScore(0);
			setCurrentEventIndex(
				(prevIndex) => (prevIndex - 1 + events.length) % events.length
			);
			setQuizKey((prev) => prev + 1);
		}
	};

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
					background: "hsl(var(--primary))", // Using primary variable
					color: "hsl(var(--primary-foreground))", // Using foreground for primary
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
			};
			const allNodes: Node[] = [centerNode];
			const allEdges: Edge[] = [];
			let nodeId = 1;
			let hiddenCount = 0;
			const elementsToHide = [0, 1, 2, 3, 4];
			event.storyElements.forEach((element, index) => {
				const shouldHide =
					elementsToHide.includes(index) && element.options.length > 0;
				if (shouldHide) hiddenCount++;
				const node: Node = {
					id: `story-${nodeId}`,
					type: "quiz",
					position: element.position,
					data: {
						label: shouldHide ? `${element.category}?` : element.text,
						isHidden: shouldHide,
						correctAnswer: element.correctAnswer,
						options: shouldHide ? element.options : [],
						category: element.category,
						onCorrectAnswer: handleCorrectAnswer,
						onAnswerResult: handleAnswerResult,
					},
					style: {
						border: "none",
						borderRadius: "12px",
						fontSize: "11px",
					},
				};
				allNodes.push(node);
				allEdges.push({
					id: `edge-center-story-${nodeId}`,
					source: "center",
					target: `story-${nodeId}`,
					animated: true,
				});
				nodeId++;
			});
			event.storyConnections.forEach((connection) => {
				allEdges.push({
					id: `edge-story-${connection.from}-${connection.to}`,
					source: `story-${connection.from + 1}`,
					target: `story-${connection.to + 1}`,
					style: {
						stroke: "hsl(var(--border))", // Use border color for connections
						strokeWidth: 1.5,
						strokeDasharray: "5,5",
					},
					animated: false,
					label: connection.relationship,
					labelStyle: {
						fontSize: "10px",
						fill: "hsl(var(--muted-foreground))", // Use muted for label
					},
				});
			});
			hiddenCount++;
			allNodes.push({
				id: `date-${nodeId}`,
				type: "quiz",
				position: { x: 450, y: 50 },
				data: {
					label: "Date Range?",
					isHidden: true,
					correctAnswer: event.date,
					options: event.dateOptions,
					category: "date",
					onCorrectAnswer: handleCorrectAnswer,
					onAnswerResult: handleAnswerResult,
				},
				style: {
					background: "hsl(var(--accent))", // Using accent variable
					color: "hsl(var(--accent-foreground))", // Foreground for accent
					border: "none",
					borderRadius: "12px",
					fontSize: "12px",
					width: 200,
					height: 60,
				},
			});
			allEdges.push({
				id: `edge-center-date-${nodeId}`,
				source: "center",
				target: `date-${nodeId}`,
				style: { stroke: "hsl(var(--ring))", strokeWidth: 2 }, // Use ring color
				animated: true,
			});
			setTotalQuestions(hiddenCount);
			setAttemptsLeft(hiddenCount * 2);
			setNodes(allNodes);
			setEdges(allEdges);
		},
		[handleCorrectAnswer, handleAnswerResult, setNodes, setEdges]
	);

	useEffect(() => {
		if (events.length > 0) {
			setScore(0);
			setCorrectAnswers(0);
			setTotalQuestions(0);
			setAnsweredQuestions(0);
			const currentEvent = events[currentEventIndex];
			createMindMapNodes(currentEvent);
		}
	}, [currentEventIndex, events, createMindMapNodes]);

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen w-full">
				<Loader size="lg" />
			</div>
		);
	}

	if (error) {
		return <ErrorComponent message={`Error: ${error}`} />;
	}

	const progress =
		totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0;
	const currentEvent = events[currentEventIndex];

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

			<Card className="absolute top-4 left-4 z-10 bg-card/90 backdrop-blur-sm border-0 shadow-lg w-64">
				<CardHeader className="pb-2">
					<CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
						<Trophy className="w-5 h-5 text-yellow-500" />
						Palestinian History Quiz
					</CardTitle>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="flex items-center gap-2">
						<span className="text-xs text-muted-foreground">
							Player: {playerName}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Network className="w-4 h-4 text-purple-500" />
						<span className="text-sm font-medium text-card-foreground">
							{currentEvent.title}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Target className="w-4 h-4 text-blue-500" />
						<span className="text-sm font-medium text-card-foreground">
							Score: {score}
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Shield className="w-4 h-4 text-red-500" />
						<span className="text-sm font-medium text-card-foreground">
							{attemptsLeft} Attempts Left
						</span>
					</div>
					<div className="flex items-center gap-2">
						<CheckCircle className="w-4 h-4 text-green-500" />
						<span className="text-sm font-medium text-card-foreground">
							{correctAnswers}/{totalQuestions} Correct
						</span>
					</div>
					<Progress value={progress} className="w-full" />
					{progress === 100 && totalQuestions > 0 && (
						<Badge className="bg-primary text-primary-foreground animate-pulse">
							🎉 History Mastered!
						</Badge>
					)}
				</CardContent>
			</Card>

			<Card className="absolute top-4 right-4 z-10 bg-card/90 backdrop-blur-sm border-0 shadow-lg">
				<CardContent className="p-2 flex items-center gap-2">
					<Button variant="ghost" size="icon" onClick={handlePreviousEvent}>
						<ArrowLeft className="w-5 h-5" />
					</Button>
					<div className="text-sm font-semibold text-foreground">
						Event {currentEventIndex + 1} of {events.length}
					</div>
					<Button variant="ghost" size="icon" onClick={handleNextEvent}>
						<ArrowRight className="w-5 h-5" />
					</Button>
				</CardContent>
			</Card>

			<ReactFlow
				key={quizKey}
				nodes={nodes}
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onConnect={onConnect}
				nodeTypes={nodeTypes}
				fitView
				className="bg-background"
			>
				<Controls className="bg-popover/80 backdrop-blur-sm border-none shadow-lg" />
				<Background color="hsl(var(--border))" gap={20} />
			</ReactFlow>
		</div>
	);
}
