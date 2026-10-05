/**
 * Mumbai HeritageVault - Educational Quiz Module
 * 10-Question timed quiz with instant explanation, scoring, badge awards, and leaderboard
 */

import React, { useState, useEffect } from 'react';
import { Award, Clock, CheckCircle, XCircle, RotateCcw, Trophy, ArrowRight, User } from 'lucide-react';
import { quizApi } from '../services/api';
import { QuizQuestion, QuizResult, User as UserType } from '../types';

interface QuizPageProps {
  currentUser: UserType | null;
}

export const QuizPage: React.FC<QuizPageProps> = ({ currentUser }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(180); // 3 minutes total
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [leaderboard, setLeaderboard] = useState<QuizResult[]>([]);
  const [viewTab, setViewTab] = useState<'quiz' | 'leaderboard'>('quiz');

  useEffect(() => {
    const all = quizApi.getQuestions();
    setQuestions(all.slice(0, 10));
    setLeaderboard(quizApi.getLeaderboard());
  }, []);

  // Timer countdown
  useEffect(() => {
    if (quizFinished || viewTab !== 'quiz' || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizFinished, viewTab, questions]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    if (selectedOption === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizFinished(true);
    const result = quizApi.submitResult({
      userId: currentUser?.id,
      userName: currentUser?.name || 'Visitor Scholar',
      score,
      totalQuestions: questions.length || 10,
      category: 'Mumbai Heritage Master',
    });
    setQuizResult(result);
    setLeaderboard(quizApi.getLeaderboard());
  };

  const handleRestart = () => {
    const all = quizApi.getQuestions();
    // Shuffle and pick 10
    const shuffled = [...all].sort(() => Math.random() - 0.5).slice(0, 10);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setTimerSeconds(180);
    setQuizResult(null);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-stone-700 font-semibold font-sans">
            Educational Evaluation
          </span>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Mumbai Heritage Knowledge Quiz
          </h1>
          <p className="text-xs text-stone-600 font-serif mt-1">
            10 multiple choice questions testing your grasp of Mumbai architecture, history, and culture.
          </p>
        </div>

        {/* Tab switch between quiz & leaderboard */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/80 rounded-md shrink-0">
          <button
            type="button"
            onClick={() => setViewTab('quiz')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
              viewTab === 'quiz' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Quiz Arena
          </button>
          <button
            type="button"
            onClick={() => setViewTab('leaderboard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors flex items-center gap-1.5 ${
              viewTab === 'leaderboard' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-800" />
            <span>Leaderboard</span>
          </button>
        </div>
      </div>

      {viewTab === 'leaderboard' ? (
        /* Leaderboard View */
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <h2 className="font-serif-display text-xl font-bold text-stone-900 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-800" />
              <span>Heritage Scholars Leaderboard</span>
            </h2>
            <span className="text-xs text-stone-500">Top 10 High Scores</span>
          </div>

          <div className="divide-y divide-stone-100">
            {leaderboard.map((res, i) => (
              <div key={res.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 font-mono font-bold text-stone-400">#{i + 1}</span>
                  <div>
                    <strong className="text-stone-900 text-sm font-semibold">{res.userName}</strong>
                    <div className="text-[11px] text-stone-500">{res.category} · {new Date(res.completedAt).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="px-2.5 py-1 rounded bg-amber-100/70 text-amber-900 font-semibold text-[11px]">
                    {res.badgeEarned}
                  </span>
                  <span className="font-mono text-base font-bold text-stone-900 tabular-nums">
                    {res.score} / {res.totalQuestions}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setViewTab('quiz')}
            className="w-full py-2.5 bg-stone-900 text-stone-100 text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
          >
            Start Quiz Challenge
          </button>
        </div>
      ) : quizFinished && quizResult ? (
        /* Quiz Finished Result Card */
        <div className="bg-white rounded-xl border border-stone-200 p-8 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-200 text-amber-800 mx-auto flex items-center justify-center">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">
              Evaluation Complete
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-stone-900">
              Badge Conferred: {quizResult.badgeEarned}
            </h2>
            <p className="text-sm text-stone-600 font-serif">
              You scored <strong className="font-mono text-amber-900 text-lg tabular-nums">{score}</strong> out of <strong className="font-mono text-lg tabular-nums">{questions.length}</strong> questions correct.
            </p>
          </div>

          <div className="p-4 bg-stone-50 rounded-lg border border-stone-200 max-w-md mx-auto text-xs text-stone-600 leading-relaxed font-serif">
            {score >= 9 && 'Exceptional mastery! You possess deep scholarly knowledge of Mumbai’s architectural, archaeological, and civic history.'}
            {score >= 7 && score < 9 && 'Impressive knowledge! You understand the key epochs, personalities, and monuments that shaped Bombay.'}
            {score >= 5 && score < 7 && 'Good effort! You have an appreciation of Mumbai heritage. Explore our timeline and museum catalogs to deepen your understanding.'}
            {score < 5 && 'Keep exploring! Revisit the Heritage Directory, examine historical artifacts, and try again.'}
          </div>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Quiz</span>
            </button>

            <button
              type="button"
              onClick={() => setViewTab('leaderboard')}
              className="px-6 py-2.5 bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 rounded text-xs font-semibold tracking-wide transition-colors"
            >
              View Leaderboard
            </button>
          </div>
        </div>
      ) : currentQ ? (
        /* Active Quiz Question Card */
        <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs space-y-6">
          {/* Status Row: Progress & Timer */}
          <div className="flex items-center justify-between border-b border-stone-200 pb-3 text-xs">
            <div className="flex items-center gap-2 text-stone-600 font-mono font-medium">
              <span>QUESTION {currentIndex + 1} OF {questions.length}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 font-sans font-semibold">{currentQ.category}</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-stone-700 bg-stone-100 px-2.5 py-1 rounded">
              <Clock className="w-3.5 h-3.5 text-amber-800" />
              <span className="tabular-nums font-bold">{formatTime(timerSeconds)}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-800 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question Text */}
          <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
            {currentQ.question}
          </h2>

          {/* 4 Multiple Choice Options */}
          <div className="space-y-3">
            {[currentQ.optionA, currentQ.optionB, currentQ.optionC, currentQ.optionD].map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQ.correctAnswer;

              let btnClasses = 'border-stone-200 hover:border-stone-400 bg-white text-stone-800';
              if (isSelected && !isAnswerSubmitted) {
                btnClasses = 'border-amber-800 bg-amber-50/70 text-amber-950 font-semibold ring-1 ring-amber-800';
              } else if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnClasses = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isSelected && !isCorrect) {
                  btnClasses = 'border-rose-600 bg-rose-50 text-rose-950';
                } else {
                  btnClasses = 'border-stone-200 opacity-60 text-stone-500';
                }
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between ${btnClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-mono text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-700 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner (Appears after submission) */}
          {isAnswerSubmitted && (
            <div className="p-4 rounded-lg bg-stone-50 border border-stone-200 text-xs space-y-1 animate-in fade-in">
              <strong className="block text-stone-900 font-semibold uppercase tracking-wider text-[11px]">
                Historical Explanation:
              </strong>
              <p className="text-stone-700 font-serif leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Footer Controls */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
            <span className="text-xs text-stone-500 font-mono">
              Current Score: <strong className="text-stone-900 font-bold tabular-nums">{score}</strong> / {currentIndex + (isAnswerSubmitted ? 1 : 0)}
            </span>

            {!isAnswerSubmitted ? (
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-5 py-2.5 bg-amber-800 hover:bg-amber-700 disabled:opacity-50 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors"
              >
                Submit Answer
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextQuestion}
                className="px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-stone-500 text-xs">
          Loading questions...
        </div>
      )}
    </div>
  );
};
