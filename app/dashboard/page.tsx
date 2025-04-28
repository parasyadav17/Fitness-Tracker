import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, MapPin, Medal, Dumbbell, Trophy } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Calories Burned</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distance Covered</CardTitle>
            <MapPin className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5 km</div>
            <p className="text-xs text-muted-foreground">+3.2 km from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/5</div>
            <p className="text-xs text-muted-foreground">2 goals close to completion</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-end gap-2">
              {[40, 25, 55, 32, 80, 45, 60].map((height, i) => (
                <div key={i} className="relative h-full w-full">
                  <div
                    className="absolute bottom-0 w-full rounded-md bg-primary"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm">
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
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest fitness milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                  <Medal className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">5K Run Completed</p>
                  <p className="text-xs text-muted-foreground">Yesterday at 8:45 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                  <Dumbbell className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Strength Goal Reached</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                  <Flame className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">1000 Calorie Day</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
