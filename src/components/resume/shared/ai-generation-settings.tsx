'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface AIGenerationSettingsProps {
  numPoints: number;
  customPrompt: string;
  onNumPointsChange: (value: number) => void;
  onCustomPromptChange: (value: string) => void;
  promptPlaceholder?: string;
}

export function AIGenerationSettings({
  numPoints,
  customPrompt,
  onNumPointsChange,
  onCustomPromptChange,
  promptPlaceholder = "e.g., Focus on leadership and team management achievements"
}: AIGenerationSettingsProps) {
  return (
    <div className="space-y-2.5">
      {/* Header */}
      <div className="flex items-center gap-2 pb-0.5">
        <div className="p-1 rounded-md bg-amber-100 text-amber-600">
          <Sparkles className="h-3 w-3" />
        </div>
        <span className="text-xs font-medium text-amber-700">AI Generation Settings</span>
      </div>

      {/* Number of Suggestions */}
      <div>
        <Label className="text-[11px] font-medium text-amber-700">Points to Generate</Label>
        <Input
          type="number"
          min={1}
          max={8}
          value={numPoints}
          onChange={(e) => onNumPointsChange(parseInt(e.target.value) || 3)}
          className={cn(
            "h-7 mt-0.5",
            "bg-white",
            "border-amber-200",
            "focus:border-amber-400 focus:ring-1 focus:ring-amber-300",
            "hover:bg-white",
            "text-amber-900 text-xs"
          )}
        />
      </div>

      {/* Custom Focus */}
      <div>
        <Label className="text-[11px] font-medium text-amber-700">Prompt for AI (Optional)</Label>
        <Textarea
          value={customPrompt}
          onChange={(e) => onCustomPromptChange(e.target.value)}
          placeholder={promptPlaceholder}
          className={cn(
            "h-14 mt-0.5 text-xs",
            "bg-white",
            "border-amber-200",
            "focus:border-amber-400 focus:ring-1 focus:ring-amber-300",
            "hover:bg-white",
            "resize-none",
            "text-amber-900 placeholder:text-amber-400"
          )}
        />
      </div>
    </div>
  );
} 