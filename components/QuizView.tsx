
import React, { useState, useMemo } from 'react';
import type { Quiz, QuizQuestion } from '../types';

interface QuizViewProps {
  quiz: Quiz;
  onComplete: (correctAnswers: number, totalQuestions: number) => void;
}

const QuizView: React.FC<QuizViewProps> = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);

  const currentQuestion: QuizQuestion = useMemo(() => quiz.questions[currentQuestionIndex], [quiz, currentQuestionIndex]);

  const handleAnswerSelect = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentQuestion.correctAnswer) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onComplete(correctAnswersCount, quiz.questions.length);
    }
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return "bg-brand-primary hover:bg-brand-secondary";
    }
    if (option === currentQuestion.correctAnswer) {
      return "bg-green-700";
    }
    if (option === selectedAnswer) {
      return "bg-red-700";
    }
    return "bg-brand-primary opacity-50";
  };
  
  return (
    <div className="w-full p-6 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-blue-400/20 animate-slide-in">
      <div className="mb-4">
        <p className="text-sm text-brand-accent">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </p>
        <h2 className="text-xl md:text-2xl font-semibold my-2 text-brand-text">
          {currentQuestion.question}
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleAnswerSelect(option)}
            disabled={isAnswered}
            className={`p-4 rounded-lg text-left text-white transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none ${getButtonClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>

      {isAnswered && (
        <div className="mt-6 p-4 rounded-lg animate-fade-in bg-brand-dark/50">
          <h3 className={`font-bold text-lg ${selectedAnswer === currentQuestion.correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
            {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect'}
          </h3>
          <p className="text-brand-light mt-1">{currentQuestion.explanation}</p>
          <button
            onClick={handleNextQuestion}
            className="mt-4 w-full bg-brand-accent hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
          >
            {currentQuestionIndex < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizView;
