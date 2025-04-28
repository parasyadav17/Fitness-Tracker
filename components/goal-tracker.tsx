"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, Check, Dumbbell, Flame, MapPin, Plus, Star, Target, Trophy } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function GoalTracker() {
  const [showNewGoalDialog, setShowNewGoalDialog] = useState(false)
  const [newGoalName, setNewGoalName] = useState("")
  const [newGoalType, setNewGoalType] = useState("distance")
  const [newGoalTarget, setNewGoalTarget] = useState("")
  const [newGoalDeadline, setNewGoalDeadline] = useState("")

  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Run 100km this month",
      type: "distance",
      icon: <MapPin className="h-4 w-4" />,
      target: 100,
      current: 42.5,
      unit: "km",
      deadline: "2024-05-30",
      rewards: 500,
      level: 2,
      badges: ["Consistent Runner", "Early Bird"],
      color: "blue",
    },
    {
      id: 2,
      name: "Burn 10,000 calories",
      type: "calories",
      icon: <Flame className="h-4 w-4" />,
      target: 10000,
      current: 4850,
      unit: "cal",
      deadline: "2024-05-15",
      rewards: 350,
      level: 3,
      badges: ["Calorie Crusher"],
      color: "orange",
    },
    {
      id: 3,
      name: "Complete 20 workouts",
      type: "workouts",
      icon: <Dumbbell className="h-4 w-4" />,
      target: 20,
      current: 8,
      unit: "",
      deadline: "2024-05-31",
      rewards: 400,
      level: 1,
      badges: ["Gym Rat"],
      color: "green",
    },
    {
      id: 4,
      name: "Run a half marathon",
      type: "achievement",
      icon: <Trophy className="h-4 w-4" />,
      target: 21.1,
      current: 0,
      unit: "km",
      deadline: "2024-06-30",
      rewards: 1000,
      level: 4,
      badges: [],
      color: "purple",
    },
  ])

  const addNewGoal = () => {
    if (newGoalName && newGoalType && newGoalTarget) {
      const iconMap = {
        distance: <MapPin className="h-4 w-4" />,
        calories: <Flame className="h-4 w-4" />,
        workouts: <Dumbbell className="h-4 w-4" />,
        achievement: <Trophy className="h-4 w-4" />,
      }

      const unitMap = {
        distance: "km",
        calories: "cal",
        workouts: "",
        achievement: "",
      }

      const colorMap = {
        distance: "blue",
        calories: "orange",
        workouts: "green",
        achievement: "purple",
      }

      const newGoal = {
        id: goals.length + 1,
        name: newGoalName,
        type: newGoalType,
        icon: iconMap[newGoalType],
        target: Number.parseFloat(newGoalTarget),
        current: 0,
        unit: unitMap[newGoalType],
        deadline: newGoalDeadline || "2024-06-30",
        rewards: Math.round(Number.parseFloat(newGoalTarget) * 10),
        level: 1,
        badges: [],
        color: colorMap[newGoalType],
      }

      setGoals([...goals, newGoal])
      setShowNewGoalDialog(false)

      // Reset form
      setNewGoalName("")
      setNewGoalType("distance")
      setNewGoalTarget("")
      setNewGoalDeadline("")
    }
  }

  const getProgressPercentage = (current, target) => {
    return Math.min(Math.round((current / target) * 100), 100)
  }

  const getColorClass = (color) => {
    const colorMap = {
      blue: "bg-polynesian-blue dark:bg-lapis-lazuli",
      orange: "bg-orange-crayola",
      green: "bg-emerald-500",
      purple: "bg-purple-500",
    }
    return colorMap[color] || "bg-primary"
  }

  const getBgColorClass = (color) => {
    const colorMap = {
      blue: "bg-polynesian-blue/20 dark:bg-lapis-lazuli/20",
      orange: "bg-orange-crayola/20",
      green: "bg-emerald-100 dark:bg-emerald-900/20",
      purple: "bg-purple-100 dark:bg-purple-900/20",
    }
    return colorMap[color] || "bg-primary/20"
  }

  const getTextColorClass = (color) => {
    const colorMap = {
      blue: "text-polynesian-blue dark:text-lapis-lazuli",
      orange: "text-orange-crayola",
      green: "text-emerald-600 dark:text-emerald-400",
      purple: "text-purple-600 dark:text-purple-400",
    }
    return colorMap[color] || "text-primary"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-polynesian-blue dark:text-beige">Goal Tracker</h2>
          <p className="text-muted-foreground">Set and track your fitness goals</p>
        </div>
        <Dialog open={showNewGoalDialog} onOpenChange={setShowNewGoalDialog}>
          <DialogTrigger asChild>
            <Button className="bg-orange-crayola hover:bg-orange-crayola/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-background border-polynesian-blue/20 dark:border-lapis-lazuli/20">
            <DialogHeader>
              <DialogTitle className="text-polynesian-blue dark:text-beige">Create New Goal</DialogTitle>
              <DialogDescription>Set a new fitness goal to track your progress</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  placeholder="Run 5K under 25 minutes"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-type">Goal Type</Label>
                <Select value={newGoalType} onValueChange={setNewGoalType}>
                  <SelectTrigger id="goal-type">
                    <SelectValue placeholder="Select goal type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="distance">Distance</SelectItem>
                    <SelectItem value="calories">Calories</SelectItem>
                    <SelectItem value="workouts">Workouts</SelectItem>
                    <SelectItem value="achievement">Achievement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-target">Target Value</Label>
                <Input
                  id="goal-target"
                  type="number"
                  placeholder="100"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="goal-deadline">Deadline (Optional)</Label>
                <Input
                  id="goal-deadline"
                  type="date"
                  value={newGoalDeadline}
                  onChange={(e) => setNewGoalDeadline(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewGoalDialog(false)}
                className="border-polynesian-blue text-polynesian-blue hover:bg-polynesian-blue/10 dark:border-lapis-lazuli dark:text-lapis-lazuli dark:hover:bg-lapis-lazuli/10"
              >
                Cancel
              </Button>
              <Button
                onClick={addNewGoal}
                className="bg-polynesian-blue hover:bg-polynesian-blue/90 dark:bg-lapis-lazuli dark:hover:bg-lapis-lazuli/90"
              >
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-background to-muted/30 border-polynesian-blue/20 dark:border-lapis-lazuli/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-polynesian-blue dark:text-beige">Active Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-polynesian-blue dark:text-beige">{goals.length}</div>
            <p className="text-xs text-muted-foreground">2 goals close to completion</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-background to-muted/30 border-orange-crayola/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-orange-crayola">Reward Points</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-crayola">1,250</div>
            <p className="text-xs text-muted-foreground">+350 this week</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-background to-muted/30 border-polynesian-blue/20 dark:border-lapis-lazuli/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-polynesian-blue dark:text-beige">Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-polynesian-blue dark:text-beige">8</div>
            <p className="text-xs text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-background to-muted/30 border-polynesian-blue/20 dark:border-lapis-lazuli/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-polynesian-blue dark:text-beige">Fitness Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-polynesian-blue dark:text-beige">Advanced</div>
            <p className="text-xs text-muted-foreground">Level 7</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="bg-muted/50 dark:bg-muted/30">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-polynesian-blue data-[state=active]:text-white dark:data-[state=active]:bg-lapis-lazuli"
          >
            Active Goals
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-polynesian-blue data-[state=active]:text-white dark:data-[state=active]:bg-lapis-lazuli"
          >
            Completed
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-polynesian-blue data-[state=active]:text-white dark:data-[state=active]:bg-lapis-lazuli"
          >
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {goals.map((goal) => (
            <Card
              key={goal.id}
              className="border-muted hover:border-polynesian-blue/30 dark:hover:border-lapis-lazuli/30 transition-colors"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className={`rounded-full p-2 ${getBgColorClass(goal.color)}`}>
                      <div className={getTextColorClass(goal.color)}>{goal.icon}</div>
                    </div>
                    <CardTitle className="text-polynesian-blue dark:text-beige">{goal.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="flex items-center gap-1 border-muted-foreground/30">
                      <Calendar className="h-3 w-3" />
                      {goal.deadline}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1 border-muted-foreground/30">
                      <Star className="h-3 w-3" />
                      Level {goal.level}
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  {goal.current} of {goal.target} {goal.unit} completed
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{getProgressPercentage(goal.current, goal.target)}%</span>
                  </div>
                  <Progress
                    value={getProgressPercentage(goal.current, goal.target)}
                    className={`h-2 bg-muted/50 dark:bg-muted/30`}
                    indicatorClassName={getColorClass(goal.color)}
                  />
                </div>
                {goal.badges.length > 0 && (
                  <div className="flex gap-2 mt-4">
                    {goal.badges.map((badge, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 bg-muted/50 dark:bg-muted/30 text-foreground"
                      >
                        <Award className="h-3 w-3" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
              <CardFooter className="pt-2">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Trophy className="h-4 w-4 text-orange-crayola" />
                    {goal.rewards} points
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-polynesian-blue text-polynesian-blue hover:bg-polynesian-blue/10 dark:border-lapis-lazuli dark:text-lapis-lazuli dark:hover:bg-lapis-lazuli/10"
                  >
                    Update Progress
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card className="border-muted hover:border-polynesian-blue/30 dark:hover:border-lapis-lazuli/30 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-polynesian-blue dark:text-beige">Run 50km in April</CardTitle>
                </div>
                <Badge className="bg-green-500 hover:bg-green-500/90">Completed</Badge>
              </div>
              <CardDescription>Completed on April 28, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Final Result</span>
                  <span>52.3 km</span>
                </div>
                <Progress value={100} className="h-2 bg-muted/50 dark:bg-muted/30" indicatorClassName="bg-green-500" />
              </div>
              <div className="flex gap-2 mt-4">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-muted/50 dark:bg-muted/30 text-foreground"
                >
                  <Award className="h-3 w-3" />
                  Overachiever
                </Badge>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-muted/50 dark:bg-muted/30 text-foreground"
                >
                  <Target className="h-3 w-3" />
                  Goal Crusher
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4 text-orange-crayola" />
                  300 points earned
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-polynesian-blue text-polynesian-blue hover:bg-polynesian-blue/10 dark:border-lapis-lazuli dark:text-lapis-lazuli dark:hover:bg-lapis-lazuli/10"
                >
                  View Details
                </Button>
              </div>
            </CardFooter>
          </Card>

          <Card className="border-muted hover:border-polynesian-blue/30 dark:hover:border-lapis-lazuli/30 transition-colors">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900/30">
                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-polynesian-blue dark:text-beige">Complete 15 workouts in March</CardTitle>
                </div>
                <Badge className="bg-green-500 hover:bg-green-500/90">Completed</Badge>
              </div>
              <CardDescription>Completed on March 29, 2024</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Final Result</span>
                  <span>15 workouts</span>
                </div>
                <Progress value={100} className="h-2 bg-muted/50 dark:bg-muted/30" indicatorClassName="bg-green-500" />
              </div>
              <div className="flex gap-2 mt-4">
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 bg-muted/50 dark:bg-muted/30 text-foreground"
                >
                  <Award className="h-3 w-3" />
                  Consistent
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Trophy className="h-4 w-4 text-orange-crayola" />
                  250 points earned
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-polynesian-blue text-polynesian-blue hover:bg-polynesian-blue/10 dark:border-lapis-lazuli dark:text-lapis-lazuli dark:hover:bg-lapis-lazuli/10"
                >
                  View Details
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-orange-crayola/20 hover:border-orange-crayola/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-orange-crayola/20 p-2">
                    <Trophy className="h-4 w-4 text-orange-crayola" />
                  </div>
                  <CardTitle className="text-base text-polynesian-blue dark:text-beige">5K Master</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Run 5K in under 25 minutes</p>
                <Badge className="mt-4 bg-green-500 hover:bg-green-500/90">Unlocked</Badge>
              </CardContent>
            </Card>

            <Card className="border-orange-crayola/20 hover:border-orange-crayola/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-orange-crayola/20 p-2">
                    <Trophy className="h-4 w-4 text-orange-crayola" />
                  </div>
                  <CardTitle className="text-base text-polynesian-blue dark:text-beige">Calorie Crusher</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Burn 5,000 calories in a week</p>
                <Badge className="mt-4 bg-green-500 hover:bg-green-500/90">Unlocked</Badge>
              </CardContent>
            </Card>

            <Card className="border-orange-crayola/20 hover:border-orange-crayola/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-orange-crayola/20 p-2">
                    <Trophy className="h-4 w-4 text-orange-crayola" />
                  </div>
                  <CardTitle className="text-base text-polynesian-blue dark:text-beige">Early Bird</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Complete 10 workouts before 8 AM</p>
                <Badge className="mt-4 bg-green-500 hover:bg-green-500/90">Unlocked</Badge>
              </CardContent>
            </Card>

            <Card className="border-polynesian-blue/20 dark:border-lapis-lazuli/20 hover:border-polynesian-blue/40 dark:hover:border-lapis-lazuli/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-polynesian-blue/20 p-2 dark:bg-lapis-lazuli/20">
                    <Trophy className="h-4 w-4 text-polynesian-blue dark:text-lapis-lazuli" />
                  </div>
                  <CardTitle className="text-base text-polynesian-blue dark:text-beige">Half Marathon</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Complete a 21.1 km run</p>
                <div className="mt-4">
                  <Progress
                    value={60}
                    className="h-2 bg-muted/50 dark:bg-muted/30"
                    indicatorClassName="bg-polynesian-blue dark:bg-lapis-lazuli"
                  />
                  <p className="text-xs text-muted-foreground mt-1">12.5 km longest run</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-crayola/20 hover:border-orange-crayola/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-orange-crayola/20 p-2">
                    <Trophy className="h-4 w-4 text-orange-crayola" />
                  </div>
                  <CardTitle className="text-base text-polynesian-blue dark:text-beige">Gym Rat</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Complete 50 workouts</p>
                <Badge className="mt-4 bg-green-500 hover:bg-green-500/90">Unlocked</Badge>
              </CardContent>
            </Card>

            <Card className="border-polynesian-blue/20 dark:border-lapis-lazuli/20 hover:border-polynesian-blue/40 dark:hover:border-lapis-lazuli/40 transition-colors">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-polynesian-blue/20 p-2 dark:bg-lapis-lazuli/20">
                    <Trophy className="h-4 w-4 text-polynesian-blue dark:text-lapis-lazuli" />
                  </div>
                  <CardTitle className="text-base text-polynesian-blue dark:text-beige">Consistency King</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Work out 5 days in a row for 4 weeks</p>
                <div className="mt-4">
                  <Progress
                    value={75}
                    className="h-2 bg-muted/50 dark:bg-muted/30"
                    indicatorClassName="bg-polynesian-blue dark:bg-lapis-lazuli"
                  />
                  <p className="text-xs text-muted-foreground mt-1">3 weeks completed</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
