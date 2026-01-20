"use client"

import { useState } from "react"
import { useJobs } from "@/context/jobs-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Search, MapPin, DollarSign, Zap, Briefcase } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const { filteredJobs, filters, updateFilters } = useJobs()
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")

  const formatSalary = (min: number, max: number) => {
    return `$${(min / 1000).toFixed(0)}k - $${(max / 1000).toFixed(0)}k`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">AI-Powered Job Matches</h1>
          <p className="text-primary-foreground/90">Discover opportunities perfectly matched to your profile</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border border-border p-6 sticky top-8 space-y-6">
              <div>
                <h3 className="font-semibold text-foreground mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Job title, company..."
                    value={filters.searchQuery}
                    onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                    className="pl-10 bg-background border border-border"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Work Mode</h3>
                <Select value={filters.workMode} onValueChange={(val) => updateFilters({ workMode: val })}>
                  <SelectTrigger className="bg-background border border-border">
                    <SelectValue placeholder="All modes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Contract Type</h3>
                <Select value={filters.contractType} onValueChange={(val) => updateFilters({ contractType: val })}>
                  <SelectTrigger className="bg-background border border-border">
                    <SelectValue placeholder="All types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="freelance">Freelance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Minimum Match Score</h3>
                <div className="space-y-2">
                  <Slider
                    min={0}
                    max={100}
                    step={5}
                    value={[filters.minMatchScore]}
                    onValueChange={(val) => updateFilters({ minMatchScore: val[0] })}
                    className="w-full"
                  />
                  <p className="text-sm text-foreground/70">{filters.minMatchScore}%+</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-3">Salary Range</h3>
                <div className="space-y-2">
                  <Slider
                    min={0}
                    max={200000}
                    step={10000}
                    value={filters.salaryRange}
                    onValueChange={(val) => updateFilters({ salaryRange: [val[0], val[1]] })}
                    className="w-full"
                  />
                  <p className="text-sm text-foreground/70">
                    ${filters.salaryRange[0].toLocaleString()} - ${filters.salaryRange[1].toLocaleString()}
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={() =>
                  updateFilters({
                    searchQuery: "",
                    workMode: "",
                    contractType: "",
                    minMatchScore: 70,
                    salaryRange: [0, 200000],
                  })
                }
                className="w-full"
              >
                Clear Filters
              </Button>
            </Card>
          </div>

          {/* Jobs List */}
          <div className="lg:col-span-3">
            {/* View Mode Toggle */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-foreground/70">{filteredJobs.length} jobs found</p>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                >
                  List
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                >
                  Grid
                </Button>
              </div>
            </div>

            {/* User Personas Navigation Link */}
            <div className="flex items-center gap-4 mb-6">
              <Link href="/personas">
                <Button variant="outline" size="sm" className="bg-background border-border hover:bg-muted">
                  User Personas
                </Button>
              </Link>
            </div>

            {/* Jobs Cards */}
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-4"}>
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Link key={job.id} href={`/jobs/${job.id}`}>
                    <Card className="border border-border p-6 hover:border-primary/50 transition cursor-pointer h-full">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                          <p className="text-foreground/70">{job.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center justify-end gap-1 mb-2">
                            <Zap className="w-4 h-4 text-accent" />
                            <span className="font-bold text-accent">{job.matchScore}%</span>
                          </div>
                          <Badge className="bg-primary/20 text-primary">Match</Badge>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-foreground/70">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/70">
                          <DollarSign className="w-4 h-4" />
                          <span className="text-sm">{formatSalary(job.salary.min, job.salary.max)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/70">
                          <Briefcase className="w-4 h-4" />
                          <span className="text-sm capitalize">
                            {job.workMode} • {job.contractType}
                          </span>
                        </div>
                      </div>

                      <p className="text-foreground/70 text-sm mb-4 line-clamp-2">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.requiredSkills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {job.requiredSkills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{job.requiredSkills.length - 3} more
                          </Badge>
                        )}
                      </div>

                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                        View Details
                      </Button>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card className="border border-border p-12 text-center lg:col-span-2">
                  <p className="text-foreground/70 mb-4">No jobs match your criteria</p>
                  <Button
                    variant="outline"
                    onClick={() =>
                      updateFilters({
                        searchQuery: "",
                        workMode: "",
                        contractType: "",
                        minMatchScore: 70,
                        salaryRange: [0, 200000],
                      })
                    }
                  >
                    Reset Filters
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
