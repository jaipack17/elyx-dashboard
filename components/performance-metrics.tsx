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


import { getPerformanceMetricsData } from "@/lib/test-report-data"

interface PerformanceMetricsProps {
  memberId: string
}

// Sample data for the charts
const { cholesterolData, vo2MaxData } = getPerformanceMetricsData();



const biologicalAgeData = [
  { date: "2025-01-22", value: 46 },
  { date: "2025-04-09", value: 45.8 },
  { date: "2025-07-02", value: 45.5 },
];
const stressResilienceData = [
  { date: "2025-01-22", value: 70 },
  { date: "2025-04-09", value: 72 },
  { date: "2025-07-02", value: 75 },
];
const cognitiveAssessmentData = [
  { date: "2025-01-22", value: 26 },
  { date: "2025-04-09", value: 27 },
  { date: "2025-07-02", value: 27 },
];
const sleepQualityData = [
  { date: "2025-01-22", value: 6.5 },
  { date: "2025-04-09", value: 7.0 },
  { date: "2025-07-02", value: 7.2 },
];

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
                <Line type="monotone" dataKey="Total Cholesterol" stroke="#000000" />
                <Line type="monotone" dataKey="LDL Cholesterol" stroke="#FF0000" />
                <Line type="monotone" dataKey="HDL Cholesterol" stroke="#0000FF" />
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
                <Line type="monotone" dataKey="value" stroke="#000000" />
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
                <Line type="monotone" dataKey="value" stroke="#000000" />
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
                <Line type="monotone" dataKey="value" stroke="#000000" />
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
                <Line type="monotone" dataKey="value" stroke="#000000" />
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
                <Line type="monotone" dataKey="value" stroke="#000000" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}