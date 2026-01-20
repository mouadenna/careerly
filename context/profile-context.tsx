"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface UserProfile {
  id: string
  userId: string
  fullName: string
  title: string
  bio: string
  location: string
  skills: string[]
  languages: string[]
  experience: number
  workMode: "onsite" | "remote" | "hybrid"
  contractType: "full-time" | "contract" | "freelance"
  salaryExpectation: number
  profileImage: string
  cvUrl: string
  careerVelocity: number
  matchScore: number
  createdAt: string
  updatedAt: string
}

interface ProfileContextType {
  profile: UserProfile | null
  isLoading: boolean
  updateProfile: (data: Partial<UserProfile>) => Promise<void>
  uploadCV: (file: File) => Promise<void>
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    const savedProfile = localStorage.getItem("careerly_profile")
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile))
      } catch (err) {
        console.error("Failed to parse saved profile:", err)
      }
    }
    setIsLoading(false)
  }, [])

  const updateProfile = async (data: Partial<UserProfile>) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const updated = {
        ...profile,
        ...data,
        updatedAt: new Date().toISOString(),
      } as UserProfile

      setProfile(updated)
      localStorage.setItem("careerly_profile", JSON.stringify(updated))
    } finally {
      setIsLoading(false)
    }
  }

  const uploadCV = async (file: File) => {
    setIsLoading(true)
    try {
      // Simulate file upload
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock CV parsing - in production, this would extract skills and experience
      const mockCVData = {
        title: "Senior Software Engineer",
        skills: ["React", "TypeScript", "Next.js", "Node.js", "Python", "AWS"],
        experience: 5,
        cvUrl: URL.createObjectURL(file),
      }

      await updateProfile(mockCVData)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProfileContext.Provider value={{ profile, isLoading, updateProfile, uploadCV }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
