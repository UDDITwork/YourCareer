'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CareerNode {
  name: string;
  children?: CareerNode[];
  duration?: string;
  type?: 'degree' | 'diploma' | 'job' | 'exam' | 'stream';
}

// Career path tree data structure
const careerTreeData: CareerNode = {
  name: '10th (S.S.S.)',
  children: [
    {
      name: '12th (H.S.C.)',
      type: 'stream',
      children: [
        {
          name: '12th Commerce',
          type: 'stream',
          children: [
            { name: 'C.A. Foundation', type: 'degree' },
            { name: 'B.Com (3 Yrs)', type: 'degree' },
            { name: 'B.B.A. (3 Yrs)', type: 'degree' },
            { name: 'C.S. Foundation', type: 'degree' },
            { name: 'B.C.A. (3 yrs)', type: 'degree' },
            { name: 'B.Arch (5 Yrs)', type: 'degree' },
            { name: 'D.ED (2 Yrs)', type: 'diploma' },
            { name: 'B.S.W. (3 Yrs)', type: 'degree' },
            { name: 'L.L.B. Foundation (5 Yrs)', type: 'degree' },
            { name: 'Fashion Designing Diploma (3 yrs)', type: 'diploma' },
            { name: 'Interior Designing Diploma (2 yrs)', type: 'diploma' },
            { name: 'Diploma in Travel & Tourism (2 yrs)', type: 'diploma' },
            { name: 'Laboratory Technician Diploma (DMLT) (3 yrs)', type: 'diploma' },
            { name: 'Hotel Management Diploma (3 yrs)', type: 'diploma' },
            { name: 'Air Hostess/Flight Steward (1 yrs)', type: 'job' },
            { name: 'M.B.A. (2 yrs)', type: 'degree' },
            { name: 'Bank/Insurance Probationary Officer Exam', type: 'exam' },
            { name: 'M.P.S.C./U.P.S.C. Exam', type: 'exam' },
          ],
        },
        {
          name: '12th Science',
          type: 'stream',
          children: [
            {
              name: 'PCMB (Physics, Chemistry, Maths, Biology)',
              type: 'stream',
              children: [
                { name: 'M.B.B.S. (4 & 1/2 Yrs)', type: 'degree' },
                { name: 'B.H.M.S. (4 & 1/2 Yrs)', type: 'degree' },
                { name: 'B.V.Sc. (5 Yrs)', type: 'degree' },
                { name: 'B.D.S. (4 & 1/2 Yrs)', type: 'degree' },
                { name: 'B.Sc. Nursing (3-4 yrs)', type: 'degree' },
                { name: 'Bachelor of Pharmacy (3 yrs)', type: 'degree' },
                { name: 'B.Tech in Agriculture (4 yrs)', type: 'degree' },
                { name: 'B.Sc. in Bio-Technology (4 yrs)', type: 'degree' },
                { name: 'B.Sc. in Agriculture (4 yrs)', type: 'degree' },
                { name: 'B.Sc. in Diary Technology (4 yrs)', type: 'degree' },
                { name: 'M.D. (2 yrs)', type: 'degree' },
                { name: 'M.S. (3 yrs)', type: 'degree' },
                { name: 'M.D.S. (2 yrs)', type: 'degree' },
                { name: 'Master in Pharmacy (2 yrs)', type: 'degree' },
                { name: 'M.Tech. in Agriculture (2 yrs)', type: 'degree' },
                { name: 'M.Tech. in Bio-Technology (2 yrs)', type: 'degree' },
                { name: 'M.Sc. (2 yrs)', type: 'degree' },
                { name: 'Ph.D.', type: 'degree' },
              ],
            },
            {
              name: 'PCM (Physics, Chemistry, Maths)',
              type: 'stream',
              children: [
                { name: 'N.D.A. (3 yrs)', type: 'exam' },
                { name: 'B.Arch (5 yrs)', type: 'degree' },
                { name: 'B.C.S./B.C.A./B.Sc (Physical) (3 yrs)', type: 'degree' },
                { name: 'Direct 2nd yrs. Engineering Diploma (2 yrs)', type: 'diploma' },
                { name: 'I.E.S. Exam', type: 'exam' },
                { name: 'M.E. (2 yrs)', type: 'degree' },
                { name: 'M.Tech (IIT) (2 yrs)', type: 'degree' },
                { name: 'M.C.A. (2 yrs)', type: 'degree' },
                { name: 'M.B.A. (2 yrs)', type: 'degree' },
                { name: 'M.P.S.C./U.P.S.C. Exam', type: 'exam' },
              ],
            },
            {
              name: 'General Science Options',
              type: 'stream',
              children: [
                { name: 'Engineering Diploma (3 yrs)', type: 'diploma' },
                { name: 'Merchant Navy (3 yrs)', type: 'job' },
                { name: 'A.M.I.E. / I.E.T.E. (3 & 1/2 yrs)', type: 'diploma' },
                { name: 'Army Navy Air Force (Defense)', type: 'job' },
                { name: 'Police Dept. Exam', type: 'exam' },
                { name: 'Student Pilot License (6-8 Months)', type: 'diploma' },
              ],
            },
          ],
        },
        {
          name: '12th Arts',
          type: 'stream',
          children: [
            { name: 'B.A.', type: 'degree' },
            { name: 'B.P.ED', type: 'degree' },
            { name: 'B.B.A. (3 yrs)', type: 'degree' },
            { name: 'B.Arch (5 Yrs)', type: 'degree' },
            { name: 'D.ED (2 Yrs)', type: 'diploma' },
            { name: 'B.S.W. (3 Yrs)', type: 'degree' },
            { name: 'L.L.B. Foundation (5 Yrs)', type: 'degree' },
            { name: 'Fashion Designing Diploma (3 yrs)', type: 'diploma' },
            { name: 'Interior Designing Diploma (2 yrs)', type: 'diploma' },
            { name: 'Foreign Language Diploma', type: 'diploma' },
            { name: 'Diploma in Dramatization (INSD) (3 yrs)', type: 'diploma' },
            { name: 'M.A. in Mass Communication (2 yrs)', type: 'degree' },
            { name: 'M.B.A. (2 yrs)', type: 'degree' },
            { name: 'M.P.S.C./U.P.S.C. Exam', type: 'exam' },
            { name: 'M.C.A. (3 yrs)', type: 'degree' },
            { name: 'B.Ed', type: 'degree' },
            { name: 'Sub Inspector Exam (BSF/CRPF/CISF)', type: 'exam' },
          ],
        },
      ],
    },
    {
      name: 'Direct Options from 10th',
      type: 'stream',
      children: [
        { name: 'Art Teacher Diploma (2 yrs)', type: 'diploma' },
        { name: 'ITI (Fitter, Welder, Machinist, etc.) (2 yrs)', type: 'diploma' },
        { name: 'Railway Ticket Collection (TC) / Commerce Clerk Exam', type: 'exam' },
        { name: 'Bank / Insurance Clerical Exam', type: 'exam' },
        { name: 'Government Clerical Grade Exam', type: 'exam' },
        { name: 'Diploma in Dance/Music (2 yrs)', type: 'diploma' },
        { name: 'Certified Building Supervisor (6 months)', type: 'diploma' },
        { name: 'Medical Laboratory Technician (MLT) (2 yrs)', type: 'diploma' },
        { name: 'MS-CIT Course', type: 'diploma' },
        { name: 'Data Entry Operator', type: 'job' },
      ],
    },
  ],
};

interface VerticalTreeNodeProps {
  node: CareerNode;
  level: number;
  isVisible: boolean;
  delay: number;
  onComplete: () => void;
}

function getTypeColor(type?: string) {
  switch (type) {
    case 'degree':
      return 'bg-blue-50 border-blue-300';
    case 'diploma':
      return 'bg-orange-50 border-orange-300';
    case 'exam':
      return 'bg-purple-50 border-purple-300';
    case 'job':
      return 'bg-green-50 border-green-300';
    case 'stream':
      return 'bg-gray-50 border-gray-400';
    default:
      return 'bg-white border-gray-300';
  }
}

function VerticalTreeNode({ node, level, isVisible, delay, onComplete }: VerticalTreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const hasChildren = node.children && node.children.length > 0;

  useEffect(() => {
    if (!isVisible) return;

    const fullText = node.name;
    let currentIndex = 0;
    setIsTyping(true);

    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        onComplete();
        if (hasChildren && level < 2) {
          setTimeout(() => {
            setIsExpanded(true);
          }, 200);
        }
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [isVisible, node.name, hasChildren, level, onComplete]);

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className={`
          relative border-[0.5px] border-black rounded-lg p-3 mb-4
          ${getTypeColor(node.type)}
          ${hasChildren ? 'cursor-pointer hover:shadow-lg transition-all' : ''}
          min-w-[180px] max-w-[220px] text-center z-10
        `}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-black leading-tight">
            {displayText || node.name}
          </p>
          {node.duration && (
            <p className="text-xs text-gray-600">{node.duration}</p>
          )}
          {hasChildren && (
            <span className="text-black text-xs mt-1">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </div>
      </motion.div>

      {/* Vertical connector line from parent to children */}
      {isExpanded && hasChildren && node.children && (
        <div className="w-[2px] h-6 bg-black mb-2" />
      )}

      {/* Children - Horizontal Layout (side by side) */}
      <AnimatePresence>
        {isExpanded && hasChildren && node.children && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-start justify-center gap-4 relative"
          >
            {node.children.map((child, index) => {
              const children = node.children!; // Safe because we're inside the check
              return (
                <div key={index} className="flex flex-col items-center relative">
                  {/* Horizontal connector line (if multiple children) */}
                  {children.length > 1 && (
                    <>
                      {/* Top horizontal line connecting all children */}
                      <div 
                        className="absolute -top-6 left-0 right-0 h-[2px] bg-black"
                        style={{
                          left: index === 0 ? '50%' : '0',
                          right: index === children.length - 1 ? '50%' : '0',
                          width: index === 0 || index === children.length - 1 ? '50%' : '100%',
                        }}
                      />
                      {/* Vertical line from horizontal line to child */}
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-[2px] h-6 bg-black" />
                    </>
                  )}
                  
                  {/* Recursive call for child nodes */}
                  <VerticalTreeNode
                    node={child}
                    level={level + 1}
                    isVisible={isVisible}
                    delay={delay + (index + 1) * 0.1}
                    onComplete={onComplete}
                  />
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface CareerPathTreeProps {
  onAnimationComplete?: () => void;
}

export function CareerPathTree({ onAnimationComplete }: CareerPathTreeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const totalNodes = countNodes(careerTreeData);
  const [hasCalledComplete, setHasCalledComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const [completedNodes, setCompletedNodes] = useState(0);
  
  const handleNodeComplete = () => {
    setCompletedNodes((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalNodes * 0.95 && !hasCalledComplete && onAnimationComplete) {
        setHasCalledComplete(true);
        setTimeout(() => {
          onAnimationComplete();
        }, 800);
      }
      return newCount;
    });
  };

  return (
    <div className="w-full h-full overflow-auto bg-white p-6">
      <div className="mb-6 pb-3 border-b-2 border-black">
        <h2 className="text-3xl font-bold text-black">
          <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            CAREER PATH FINDER
          </span>
        </h2>
      </div>
      
      {/* Vertical Tree Container - flows top to bottom */}
      <div className="flex justify-center items-start">
        <VerticalTreeNode
          node={careerTreeData}
          level={0}
          isVisible={isVisible}
          delay={0}
          onComplete={handleNodeComplete}
        />
      </div>
    </div>
  );
}

function countNodes(node: CareerNode): number {
  let count = 1;
  if (node.children) {
    node.children.forEach((child) => {
      count += countNodes(child);
    });
  }
  return count;
}
