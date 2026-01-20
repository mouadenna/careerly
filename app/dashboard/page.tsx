"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useProfile } from "@/context/profile-context"
import { useJobs } from "@/context/jobs-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CareerVelocityChart, JobApplicationsChart, SkillsDistributionChart } from "@/components/dashboard-chart"
import { LogOut, Settings, Bell, TrendingUp, Briefcase, Target, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { profile } = useProfile()
  const { filteredJobs } = useJobs()

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Top Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Careerly</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hover:bg-muted">
              <Bell className="w-5 h-5 text-foreground/70" />
            </Button>
            <Link href="/personas">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <Users className="w-5 h-5 text-foreground/70" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <Settings className="w-5 h-5 text-foreground/70" />
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="hover:bg-muted">
              <LogOut className="w-5 h-5 text-foreground/70" />
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {user.fullName}</h1>
          <p className="text-foreground/70">Here's your career analytics and job recommendations</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/70 text-sm mb-1">Profile Strength</p>
                <p className="text-3xl font-bold text-primary">87%</p>
              </div>
              <Target className="w-8 h-8 text-primary/20" />
            </div>
          </Card>

          <Card className="border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/70 text-sm mb-1">Matched Jobs</p>
                <p className="text-3xl font-bold text-accent">{filteredJobs.length}</p>
              </div>
              <Briefcase className="w-8 h-8 text-accent/20" />
            </div>
          </Card>

          <Card className="border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/70 text-sm mb-1">Applications</p>
                <p className="text-3xl font-bold text-chart-1">24</p>
              </div>
              <TrendingUp className="w-8 h-8 text-chart-1/20" />
            </div>
          </Card>

          <Card className="border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/70 text-sm mb-1">Interviews</p>
                <p className="text-3xl font-bold text-chart-2">8</p>
              </div>
              <Users className="w-8 h-8 text-chart-2/20" />
            </div>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Career Velocity */}
          <Card className="border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Career Velocity Trend</h2>
            <CareerVelocityChart />
            <p className="text-foreground/70 text-sm mt-4">Your career progression compared to industry peers</p>
          </Card>

          {/* Job Applications */}
          <Card className="border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Application Activity</h2>
            <JobApplicationsChart />
            <p className="text-foreground/70 text-sm mt-4">Monthly applications and interview conversion</p>
          </Card>
        </div>

        {/* Skills and Recommendations */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Skills Distribution */}
          <Card className="border border-border p-6 lg:col-span-1">
            <h2 className="text-xl font-semibold text-foreground mb-4">Skills Distribution</h2>
            <SkillsDistributionChart />
          </Card>

          {/* Top Recommendations */}
          <Card className="border border-border p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold text-foreground mb-4">Top Job Matches</h2>
            <div className="space-y-3">
              {filteredJobs.slice(0, 3).map((job) => (
                <Link key={job.id} href={`/jobs/${job.id}`} className="block">
                  <div className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-primary/50 transition cursor-pointer">
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{job.title}</p>
                      <p className="text-foreground/70 text-sm">{job.company}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-primary text-primary-foreground">{job.matchScore}% match</Badge>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/jobs" className="block mt-4">
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                View All Opportunities <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* Professional Insights */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Peer Comparison */}
          <Card className="border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Peer Comparison</h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground/70 text-sm">Experience</span>
                  <span className="text-foreground font-semibold">vs +8% peers</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-primary rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground/70 text-sm">Skills</span>
                  <span className="text-foreground font-semibold">vs +12% peers</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-accent rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-foreground/70 text-sm">Salary</span>
                  <span className="text-foreground font-semibold">vs -5% peers</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-chart-3 rounded-full" />
                </div>
              </div>
            </div>
          </Card>

          {/* Growth Recommendations */}
          <Card className="border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Skills to Develop</h2>
            <div className="space-y-3">
              <div className="p-3 bg-card rounded-lg border border-border">
                <p className="font-semibold text-foreground mb-1">Kubernetes</p>
                <p className="text-foreground/70 text-sm">Would increase your match score by 8%</p>
              </div>

              <div className="p-3 bg-card rounded-lg border border-border">
                <p className="font-semibold text-foreground mb-1">GraphQL</p>
                <p className="text-foreground/70 text-sm">Would increase your match score by 6%</p>
              </div>

              <div className="p-3 bg-card rounded-lg border border-border">
                <p className="font-semibold text-foreground mb-1">Cloud Architecture</p>
                <p className="text-foreground/70 text-sm">Would increase your match score by 5%</p>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-4 bg-transparent">
              Explore Learning Resources
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
