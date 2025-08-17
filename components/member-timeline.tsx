"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Pill, Stethoscope, Activity, AlertCircle, Clock, TrendingUp } from "lucide-react"
import { format, addDays } from "date-fns"
import travelLog from "@/data/travel_log.json"
import { getRecommendationEvents } from "@/lib/recommendation-events"

interface TimelineEvent {
  id: string
  date: string
  endDate?: string
  isRange?: boolean
  type: "medication" | "appointment" | "test" | "milestone" | "alert" | "recommendation"
  title: string
  description: string
  status: "completed" | "pending" | "cancelled"
  provider?: string
  outcome?: string
  reasoning?: string
  color?: string
}

interface MemberTimelineProps {
  memberId: string
  selectedDate: string
  onDateSelect: (date: string) => void
  joinDate: string
}

// Sample timeline data
const timelineEvents: TimelineEvent[] = [
  {
    id: "0",
    date: "2025-01-15",
    type: "milestone",
    title: "Sign-up",
    description: "Member signed up for the program",
    status: "completed",
  },
  ...travelLog.map((trip, index) => ({
    id: `t-${index}`,
    date: trip.start_date,
    endDate: trip.end_date,
    isRange: true,
    type: "alert" as const,
    title: "Business Trip",
    description: `On a business trip to ${trip.destination}`,
    status: "completed" as const,
  })),
  ...getRecommendationEvents(),
  {
    id: "r-1",
    date: "2025-01-22",
    type: "test" as const,
    title: "Test Report 1 Generated",
    description: "Test Report 1 was generated.",
    status: "completed" as const,
  },
  {
    id: "r-2",
    date: "2025-04-09",
    type: "test" as const,
    title: "Test Report 2 Generated",
    description: "Test Report 2 was generated.",
    status: "completed" as const,
  },
  {
    id: "r-3",
    date: "2025-07-02",
    type: "test" as const,
    title: "Test Report 3 Generated",
    description: "Test Report 3 was generated.",
    status: "completed" as const,
  },
]

const getEventIcon = (type: string) => {
  switch (type) {
    case "medication":
      return <Pill className="h-4 w-4" />
    case "appointment":
      return <Stethoscope className="h-4 w-4" />
    case "test":
      return <Activity className="h-4 w-4" />
    case "milestone":
      return <TrendingUp className="h-4 w-4" />
    case "alert":
      return <AlertCircle className="h-4 w-4" />
    case "recommendation":
      return <TrendingUp className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getEventColor = (type: string, status: string, color?: string) => {
  if (status === "cancelled") return "text-destructive"
  if (status === "pending") return "text-muted-foreground"
  if (color) return `text-${color}-500`

  switch (type) {
    case "medication":
      return "text-chart-1"
    case "appointment":
      return "text-chart-2"
    case "test":
      return "text-chart-3"
    case "milestone":
      return "text-chart-4"
    case "alert":
      return "text-destructive"
    case "recommendation":
      return "text-purple-500"
    default:
      return "text-foreground"
  }
}

export function MemberTimeline({ memberId, selectedDate, onDateSelect, joinDate }: MemberTimelineProps) {
  const [date, setDate] = useState<Date>(new Date(selectedDate))
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  // Filter events for selected date
  const dayEvents = timelineEvents.filter((event) => {
    if (event.isRange && event.endDate) {
      const selected = new Date(selectedDate);
      const start = new Date(event.date);
      const end = new Date(event.endDate)
      return selected >= start && selected <= end;
    } else {
      return event.date === selectedDate;
    }
  });

  // Get all events sorted by date
  const sortedEvents = [...timelineEvents].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const signUpDate = new Date(joinDate);
  const travelRanges = travelLog.map(trip => ({ from: new Date(trip.start_date), to: new Date(trip.end_date) }));

  // const recommendationDates = recommendationEvents.map(event => new Date(event.date));

  const modifiers = {
    signup: signUpDate,
    travel: travelRanges,
    // recommendation: recommendationDates,
    multipleEvents: (date) => {
        const eventsOnDay = timelineEvents.filter((event) => {
            if (event.isRange && event.endDate) {
                const d = new Date(date);
                const start = new Date(event.date);
                const end = new Date(event.endDate);
                return d >= start && d <= end;
            } else {
                return event.date === format(date, "yyyy-MM-dd");
            }
        });
        return eventsOnDay.length > 1;
    }
  }

  const modifiersClassNames = {
    signup: 'signup-day',
    travel: 'travel-day',
    recommendation: 'recommendation-day',
    multipleEvents: 'multiple-events-day',
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Timeline Overview */}
      <div className="xl:col-span-2 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">Journey Timeline</CardTitle>
            <CardDescription>Complete history of member interactions and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 sm:h-80 lg:h-96">
              <div className="space-y-4">
                {sortedEvents.map((event, index) => (
                  <div key={event.id} className="flex gap-4 pb-4 border-b border-border last:border-0">
                    <div className="flex flex-col items-center">
                      <div className={`p-2 rounded-full bg-muted ${getEventColor(event.type, event.status, event.color)}`}>
                        {getEventIcon(event.type)}
                      </div>
                      {index < sortedEvents.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
                        <h4 className="font-semibold text-sm">{event.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              event.status === "completed"
                                ? "default"
                                : event.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {event.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {event.isRange && event.endDate ? `${format(new Date(event.date), "MMM dd")} - ${format(new Date(event.endDate), "MMM dd")}` : format(new Date(event.date), "MMM dd")}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{event.description}</p>
                      {event.provider && <p className="text-xs text-muted-foreground">Provider: {event.provider}</p>}
                      {event.outcome && (
                        <p className="text-xs text-foreground font-medium mt-1">Outcome: {event.outcome}</p>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-6 px-2 text-xs"
                        onClick={() => setSelectedEvent(event)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Date Selector & Day View */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">Date Navigator</CardTitle>
            <CardDescription>Select a date to view specific day details</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate)
                  onDateSelect(format(newDate, "yyyy-MM-dd"))
                }
              }}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
              className="rounded-md border w-full"
            />
          </CardContent>
        </Card>

        {/* Selected Day Events */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif font-bold">{format(new Date(selectedDate), "MMMM dd, yyyy")}</CardTitle>
            <CardDescription>
              {dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""} on this day
            </CardDescription>
          </CardHeader>
          <CardContent>
            {dayEvents.length > 0 ? (
              <div className="space-y-3">
                {dayEvents.map((event) => (
                  <div key={event.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={getEventColor(event.type, event.status, event.color)}>{getEventIcon(event.type)}</div>
                      <h5 className="font-semibold text-sm">{event.title}</h5>
                    </div>
                    <p className="text-xs text-muted-foreground">{event.description}</p>
                    {event.provider && <p className="text-xs text-muted-foreground mt-1">Provider: {event.provider}</p>}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No events recorded for this date</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-serif font-bold">{selectedEvent.title}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(null)}>
                  ×
                </Button>
              </div>
              <CardDescription>{format(new Date(selectedEvent.date), "MMMM dd, yyyy")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h6 className="font-semibold text-sm mb-1">Description</h6>
                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
              </div>

              {selectedEvent.provider && (
                <div>
                  <h6 className="font-semibold text-sm mb-1">Provider</h6>
                  <p className="text-sm">{selectedEvent.provider}</p>
                </div>
              )}

              {selectedEvent.outcome && (
                <div>
                  <h6 className="font-semibold text-sm mb-1">Outcome</h6>
                  <p className="text-sm">{selectedEvent.outcome}</p>
                </div>
              )}

              {selectedEvent.reasoning && (
                <div>
                  <h6 className="font-semibold text-sm mb-1">Clinical Reasoning</h6>
                  <p className="text-sm text-muted-foreground">{selectedEvent.reasoning}</p>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    selectedEvent.status === "completed"
                      ? "default"
                      : selectedEvent.status === "pending"
                        ? "secondary"
                        : "destructive"
                  }
                >
                  {selectedEvent.status}
                </Badge>
                <Badge variant="outline">{selectedEvent.type}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}