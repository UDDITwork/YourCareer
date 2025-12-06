'use client';

import React, { useState, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Upload, FileText, X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { Profile } from '@/lib/types';

interface DocumentUploadProps {
  onProfileExtracted: (profile: Partial<Profile>) => void;
  className?: string;
}

type UploadStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';

export function DocumentUpload({ onProfileExtracted, className }: DocumentUploadProps) {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes = '.pdf,.doc,.docx';
  const ACCEPTED_MIME_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ] as const;

  const validateFile = useCallback((file: File): boolean => {
    if (!(ACCEPTED_MIME_TYPES as readonly string[]).includes(file.type)) {
      setErrorMessage('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setErrorMessage('File size must be less than 10MB');
      return false;
    }
    return true;
  }, []);

  const handleFileSelect = useCallback((file: File) => {
    setErrorMessage('');
    if (validateFile(file)) {
      setSelectedFile(file);
      setStatus('idle');
    } else {
      setStatus('error');
    }
  }, [validateFile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setStatus('uploading');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      setStatus('processing');

      const response = await fetch('/api/extract-profile', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to extract profile');
      }

      setStatus('success');
      toast.success('Profile extracted successfully!');
      onProfileExtracted(data.profile);

      // Reset after success
      setTimeout(() => {
        setSelectedFile(null);
        setStatus('idle');
      }, 2000);

    } catch (error) {
      console.error('Upload error:', error);
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process document');
      toast.error('Failed to extract profile from document');
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setStatus('idle');
    setErrorMessage('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'uploading':
      case 'processing':
        return <Loader2 className="h-5 w-5 animate-spin text-black" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-black" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-black" />;
      default:
        return <Upload className="h-5 w-5 text-black/60" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'uploading':
        return 'Uploading document...';
      case 'processing':
        return 'Extracting profile with AI...';
      case 'success':
        return 'Profile extracted successfully!';
      case 'error':
        return errorMessage || 'An error occurred';
      default:
        return selectedFile ? selectedFile.name : 'Upload your resume/CV';
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleInputChange}
        className="hidden"
        id="document-upload"
      />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <FileText className="h-4 w-4 text-black" />
          <span className="text-sm font-medium text-black uppercase tracking-wide font-['Times_New_Roman',_Times,_serif]">
            Quick Profile Import
          </span>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => status === 'idle' && fileInputRef.current?.click()}
          className={cn(
            "relative border-2 border-dashed transition-all duration-200 cursor-pointer",
            "p-4 flex flex-col items-center justify-center gap-2",
            "font-['Times_New_Roman',_Times,_serif]",
            isDragging ? "border-black bg-gray-100" : "border-black/30 bg-white hover:border-black/50",
            status === 'error' && "border-black/50 bg-gray-50",
            status === 'success' && "border-black bg-gray-50",
            (status === 'uploading' || status === 'processing') && "pointer-events-none opacity-75"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={status}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center gap-2"
            >
              <div className={cn(
                "p-2 border border-black/20",
                status === 'success' && "bg-gray-100",
                status === 'error' && "bg-gray-100"
              )}>
                {getStatusIcon()}
              </div>
              <p className={cn(
                "text-sm text-center",
                status === 'error' ? "text-black" : "text-black/80"
              )}>
                {getStatusText()}
              </p>
              {status === 'idle' && !selectedFile && (
                <p className="text-xs text-black/50">
                  Drag & drop or click to browse (PDF, Word)
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Selected File Info & Actions */}
        {selectedFile && status !== 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <FileText className="h-4 w-4 text-black/60 flex-shrink-0" />
              <span className="text-xs text-black/80 truncate">
                {selectedFile.name}
              </span>
              <span className="text-xs text-black/50 flex-shrink-0">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                disabled={status === 'uploading' || status === 'processing'}
                className="h-7 px-2 text-black/60 hover:text-black rounded-none"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                onClick={handleUpload}
                disabled={status === 'uploading' || status === 'processing'}
                className="h-7 px-3 bg-black text-white hover:bg-gray-800 rounded-none text-xs uppercase tracking-wide"
              >
                {status === 'uploading' || status === 'processing' ? (
                  <>
                    <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    {status === 'processing' ? 'Extracting...' : 'Uploading...'}
                  </>
                ) : (
                  <>
                    <Upload className="h-3 w-3 mr-1" />
                    Extract Profile
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}

        {/* Info Text */}
        <p className="text-[10px] text-black/50 text-center">
          Upload your resume/CV to automatically extract your profile information using AI
        </p>
      </motion.div>
    </div>
  );
}
