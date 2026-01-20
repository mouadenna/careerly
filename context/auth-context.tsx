"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  email: string
  fullName: string
  createdAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("careerly_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (err) {
        console.error("Failed to parse saved user:", err)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, this would call an API
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      fullName: email.split("@")[0],
      createdAt: new Date().toISOString(),
    }

    setUser(mockUser)
    localStorage.setItem("careerly_user", JSON.stringify(mockUser))
  }

  const signup = async (email: string, password: string, fullName: string) => {
    // Mock authentication - in production, this would call an API
    if (!email || !password || !fullName) {
      throw new Error("All fields are required")
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      fullName,
      createdAt: new Date().toISOString(),
    }

    setUser(mockUser)
    localStorage.setItem("careerly_user", JSON.stringify(mockUser))
  }

  const logout = async () => {
    setUser(null)
    localStorage.removeItem("careerly_user")
  }

  return <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
