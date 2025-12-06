'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Message } from 'ai';
import { cn } from '@/lib/utils';
import { MemoizedMarkdown } from '@/components/ui/memoized-markdown';
import { LoadingDots } from '@/components/ui/loading-dots';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, Bot, User, RefreshCw, GraduationCap, FileText, Download, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CareerSessionSummary, CareerSessionMessage, CareerReport, Profile } from '@/lib/types';
import {
  createCareerSession,
  updateCareerSessionMessages,
  getCareerSessionById,
  saveCareerReport,
} from '@/utils/actions/career/actions';
import { toast } from 'sonner';
import { downloadCareerReportPDF } from './career-report-pdf';
import { DocumentUpload } from './document-upload';
import { importResume } from '@/utils/actions/profiles/actions';

const QUICK_SUGGESTIONS = [
  "I'm a Class 10 student confused about stream selection",
  "I'm in 12th Science and want to explore career options",
  "I'm a B.Tech graduate looking for career guidance",
  "I want to switch my career from IT to something else",
  "Help me prepare for competitive exams",
  "I'm unemployed and need career direction",
];

interface CareerChatProps {
  sessionId: string | null;
  onSessionCreated?: (session: CareerSessionSummary) => void;
}

export function CareerChat({ sessionId, onSessionCreated }: CareerChatProps) {
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(sessionId);
  const [isInitialLoading, setIsInitialLoading] = useState(false);
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [currentReport, setCurrentReport] = useState<CareerReport | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState("");

  const { messages, error, append, isLoading, stop, setMessages } = useChat({
    api: '/api/career-chat',
    onResponse() {
      setIsInitialLoading(false);
    },
    onError() {
      setIsInitialLoading(false);
    },
    onFinish(message) {
      setIsInitialLoading(false);
      // Save messages to database after each response
      if (currentSessionId) {
        const allMessages = [...messages, {
          role: message.role as 'user' | 'assistant',
          content: message.content,
          id: message.id,
        }];
        const sessionMessages: CareerSessionMessage[] = allMessages.map(m => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
          timestamp: new Date().toISOString(),
        }));
        updateCareerSessionMessages(currentSessionId, sessionMessages).catch(console.error);
      }
    },
  });

  // Load session when sessionId changes
  useEffect(() => {
    if (sessionId && sessionId !== currentSessionId) {
      setIsLoadingSession(true);
      setCurrentSessionId(sessionId);
      getCareerSessionById(sessionId)
        .then((session) => {
          // Convert stored messages to chat format
          const chatMessages: Message[] = session.messages.map((m, index) => ({
            id: `${session.id}-${index}`,
            role: m.role,
            content: m.content,
          }));
          setMessages(chatMessages);
          setCurrentReport(session.report || null);
        })
        .catch((error) => {
          console.error('Error loading session:', error);
          toast.error('Failed to load session');
        })
        .finally(() => {
          setIsLoadingSession(false);
        });
    } else if (!sessionId) {
      // New session - clear messages
      setCurrentSessionId(null);
      setMessages([]);
      setCurrentReport(null);
    }
  }, [sessionId, currentSessionId, setMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Adjust textarea height
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    const newHeight = Math.min(textarea.scrollHeight, 144);
    textarea.style.height = `${newHeight}px`;
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue, adjustTextareaHeight]);

  const handleSubmit = useCallback(async (message: string) => {
    if (!message.trim()) return;

    // Create session if not exists
    if (!currentSessionId) {
      try {
        const session = await createCareerSession();
        setCurrentSessionId(session.id);
        onSessionCreated?.({
          id: session.id,
          user_id: session.user_id,
          title: session.title,
          status: session.status,
          has_report: false,
          created_at: session.created_at,
          updated_at: session.updated_at,
        });
      } catch (error) {
        console.error('Error creating session:', error);
        toast.error('Failed to create session');
        return;
      }
    }

    setIsInitialLoading(true);
    append({
      content: message.trim(),
      role: 'user'
    });
    setInputValue("");
  }, [append, currentSessionId, onSessionCreated]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(inputValue);
  }, [inputValue, handleSubmit]);

  const handleClearChat = useCallback(() => {
    setMessages([]);
    setCurrentSessionId(null);
    setCurrentReport(null);
  }, [setMessages]);

  const handleGenerateReport = useCallback(async () => {
    if (!currentSessionId || messages.length < 4) {
      toast.error('Please have a longer conversation before generating a report');
      return;
    }

    setIsGeneratingReport(true);
    try {
      // Call the API to generate a structured report
      const response = await fetch('/api/career-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: currentSessionId,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate report');
      }

      const report: CareerReport = await response.json();

      // Save report to database
      await saveCareerReport(currentSessionId, report);
      setCurrentReport(report);
      toast.success('Career report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsGeneratingReport(false);
    }
  }, [currentSessionId, messages]);

  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);

  // Handle profile extraction from uploaded document
  const handleProfileExtracted = useCallback(async (extractedProfile: Partial<Profile>) => {
    try {
      await importResume(extractedProfile);
      toast.success('Profile imported successfully! Your profile has been updated.');

      // Start the conversation with the extracted profile info
      const profileSummary = [];
      if (extractedProfile.first_name || extractedProfile.last_name) {
        profileSummary.push(`Name: ${extractedProfile.first_name || ''} ${extractedProfile.last_name || ''}`.trim());
      }
      if (extractedProfile.education && extractedProfile.education.length > 0) {
        const latestEdu = extractedProfile.education[0];
        profileSummary.push(`Education: ${latestEdu.degree} in ${latestEdu.field} from ${latestEdu.school}`);
      }
      if (extractedProfile.work_experience && extractedProfile.work_experience.length > 0) {
        const latestJob = extractedProfile.work_experience[0];
        profileSummary.push(`Current/Recent Role: ${latestJob.position} at ${latestJob.company}`);
      }
      if (extractedProfile.skills && extractedProfile.skills.length > 0) {
        const allSkills = extractedProfile.skills.flatMap(s => s.items).slice(0, 5);
        profileSummary.push(`Key Skills: ${allSkills.join(', ')}`);
      }

      if (profileSummary.length > 0) {
        const introMessage = `I just uploaded my resume. Here's a summary of my profile:\n\n${profileSummary.join('\n')}\n\nPlease help me with career guidance based on my background.`;
        handleSubmit(introMessage);
      }
    } catch (error) {
      console.error('Error importing profile:', error);
      toast.error('Failed to save profile. Please try again.');
    }
  }, [handleSubmit]);

  const handleDownloadReport = useCallback(async () => {
    if (!currentReport) return;

    setIsDownloadingPDF(true);
    try {
      await downloadCareerReportPDF(currentReport);
      toast.success('PDF report downloaded successfully!');
    } catch (error) {
      console.error('Error downloading PDF:', error);
      toast.error('Failed to download PDF. Please try again.');
    } finally {
      setIsDownloadingPDF(false);
    }
  }, [currentReport]);

  if (isLoadingSession) {
    return (
      <div className="flex flex-col h-full bg-card border-2 border-foreground items-center justify-center">
        <LoadingDots className="text-primary" />
        <p className="mt-4 text-muted-foreground font-body">Loading session...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-card border-2 border-foreground">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b-2 border-foreground bg-secondary">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-serif font-bold text-foreground">Career Counsellor</h2>
            <p className="text-xs text-muted-foreground font-body">Part of Shree AI Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length >= 4 && !currentReport && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateReport}
              disabled={isGeneratingReport}
              className="border-2 border-foreground font-serif uppercase text-xs"
            >
              {isGeneratingReport ? (
                <>
                  <LoadingDots className="mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          )}
          {currentReport && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadReport}
              disabled={isDownloadingPDF}
              className="border-2 border-foreground font-serif uppercase text-xs bg-brown-600 text-white hover:bg-brown-700"
            >
              {isDownloadingPDF ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Downloading...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </>
              )}
            </Button>
          )}
          {messages.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="text-xs font-serif uppercase">New Chat</span>
            </Button>
          )}
        </div>
      </div>

      {/* Report View */}
      {currentReport && (
        <div className="p-4 bg-primary/5 border-b-2 border-border">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-serif font-bold text-primary">Career Report Generated</h3>
          </div>
          <p className="text-sm text-muted-foreground font-body">
            Your personalized career report is ready. Click &quot;Download Report&quot; to save it.
          </p>
        </div>
      )}

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full py-6"
          >
            <div className="p-4 bg-secondary border-2 border-foreground mb-4">
              <Bot className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">
              Welcome to Career Counselling
            </h3>
            <p className="text-center text-muted-foreground mb-4 max-w-md font-body text-sm">
              I&apos;m your AI career counsellor. Tell me about yourself - your education level,
              interests, or any career confusion you have.
            </p>

            {/* Document Upload Section */}
            <div className="w-full max-w-2xl mb-6 p-4 bg-white border border-black/50">
              <DocumentUpload
                onProfileExtracted={handleProfileExtracted}
                className="w-full"
              />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 w-full max-w-2xl mb-4">
              <div className="flex-1 h-px bg-black/20" />
              <span className="text-xs text-black/50 uppercase tracking-wide font-['Times_New_Roman',_Times,_serif]">
                Or start with a question
              </span>
              <div className="flex-1 h-px bg-black/20" />
            </div>

            {/* Quick Suggestions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-2xl">
              {QUICK_SUGGESTIONS.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSubmit(suggestion)}
                  className={cn(
                    "text-left px-3 py-2 text-sm",
                    "bg-background border-2 border-border",
                    "hover:border-foreground hover:bg-secondary",
                    "transition-all duration-200",
                    "font-body"
                  )}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((m: Message) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "flex gap-3",
                  m.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {m.role === 'assistant' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[80%] px-4 py-3",
                    m.role === 'user'
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary border-2 border-border"
                  )}
                >
                  <MemoizedMarkdown id={m.id} content={m.content} />
                </div>
                {m.role === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 bg-foreground text-background flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </motion.div>
            ))}

            {/* Loading indicator */}
            {(isInitialLoading || (isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user')) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3 justify-start"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-secondary border-2 border-border px-4 py-3">
                  <LoadingDots className="text-foreground" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />

        {/* Error display */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 text-sm">
            <p className="font-serif font-medium">Error</p>
            <p className="font-body">{error.message}</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleFormSubmit}
        className="border-t-2 border-foreground p-4 bg-secondary flex gap-2"
      >
        <Textarea
          ref={textareaRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleFormSubmit(e);
            }
          }}
          placeholder="Tell me about yourself or ask any career question..."
          rows={1}
          className={cn(
            "flex-1 bg-background border-2 border-border",
            "focus:border-foreground focus:ring-0",
            "placeholder:text-muted-foreground",
            "font-body text-sm",
            "min-h-[44px] max-h-[144px]",
            "resize-none px-3 py-2"
          )}
        />
        <Button
          type={isLoading ? "button" : "submit"}
          onClick={isLoading ? stop : undefined}
          className={cn(
            "px-4 h-[44px]",
            isLoading
              ? "bg-red-600 hover:bg-red-700"
              : "bg-primary hover:bg-primary/90",
            "text-primary-foreground border-2 border-foreground",
            "transition-all duration-200"
          )}
        >
          {isLoading ? (
            <X className="h-5 w-5" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </Button>
      </form>
    </div>
  );
}
