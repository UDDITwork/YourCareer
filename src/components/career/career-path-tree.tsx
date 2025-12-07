'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CareerNode {
  name: string;
  children?: CareerNode[];
  duration?: string;
  type?: 'degree' | 'diploma' | 'job' | 'exam' | 'stream';
}

// Career path tree data structure based on the diagram
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

interface TreeNodeProps {
  node: CareerNode;
  level: number;
  isVisible: boolean;
  delay: number;
  onComplete: () => void;
}

function TreeNode({ node, level, isVisible, delay, onComplete }: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayText, setDisplayText] = useState('');
  const [showChildren, setShowChildren] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Typing animation
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
        if (node.children && node.children.length > 0) {
          setTimeout(() => {
            setIsExpanded(true);
            setShowChildren(true);
          }, 300);
        }
      }
    }, 50); // Typing speed

    return () => clearInterval(typingInterval);
  }, [isVisible, node.name, node.children, onComplete]);

  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative" style={{ marginLeft: `${level * 20}px` }}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
        transition={{ duration: 0.3, delay }}
        className="mb-2"
      >
        <div
          className={`inline-flex items-center px-3 py-1.5 border-[0.5px] border-black bg-white text-black text-sm cursor-pointer hover:bg-gray-50 transition-colors ${
            hasChildren ? 'font-semibold' : 'font-normal'
          }`}
          onClick={() => hasChildren && setIsExpanded(!isExpanded)}
        >
          {hasChildren && (
            <span className="mr-2 text-black">{isExpanded ? '▼' : '▶'}</span>
          )}
          <span>{displayText}</span>
          {node.duration && <span className="ml-2 text-gray-600 text-xs">({node.duration})</span>}
          {isTyping && (
            <span className="ml-1 animate-pulse text-black">|</span>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {showChildren && isExpanded && node.children && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="ml-4 border-l-[0.5px] border-black pl-2"
          >
            {node.children.map((child, index) => (
              <TreeNode
                key={index}
                node={child}
                level={level + 1}
                isVisible={isVisible}
                delay={delay + (index + 1) * 0.1}
                onComplete={onComplete}
              />
            ))}
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
  const [completedNodes, setCompletedNodes] = useState(0);
  const totalNodes = countNodes(careerTreeData);
  const [hasCalledComplete, setHasCalledComplete] = useState(false);

  useEffect(() => {
    // Start animation after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleNodeComplete = () => {
    setCompletedNodes((prev) => {
      const newCount = prev + 1;
      // Add a buffer to account for timing - call complete when we're close to done
      if (newCount >= totalNodes * 0.95 && !hasCalledComplete && onAnimationComplete) {
        setHasCalledComplete(true);
        // Wait a bit more to ensure all animations are visible
        setTimeout(() => {
          onAnimationComplete();
        }, 1000);
      }
      return newCount;
    });
  };

  return (
    <div className="w-full h-full overflow-auto bg-white p-8">
      <h2 className="text-2xl font-bold mb-6 text-black border-b-[0.5px] border-black pb-2">
        CAREER PATH FINDER
      </h2>
      <div className="space-y-1">
        <TreeNode
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

