"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface PerformanceMetricsProps {
  memberId: string
}

// Sample data for the charts
const generateData = (start, end, min, max) => {
  const data = [];
  let currentDate = new Date(start);
  while (currentDate <= new Date(end)) {
    data.push({
      date: currentDate.toLocaleString('default', { month: 'short', year: '2-digit' }),
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    });
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return data;
};

const cholesterolData = generateData('2025-01-01', '2026-12-01', 150, 250);
const vo2MaxData = generateData('2025-01-01', '2026-12-01', 30, 50);
const biologicalAgeData = generateData('2025-01-01', '2026-12-01', 40, 50);
const stressResilienceData = generateData('2025-01-01', '2026-12-01', 60, 90);
const cognitiveAssessmentData = generateData('2025-01-01', '2026-12-01', 80, 120);
const sleepQualityData = generateData('2025-01-01', '2026-12-01', 70, 95);

export function PerformanceMetrics({ memberId }: PerformanceMetricsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-serif font-bold">Performance Metrics</h3>
        <p className="text-muted-foreground">Track performance and resource utilization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Cholesterol Levels</CardTitle>
            <CardDescription>Monthly cholesterol readings (mg/dL)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cholesterolData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>VO2 Max</CardTitle>
            <CardDescription>Monthly VO2 max readings (ml/kg/min)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={vo2MaxData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Biological Age</CardTitle>
            <CardDescription>Monthly biological age estimations</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={biologicalAgeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-3))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stress Resilience</CardTitle>
            <CardDescription>Monthly stress resilience scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stressResilienceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-4))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cognitive Assessment</CardTitle>
            <CardDescription>Monthly cognitive assessment scores</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={cognitiveAssessmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sleep Quality</CardTitle>
            <CardDescription>Monthly sleep quality scores (Garmin data)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={sleepQualityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}