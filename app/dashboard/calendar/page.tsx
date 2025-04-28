"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Dumbbell, Flame, MapPin } from "lucide-react"

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Sample workout data
  const workoutData = {
    "2024-04-29": { type: "run", distance: 5.2, calories: 420, duration: 28 },
    "2024-04-27": { type: "gym", calories: 350, duration: 60 },
    "2024-04-26": { type: "run", distance: 3.8, calories: 310, duration: 22 },
    "2024-04-24": { type: "gym", calories: 380, duration: 65 },
    "2024-04-23": { type: "run", distance: 8.1, calories: 650, duration: 48 },
    "2024-04-21": { type: "gym", calories: 320, duration: 55 },
    "2024-04-20": { type: "run", distance: 4.5, calories: 360, duration: 26 },
    "2024-04-18": { type: "gym", calories: 400, duration: 70 },
    "2024-04-17": { type: "run", distance: 6.2, calories: 480, duration: 35 },
    "2024-04-15": { type: "gym", calories: 330, duration: 60 },
  }

  // Function to format date as YYYY-MM-DD for lookup
  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0]
  }

  // Get workout for selected date
  const selectedWorkout = date ? workoutData[formatDate(date)] : null

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Workout Calendar</CardTitle>
          <CardDescription>Track your workout schedule and history</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
            modifiers={{
              workout: (date) => {
                const dateStr = formatDate(date)
                return dateStr in workoutData
              },
              run: (date) => {
                const dateStr = formatDate(date)
                return dateStr in workoutData && workoutData[dateStr].type === "run"
              },
              gym: (date) => {
                const dateStr = formatDate(date)
                return dateStr in workoutData && workoutData[dateStr].type === "gym"
              },
            }}
            modifiersStyles={{
              workout: {
                fontWeight: "bold",
              },
              run: {
                color: "#3b82f6",
              },
              gym: {
                color: "#10b981",
              },
            }}
          />
          <div className="flex justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500"></div>
              <span className="text-sm">Running</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Gym</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {date ? (
              <>
                Workout Details: {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </>
            ) : (
              <>Select a Date</>
            )}
          </CardTitle>
          <CardDescription>
            {selectedWorkout
              ? selectedWorkout.type === "run"
                ? "Running session details"
                : "Gym workout details"
              : "No workout scheduled for this day"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedWorkout ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-full p-3 ${
                    selectedWorkout.type === "run" ? "bg-blue-100 dark:bg-blue-900" : "bg-green-100 dark:bg-green-900"
                  }`}
                >
                  {selectedWorkout.type === "run" ? (
                    <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Dumbbell className="h-6 w-6 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-lg">
                    {selectedWorkout.type === "run" ? "Running Session" : "Gym Workout"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedWorkout.duration} minutes • {selectedWorkout.calories} calories
                  </p>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Duration</span>
                  <Badge variant="outline">{selectedWorkout.duration} min</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Calories Burned</span>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    {selectedWorkout.calories}
                  </Badge>
                </div>
                {selectedWorkout.type === "run" && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Distance</span>
                      <Badge variant="outline">{selectedWorkout.distance} km</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg. Pace</span>
                      <Badge variant="outline">
                        {Math.floor(selectedWorkout.duration / selectedWorkout.distance)}:
                        {Math.round(((selectedWorkout.duration / selectedWorkout.distance) % 1) * 60)
                          .toString()
                          .padStart(2, "0")}{" "}
                        min/km
                      </Badge>
                    </div>
                  </>
                )}
              </div>

              <div className="pt-4 border-t">
                <h4 className="text-sm font-medium mb-2">Notes</h4>
                {selectedWorkout.type === "run" ? (
                  <p className="text-sm text-muted-foreground">
                    Good {selectedWorkout.distance > 5 ? "long" : "short"} run with steady pace. Weather was perfect for
                    running. Felt strong throughout the session.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Focused on {selectedWorkout.duration > 60 ? "upper body and core" : "lower body"} today. Increased
                    weights on main lifts. Good energy levels throughout.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <p className="text-muted-foreground mb-4">No workout data for this date</p>
              <Badge variant="outline">Select a highlighted date to view workout details</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
