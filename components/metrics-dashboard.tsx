"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Clock,
  Users,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  UserCheck,
  MessageSquare,
  Star,
  Target,
  Stethoscope,
} from "lucide-react"

interface MetricsDashboardProps {
  memberId: string
}

// Sample metrics data
const providerHours = [
  { name: "Dr. Smith", hours: 45, consultations: 28, specialty: "Endocrinology" },
  { name: "Dr. Johnson", hours: 38, consultations: 22, specialty: "Cardiology" },
  { name: "Dr. Williams", hours: 42, consultations: 31, specialty: "Family Medicine" },
  { name: "Dr. Brown", hours: 35, consultations: 19, specialty: "Psychiatry" },
]

const coachHours = [
  { name: "Sarah Miller", hours: 52, sessions: 34, type: "Diabetes Coach" },
  { name: "Mike Chen", hours: 48, sessions: 29, type: "Lifestyle Coach" },
  { name: "Lisa Davis", hours: 44, sessions: 26, type: "Mental Health Coach" },
  { name: "Tom Wilson", hours: 39, sessions: 22, type: "Nutrition Coach" },
]

const weeklyMetrics = [
  { week: "Week 1", consultations: 45, coaching: 62, responses: 128 },
  { week: "Week 2", consultations: 52, coaching: 58, responses: 145 },
  { week: "Week 3", consultations: 48, coaching: 71, responses: 132 },
  { week: "Week 4", consultations: 56, coaching: 65, responses: 156 },
]

const responseTimeData = [
  { day: "Mon", avgResponse: 2.3, target: 4.0 },
  { day: "Tue", avgResponse: 1.8, target: 4.0 },
  { day: "Wed", avgResponse: 3.2, target: 4.0 },
  { day: "Thu", avgResponse: 2.1, target: 4.0 },
  { day: "Fri", avgResponse: 2.7, target: 4.0 },
  { day: "Sat", avgResponse: 4.1, target: 4.0 },
  { day: "Sun", avgResponse: 3.8, target: 4.0 },
]

const satisfactionData = [
  { name: "Excellent", value: 45, color: "#22c55e" },
  { name: "Good", value: 32, color: "#3b82f6" },
  { name: "Fair", value: 18, color: "#f59e0b" },
  { name: "Poor", value: 5, color: "#ef4444" },
]

const memberEngagement = {
  totalMembers: 1247,
  activeMembers: 892,
  engagementRate: 71.5,
  avgSessionDuration: 24.5,
  messageResponseRate: 94.2,
  appointmentAttendance: 87.3,
}

const costMetrics = {
  totalCost: 45680,
  costPerMember: 366,
  providerCosts: 28400,
  coachingCosts: 12800,
  technologyCosts: 4480,
}

export function MetricsDashboard({ memberId }: MetricsDashboardProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-2xl font-serif font-bold">Internal Metrics Dashboard</h3>
        <p className="text-muted-foreground">Track operational performance and resource utilization</p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-1/10 rounded-lg">
                <Clock className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Provider Hours</p>
                <p className="text-2xl font-bold">160</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +12% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-2/10 rounded-lg">
                <Users className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Coaching Hours</p>
                <p className="text-2xl font-bold">183</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +8% vs last month
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-chart-3/10 rounded-lg">
                <MessageSquare className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">2.6h</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <TrendingDown className="h-3 w-3" />
                  -15% vs target
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        
      </div>

      <Tabs defaultValue="resources" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="resources">Resource Utilization</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Member Engagement</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Provider Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Provider Hours This Month</CardTitle>
                <CardDescription>Hours worked by medical providers</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={providerHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Coach Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Coaching Hours This Month</CardTitle>
                <CardDescription>Hours spent by health coaches</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={coachHours}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hours" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Resource Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Provider Details</CardTitle>
                <CardDescription>Individual provider metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {providerHours.map((provider, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{provider.name}</p>
                        <p className="text-sm text-muted-foreground">{provider.specialty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{provider.hours}h</p>
                        <p className="text-sm text-muted-foreground">{provider.consultations} consults</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Coach Details</CardTitle>
                <CardDescription>Individual coach metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coachHours.map((coach, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{coach.name}</p>
                        <p className="text-sm text-muted-foreground">{coach.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{coach.hours}h</p>
                        <p className="text-sm text-muted-foreground">{coach.sessions} sessions</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Activity Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Weekly Activity Trends</CardTitle>
                <CardDescription>Consultations, coaching, and responses over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="consultations" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                    <Line type="monotone" dataKey="coaching" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                    <Line type="monotone" dataKey="responses" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Response Time Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Response Time Analysis</CardTitle>
                <CardDescription>Average response times vs target (4 hours)</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={responseTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="avgResponse" fill="hsl(var(--chart-1))" />
                    <Line type="monotone" dataKey="target" stroke="hsl(var(--chart-4))" strokeWidth={2} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Satisfaction Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Member Satisfaction Distribution</CardTitle>
              <CardDescription>Breakdown of satisfaction ratings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-3">
                  {satisfactionData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="font-semibold">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <UserCheck className="h-8 w-8 text-chart-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active Members</p>
                    <p className="text-2xl font-bold">{memberEngagement.activeMembers}</p>
                    <p className="text-xs text-muted-foreground">of {memberEngagement.totalMembers} total</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Activity className="h-8 w-8 text-chart-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Engagement Rate</p>
                    <p className="text-2xl font-bold">{memberEngagement.engagementRate}%</p>
                    <Progress value={memberEngagement.engagementRate} className="mt-2 h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-chart-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Session Duration</p>
                    <p className="text-2xl font-bold">{memberEngagement.avgSessionDuration}m</p>
                    <Badge variant="secondary" className="mt-1">
                      Above target
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Communication Metrics</CardTitle>
                <CardDescription>Message and appointment engagement</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Message Response Rate</span>
                  <span className="font-semibold">{memberEngagement.messageResponseRate}%</span>
                </div>
                <Progress value={memberEngagement.messageResponseRate} className="h-2" />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Appointment Attendance</span>
                  <span className="font-semibold">{memberEngagement.appointmentAttendance}%</span>
                </div>
                <Progress value={memberEngagement.appointmentAttendance} className="h-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Engagement Targets</CardTitle>
                <CardDescription>Performance vs targets</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Response Rate Target</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    Met (90%+)
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Attendance Target</span>
                  </div>
                  <Badge variant="default" className="bg-green-600">
                    Met (85%+)
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Engagement Target</span>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-600 text-white">
                    Near (75%+)
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="costs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <DollarSign className="h-8 w-8 text-chart-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Monthly Cost</p>
                    <p className="text-2xl font-bold">${costMetrics.totalCost.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-chart-2" />
                  <div>
                    <p className="text-sm text-muted-foreground">Cost Per Member</p>
                    <p className="text-2xl font-bold">${costMetrics.costPerMember}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-8 w-8 text-chart-3" />
                  <div>
                    <p className="text-sm text-muted-foreground">Provider Costs</p>
                    <p className="text-2xl font-bold">${costMetrics.providerCosts.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-chart-4" />
                  <div>
                    <p className="text-sm text-muted-foreground">Coaching Costs</p>
                    <p className="text-2xl font-bold">${costMetrics.coachingCosts.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Cost Breakdown</CardTitle>
              <CardDescription>Monthly operational cost distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Provider Costs</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-chart-1 h-2 rounded-full"
                        style={{ width: `${(costMetrics.providerCosts / costMetrics.totalCost) * 100}%` }}
                      />
                    </div>
                    <span className="font-semibold text-sm">${costMetrics.providerCosts.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Coaching Costs</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-chart-2 h-2 rounded-full"
                        style={{ width: `${(costMetrics.coachingCosts / costMetrics.totalCost) * 100}%` }}
                      />
                    </div>
                    <span className="font-semibold text-sm">${costMetrics.coachingCosts.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Technology Costs</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-muted rounded-full h-2">
                      <div
                        className="bg-chart-3 h-2 rounded-full"
                        style={{ width: `${(costMetrics.technologyCosts / costMetrics.totalCost) * 100}%` }}
                      />
                    </div>
                    <span className="font-semibold text-sm">${costMetrics.technologyCosts.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
