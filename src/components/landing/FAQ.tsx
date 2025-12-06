"use client"

import React, { useRef } from 'react';
import { motion, useInView } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

export function FAQ() {
  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // FAQ data
  const faqItems: FAQItem[] = [
    {
      question: "How does YourCareer's AI tailor my resume for specific jobs?",
      answer: "Our AI analyzes job descriptions and automatically adjusts your resume content, keywords, and formatting to match what recruiters and ATS systems are looking for. It optimizes your bullet points, highlights relevant skills, and ensures your experience aligns with the job requirements."
    },
    {
      question: "Is YourCareer really free to use?",
      answer: "Yes! Our free plan includes 2 base resumes and 5 tailored resumes using your own API keys. Our Pro plan provides unlimited resumes and access to premium AI models without needing your own API keys."
    },
    {
      question: "What makes YourCareer different from other resume builders?",
      answer: "YourCareer is specifically designed for tech professionals with AI-powered optimization, ATS compatibility, and the ability to create multiple tailored versions from one base resume. It's an extension of the Shree AI Assistant ecosystem."
    },
    {
      question: "How long does it take to create a resume with YourCareer?",
      answer: "Most users create their first resume in under 15 minutes. Once you have a base resume, generating tailored versions for specific jobs takes just 2-3 minutes with our AI assistant."
    },
    {
      question: "Will my resume pass ATS (Applicant Tracking Systems)?",
      answer: "Absolutely! YourCareer is specifically designed to create ATS-optimized resumes. Our templates use proper formatting, keyword optimization, and structure that ATS systems can easily parse and rank highly."
    },
    {
      question: "Can I use my own AI API keys?",
      answer: "Yes! With our free plan, you can use your own OpenAI, Anthropic, or other AI provider API keys. This gives you full control over costs and usage while still accessing all of YourCareer's features."
    },
    {
      question: "Is my data secure and private?",
      answer: "Your privacy is our priority. All data is encrypted. We never share your personal information or resume data with third parties."
    },
    {
      question: "Do you offer support for students or career changers?",
      answer: "Absolutely! YourCareer is perfect for students, career changers, and professionals at any level. Our AI helps highlight transferable skills and optimize your resume regardless of your experience level."
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-4 relative overflow-hidden scroll-mt-20"
      id="faq"
      aria-labelledby="faq-heading"
    >
      {/* Compact Heading Section */}
      <div className="relative z-10 max-w-2xl mx-auto text-center mb-12">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-3"
        >
          <span className="px-3 py-1 bg-secondary text-foreground text-sm border-2 border-foreground font-serif uppercase tracking-wide flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </span>
        </motion.div>

        {/* Compact heading */}
        <motion.h2
          id="faq-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-3 font-serif text-foreground"
        >
          Questions & Answers
        </motion.h2>

        {/* Shorter description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base md:text-lg text-muted-foreground font-body"
        >
          Quick answers to help you get started with YourCareer
        </motion.p>
      </div>

      {/* Magazine-style divider */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-[2px] bg-foreground"></div>
        <div className="w-3 h-[2px] bg-primary mx-2"></div>
        <div className="w-24 h-[2px] bg-foreground"></div>
      </div>

      {/* Compact FAQ Accordion */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Accordion type="single" collapsible className="space-y-2">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <AccordionItem
                value={`item-${index}`}
                className="border-2 border-border bg-card hover:border-foreground transition-all duration-200 px-4 py-1"
              >
                <AccordionTrigger className="text-left hover:no-underline group-hover:text-primary transition-colors duration-200 py-4 text-sm md:text-base font-serif font-medium">
                  <span className="flex items-start gap-2">
                    <span className="text-primary font-bold">{(index + 1).toString().padStart(2, '0')}.</span>
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4 pl-8 text-sm font-body">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
