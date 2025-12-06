'use client';

import Link from 'next/link';
import { CareerSessionSummary } from '@/lib/types';
import { cn } from '@/lib/utils';
import { GraduationCap, MessageSquare, FileText, Clock, ArrowRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface CareerSessionsSectionProps {
  sessions: CareerSessionSummary[];
}

export function CareerSessionsSection({ sessions }: CareerSessionsSectionProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  const recentSessions = sessions.slice(0, 3);

  return (
    <div className="space-y-4 font-['Times_New_Roman',_Times,_serif]">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black text-white">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-black uppercase tracking-wide">
              Career Counselling
            </h2>
            <p className="text-xs text-black/60">
              {sessions.length} session{sessions.length !== 1 ? 's' : ''} • {sessions.filter(s => s.has_report).length} report{sessions.filter(s => s.has_report).length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <Link href="/check">
          <Button
            variant="outline"
            size="sm"
            className="border border-black/50 rounded-none uppercase text-xs bg-white hover:bg-gray-50 text-black"
          >
            <Plus className="h-4 w-4 mr-1" />
            New Session
          </Button>
        </Link>
      </div>

      {/* Sessions Grid */}
      {sessions.length === 0 ? (
        <div className="bg-white border border-black/50 p-6 text-center">
          <MessageSquare className="h-10 w-10 text-black/60 mx-auto mb-3" />
          <h3 className="font-bold text-black mb-1">No Career Sessions Yet</h3>
          <p className="text-sm text-black/60 mb-4">
            Get personalized career guidance from our AI counsellor
          </p>
          <Link href="/check">
            <Button className="bg-black text-white border border-black rounded-none uppercase text-sm hover:bg-gray-800">
              Start Career Counselling
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {recentSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/check?session=${session.id}`}>
                <div
                  className={cn(
                    "flex items-center justify-between p-3 bg-white border border-black/50",
                    "hover:border-black transition-all duration-200 cursor-pointer"
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={cn(
                      "p-1.5",
                      session.has_report ? "bg-gray-100" : "bg-gray-50"
                    )}>
                      {session.has_report ? (
                        <FileText className="h-4 w-4 text-black" />
                      ) : (
                        <MessageSquare className="h-4 w-4 text-black/60" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate text-black">
                        {session.title}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-black/60">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(session.updated_at)}</span>
                        {session.has_report && (
                          <span className="px-1.5 py-0.5 bg-gray-100 text-black text-[10px] uppercase">
                            Report Ready
                          </span>
                        )}
                        {session.status === 'in_progress' && !session.has_report && (
                          <span className="px-1.5 py-0.5 bg-gray-100 text-black/80 text-[10px] uppercase">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-black/60 flex-shrink-0" />
                </div>
              </Link>
            </motion.div>
          ))}

          {sessions.length > 3 && (
            <Link href="/check">
              <div className="flex items-center justify-center p-2 text-sm text-black hover:text-black/80 transition-colors uppercase tracking-wide">
                View All {sessions.length} Sessions
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
