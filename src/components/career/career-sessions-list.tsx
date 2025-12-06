'use client';

import { useState } from 'react';
import { CareerSessionSummary } from '@/lib/types';
import { deleteCareerSession } from '@/utils/actions/career/actions';
import { cn } from '@/lib/utils';
import { Trash2, MessageSquare, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from 'sonner';

interface CareerSessionsListProps {
  sessions: CareerSessionSummary[];
  activeSessionId: string | null;
  onSelectSession: (sessionId: string) => void;
  onDeleteSession: (sessionId: string) => void;
}

export function CareerSessionsList({
  sessions,
  activeSessionId,
  onSelectSession,
  onDeleteSession,
}: CareerSessionsListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (sessionId: string) => {
    setDeletingId(sessionId);
    try {
      await deleteCareerSession(sessionId);
      onDeleteSession(sessionId);
      toast.success('Session deleted');
    } catch (error) {
      toast.error('Failed to delete session');
      console.error('Error deleting session:', error);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8 bg-card border-2 border-border">
        <MessageSquare className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground font-body">No previous sessions</p>
        <p className="text-sm text-muted-foreground font-body mt-1">
          Start a new conversation to get career guidance
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border-2 border-border">
      <div className="px-4 py-3 border-b-2 border-border bg-secondary">
        <h3 className="font-serif font-bold text-sm uppercase tracking-wide">
          Previous Sessions ({sessions.length})
        </h3>
      </div>
      <div className="max-h-[250px] overflow-y-auto">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={cn(
              "flex items-center justify-between px-4 py-3 border-b border-border last:border-b-0",
              "hover:bg-secondary/50 transition-colors cursor-pointer",
              activeSessionId === session.id && "bg-secondary"
            )}
            onClick={() => onSelectSession(session.id)}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="font-serif font-medium text-sm truncate">
                  {session.title}
                </span>
                {session.has_report && (
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-serif uppercase">
                    Report
                  </span>
                )}
                {session.status === 'in_progress' && (
                  <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-serif uppercase">
                    In Progress
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="font-body">{formatDate(session.updated_at)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-2">
              {session.has_report && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectSession(session.id);
                  }}
                >
                  <FileText className="h-4 w-4 text-primary" />
                </Button>
              )}

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                    onClick={(e) => e.stopPropagation()}
                    disabled={deletingId === session.id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="border-2 border-foreground">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-serif">Delete Session?</AlertDialogTitle>
                    <AlertDialogDescription className="font-body">
                      This will permanently delete this career counselling session and any generated reports.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="border-2 border-border font-serif uppercase text-sm">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(session.id)}
                      className="bg-red-600 hover:bg-red-700 text-white border-2 border-foreground font-serif uppercase text-sm"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
