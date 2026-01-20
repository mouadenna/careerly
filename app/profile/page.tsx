"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { useProfile } from "@/context/profile-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit2, Save, MapPin, Briefcase, Languages } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
  const { user } = useAuth()
  const { profile, updateProfile, isLoading } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState(profile || {})

  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-foreground/70 mb-4">Profile not found. Please complete onboarding first.</p>
          <Link href="/onboarding">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Go to Onboarding</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await updateProfile(formData)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">{profile.fullName}</h1>
            <p className="text-foreground/70">{profile.title || "Professional"}</p>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </>
            ) : (
              <>
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Professional Summary */}
            <Card className="border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Professional Summary</h2>
              {isEditing ? (
                <Textarea
                  name="bio"
                  value={formData.bio || ""}
                  onChange={handleChange}
                  className="bg-card border border-border"
                  rows={4}
                />
              ) : (
                <p className="text-foreground/70">{profile.bio || "No summary provided"}</p>
              )}
            </Card>

            {/* Skills */}
            <Card className="border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Skills</h2>
              {isEditing ? (
                <Input
                  name="skills"
                  value={(formData.skills as any)?.join(", ") || ""}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Node.js"
                  className="bg-card border border-border"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-foreground/70">No skills added</p>
                  )}
                </div>
              )}
            </Card>

            {/* Experience */}
            <Card className="border border-border p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Experience</h2>
              {isEditing ? (
                <Input
                  name="experience"
                  type="number"
                  value={formData.experience || ""}
                  onChange={handleChange}
                  className="bg-card border border-border"
                />
              ) : (
                <p className="text-foreground/70">{profile.experience} years of experience</p>
              )}
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card className="border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Info</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-foreground/70 text-sm">Location</p>
                    {isEditing ? (
                      <Input
                        name="location"
                        value={formData.location || ""}
                        onChange={handleChange}
                        className="bg-card border border-border mt-1"
                      />
                    ) : (
                      <p className="text-foreground">{profile.location || "Not specified"}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-foreground/70 text-sm">Work Mode</p>
                    <p className="text-foreground capitalize">{profile.workMode}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Languages className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-foreground/70 text-sm">Languages</p>
                    {isEditing ? (
                      <Input
                        name="languages"
                        value={(formData.languages as any)?.join(", ") || ""}
                        onChange={handleChange}
                        placeholder="English, French"
                        className="bg-card border border-border mt-1"
                      />
                    ) : (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {profile.languages && profile.languages.length > 0 ? (
                          profile.languages.map((lang: string) => (
                            <Badge key={lang} variant="outline" className="text-xs">
                              {lang}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-foreground/70 text-sm">Not specified</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>

            {/* Salary Expectation */}
            <Card className="border border-border p-6">
              <h3 className="font-semibold text-foreground mb-4">Salary Expectation</h3>
              {isEditing ? (
                <Input
                  name="salaryExpectation"
                  type="number"
                  value={formData.salaryExpectation || ""}
                  onChange={handleChange}
                  placeholder="USD/year"
                  className="bg-card border border-border"
                />
              ) : (
                <p className="text-foreground">${(profile.salaryExpectation || 0).toLocaleString()}</p>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
