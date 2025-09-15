
import React from 'react';
import type { AppEvent } from '../types';
import { CalendarIcon, LocationIcon, UsersIcon } from './icons';

interface EventCardProps {
  event: AppEvent;
  onStartQuiz: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onStartQuiz }) => {
  const formatDate = (date: Date | null) => {
    return date ? new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date) : 'N/A';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-8 animate-fade-in border border-blue-400/20">
      <h2 className="text-3xl font-bold text-brand-text mb-4">{event.name}</h2>
      
      <div className="flex flex-wrap gap-4 text-sm text-brand-accent mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5" />
          <span>{formatDate(event.start_date)} - {formatDate(event.end_date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <LocationIcon className="w-5 h-5" />
          <span>{event.location.name}</span>
        </div>
      </div>

      <p className="text-brand-light mb-6 leading-relaxed">{event.description}</p>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-brand-text flex items-center gap-2 mb-3">
          <UsersIcon className="w-6 h-6" />
          Key Figures
        </h3>
        <ul className="flex flex-wrap gap-2">
          {event.actors.map((actor) => (
            <li key={actor.name} className="bg-brand-primary/50 text-brand-light text-xs font-medium px-3 py-1 rounded-full">
              {actor.name} <span className="opacity-70">({actor.role})</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onStartQuiz}
        className="w-full bg-brand-accent hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400/50"
      >
        Test Your Knowledge
      </button>
    </div>
  );
};

export default EventCard;
