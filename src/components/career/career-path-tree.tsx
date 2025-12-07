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

interface CareerCardProps {
  node: CareerNode;
  level: number;
  index: number;
  totalSiblings: number;
  isVisible: boolean;
  delay: number;
  onComplete: () => void;
}

function getTypeColor(type?: string) {
  switch (type) {
    case 'degree':
      return 'bg-blue-50 border-blue-200';
    case 'diploma':
      return 'bg-orange-50 border-orange-200';
    case 'exam':
      return 'bg-purple-50 border-purple-200';
    case 'job':
      return 'bg-green-50 border-green-200';
    case 'stream':
      return 'bg-gray-50 border-gray-300';
    default:
      return 'bg-white border-gray-200';
  }
}

function CareerCard({ node, level, index, totalSiblings, isVisible, delay, onComplete }: CareerCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
        if (hasChildren) {
          setTimeout(() => {
            setIsExpanded(true);
          }, 200);
        }
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [isVisible, node.name, hasChildren, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative"
    >
      <div
        className={`
          relative border-[0.5px] border-black rounded-lg p-3 mb-3
          ${getTypeColor(node.type)}
          ${hasChildren ? 'cursor-pointer hover:shadow-md transition-shadow' : ''}
          min-w-[200px] max-w-[280px]
        `}
        onClick={() => hasChildren && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <p className="text-sm font-medium text-black leading-tight">
              {displayText}
              {isTyping && <span className="ml-1 animate-pulse text-black">|</span>}
            </p>
            {node.duration && (
              <p className="text-xs text-gray-600 mt-1">{node.duration}</p>
            )}
          </div>
          {hasChildren && (
            <span className="text-black text-xs flex-shrink-0 mt-0.5">
              {isExpanded ? '▼' : '▶'}
            </span>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && hasChildren && node.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-6 mt-2 space-y-2 border-l-2 border-gray-300 pl-4"
          >
            {node.children.map((child, childIndex) => (
              <CareerCard
                key={childIndex}
                node={child}
                level={level + 1}
                index={childIndex}
                totalSiblings={node.children!.length}
                isVisible={isVisible}
                delay={delay + (childIndex + 1) * 0.05}
                onComplete={onComplete}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

interface CareerPathTreeProps {
  onAnimationComplete?: () => void;
}

export function CareerPathTree({ onAnimationComplete }: CareerPathTreeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [completedNodes, setCompletedNodes] = useState(0);
  const totalNodes = countNodes(careerTreeData);
  const [hasCalledComplete, setHasCalledComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

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
      
      <div className="space-y-4">
        <CareerCard
          node={careerTreeData}
          level={0}
          index={0}
          totalSiblings={1}
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
