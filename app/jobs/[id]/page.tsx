"use client"

import { useParams } from "next/navigation"
import { useJobs } from "@/context/jobs-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, DollarSign, Zap, Briefcase, Clock, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function JobDetailPage() {
  const params = useParams()
  const { getJobById } = useJobs()
  const job = getJobById(params.id as string)

  if (!job) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-foreground/70 mb-4">Job not found</p>
          <Link href="/jobs">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Back to Jobs</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const daysAgo = Math.floor((Date.now() - d.getTime()) / (1000 * 60 * 60 * 24))
    return `${daysAgo} days ago`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/jobs" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition">
            <ChevronLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
          <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
          <p className="text-primary-foreground/90">{job.company}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Match Score Card */}
            <Card className="border border-border p-6 bg-gradient-to-br from-accent/10 to-primary/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground/70 mb-2">AI Match Score</p>
                  <p className="text-foreground/70 text-sm">How well this job matches your profile</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-2">
                    <Zap className="w-6 h-6 text-accent" />
                    <span className="text-5xl font-bold text-accent">{job.matchScore}%</span>
                  </div>
                  <Badge className="bg-primary text-primary-foreground">Strong Match</Badge>
                </div>
              </div>
            </Card>

            {/* Job Description */}
            <Card className="border border-border p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">About This Role</h2>
              <p className="text-foreground/70 leading-relaxed">{job.description}</p>
            </Card>

            {/* Required Skills */}
            <Card className="border border-border p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Required Skills</h2>
              <div className="flex flex-wrap gap-3">
                {job.requiredSkills.map((skill) => (
                  <Badge key={skill} className="bg-primary text-primary-foreground">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Preferred Skills */}
            {job.preferredSkills.length > 0 && (
              <Card className="border border-border p-6">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Preferred Skills</h2>
                <div className="flex flex-wrap gap-3">
                  {job.preferredSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Key Details */}
            <Card className="border border-border p-6 sticky top-8">
              <h3 className="font-semibold text-foreground mb-4">Job Details</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Location</p>
                    <p className="text-foreground">{job.location}</p>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Salary</p>
                    <p className="text-foreground font-semibold">
                      ${job.salary.min.toLocaleString()} - ${job.salary.max.toLocaleString()}
                    </p>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Type</p>
                    <p className="text-foreground capitalize">{job.contractType}</p>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Work Mode</p>
                    <p className="text-foreground capitalize">{job.workMode}</p>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-foreground/70 text-sm">Posted</p>
                    <p className="text-foreground">{formatDate(job.postedAt)}</p>
                  </div>
                </div>

                <Separator className="bg-border" />

                <div>
                  <p className="text-foreground/70 text-sm mb-2">Experience</p>
                  <p className="text-foreground">{job.experience}+ years</p>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-6">
                  Apply Now
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  Save Job
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
