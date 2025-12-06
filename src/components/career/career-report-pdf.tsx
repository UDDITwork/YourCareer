'use client';

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';
import { CareerReport } from '@/lib/types';

// Using Times-Roman (built-in PDF font) for professional look

// Brown color palette matching your theme
const colors = {
  brown: {
    900: '#43302b',
    800: '#5c3d2e',
    700: '#6f4e37',
    600: '#8b5a2b',
    500: '#a0522d',
    100: '#f2e8e5',
    50: '#fdf8f6',
  },
  amber: {
    500: '#f59e0b',
    100: '#fef3c7',
  },
  white: '#ffffff',
  gray: {
    600: '#4b5563',
    400: '#9ca3af',
    200: '#e5e7eb',
  },
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: colors.white,
    padding: 40,
    fontFamily: 'Times-Roman',
  },
  // Header styles
  header: {
    marginBottom: 30,
    borderBottom: `3px solid ${colors.brown[700]}`,
    paddingBottom: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logoBox: {
    width: 50,
    height: 50,
    backgroundColor: colors.brown[700],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logoText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: 700,
  },
  brandName: {
    fontSize: 28,
    fontWeight: 700,
    color: colors.brown[900],
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 11,
    color: colors.gray[600],
    marginTop: 2,
  },
  reportTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.brown[800],
    marginTop: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  generatedDate: {
    fontSize: 10,
    color: colors.gray[400],
    marginTop: 5,
  },

  // Section styles
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottom: `2px solid ${colors.brown[100]}`,
    paddingBottom: 8,
  },
  sectionIcon: {
    width: 28,
    height: 28,
    backgroundColor: colors.brown[700],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  sectionIconText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 700,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: colors.brown[800],
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  // Content styles
  paragraph: {
    fontSize: 11,
    color: colors.gray[600],
    lineHeight: 1.6,
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
    paddingLeft: 5,
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: colors.brown[500],
    marginRight: 10,
    marginTop: 4,
  },
  listText: {
    fontSize: 11,
    color: colors.gray[600],
    flex: 1,
    lineHeight: 1.5,
  },

  // Career card styles
  careerCard: {
    backgroundColor: colors.brown[50],
    padding: 15,
    marginBottom: 12,
    borderLeft: `4px solid ${colors.brown[600]}`,
  },
  careerTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: colors.brown[800],
    marginBottom: 6,
  },
  careerReasoning: {
    fontSize: 10,
    color: colors.gray[600],
    lineHeight: 1.5,
    marginBottom: 8,
  },
  careerMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  careerMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  careerMetaLabel: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.brown[700],
    marginRight: 4,
  },
  careerMetaValue: {
    fontSize: 9,
    color: colors.gray[600],
  },

  // Skill development styles
  skillCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    padding: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  skillPriority: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginRight: 10,
    fontSize: 8,
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  priorityHigh: {
    backgroundColor: '#fecaca',
    color: '#991b1b',
  },
  priorityMedium: {
    backgroundColor: colors.amber[100],
    color: '#92400e',
  },
  priorityLow: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },
  skillContent: {
    flex: 1,
  },
  skillName: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.brown[800],
    marginBottom: 4,
  },
  skillResources: {
    fontSize: 9,
    color: colors.gray[400],
  },

  // Action plan styles
  actionTimeframe: {
    marginBottom: 15,
  },
  timeframeHeader: {
    backgroundColor: colors.brown[700],
    padding: 8,
    marginBottom: 8,
  },
  timeframeTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: colors.white,
  },
  actionItem: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft: 10,
  },
  actionNumber: {
    width: 18,
    height: 18,
    backgroundColor: colors.brown[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  actionNumberText: {
    fontSize: 9,
    fontWeight: 600,
    color: colors.brown[700],
  },
  actionText: {
    fontSize: 10,
    color: colors.gray[600],
    flex: 1,
    lineHeight: 1.5,
  },

  // Footer styles
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    borderTop: `2px solid ${colors.brown[100]}`,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: colors.gray[400],
  },
  footerBrand: {
    fontSize: 10,
    fontWeight: 600,
    color: colors.brown[700],
  },

  // Page number
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 10,
    color: colors.gray[400],
  },
});

// Section icons mapping
const sectionIcons: Record<string, string> = {
  summary: 'S',
  strengths: '+',
  growth: '↑',
  careers: '★',
  subjects: '📚',
  exams: '✓',
  skills: '⚡',
  action: '→',
  resources: '🔗',
};

interface CareerReportPDFProps {
  report: CareerReport;
}

export function CareerReportPDF({ report }: CareerReportPDFProps) {
  const generatedDate = new Date(report.generated_at).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with Logo */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBox}>
              <Text style={styles.logoText}>Y</Text>
            </View>
            <View>
              <Text style={styles.brandName}>YourCareer</Text>
              <Text style={styles.tagline}>AI-Powered Career Guidance</Text>
            </View>
          </View>
          <Text style={styles.reportTitle}>Career Guidance Report</Text>
          <Text style={styles.generatedDate}>Generated on {generatedDate}</Text>
        </View>

        {/* Personal Summary */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>{sectionIcons.summary}</Text>
            </View>
            <Text style={styles.sectionTitle}>Personal Summary</Text>
          </View>
          <Text style={styles.paragraph}>{report.personal_summary}</Text>
        </View>

        {/* Strengths */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>{sectionIcons.strengths}</Text>
            </View>
            <Text style={styles.sectionTitle}>Your Strengths</Text>
          </View>
          {report.strengths.map((strength, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{strength}</Text>
            </View>
          ))}
        </View>

        {/* Areas for Growth */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>{sectionIcons.growth}</Text>
            </View>
            <Text style={styles.sectionTitle}>Areas for Growth</Text>
          </View>
          {report.areas_for_growth.map((area, index) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{area}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Confidential Career Report</Text>
          <Text style={styles.footerBrand}>YourCareer.in</Text>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 2: Career Recommendations */}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>{sectionIcons.careers}</Text>
            </View>
            <Text style={styles.sectionTitle}>Recommended Career Paths</Text>
          </View>
          {report.recommended_careers.map((career, index) => (
            <View key={index} style={styles.careerCard}>
              <Text style={styles.careerTitle}>{index + 1}. {career.title}</Text>
              <Text style={styles.careerReasoning}>{career.reasoning}</Text>
              <View style={styles.careerMeta}>
                {career.salary_range && (
                  <View style={styles.careerMetaItem}>
                    <Text style={styles.careerMetaLabel}>Salary:</Text>
                    <Text style={styles.careerMetaValue}>{career.salary_range}</Text>
                  </View>
                )}
                {career.growth_prospects && (
                  <View style={styles.careerMetaItem}>
                    <Text style={styles.careerMetaLabel}>Growth:</Text>
                    <Text style={styles.careerMetaValue}>{career.growth_prospects}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Subject Guidance */}
        {report.subject_guidance && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Text style={styles.sectionIconText}>B</Text>
              </View>
              <Text style={styles.sectionTitle}>Subject Guidance</Text>
            </View>
            <Text style={styles.paragraph}>{report.subject_guidance}</Text>
          </View>
        )}

        {/* Competitive Exams */}
        {report.competitive_exams && report.competitive_exams.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Text style={styles.sectionIconText}>{sectionIcons.exams}</Text>
              </View>
              <Text style={styles.sectionTitle}>Recommended Competitive Exams</Text>
            </View>
            {report.competitive_exams.map((exam, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{exam}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Confidential Career Report</Text>
          <Text style={styles.footerBrand}>YourCareer.in</Text>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>

      {/* Page 3: Skills & Action Plan */}
      <Page size="A4" style={styles.page}>
        {/* Skill Development */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>{sectionIcons.skills}</Text>
            </View>
            <Text style={styles.sectionTitle}>Skill Development Plan</Text>
          </View>
          {report.skill_development.map((skill, index) => (
            <View key={index} style={styles.skillCard}>
              <Text style={[
                styles.skillPriority,
                skill.priority === 'high' ? styles.priorityHigh :
                skill.priority === 'medium' ? styles.priorityMedium :
                styles.priorityLow
              ]}>
                {skill.priority}
              </Text>
              <View style={styles.skillContent}>
                <Text style={styles.skillName}>{skill.skill}</Text>
                {skill.resources && skill.resources.length > 0 && (
                  <Text style={styles.skillResources}>
                    Resources: {skill.resources.join(', ')}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Action Plan */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionIconText}>{sectionIcons.action}</Text>
            </View>
            <Text style={styles.sectionTitle}>Action Plan</Text>
          </View>
          {report.action_plan.map((phase, phaseIndex) => (
            <View key={phaseIndex} style={styles.actionTimeframe}>
              <View style={styles.timeframeHeader}>
                <Text style={styles.timeframeTitle}>{phase.timeframe}</Text>
              </View>
              {phase.actions.map((action, actionIndex) => (
                <View key={actionIndex} style={styles.actionItem}>
                  <View style={styles.actionNumber}>
                    <Text style={styles.actionNumberText}>{actionIndex + 1}</Text>
                  </View>
                  <Text style={styles.actionText}>{action}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Additional Resources */}
        {report.additional_resources && report.additional_resources.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Text style={styles.sectionIconText}>R</Text>
              </View>
              <Text style={styles.sectionTitle}>Additional Resources</Text>
            </View>
            {report.additional_resources.map((resource, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listText}>{resource}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Confidential Career Report</Text>
          <Text style={styles.footerBrand}>YourCareer.in</Text>
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} fixed />
      </Page>
    </Document>
  );
}

// Function to generate and download PDF
export async function downloadCareerReportPDF(report: CareerReport): Promise<void> {
  const blob = await pdf(<CareerReportPDF report={report} />).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `YourCareer-Report-${new Date().toISOString().split('T')[0]}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
