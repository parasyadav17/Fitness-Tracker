"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Flame, Plus, Save } from "lucide-react"

// MET values for different activities (Metabolic Equivalent of Task)
const activities = [
  { name: "Running (8 mph)", met: 11.8 },
  { name: "Running (6 mph)", met: 9.8 },
  { name: "Cycling (12-14 mph)", met: 8.0 },
  { name: "Swimming (freestyle, moderate)", met: 7.0 },
  { name: "Basketball", met: 6.5 },
  { name: "Soccer", met: 7.0 },
  { name: "Tennis", met: 7.3 },
  { name: "Weight lifting (vigorous)", met: 6.0 },
  { name: "Weight lifting (light)", met: 3.5 },
  { name: "Walking (4 mph)", met: 4.3 },
]

export function CalorieCalculator() {
  const [weight, setWeight] = useState(70) // in kg
  const [activity, setActivity] = useState("Running (6 mph)")
  const [duration, setDuration] = useState(30) // in minutes
  const [caloriesBurned, setCaloriesBurned] = useState(0)
  const [recentActivities, setRecentActivities] = useState([
    { activity: "Running (6 mph)", duration: 45, calories: 520 },
    { activity: "Weight lifting (vigorous)", duration: 60, calories: 420 },
    { activity: "Basketball", duration: 90, calories: 680 },
  ])

  const calculateCalories = () => {
    // Formula: Calories = MET × weight (kg) × duration (hours)
    const selectedActivity = activities.find((a) => a.name === activity)
    if (selectedActivity) {
      const durationInHours = duration / 60
      const calories = Math.round(selectedActivity.met * weight * durationInHours)
      setCaloriesBurned(calories)
    }
  }

  const saveActivity = () => {
    if (caloriesBurned > 0) {
      const newActivity = {
        activity,
        duration,
        calories: caloriesBurned,
      }
      setRecentActivities([newActivity, ...recentActivities])
      // Reset calculator
      setCaloriesBurned(0)
    }
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-polynesian-blue/20 dark:border-lapis-lazuli/20">
        <CardHeader className="bg-gradient-to-r from-polynesian-blue/10 to-lapis-lazuli/5 dark:from-lapis-lazuli/10 dark:to-polynesian-blue/5 rounded-t-lg">
          <CardTitle className="text-polynesian-blue dark:text-beige">Calorie Calculator</CardTitle>
          <CardDescription>Calculate calories burned during your activities</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="activity">Activity Type</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger id="activity">
                <SelectValue placeholder="Select activity" />
              </SelectTrigger>
              <SelectContent>
                {activities.map((act) => (
                  <SelectItem key={act.name} value={act.name}>
                    {act.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (minutes)</Label>
            <Input id="duration" type="number" value={duration} onChange={(e) => setDuration(Number(e.target.value))} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            onClick={calculateCalories}
            className="bg-polynesian-blue hover:bg-polynesian-blue/90 dark:bg-lapis-lazuli dark:hover:bg-lapis-lazuli/90"
          >
            Calculate
          </Button>
          <Button
            variant="outline"
            onClick={saveActivity}
            disabled={caloriesBurned === 0}
            className="border-polynesian-blue text-polynesian-blue hover:bg-polynesian-blue/10 dark:border-lapis-lazuli dark:text-lapis-lazuli dark:hover:bg-lapis-lazuli/10"
          >
            <Save className="mr-2 h-4 w-4" />
            Save Activity
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-orange-crayola/20">
        <CardHeader className="bg-gradient-to-r from-orange-crayola/10 to-peach/20 rounded-t-lg">
          <CardTitle className="text-orange-crayola">Results</CardTitle>
          <CardDescription>Your calculated calorie burn</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {caloriesBurned > 0 ? (
            <div className="rounded-lg bg-orange-crayola/10 p-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-orange-crayola/20 p-3">
                  <Flame className="h-6 w-6 text-orange-crayola" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-crayola">{caloriesBurned} calories</div>
                  <p className="text-sm text-muted-foreground">
                    {activity} for {duration} minutes
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-[100px] items-center justify-center rounded-lg border border-dashed border-muted-foreground/20">
              <p className="text-sm text-muted-foreground">Calculate to see results</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="md:col-span-2 border-peach/30">
        <CardHeader className="bg-gradient-to-r from-peach/20 to-peach/10 rounded-t-lg">
          <CardTitle className="text-polynesian-blue dark:text-beige">Recent Activities</CardTitle>
          <CardDescription>Your logged exercise activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-muted p-4 hover:bg-muted/20 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-orange-crayola/20 p-2">
                    <Flame className="h-4 w-4 text-orange-crayola" />
                  </div>
                  <div>
                    <p className="font-medium text-polynesian-blue dark:text-beige">{item.activity}</p>
                    <p className="text-sm text-muted-foreground">{item.duration} minutes</p>
                  </div>
                </div>
                <div className="font-bold text-orange-crayola">{item.calories} calories</div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full border-polynesian-blue text-polynesian-blue hover:bg-polynesian-blue/10 dark:border-lapis-lazuli dark:text-lapis-lazuli dark:hover:bg-lapis-lazuli/10"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Manual Entry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
