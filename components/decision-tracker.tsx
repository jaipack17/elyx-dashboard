"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


import { ScrollArea } from "@/components/ui/scroll-area"


import {
  Pill,
  Stethoscope,
  Activity,
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
} from "lucide-react"
import { format } from "date-fns"
import expertRecommendations from "@/data/expert_recommendations.json"

interface Recommendation {
  [key: string]: (string | { [key: string]: unknown })[];
}

interface Decision {
  id: string
  date: string
  expert_name: string
  recommendations: Recommendation
}

interface DecisionTrackerProps {
  memberId: string
}

// Map the expert recommendations to the Decision interface
const decisions: Decision[] = expertRecommendations.map((recommendation, index) => ({
  id: `D${index + 1}`,
  date: recommendation.timestamp,
  expert_name: recommendation.expert_name,
  recommendations: recommendation.recommendations,
}));



export function DecisionTracker({ memberId }: DecisionTrackerProps) {
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(decisions[0])

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold">Expert Recommendations</h3>
          <p className="text-muted-foreground">Track and analyze expert recommendations and their outcomes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Decision List */}
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle className="font-serif font-bold">Recent Recommendations</CardTitle>
            <CardDescription>Expert recommendations for this member</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4">
                {decisions.map((decision) => (
                  <div
                    key={decision.id}
                    className={`p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors ${
                      selectedDecision?.id === decision.id ? "bg-muted/50" : ""
                    }`}
                    onClick={() => setSelectedDecision(decision)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div>
                          <h4 className="font-semibold text-sm">{decision.expert_name}</h4>
                          <p className="text-xs text-muted-foreground">
                            {format(new Date(decision.date), "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Decision Details */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="font-serif font-bold">Recommendation Details</CardTitle>
            <CardDescription>
              {selectedDecision ? `Recommendations from ${selectedDecision.expert_name}` : "Select a recommendation to view details"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDecision ? (
              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {Object.entries(selectedDecision.recommendations).map(([key, value]) => (
                    <div key={key}>
                      <h5 className="font-semibold mb-2 capitalize">{key.replace(/_/g, " ")}</h5>
                      <ul className="list-disc list-inside space-y-2">
                        {value.map((item, index) => (
                          <li key={index} className="text-sm text-muted-foreground">
                            {typeof item === 'string' ? item : (
                              <div>
                                {Object.entries(item).map(([itemKey, itemValue]) => (
                                  <div key={itemKey}>
                                    <span className="font-semibold">{itemKey.replace(/_/g, " ")}: </span>
                                    <span>{String(itemValue)}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                <div className="text-center">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a recommendation from the list to view detailed analysis</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
