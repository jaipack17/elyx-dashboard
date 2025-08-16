"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"
import { format } from "date-fns"
import allConversations from "@/data/all_conversations.json"

interface ChatAgentProps {
  memberId: string
}

export function ChatAgent({ memberId }: ChatAgentProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date("2025-01-15"))

  const conversationsForSelectedDate = allConversations.filter(
    (conv) => conv.date === (selectedDate ? format(selectedDate, "yyyy-MM-dd") : "")
  )

  const daysWithConversations = allConversations.map((conv) => new Date(conv.date));

  const modifiers = {
    hasConversation: daysWithConversations,
  }

  const modifiersClassNames = {
    hasConversation: 'has-conversation-day',
  }

  const getInitials = (name: string) => {
    if (!name) return ""
    const nameParts = name.split(" ")
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    } else {
      return name.substring(0, 2).toUpperCase()
    }
  }

  const renderMessage = (message: string) => {
    const parts = message.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Conversation Calendar</CardTitle>
            <CardDescription>Select a date to view conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
            />
          </CardContent>
        </Card>
      </div>
      <div className="xl:col-span-2 space-y-4">
        {conversationsForSelectedDate.length > 0 ? (
          conversationsForSelectedDate.map((conversation, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{conversation.event_type}</CardTitle>
                <CardDescription>{conversation.event_description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-72">
                  <div className="space-y-4">
                    {conversation.conversation.map((message, msgIndex) => {
                      const [participant, ...text] = message.split(":")
                      const isUser = participant.includes("Rohan Patel")

                      return (
                        <div
                          key={msgIndex}
                          className={`flex gap-3 ${
                            isUser ? "justify-end" : ""
                          }`}>
                          {!isUser && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {getInitials(participant)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 ${
                              isUser
                                ? "bg-primary text-primary-foreground ml-auto"
                                : "bg-muted text-muted-foreground"
                            }`}>
                            <p className="font-semibold text-sm">{participant}</p>
                            <div className="whitespace-pre-wrap text-sm">{renderMessage(text.join(":"))}</div>
                          </div>
                          {isUser && (
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarFallback className="bg-primary text-primary-foreground">
                                <User className="h-4 w-4" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex items-center justify-center h-72">
              <p className="text-muted-foreground">No conversations for this date</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}