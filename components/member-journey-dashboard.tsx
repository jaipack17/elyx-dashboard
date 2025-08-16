"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CalendarDays, Clock, User, Activity, MessageSquare, TrendingUp, FileText, Menu, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MemberTimeline } from "./member-timeline"
import { DecisionTracker } from "./decision-tracker"
import { MetricsDashboard } from "./metrics-dashboard"
import { PersonaAnalysis } from "./persona-analysis"
import { ChatAgent } from "./chat-agent"
import { PerformanceMetrics } from "./performance-metrics"
import { HealthRecommendationSummary } from "./health-recommendation-summary"

// Sample member data
const memberData = {
  id: "M001",
  name: "Rohan Patel",
  age: 46,
  condition: "Fluctuating Blood Pressure",
  joinDate: "2025-01-15",
  avatar: "/woman-healthcare-patient.png",
  currentPhase: "Active Treatment",
  progress: 75,
  nextAppointment: "2025-03-10",
  riskLevel: "Low",
}

export function MemberJourneyDashboard() {
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-15")
  const [activeTab, setActiveTab] = useState("timeline")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  const SidebarContent = () => (
    <div className="p-6 h-full">
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-black text-sidebar-foreground mb-2">Elyx Dashboard</h1>
      </div>

      {/* Member Profile Card */}
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={memberData.avatar || "/placeholder.svg"} alt={memberData.name} />
              <AvatarFallback className="bg-secondary text-secondary-foreground">
                {memberData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg font-serif font-bold">{memberData.name}</CardTitle>
              <CardDescription className="text-sm">
                ID: {memberData.id} • Age: {memberData.age}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Condition</span>
            <Badge variant="outline" className="bg-muted">
              {memberData.condition}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Risk Level</span>
            <Badge variant={memberData.riskLevel === "High" ? "destructive" : "secondary"}>
              {memberData.riskLevel}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>Next: {memberData.nextAppointment}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Elyx Team</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Ruby (Concierge)</DropdownMenuItem>
                <DropdownMenuItem>Dr. Warren (Medical Strategist)</DropdownMenuItem>
                <DropdownMenuItem>Advik (Performance)</DropdownMenuItem>
                <DropdownMenuItem>Carla (Nutritionist)</DropdownMenuItem>
                <DropdownMenuItem>Rachel (Physiotherapist)</DropdownMenuItem>
                <DropdownMenuItem>Neel (Relationship Manager)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            PA: Sarah Tan
          </div>
        </CardContent>
      </Card>

      

      {/* Navigation */}
      <div className="space-y-2">
        <Button
          variant={activeTab === "timeline" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("timeline")
            setIsMobileSidebarOpen(false)
          }}
        >
          <Activity className="mr-2 h-4 w-4" />
          Journey Timeline
        </Button>
        <Button
          variant={activeTab === "decisions" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("decisions")
            setIsMobileSidebarOpen(false)
          }}
        >
          <FileText className="mr-2 h-4 w-4" />
          Decision Tracking
        </Button>
        <Button
          variant={activeTab === "performance" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("performance")
            setIsMobileSidebarOpen(false)
          }}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Performance Metrics
        </Button>
        <Button
          variant={activeTab === "persona" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("persona")
            setIsMobileSidebarOpen(false)
          }}
        >
          <User className="mr-2 h-4 w-4" />
          Persona Analysis
        </Button>
        <Button
          variant={activeTab === "chat" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("chat")
            setIsMobileSidebarOpen(false)
          }}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          Chat Agent
        </Button>
        <Button
          variant={activeTab === "health-summary" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("health-summary")
            setIsMobileSidebarOpen(false)
          }}
        >
          <FileText className="mr-2 h-4 w-4" />
          Health Recommendation Summary
        </Button>
        <Button
          variant={activeTab === "metrics" ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => {
            setActiveTab("metrics")
            setIsMobileSidebarOpen(false)
          }}
        >
          <TrendingUp className="mr-2 h-4 w-4" />
          Internal Metrics
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-background">
      <div className="hidden lg:block w-80 bg-sidebar border-r border-sidebar-border">
        <SidebarContent />
      </div>

      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-80 bg-sidebar border-sidebar-border p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-6">
        <div className="flex items-center justify-between mb-6 lg:block">
          <div className="flex items-center gap-3">
            <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden bg-transparent">
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <div>
              <h2 className="text-2xl lg:text-3xl font-serif font-black text-foreground mb-1 lg:mb-2">
                Member Journey
              </h2>
              <p className="text-sm lg:text-base text-muted-foreground hidden sm:block">
                Track progress, decisions, and outcomes for {memberData.name}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4 lg:hidden">
          <Badge variant="secondary" className="text-xs">
            {activeTab === "timeline" && "Journey Timeline"}
            {activeTab === "decisions" && "Decision Tracking"}
            {activeTab === "performance" && "Performance Metrics"}
            {activeTab === "persona" && "Persona Analysis"}
            {activeTab === "chat" && "Chat Agents"}
            {activeTab === "health-summary" && "Health Recommendation Summary"}
            {activeTab === "metrics" && "Internal Metrics"}
          </Badge>
        </div>

        {/* Content based on active tab */}
        {activeTab === "timeline" && (
          <MemberTimeline memberId={memberData.id} selectedDate={selectedDate} onDateSelect={setSelectedDate} joinDate={memberData.joinDate} />
        )}
        {activeTab === "decisions" && <DecisionTracker memberId={memberData.id} />}
        {activeTab === "performance" && <PerformanceMetrics />}
        {activeTab === "persona" && <PersonaAnalysis memberId={memberData.id} />}
        {activeTab === "chat" && <ChatAgent />}
        {activeTab === "health-summary" && <HealthRecommendationSummary />}
        {activeTab === "metrics" && <MetricsDashboard memberId={memberData.id} />}
      </div>
    </div>
  )
}
