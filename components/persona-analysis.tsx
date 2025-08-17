"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"
import {
  Brain,
  MessageCircle,
  Target,
  TrendingUp,
  Clock,
  Users,
  BookOpen,
  Smartphone,
  Calendar,
  AlertCircle,
  CheckCircle,
  Star,
  Lightbulb,
} from "lucide-react"

interface PersonaAnalysisProps {
  memberId: string
}

// Sample persona data
const memberPersona = {
  name: "Rohan Patel",
  personaType: "The Analytical Achiever",
  description:
    "Analytical, driven, values efficiency and evidence-based approaches. Highly motivated and ready to act, but time-constrained. Needs clear, concise action plans and data-driven insights.",
  avatar: "/woman-healthcare-patient.png",
  lastUpdated: "2025-8-15",
}

const personalityTraits = [
  { trait: "Analytical", score: 85, description: "Prefers detailed explanations and data" },
  { trait: "Goal-Oriented", score: 92, description: "Highly motivated by clear targets" },
  { trait: "Self-Directed", score: 78, description: "Takes initiative in health management" },
  { trait: "Detail-Focused", score: 88, description: "Appreciates comprehensive information" },
  { trait: "Tech-Savvy", score: 75, description: "Comfortable with digital tools" },
  { trait: "Collaborative", score: 65, description: "Values professional guidance" },
]

const behaviorPatterns = [
  {
    category: "Medication Adherence",
    score: 94,
    trend: "stable",
    insights: ["Consistent timing", "Rarely misses doses", "Tracks side effects"],
  },
  {
    category: "Appointment Attendance",
    score: 89,
    trend: "up",
    insights: ["Always on time", "Prepares questions", "Follows up promptly"],
  },
  {
    category: "Self-Monitoring",
    score: 96,
    trend: "up",
    insights: ["Daily glucose tracking", "Detailed food logs", "Exercise documentation"],
  },
  {
    category: "Lifestyle Changes",
    score: 82,
    trend: "up",
    insights: ["Gradual implementation", "Research-based choices", "Sustainable habits"],
  },
]

const riskFactors = [
  {
    factor: "Perfectionism",
    level: "Medium",
    impact: "May become discouraged by minor setbacks",
    mitigation: "Emphasize progress over perfection",
  },
  {
    factor: "Information Overload",
    level: "Low",
    impact: "Generally handles complexity well",
    mitigation: "Continue providing detailed information",
  },
  {
    factor: "Work-Life Balance",
    level: "Medium",
    impact: "May prioritize work over health during busy periods",
    mitigation: "Integrate health goals with professional schedule",
  },
]


const radarData = [
  { subject: "Analytical", A: 85, fullMark: 100 },
  { subject: "Goal-Oriented", A: 92, fullMark: 100 },
  { subject: "Self-Directed", A: 78, fullMark: 100 },
  { subject: "Detail-Focused", A: 88, fullMark: 100 },
  { subject: "Tech-Savvy", A: 75, fullMark: 100 },
  { subject: "Collaborative", A: 65, fullMark: 100 },
]


export function PersonaAnalysis({ memberId }: PersonaAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-serif font-bold">Member Persona Analysis</h3>
          <p className="text-muted-foreground">AI-powered insights into member behavior and preferences</p>
        </div>
      </div>

      {/* Persona Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={memberPersona.avatar || "/placeholder.svg"} alt={memberPersona.name} />
              <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">
                {memberPersona.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="font-serif font-bold text-xl">{memberPersona.personaType}</CardTitle>
              <CardDescription className="text-base mt-1">{memberPersona.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="personality" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="personality" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personality Radar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Personality Profile</CardTitle>
                <CardDescription>Key personality traits and characteristics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar
                      name="Traits"
                      dataKey="A"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Trait Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Trait Analysis</CardTitle>
                <CardDescription>Detailed breakdown of personality traits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalityTraits.map((trait, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{trait.trait}</span>
                        <span className="text-sm font-semibold">{trait.score}%</span>
                      </div>
                      <Progress value={trait.score} className="h-2" />
                      <p className="text-xs text-muted-foreground">{trait.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Behavior Patterns Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Behavior Patterns</CardTitle>
                <CardDescription>Health management behavior scores</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={behaviorPatterns} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="category" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="score" fill="hsl(var(--chart-1))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Behavior Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Behavioral Insights</CardTitle>
                <CardDescription>Detailed analysis of health behaviors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {behaviorPatterns.map((pattern, index) => (
                    <div key={index} className="p-3 border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-sm">{pattern.category}</h5>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary">{pattern.score}%</Badge>
                          {pattern.trend === "up" ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full bg-gray-400" />
                          )}
                        </div>
                      </div>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {pattern.insights.map((insight, i) => (
                          <li key={i}>• {insight}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="font-serif font-bold">Risk Factors & Mitigation</CardTitle>
              <CardDescription>Potential challenges and recommended approaches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {riskFactors.map((risk, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <h5 className="font-semibold text-sm">{risk.factor}</h5>
                      <Badge variant={risk.level === "High" ? "destructive" : "secondary"} className="text-xs">
                        {risk.level}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{risk.impact}</p>
                    <div className="p-2 bg-green-50 rounded text-xs">
                      <strong>Mitigation:</strong> {risk.mitigation}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
