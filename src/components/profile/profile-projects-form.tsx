'use client';

import { Project } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface ProfileProjectsFormProps {
  projects: Project[];
  onChange: (projects: Project[]) => void;
}

export function ProfileProjectsForm({ projects, onChange }: ProfileProjectsFormProps) {
  const [techInputs, setTechInputs] = React.useState<{ [key: number]: string }>(
    Object.fromEntries(projects.map((p, i) => [i, p.technologies?.join(', ') || '']))
  );

  React.useEffect(() => {
    setTechInputs(Object.fromEntries(
      projects.map((p, i) => [i, p.technologies?.join(', ') || ''])
    ));
  }, [projects]);

  const addProject = () => {
    onChange([...projects, {
      name: "",
      description: [],
      technologies: [],
      url: "",
      github_url: "",
      date: ""
    }]);
  };

  const updateProject = (index: number, field: keyof Project, value: string | string[]) => {
    const updated = [...projects];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3 font-['Times_New_Roman',_Times,_serif]">
      <Accordion
        type="multiple"
        className="space-y-3"
        defaultValue={projects.map((_, index) => `project-${index}`)}
      >
        {projects.map((project, index) => (
          <AccordionItem
            key={index}
            value={`project-${index}`}
            className="bg-white border border-black/50 rounded-none overflow-hidden"
          >
            <AccordionTrigger className="px-4 py-2 hover:no-underline hover:bg-gray-50">
              <div className="flex items-center justify-between gap-3 flex-1">
                <div className="flex-1 text-left text-sm font-medium text-black">
                  {project.name || "Untitled Project"}
                </div>
                <div className="flex items-center gap-2 text-xs text-black/60">
                  {project.date && <span>{project.date}</span>}
                  {project.technologies && project.technologies.length > 0 && (
                    <span className="max-w-[200px] truncate">
                      {project.technologies.join(", ")}
                    </span>
                  )}
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="px-4 pb-4 pt-2 space-y-4">
                {/* Project Name and Delete Button Row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="relative group flex-1">
                    <Input
                      value={project.name}
                      onChange={(e) => updateProject(index, 'name', e.target.value)}
                      className="text-base bg-white border border-black/50 rounded-none h-8
                        focus:border-black focus:ring-0
                        placeholder:text-gray-400 font-['Times_New_Roman',_Times,_serif]"
                      placeholder="Project Name"
                    />
                    <div className="absolute -top-2.5 left-2 px-1 bg-white text-[9px] font-medium text-black uppercase tracking-wider">
                      PROJECT NAME
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProject(index)}
                    className="text-black/60 hover:text-black hover:bg-gray-100 transition-colors h-8 w-8 rounded-none"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>

                {/* URLs Row */}
                <div className="flex flex-col md:flex-row md:items-start gap-3">
                  <div className="relative group flex-1">
                    <Input
                      type="url"
                      value={project.url || ''}
                      onChange={(e) => updateProject(index, 'url', e.target.value)}
                      className="bg-white border border-black/50 rounded-none h-8
                        focus:border-black focus:ring-0
                        placeholder:text-gray-400 text-sm font-['Times_New_Roman',_Times,_serif]"
                      placeholder="https://your-project.com"
                    />
                    <div className="absolute -top-2.5 left-2 px-1 bg-white text-[9px] font-medium text-black uppercase tracking-wider">
                      LIVE URL
                    </div>
                  </div>
                  <div className="relative group flex-1">
                    <Input
                      type="url"
                      value={project.github_url || ''}
                      onChange={(e) => updateProject(index, 'github_url', e.target.value)}
                      className="bg-white border border-black/50 rounded-none h-8
                        focus:border-black focus:ring-0
                        placeholder:text-gray-400 text-sm font-['Times_New_Roman',_Times,_serif]"
                      placeholder="https://github.com/username/project"
                    />
                    <div className="absolute -top-2.5 left-2 px-1 bg-white text-[9px] font-medium text-black uppercase tracking-wider">
                      GITHUB URL
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <Label className="text-xs font-medium text-black uppercase tracking-wider">Technologies & Tools Used</Label>
                    <span className="text-[9px] text-black/60">Separate with commas</span>
                  </div>
                  <Input
                    value={techInputs[index] || ''}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      setTechInputs(prev => ({ ...prev, [index]: newValue }));

                      if (newValue.endsWith(',')) {
                        const technologies = newValue
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean);
                        updateProject(index, 'technologies', technologies);
                      } else {
                        const technologies = newValue
                          .split(',')
                          .map(t => t.trim())
                          .filter(Boolean);
                        updateProject(index, 'technologies', technologies);
                      }
                    }}
                    onBlur={(e) => {
                      const technologies = e.target.value
                        .split(',')
                        .map(t => t.trim())
                        .filter(Boolean);
                      updateProject(index, 'technologies', technologies);
                      setTechInputs(prev => ({
                        ...prev,
                        [index]: technologies.join(', ')
                      }));
                    }}
                    placeholder="React, TypeScript, Node.js, etc."
                    className="bg-white border border-black/50 rounded-none h-8
                      focus:border-black focus:ring-0
                      placeholder:text-gray-400 text-sm font-['Times_New_Roman',_Times,_serif]"
                  />
                </div>

                {/* Dates Row */}
                <div className="relative group">
                  <Input
                    type="text"
                    value={project.date || ''}
                    onChange={(e) => updateProject(index, 'date', e.target.value)}
                    className="w-full bg-white border border-black/50 rounded-none h-8
                      focus:border-black focus:ring-0 text-sm font-['Times_New_Roman',_Times,_serif]"
                    placeholder="e.g., &apos;Jan 2023 - Present&apos; or &apos;Summer 2023&apos;"
                  />
                  <div className="absolute -top-2.5 left-2 px-1 bg-white text-[9px] font-medium text-black uppercase tracking-wider">
                    DATE
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-baseline">
                    <Label className="text-xs font-medium text-black uppercase tracking-wider">Description</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const updated = [...projects];
                        updated[index].description = [...updated[index].description, ""];
                        onChange(updated);
                      }}
                      className="text-black hover:bg-gray-100 transition-colors h-7 text-xs rounded-none"
                    >
                      <Plus className="h-3.5 w-3.5 mr-1" />
                      Add Point
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {project.description.map((desc, descIndex) => (
                      <div key={descIndex} className="flex gap-2 items-start">
                        <div className="flex-1">
                          <Input
                            value={desc}
                            onChange={(e) => {
                              const updated = [...projects];
                              updated[index].description[descIndex] = e.target.value;
                              onChange(updated);
                            }}
                            placeholder="Describe a key feature or achievement"
                            className="bg-white border border-black/50 rounded-none h-8
                              focus:border-black focus:ring-0
                              placeholder:text-gray-400 text-sm font-['Times_New_Roman',_Times,_serif]"
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const updated = [...projects];
                            updated[index].description = updated[index].description.filter((_, i) => i !== descIndex);
                            onChange(updated);
                          }}
                          className="text-black/60 hover:text-black hover:bg-gray-100 transition-colors h-8 w-8 rounded-none"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                    {project.description.length === 0 && (
                      <div className="text-xs text-black/60 italic">
                        Add points to describe your project&apos;s features and achievements
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <Button
        variant="outline"
        className="w-full bg-white hover:bg-gray-50 border-dashed border border-black/50 rounded-none text-black transition-all h-8 text-sm font-['Times_New_Roman',_Times,_serif]"
        onClick={addProject}
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        Add Project
      </Button>
    </div>
  );
} 