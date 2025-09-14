
import React from 'react';

interface ScoreScreenProps {
  correct: number;
  total: number;
  onPlayAgain: () => void;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ correct, total, onPlayAgain }) => {
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  const getFeedback = () => {
    if (percentage === 100) return "Perfect Score! You're a history whiz!";
    if (percentage >= 80) return "Excellent! You really know your stuff.";
    if (percentage >= 50) return "Good job! A solid performance.";
    return "Nice try! Every quiz is a chance to learn.";
  };

  return (
    <div className="text-center p-8 bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl border border-blue-400/20 animate-fade-in">
      <h2 className="text-3xl font-bold text-brand-text mb-2">Quiz Complete!</h2>
      <p className="text-lg text-brand-accent mb-6">{getFeedback()}</p>

      <div className="my-8">
        <p className="text-5xl font-extrabold text-white">{correct} / {total}</p>
        <p className="text-brand-light">Correct Answers</p>
      </div>

      <div className="w-full bg-brand-primary/50 rounded-full h-4 mb-8">
        <div
          className="bg-brand-accent h-4 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <button
        onClick={onPlayAgain}
        className="w-full bg-brand-accent hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-transform transform hover:scale-105"
      >
        Play Again
      </button>
    </div>
  );
};

export default ScoreScreen;
