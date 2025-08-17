import conversations from "@/data/all_conversations.json"

const colors = ["red", "pink", "orange", "yellow", "blue", "purple"]

const getRandomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toISOString().split("T")[0]
}

const getRandomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)]
}

export const getRecommendationEvents = () => {
  const recommendationEvents = []
  const startDate = new Date("2025-01-01")
  const endDate = new Date("2025-08-31")

  conversations.forEach((conversation, convIndex) => {
    const experts = conversation.participants.filter(
      (p) => p !== "Member" && p !== "Concierge"
    )

    if (experts.length > 0) {
      const lastExpertMessage = conversation.conversation.findLast((msg) => {
        const participant = msg.split(":")[0]
        return experts.includes(participant)
      })

      if (lastExpertMessage) {
        const randomDate = getRandomDate(startDate, endDate)
        const randomColor = getRandomColor()
        recommendationEvents.push({
          id: `rec-${convIndex}`,
          date: randomDate,
          type: "recommendation" as const,
          title: `Expert Recommendation by ${experts.join(", ")}`,
          description: lastExpertMessage,
          status: "completed" as const,
          color: randomColor,
        })
      }
    }
  })
  return recommendationEvents
}
