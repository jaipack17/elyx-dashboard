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
  confidenceScore: 87,
  lastUpdated: "2025-12-15",
}

const personalityTraits = [
  { trait: "Analytical", score: 85, description: "Prefers detailed explanations and data" },
  { trait: "Goal-Oriented", score: 92, description: "Highly motivated by clear targets" },
  { trait: "Self-Directed", score: 78, description: "Takes initiative in health management" },
  { trait: "Detail-Focused", score: 88, description: "Appreciates comprehensive information" },
  { trait: "Tech-Savvy", score: 75, description: "Comfortable with digital tools" },
  { trait: "Collaborative", score: 65, description: "Values professional guidance" },
]

const communicationStyle = {
  preferredChannels: [
    { channel: "Email", preference: 85, usage: "Detailed updates and reports" },
    { channel: "App Messages", preference: 70, usage: "Quick questions and reminders" },
    { channel: "Video Calls", preference: 60, usage: "Complex discussions" },
    { channel: "Phone Calls", preference: 45, usage: "Urgent matters only" },
    { channel: "Text Messages", preference: 30, usage: "Appointment reminders" },
  ],
  communicationFrequency: "Weekly structured updates",
  preferredTone: "Professional and informative",
  responseTime: "Within 24 hours",
}

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

const motivationFactors = [
  { factor: "Health Outcomes", importance: 95, type: "primary" },
  { factor: "Family Wellbeing", importance: 88, type: "primary" },
  { factor: "Professional Performance", importance: 75, type: "secondary" },
  { factor: "Long-term Independence", importance: 92, type: "primary" },
  { factor: "Cost Management", importance: 65, type: "secondary" },
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

const engagementPreferences = {
  learningStyle: "Visual and analytical",
  contentFormat: ["Detailed reports", "Charts and graphs", "Step-by-step guides"],
  interactionStyle: "Structured and goal-oriented",
  feedbackPreference: "Specific and actionable",
  supportLevel: "Moderate - values independence with professional guidance",
}

const radarData = [
  { subject: "Analytical", A: 85, fullMark: 100 },
  { subject: "Goal-Oriented", A: 92, fullMark: 100 },
  { subject: "Self-Directed", A: 78, fullMark: 100 },
  { subject: "Detail-Focused", A: 88, fullMark: 100 },
  { subject: "Tech-Savvy", A: 75, fullMark: 100 },
  { subject: "Collaborative", A: 65, fullMark: 100 },
]

const recommendedApproaches = [
  {
    category: "Communication",
    recommendations: [
      "Provide detailed explanations with supporting data",
      "Use charts and graphs to illustrate progress",
      "Send structured weekly progress reports",
      "Respond to questions with comprehensive information",
    ],
  },
  {
    category: "Treatment Planning",
    recommendations: [
      "Set clear, measurable goals with timelines",
      "Explain the rationale behind each recommendation",
      "Provide multiple options with pros/cons analysis",
      "Include research references when possible",
    ],
  },
  {
    category: "Engagement",
    recommendations: [
      "Leverage technology for tracking and monitoring",
      "Provide educational resources and tools",
      "Schedule regular check-ins with structured agendas",
      "Celebrate achievements with specific metrics",
    ],
  },
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
        <Badge variant="secondary" className="flex items-center gap-1">
          <Brain className="h-3 w-3" />
          Confidence: {memberPersona.confidenceScore}%
        </Badge>
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
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: {memberPersona.lastUpdated} • Confidence: {memberPersona.confidenceScore}%
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="personality" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personality">Personality</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="motivation">Motivation</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
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

        <TabsContent value="communication" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Communication Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Channel Preferences</CardTitle>
                <CardDescription>Preferred communication methods and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {communicationStyle.preferredChannels.map((channel, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{channel.channel}</span>
                        <span className="text-sm font-semibold">{channel.preference}%</span>
                      </div>
                      <Progress value={channel.preference} className="h-2" />
                      <p className="text-xs text-muted-foreground">{channel.usage}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Communication Style Details */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Communication Style</CardTitle>
                <CardDescription>Preferred interaction patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Clock className="h-5 w-5 text-chart-1" />
                  <div>
                    <p className="font-medium text-sm">Response Time</p>
                    <p className="text-sm text-muted-foreground">{communicationStyle.responseTime}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <MessageCircle className="h-5 w-5 text-chart-2" />
                  <div>
                    <p className="font-medium text-sm">Preferred Tone</p>
                    <p className="text-sm text-muted-foreground">{communicationStyle.preferredTone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Calendar className="h-5 w-5 text-chart-3" />
                  <div>
                    <p className="font-medium text-sm">Frequency</p>
                    <p className="text-sm text-muted-foreground">{communicationStyle.communicationFrequency}</p>
                  </div>
                </div>

                <div className="p-3 bg-accent/10 rounded-lg">
                  <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Key Insights
                  </h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Prefers detailed, structured communication</li>
                    <li>• Values professional, informative tone</li>
                    <li>• Responds well to data-backed explanations</li>
                  </ul>
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

        <TabsContent value="motivation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Motivation Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Motivation Factors</CardTitle>
                <CardDescription>What drives this member's health decisions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {motivationFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{factor.factor}</span>
                          <Badge variant={factor.type === "primary" ? "default" : "secondary"} className="text-xs">
                            {factor.type}
                          </Badge>
                        </div>
                        <span className="text-sm font-semibold">{factor.importance}%</span>
                      </div>
                      <Progress value={factor.importance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif font-bold">Engagement Preferences</CardTitle>
                <CardDescription>How this member prefers to learn and interact</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted rounded-lg">
                  <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Learning Style
                  </h5>
                  <p className="text-sm text-muted-foreground">{engagementPreferences.learningStyle}</p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Smartphone className="h-4 w-4" />
                    Content Format
                  </h5>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {engagementPreferences.contentFormat.map((format, i) => (
                      <li key={i}>• {format}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Support Level
                  </h5>
                  <p className="text-sm text-muted-foreground">{engagementPreferences.supportLevel}</p>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <h5 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Feedback Style
                  </h5>
                  <p className="text-sm text-muted-foreground">{engagementPreferences.feedbackPreference}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {recommendedApproaches.map((approach, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="font-serif font-bold flex items-center gap-2">
                    <Target className="h-5 w-5 text-chart-1" />
                    {approach.category} Recommendations
                  </CardTitle>
                  <CardDescription>Tailored approaches for optimal engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {approach.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Card */}
          <Card className="bg-accent/5">
            <CardHeader>
              <CardTitle className="font-serif font-bold flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-chart-2" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-chart-1 rounded-full mt-2" />
                  <p className="text-sm">
                    <strong>Communication:</strong> Use detailed, data-driven explanations with visual aids and
                    structured formats.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-chart-2 rounded-full mt-2" />
                  <p className="text-sm">
                    <strong>Motivation:</strong> Focus on health outcomes and family wellbeing as primary drivers.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-chart-3 rounded-full mt-2" />
                  <p className="text-sm">
                    <strong>Engagement:</strong> Leverage technology and provide educational resources with clear
                    metrics.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-chart-4 rounded-full mt-2" />
                  <p className="text-sm">
                    <strong>Risk Management:</strong> Address perfectionism by emphasizing progress over perfection.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
