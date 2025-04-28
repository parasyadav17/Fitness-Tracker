import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="#">
          <span className="font-bold text-xl text-polynesian-blue dark:text-lapis-lazuli">AthleteTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="/dashboard">
            Login
          </Link>
          <ThemeToggle />
        </nav>
      </header>
      <main className="flex-1">
  <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
    <div className="container px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-polynesian-blue dark:text-beige">
              Track Your Fitness Journey Like a Pro
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Designed specifically for athletes and sports enthusiasts. Set goals, track calories, monitor your
              runs, and achieve your fitness targets with our comprehensive tracking tools.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Link href="/dashboard">
              <Button className="px-8 bg-orange-crayola hover:bg-orange-crayola/90 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="px-8 border-polynesian-blue dark:border-lapis-lazuli">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            alt="Athlete tracking fitness goals"
            className="aspect-video overflow-hidden rounded-xl object-cover object-center"
            src="/placeholder.jpg?height=550&width=750"
          />
        </div>
      </div>
    </div>
  </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-polynesian-blue dark:text-beige">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Everything you need to track your fitness journey and achieve your goals
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-crayola/20 dark:bg-orange-crayola/10">
                  <svg
                    className="h-8 w-8 text-orange-crayola"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.743-.953l.093-.778c.232-1.939-1.329-3.618-3.262-3.521a3.008 3.008 0 0 0-2.831 3.2l.04.63c.1.803-.549 1.5-1.357 1.5H9.24c-.809 0-1.458-.697-1.357-1.5l.04-.63a3.008 3.008 0 0 0-2.831-3.2c-1.933-.098-3.494 1.582-3.262 3.521l.093.778c.059.472-.273.882-.743.953a.98.98 0 0 1-.837-.276L1.705 13.7C1.235 13.233 1 12.617 1 12s.235-1.234.706-1.704l1.568-1.568c.23-.23.338-.556.289-.878-.201-1.328.521-2.532 1.676-3.066.703-.324 1.5-.391 2.25-.186.75.204 1.356.683 1.7 1.325.276.514.833.783 1.394.783h4.834c.56 0 1.118-.27 1.394-.783.344-.642.95-1.121 1.7-1.325.75-.205 1.547-.138 2.25.186 1.155.534 1.877 1.738 1.676 3.066Z" />
                    <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-polynesian-blue dark:text-beige">Calorie Tracking</h3>
                  <p className="text-muted-foreground">
                    Automatically calculate calories burned based on your exercise type, duration, and intensity.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-polynesian-blue/20 dark:bg-lapis-lazuli/20">
                  <svg
                    className="h-8 w-8 text-polynesian-blue dark:text-lapis-lazuli"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-polynesian-blue dark:text-beige">GPS Running Tracker</h3>
                  <p className="text-muted-foreground">
                    Track your running sessions with GPS for accurate distance, speed, and route mapping.
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-peach/50 dark:bg-peach/20">
                  <svg
                    className="h-8 w-8 text-orange-crayola"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2v4" />
                    <path d="m16.24 7.76-2.12 2.12" />
                    <path d="M21 12h-4" />
                    <path d="m16.24 16.24-2.12-2.12" />
                    <path d="M12 21v-4" />
                    <path d="m7.76 16.24 2.12-2.12" />
                    <path d="M3 12h4" />
                    <path d="m7.76 7.76 2.12 2.12" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-polynesian-blue dark:text-beige">Gamified Goal Tracking</h3>
                  <p className="text-muted-foreground">
                    Set personal fitness goals and track your progress with our engaging gamified system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 AthleteTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}
