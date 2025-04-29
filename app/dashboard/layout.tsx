"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, BarChart3, Calendar, Flame, Home, MapPin, Menu, Settings, Target, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: <Home className="h-4 w-4" />,
      exact: true,
    },
    {
      href: "/dashboard/calories",
      label: "Calories",
      icon: <Flame className="h-4 w-4" />,
    },
    {
      href: "/dashboard/running",
      label: "Running",
      icon: <MapPin className="h-4 w-4" />,
    },
    {
      href: "/dashboard/goals",
      label: "Goals",
      icon: <Target className="h-4 w-4" />,
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      icon: <BarChart3 className="h-4 w-4" />,
    },
    {
      href: "/dashboard/calendar",
      label: "Calendar",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: <Settings className="h-4 w-4" />,
    },
  ]

  const isActive = (route: { href: string; exact?: boolean }) => {
    if (route.exact) {
      return pathname === route.href
    }
    return pathname.startsWith(route.href)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="border-r bg-muted/40 dark:bg-muted/20 md:w-64 md:flex-col md:fixed md:inset-y-0 hidden md:flex">
          <div className="flex h-14 items-center border-b px-4 py-2">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Activity className="h-6 w-6 text-orange-crayola" />
              <span>AthleteTrack</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-2 text-sm font-medium">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                    isActive(route)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                  href={route.href}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <Card>
              <CardHeader className="p-2">
                <CardTitle className="text-sm">Profile</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="flex items-center gap-2">
                  <div className="rounded-full bg-accent p-1">
                    <User className="h-4 w-4 text-accent-foreground" />
                  </div>
                  <div className="text-xs">
                    <div className="font-medium">Alex Johnson</div>
                    <div className="text-muted-foreground">Athlete</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex flex-col md:pl-64 flex-1">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:gap-8 md:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className="flex h-14 items-center border-b px-4 py-2">
                  <Link className="flex items-center gap-2 font-semibold" href="/">
                    <Activity className="h-6 w-6 text-orange-crayola" />
                    <span>AthleteTrack</span>
                  </Link>
                </div>
                <nav className="grid items-start px-2 py-4 text-sm font-medium">
                  {routes.map((route) => (
                    <Link
                      key={route.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                        isActive(route)
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      href={route.href}
                    >
                      {route.icon}
                      {route.label}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t">
                  <Card>
                    <CardHeader className="p-2">
                      <CardTitle className="text-sm">Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="p-2">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-accent p-1">
                          <User className="h-4 w-4 text-accent-foreground" />
                        </div>
                        <div className="text-xs">
                          <div className="font-medium">User@017</div>
                          <div className="text-muted-foreground">Sportsman</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </SheetContent>
            </Sheet>
            <div className="flex-1">
              <h1 className="font-semibold text-lg md:text-xl">
                {routes.find((route) => isActive(route))?.label || "Dashboard"}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Button variant="outline" size="sm">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
