import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AnalyticsPage() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Distance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156.8 km</div>
            <p className="text-xs text-muted-foreground">+24.5 km this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Calories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,480</div>
            <p className="text-xs text-muted-foreground">+1,248 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Days</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18/30</div>
            <p className="text-xs text-muted-foreground">60% active rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Your fitness performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Running Pace</div>
                    <div className="text-sm text-muted-foreground">5:38 min/km</div>
                  </div>
                  <div className="h-2 relative rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="h-full bg-blue-500 w-[65%]" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div>Slower</div>
                    <div>Faster</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Endurance</div>
                    <div className="text-sm text-muted-foreground">Good</div>
                  </div>
                  <div className="h-2 relative rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="h-full bg-green-500 w-[75%]" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div>Low</div>
                    <div>High</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Consistency</div>
                    <div className="text-sm text-muted-foreground">Excellent</div>
                  </div>
                  <div className="h-2 relative rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="h-full bg-purple-500 w-[85%]" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div>Inconsistent</div>
                    <div>Consistent</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Recovery</div>
                    <div className="text-sm text-muted-foreground">Average</div>
                  </div>
                  <div className="h-2 relative rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <div className="h-full bg-orange-500 w-[55%]" />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <div>Slow</div>
                    <div>Fast</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Your progress over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-end gap-2">
                {[
                  { month: "Nov", distance: 35, calories: 3200 },
                  { month: "Dec", distance: 42, calories: 3800 },
                  { month: "Jan", distance: 28, calories: 2500 },
                  { month: "Feb", distance: 45, calories: 4100 },
                  { month: "Mar", distance: 60, calories: 5400 },
                  { month: "Apr", distance: 52, calories: 4700 },
                ].map((data, i) => (
                  <div key={i} className="relative h-full w-full flex flex-col items-center gap-1">
                    <div className="absolute bottom-8 text-xs text-muted-foreground">{data.month}</div>
                    <div
                      className="w-full rounded-md bg-blue-500"
                      style={{ height: `${(data.distance / 60) * 70}%` }}
                    ></div>
                    <div
                      className="w-full rounded-md bg-orange-500 mt-1"
                      style={{ height: `${(data.calories / 5400) * 70}%` }}
                    ></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Distance (km)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                  <span className="text-sm">Calories</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compare with Others</CardTitle>
              <CardDescription>See how you compare to other athletes in your age group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Weekly Distance</div>
                    <div className="text-sm text-muted-foreground">24.5 km (Top 25%)</div>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Average Pace</div>
                    <div className="text-sm text-muted-foreground">5:38 min/km (Top 40%)</div>
                  </div>
                  <Progress value={60} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Workout Frequency</div>
                    <div className="text-sm text-muted-foreground">4.2 days/week (Top 30%)</div>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Goal Completion Rate</div>
                    <div className="text-sm text-muted-foreground">85% (Top 15%)</div>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
