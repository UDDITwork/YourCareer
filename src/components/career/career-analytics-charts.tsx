'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from 'recharts';
import { TrendingUp, Target, Zap, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

// Vintage color palette (old world colors)
const VINTAGE_COLORS = {
  primary: '#8B5A2B',      // Brown
  secondary: '#A0826D',    // Tan
  accent: '#654321',        // Dark brown
  light: '#D4A574',        // Light tan
  cream: '#FAF5EB',         // Cream
  dark: '#5C4033',          // Dark brown
  success: '#8B7355',       // Muted green-brown
  warning: '#B8860B',       // Dark goldenrod
  info: '#6B8E6B',          // Sage green
};

const CHART_COLORS = [
  VINTAGE_COLORS.primary,
  VINTAGE_COLORS.secondary,
  VINTAGE_COLORS.accent,
  VINTAGE_COLORS.light,
  VINTAGE_COLORS.success,
  VINTAGE_COLORS.warning,
  VINTAGE_COLORS.info,
];

interface CareerAnalyticsData {
  skills: {
    current: Array<{ name: string; level: number; category: string }>;
    required: Array<{ name: string; level: number; category: string; priority: string }>;
  };
  industryComparison: {
    industries: Array<{
      name: string;
      salaryRange: { min: number; max: number; currency: string };
      growthProjection: number;
      marketDemand: string;
      jobOpenings: number;
    }>;
  };
  careerReadiness: {
    overallScore: number;
    categories: Array<{ name: string; score: number }>;
  };
  skillGap: Array<{
    skill: string;
    currentLevel: number;
    requiredLevel: number;
    gap: number;
    priority: string;
  }>;
}

interface CareerAnalyticsChartsProps {
  messages: Array<{ role: string; content: string }>;
  sessionId?: string | null;
}

export function CareerAnalyticsCharts({ messages, sessionId }: CareerAnalyticsChartsProps) {
  const [analyticsData, setAnalyticsData] = useState<CareerAnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (messages.length < 2) {
      setIsLoading(false);
      return;
    }

    const fetchAnalytics = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/career-analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages, sessionId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }

        const result = await response.json();
        setAnalyticsData(result.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchAnalytics, 1000);
    return () => clearTimeout(timeoutId);
  }, [messages, sessionId]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)]">
            <CardHeader>
              <div className="h-4 bg-[rgba(139,90,43,0.2)] rounded animate-pulse w-1/2" />
            </CardHeader>
            <CardContent>
              <div className="h-32 bg-[rgba(139,90,43,0.1)] rounded animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !analyticsData) {
    return null; // Don't show error, just don't render charts
  }

  // Prepare data for charts with safety checks
  const skillGapData = (analyticsData.skillGap || [])
    .sort((a, b) => b.gap - a.gap)
    .slice(0, 8)
    .map(skill => ({
      name: skill.skill.length > 15 ? skill.skill.substring(0, 15) + '...' : skill.skill,
      current: skill.currentLevel,
      required: skill.requiredLevel,
      gap: skill.gap,
    }));

  const industryData = (analyticsData.industryComparison?.industries || []).map(ind => ({
    name: ind.name,
    avgSalary: (ind.salaryRange.min + ind.salaryRange.max) / 2,
    growth: ind.growthProjection,
    demand: ind.marketDemand === 'high' ? 100 : ind.marketDemand === 'medium' ? 60 : 30,
    openings: ind.jobOpenings,
  }));

  const readinessData = (analyticsData.careerReadiness?.categories || []).map(cat => ({
    category: cat.name,
    score: cat.score,
    fullMark: 100,
  }));

  const skillsDistribution = (analyticsData.skills?.current || []).reduce((acc, skill) => {
    const existing = acc.find(s => s.name === skill.category);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: skill.category, value: 1 });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  // Don't render if no data
  if (skillGapData.length === 0 && industryData.length === 0 && readinessData.length === 0 && skillsDistribution.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 mb-6">
      {/* Career Readiness Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)] shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#654321] flex items-center gap-2">
              <Target className="h-5 w-5 text-[#8B5A2B]" />
              Career Readiness Score
            </CardTitle>
            <CardDescription className="text-[#5C4033]">
              Overall assessment of your career preparedness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={VINTAGE_COLORS.light}
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke={VINTAGE_COLORS.primary}
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${((analyticsData.careerReadiness?.overallScore || 0) / 100) * 352} 352`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#654321]">
                    {analyticsData.careerReadiness?.overallScore || 0}%
                  </span>
                </div>
              </div>
            </div>
            {readinessData.length > 0 && (
              <ResponsiveContainer width="100%" height={200}>
                <RadarChart data={readinessData}>
                  <PolarGrid stroke={VINTAGE_COLORS.light} />
                  <PolarAngleAxis
                    dataKey="category"
                    tick={{ fill: VINTAGE_COLORS.dark, fontSize: 12 }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{ fill: VINTAGE_COLORS.dark, fontSize: 10 }}
                  />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke={VINTAGE_COLORS.primary}
                    fill={VINTAGE_COLORS.primary}
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Skill Gap Analysis */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)] shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-[#654321] flex items-center gap-2">
                <Zap className="h-5 w-5 text-[#8B5A2B]" />
                Skill Gap Analysis
              </CardTitle>
              <CardDescription className="text-[#5C4033]">
                Current vs Required Skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              {skillGapData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={skillGapData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={VINTAGE_COLORS.light} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: VINTAGE_COLORS.dark, fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fill: VINTAGE_COLORS.dark, fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: VINTAGE_COLORS.cream,
                        border: `2px solid ${VINTAGE_COLORS.primary}`,
                        borderRadius: '8px',
                        color: VINTAGE_COLORS.dark,
                      }}
                    />
                    <Legend
                      wrapperStyle={{ color: VINTAGE_COLORS.dark }}
                    />
                    <Bar dataKey="current" fill={VINTAGE_COLORS.secondary} name="Current Level" />
                    <Bar dataKey="required" fill={VINTAGE_COLORS.primary} name="Required Level" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-[#5C4033]">
                  <p>No skill gap data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Skills Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)] shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-[#654321] flex items-center gap-2">
                <Target className="h-5 w-5 text-[#8B5A2B]" />
                Skills Distribution
              </CardTitle>
              <CardDescription className="text-[#5C4033]">
                Your Skills by Category
              </CardDescription>
            </CardHeader>
            <CardContent>
              {skillsDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={skillsDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {skillsDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: VINTAGE_COLORS.cream,
                        border: `2px solid ${VINTAGE_COLORS.primary}`,
                        borderRadius: '8px',
                        color: VINTAGE_COLORS.dark,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-[#5C4033]">
                  <p>No skills data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Industry Comparison - Salary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)] shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-[#654321] flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#8B5A2B]" />
                Industry Salary Trends
              </CardTitle>
              <CardDescription className="text-[#5C4033]">
                Average Salary by Industry (₹)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {industryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={industryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={VINTAGE_COLORS.light} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: VINTAGE_COLORS.dark, fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tick={{ fill: VINTAGE_COLORS.dark, fontSize: 11 }}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: VINTAGE_COLORS.cream,
                        border: `2px solid ${VINTAGE_COLORS.primary}`,
                        borderRadius: '8px',
                        color: VINTAGE_COLORS.dark,
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Avg Salary']}
                    />
                    <Bar dataKey="avgSalary" fill={VINTAGE_COLORS.primary} name="Average Salary" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-[#5C4033]">
                  <p>No industry data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Industry Growth & Demand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="border-2 border-[rgba(139,90,43,0.3)] bg-[rgba(250,245,235,0.95)] shadow-lg h-full">
            <CardHeader>
              <CardTitle className="text-[#654321] flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#8B5A2B]" />
                Growth & Market Demand
              </CardTitle>
              <CardDescription className="text-[#5C4033]">
                Industry Growth Projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              {industryData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={industryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={VINTAGE_COLORS.light} />
                    <XAxis
                      dataKey="name"
                      tick={{ fill: VINTAGE_COLORS.dark, fontSize: 11 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis
                      tick={{ fill: VINTAGE_COLORS.dark, fontSize: 11 }}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: VINTAGE_COLORS.cream,
                        border: `2px solid ${VINTAGE_COLORS.primary}`,
                        borderRadius: '8px',
                        color: VINTAGE_COLORS.dark,
                      }}
                    />
                    <Legend wrapperStyle={{ color: VINTAGE_COLORS.dark }} />
                    <Line
                      type="monotone"
                      dataKey="growth"
                      stroke={VINTAGE_COLORS.primary}
                      strokeWidth={3}
                      name="Growth %"
                      dot={{ fill: VINTAGE_COLORS.primary, r: 4 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="demand"
                      stroke={VINTAGE_COLORS.secondary}
                      strokeWidth={3}
                      name="Market Demand"
                      dot={{ fill: VINTAGE_COLORS.secondary, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-[#5C4033]">
                  <p>No growth data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

