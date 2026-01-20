"use client"

import type React from "react"
import { createContext, useContext, useState, useMemo } from "react"

export interface Job {
  id: string
  title: string
  company: string
  location: string
  workMode: "onsite" | "remote" | "hybrid"
  contractType: "full-time" | "contract" | "freelance"
  salary: {
    min: number
    max: number
  }
  description: string
  requiredSkills: string[]
  preferredSkills: string[]
  experience: number
  matchScore: number
  postedAt: string
}

interface JobsContextType {
  jobs: Job[]
  filteredJobs: Job[]
  filters: {
    searchQuery: string
    workMode: string
    contractType: string
    minMatchScore: number
    salaryRange: [number, number]
  }
  updateFilters: (filters: Partial<JobsContextType["filters"]>) => void
  getJobById: (id: string) => Job | undefined
}

const JobsContext = createContext<JobsContextType | undefined>(undefined)

const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp Africa",
    location: "Lagos, Nigeria",
    workMode: "remote",
    contractType: "full-time",
    salary: { min: 80000, max: 120000 },
    description:
      "We are looking for an experienced React developer to join our growing team. You will work on cutting-edge web applications serving millions of users across Africa.",
    requiredSkills: ["React", "TypeScript", "Node.js"],
    preferredSkills: ["Next.js", "AWS", "PostgreSQL"],
    experience: 5,
    matchScore: 95,
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "2",
    title: "Full Stack Engineer",
    company: "FinTech Innovations",
    location: "Nairobi, Kenya",
    workMode: "hybrid",
    contractType: "full-time",
    salary: { min: 70000, max: 100000 },
    description:
      "Join our dynamic fintech team building payment solutions for Africa. We need talented full-stack engineers.",
    requiredSkills: ["JavaScript", "Python", "React"],
    preferredSkills: ["Docker", "Kubernetes", "AWS"],
    experience: 3,
    matchScore: 85,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    title: "Backend Developer",
    company: "E-Commerce Hub",
    location: "Accra, Ghana",
    workMode: "remote",
    contractType: "full-time",
    salary: { min: 60000, max: 90000 },
    description: "Build scalable backend systems for our e-commerce platform serving the African market.",
    requiredSkills: ["Node.js", "MongoDB", "REST APIs"],
    preferredSkills: ["GraphQL", "Redis", "AWS"],
    experience: 2,
    matchScore: 78,
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    title: "DevOps Engineer",
    company: "CloudSolutions Africa",
    location: "Remote",
    workMode: "remote",
    contractType: "contract",
    salary: { min: 85000, max: 130000 },
    description: "Help us build and maintain cloud infrastructure for enterprise clients across Africa.",
    requiredSkills: ["Kubernetes", "Docker", "AWS"],
    preferredSkills: ["Terraform", "Jenkins", "CI/CD"],
    experience: 4,
    matchScore: 72,
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    title: "Frontend Engineer",
    company: "Mobile-First Studio",
    location: "Johannesburg, South Africa",
    workMode: "hybrid",
    contractType: "full-time",
    salary: { min: 65000, max: 95000 },
    description: "Create beautiful, responsive UIs for our suite of mobile and web applications.",
    requiredSkills: ["React", "CSS", "JavaScript"],
    preferredSkills: ["React Native", "Tailwind CSS", "Figma"],
    experience: 2,
    matchScore: 88,
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    title: "Machine Learning Engineer",
    company: "AI Innovations Labs",
    location: "Remote",
    workMode: "remote",
    contractType: "full-time",
    salary: { min: 100000, max: 150000 },
    description: "Develop ML models and AI solutions for real-world African business challenges.",
    requiredSkills: ["Python", "TensorFlow", "Machine Learning"],
    preferredSkills: ["PyTorch", "NLP", "Computer Vision"],
    experience: 4,
    matchScore: 65,
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function JobsProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState({
    searchQuery: "",
    workMode: "",
    contractType: "",
    minMatchScore: 70,
    salaryRange: [0, 200000] as [number, number],
  })

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(filters.searchQuery.toLowerCase())

      const matchesWorkMode = !filters.workMode || job.workMode === filters.workMode
      const matchesContractType = !filters.contractType || job.contractType === filters.contractType
      const matchesScore = job.matchScore >= filters.minMatchScore
      const matchesSalary = job.salary.min >= filters.salaryRange[0] && job.salary.max <= filters.salaryRange[1]

      return matchesSearch && matchesWorkMode && matchesContractType && matchesScore && matchesSalary
    })
  }, [filters])

  const updateFilters = (newFilters: Partial<JobsContextType["filters"]>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }

  const getJobById = (id: string) => {
    return mockJobs.find((job) => job.id === id)
  }

  return (
    <JobsContext.Provider value={{ jobs: mockJobs, filteredJobs, filters, updateFilters, getJobById }}>
      {children}
    </JobsContext.Provider>
  )
}

export function useJobs() {
  const context = useContext(JobsContext)
  if (context === undefined) {
    throw new Error("useJobs must be used within a JobsProvider")
  }
  return context
}
