"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import expertTimeSummary from '@/data/expert_time_summary.json'

export function MetricsDashboard() {
  const expertData = Object.entries(expertTimeSummary).map(([name, minutes]) => ({
    name,
    minutes,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-serif font-bold">Internal Metrics Dashboard</h3>
        <p className="text-muted-foreground">Track operational performance and resource utilization</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-serif font-bold">Expert Time Summary</CardTitle>
          <CardDescription>Time spent by experts</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={expertData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="minutes" fill="hsl(var(--chart-1))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
