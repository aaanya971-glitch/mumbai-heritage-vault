/**
 * Mumbai HeritageVault - AI Heritage Guide ("Mitra")
 * Grounded in verified museum database with strict zero-hallucination guardrails
 */

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Shield, BookOpen, RotateCcw, CheckCircle, Info } from 'lucide-react';
import { askMitraAI } from '../services/api';
import { AIChatMessage } from '../types';

export const AIGuidePage: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'msg_welcome',
      role: 'assistant',
      text: `Namaste and welcome! I am **Mitra**, the digital historical assistant for the **Mumbai HeritageVault**. \n\nI can answer questions regarding Mumbai’s architectural monuments, museums, ancient rock-cut caves, maritime forts, freedom movement history, or help you structure a personalized heritage walk.\n\n*Note: To protect historical accuracy, all my answers are strictly grounded in verified archaeological and museum records.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      verifiedStatus: true,
      references: ['Mumbai HeritageVault Curatorial Knowledge Base'],
    },
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Tell me about CSMT.',
    'What is the history of Gateway of India?',
    'What are the oldest heritage sites in Mumbai?',
    'Tell me about Mumbai during British rule.',
    'What museums can I visit?',
    'Tell me about Kanheri Caves.',
    'What is Mumbai’s Koli heritage?',
    'Give me a one-day heritage tour of South Mumbai.',
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (questionText?: string) => {
    const q = (questionText || inputQuestion).trim();
    if (!q || isLoading) return;

    const userMsg: AIChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      text: q,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await askMitraAI(q, messages);
      const aiMsg: AIChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedStatus: response.verifiedStatus,
        references: response.references,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errorMsg: AIChatMessage = {
        id: `err_${Date.now()}`,
        role: 'assistant',
        text: "I couldn't process that question right now. Please try asking again shortly.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedStatus: false,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'msg_welcome',
        role: 'assistant',
        text: `Conversation cleared. What aspect of Mumbai's heritage would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        verifiedStatus: true,
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-900 text-stone-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
            <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-stone-900">
              Mitra – Mumbai Heritage AI Guide
            </h1>
          </div>
          <p className="text-xs text-stone-600 font-serif mt-1">
            Grounded specifically in the historical, architectural, and archival collections of Mumbai.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClearHistory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 border border-stone-200 bg-white rounded-md transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Verification Policy Banner */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-md p-3 flex items-start gap-2.5 text-xs text-amber-950">
        <Shield className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
        <p>
          <strong>Zero-Hallucination Policy:</strong> Mitra draws solely from documented historical data. When information is not available in our verified museum knowledge base, it will state clearly that archival verification is required.
        </p>
      </div>

      {/* Suggested Questions Carousel */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block">
          Suggested Inquiries:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {suggestedQuestions.map((sq, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(sq)}
              className="px-3 py-1.5 rounded-md bg-white border border-stone-200 text-xs text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors whitespace-nowrap"
            >
              {sq}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Frame */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-4 sm:p-6 min-h-[460px] max-h-[600px] overflow-y-auto space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-lg p-4 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-800 text-white rounded-br-xs'
                  : 'bg-stone-100 text-stone-900 border border-stone-200 rounded-bl-xs font-serif'
              }`}
            >
              <div className="whitespace-pre-line">{msg.text}</div>

              {/* Verified Sources Badge in AI message */}
              {msg.role === 'assistant' && msg.references && msg.references.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-stone-200/80 text-[11px] text-stone-500 space-y-1">
                  <div className="flex items-center gap-1 font-sans font-semibold text-stone-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Verified Knowledge Sources:</span>
                  </div>
                  <ul className="list-disc list-inside font-sans text-stone-600">
                    {msg.references.map((ref, idx) => (
                      <li key={idx}>{ref}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <span className="text-[10px] text-stone-400 font-mono mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="bg-stone-100 text-stone-500 rounded-lg p-3 text-xs italic flex items-center gap-2 border border-stone-200">
              <span className="w-2 h-2 rounded-full bg-amber-800 animate-ping" />
              <span>Mitra is referencing verified museum records...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 bg-white rounded-lg border border-stone-300 p-2 shadow-xs focus-within:ring-1 focus-within:ring-amber-800"
      >
        <input
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ask Mitra about Mumbai's history, architects, forts, or cultural heritage..."
          className="flex-1 px-3 py-2 text-sm text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
        />
        <button
          type="submit"
          disabled={!inputQuestion.trim() || isLoading}
          className="px-4 py-2 bg-amber-800 hover:bg-amber-700 disabled:opacity-50 text-stone-100 rounded text-xs font-semibold tracking-wide transition-colors flex items-center gap-1.5 shrink-0"
        >
          <span>Ask</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
