"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Play, StopCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function RunningTracker() {
  const [isTracking, setIsTracking] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [pace, setPace] = useState("0:00")
  const [calories, setCalories] = useState(0)
  const [startTime, setStartTime] = useState(null)
  const [pastRuns, setPastRuns] = useState([
    {
      date: "2024-04-25",
      distance: 5.2,
      duration: 28 * 60,
      pace: "5:23",
      calories: 420,
      route: "Morning Park Loop",
    },
    {
      date: "2024-04-23",
      distance: 3.8,
      duration: 22 * 60,
      pace: "5:47",
      calories: 310,
      route: "Neighborhood Run",
    },
    {
      date: "2024-04-20",
      distance: 8.1,
      duration: 48 * 60,
      pace: "5:55",
      calories: 650,
      route: "Riverside Trail",
    },
  ])

  // Simulate GPS tracking
  useEffect(() => {
    let interval

    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)

        // Simulate distance increase (random pace between 4-6 min/km)
        const paceVariation = 4 + Math.random() * 2
        const distanceIncrement = 1 / (paceVariation * 60)

        setDistance((prev) => {
          const newDistance = prev + distanceIncrement

          // Calculate pace (min:sec per km)
          const paceInSeconds = elapsedTime / newDistance
          const paceMinutes = Math.floor(paceInSeconds / 60)
          const paceSeconds = Math.floor(paceInSeconds % 60)
          setPace(`${paceMinutes}:${paceSeconds.toString().padStart(2, "0")}`)

          // Calculate calories (rough estimate: ~70 calories per km for a 70kg person)
          setCalories(Math.round(newDistance * 70))

          return newDistance
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isTracking, elapsedTime])

  const startTracking = () => {
    setIsTracking(true)
    setStartTime(new Date())
    setElapsedTime(0)
    setDistance(0)
    setPace("0:00")
    setCalories(0)
  }

  const stopTracking = () => {
    setIsTracking(false)

    // Only save if we have some meaningful distance
    if (distance > 0.1) {
      const newRun = {
        date: new Date().toISOString().split("T")[0],
        distance: Number.parseFloat(distance.toFixed(2)),
        duration: elapsedTime,
        pace,
        calories,
        route: "Quick Run",
      }

      setPastRuns([newRun, ...pastRuns])
    }
  }

  // Format time as MM:SS or HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="md:col-span-2 border-polynesian-blue/20 dark:border-lapis-lazuli/20">
        <CardHeader className="bg-gradient-to-r from-polynesian-blue/10 to-lapis-lazuli/5 dark:from-lapis-lazuli/10 dark:to-polynesian-blue/5 rounded-t-lg">
          <CardTitle className="text-polynesian-blue dark:text-beige">Running Tracker</CardTitle>
          <CardDescription>Track your runs with GPS for distance and pace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-polynesian-blue dark:text-beige">Distance</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-polynesian-blue dark:text-beige">{distance.toFixed(2)} km</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-polynesian-blue dark:text-beige">Time</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-polynesian-blue dark:text-beige">{formatTime(elapsedTime)}</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-polynesian-blue dark:text-beige">Pace</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-polynesian-blue dark:text-beige">{pace} /km</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-background to-muted/30">
              <CardHeader className="p-4">
                <CardTitle className="text-sm font-medium text-orange-crayola">Calories</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold text-orange-crayola">{calories}</div>
              </CardContent>
            </Card>
          </div>

          <div className="rounded-lg border border-muted p-4">
            <div className="aspect-video relative bg-muted/50 dark:bg-muted/30 rounded-md overflow-hidden">
              {/* Simulated map view */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isTracking ? (
                  <div className="text-center">
                    <Badge
                      variant="outline"
                      className="mb-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-green-300 dark:border-green-700"
                    >
                      GPS Active
                    </Badge>
                    <div className="text-sm text-muted-foreground">Tracking your run...</div>
                  </div>
                ) : (
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">Start tracking to see your route</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {!isTracking ? (
            <Button
              onClick={startTracking}
              className="w-full bg-polynesian-blue hover:bg-polynesian-blue/90 dark:bg-lapis-lazuli dark:hover:bg-lapis-lazuli/90"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Tracking
            </Button>
          ) : (
            <Button onClick={stopTracking} variant="destructive" className="w-full">
              <StopCircle className="mr-2 h-4 w-4" />
              Stop Tracking
            </Button>
          )}
        </CardFooter>
      </Card>

      <Card className="md:col-span-2 border-peach/30">
        <CardHeader className="bg-gradient-to-r from-peach/20 to-peach/10 rounded-t-lg">
          <CardTitle className="text-polynesian-blue dark:text-beige">Running History</CardTitle>
          <CardDescription>Your past running activities</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="space-y-4">
            <TabsList className="bg-muted/50 dark:bg-muted/30">
              <TabsTrigger
                value="list"
                className="data-[state=active]:bg-polynesian-blue data-[state=active]:text-white dark:data-[state=active]:bg-lapis-lazuli"
              >
                List View
              </TabsTrigger>
              <TabsTrigger
                value="stats"
                className="data-[state=active]:bg-polynesian-blue data-[state=active]:text-white dark:data-[state=active]:bg-lapis-lazuli"
              >
                Statistics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {pastRuns.map((run, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center justify-between rounded-lg border border-muted p-4 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-full bg-polynesian-blue/20 p-2 dark:bg-lapis-lazuli/20">
                      <MapPin className="h-4 w-4 text-polynesian-blue dark:text-lapis-lazuli" />
                    </div>
                    <div>
                      <p className="font-medium text-polynesian-blue dark:text-beige">{run.route}</p>
                      <p className="text-sm text-muted-foreground">{run.date}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4 md:mt-0">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="font-medium text-polynesian-blue dark:text-beige">{run.distance} km</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Time</p>
                      <p className="font-medium text-polynesian-blue dark:text-beige">{formatTime(run.duration)}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Pace</p>
                      <p className="font-medium text-polynesian-blue dark:text-beige">{run.pace} /km</p>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="stats">
              <div className="space-y-4">
                <Card className="border-polynesian-blue/20 dark:border-lapis-lazuli/20">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-polynesian-blue dark:text-beige">Weekly Distance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[120px] flex items-end gap-2">
                      {[30, 45, 80, 60, 20, 90, 40].map((height, i) => (
                        <div key={i} className="relative h-full w-full">
                          <div
                            className="absolute bottom-0 w-full rounded-md bg-polynesian-blue dark:bg-lapis-lazuli"
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                      <div>Mon</div>
                      <div>Tue</div>
                      <div>Wed</div>
                      <div>Thu</div>
                      <div>Fri</div>
                      <div>Sat</div>
                      <div>Sun</div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-polynesian-blue/20 dark:border-lapis-lazuli/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-polynesian-blue dark:text-beige">Monthly Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm">Total Distance</span>
                          <span className="text-sm font-medium text-polynesian-blue dark:text-beige">42.5 km</span>
                        </div>
                        <Progress
                          value={70}
                          className="h-2 mt-1 bg-muted/50 dark:bg-muted/30"
                          indicatorClassName="bg-polynesian-blue dark:bg-lapis-lazuli"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm">Avg. Pace</span>
                          <span className="text-sm font-medium text-polynesian-blue dark:text-beige">5:38 /km</span>
                        </div>
                        <Progress
                          value={65}
                          className="h-2 mt-1 bg-muted/50 dark:bg-muted/30"
                          indicatorClassName="bg-polynesian-blue dark:bg-lapis-lazuli"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <span className="text-sm">Longest Run</span>
                          <span className="text-sm font-medium text-polynesian-blue dark:text-beige">8.1 km</span>
                        </div>
                        <Progress
                          value={80}
                          className="h-2 mt-1 bg-muted/50 dark:bg-muted/30"
                          indicatorClassName="bg-polynesian-blue dark:bg-lapis-lazuli"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-orange-crayola/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm text-orange-crayola">Personal Records</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">5K</span>
                        <Badge className="bg-orange-crayola hover:bg-orange-crayola/90">24:12</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">10K</span>
                        <Badge className="bg-orange-crayola hover:bg-orange-crayola/90">52:38</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Half Marathon</span>
                        <Badge className="bg-orange-crayola hover:bg-orange-crayola/90">1:58:45</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
