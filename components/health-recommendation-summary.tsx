"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import healthProfile from "@/data/health_profile.json"

export function HealthRecommendationSummary() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-2xl font-serif font-bold">Health Recommendation Summary</h3>
          <p className="text-muted-foreground">A summary of your health recommendations</p>
        </div>
      </div>
      <Card>
        <CardContent>
          <ScrollArea className="h-96">
            <div className="space-y-4 pr-4">
              {Object.entries(healthProfile).map(([key, value]) => (
                <div key={key}>
                  <h3 className="text-lg font-semibold capitalize">{key.replace(/_/g, " ")}</h3>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    {value.map((item, index) => (
                      <li key={index} className="text-sm text-muted-foreground">
                        {typeof item === 'string' ? item : (
                          <div>
                            {Object.entries(item).map(([itemKey, itemValue]) => (
                              <div key={itemKey}>
                                <span className="font-semibold">{itemKey.replace(/_/g, " ")}: </span>
                                <span>{itemValue}</span>
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
        </CardContent>
      </Card>
    </div>
  )
}
