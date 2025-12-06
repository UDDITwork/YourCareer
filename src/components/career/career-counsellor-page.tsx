'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { CareerChat } from "./career-chat";
import { CareerSessionsList } from "./career-sessions-list";
import { CareerSessionSummary } from "@/lib/types";
import { History, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CareerCounsellorPageProps {
  initialSessions: CareerSessionSummary[];
  initialSessionId?: string | null;
}

export function CareerCounsellorPage({ initialSessions, initialSessionId }: CareerCounsellorPageProps) {
  const [sessions, setSessions] = useState<CareerSessionSummary[]>(initialSessions);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(initialSessionId || null);
  const [showHistory, setShowHistory] = useState(false);

  const handleNewSession = () => {
    setActiveSessionId(null);
    setShowHistory(false);
  };

  const handleSelectSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    setShowHistory(false);
  };

  const handleSessionCreated = (session: CareerSessionSummary) => {
    setSessions(prev => [session, ...prev]);
    setActiveSessionId(session.id);
  };

  const handleSessionDeleted = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-6 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.02)_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-6"
          >
            <div className="flex justify-center gap-3 mb-4">
              <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">
                AI-Powered
              </span>
              <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">
                Personalized
              </span>
              <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide">
                Free
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-3">
              Career Counselling Assistant
            </h1>
            <p className="text-base text-muted-foreground mb-4 max-w-2xl mx-auto font-body">
              Get personalized career guidance tailored to your education level, interests, and goals.
              Part of the <span className="font-semibold text-primary">Shree AI Assistant</span> ecosystem.
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3">
              <Button
                onClick={handleNewSession}
                className="bg-primary text-primary-foreground border-2 border-foreground font-serif uppercase tracking-wide"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowHistory(!showHistory)}
                className="border-2 border-foreground font-serif uppercase tracking-wide"
              >
                <History className="h-4 w-4 mr-2" />
                {showHistory ? 'Hide History' : 'My Sessions'} ({sessions.length})
              </Button>
            </div>
          </motion.div>

          {/* Sessions List (Collapsible) */}
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <CareerSessionsList
                sessions={sessions}
                activeSessionId={activeSessionId}
                onSelectSession={handleSelectSession}
                onDeleteSession={handleSessionDeleted}
              />
            </motion.div>
          )}

          {/* Chat Interface */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="h-[55vh] min-h-[450px] max-h-[600px]"
          >
            <CareerChat
              sessionId={activeSessionId}
              onSessionCreated={handleSessionCreated}
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
