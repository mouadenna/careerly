"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { useProfile } from "@/context/profile-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowRight, CheckCircle } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { updateProfile } = useProfile()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    bio: "",
    location: "",
    skills: "",
    languages: "",
    experience: "0",
    workMode: "remote" as const,
    contractType: "full-time" as const,
    salaryExpectation: "",
  })

  if (!user) {
    router.push("/auth/login")
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      await updateProfile({
        id: user.id,
        userId: user.id,
        fullName: user.fullName,
        title: formData.title,
        bio: formData.bio,
        location: formData.location,
        skills: formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        languages: formData.languages
          .split(",")
          .map((l) => l.trim())
          .filter(Boolean),
        experience: Number.parseInt(formData.experience),
        workMode: formData.workMode,
        contractType: formData.contractType,
        salaryExpectation: Number.parseInt(formData.salaryExpectation) || 0,
        profileImage: "",
        cvUrl: "",
        careerVelocity: 0,
        matchScore: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      })
      router.push("/dashboard")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className={`flex items-center ${num !== 3 ? "flex-1" : ""}`}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step >= num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > num ? <CheckCircle className="w-6 h-6" /> : num}
                </div>
                {num !== 3 && <div className={`flex-1 h-1 mx-2 ${step > num ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <p className="text-foreground/70 text-sm">Step {step} of 3</p>
        </div>

        <Card className="border border-border p-8">
          {/* Step 1: Professional Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Professional Information</h2>
                <p className="text-foreground/70">Tell us about your professional background</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Senior Software Engineer"
                    value={formData.title}
                    onChange={handleChange}
                    className="bg-card border border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-foreground">
                    Location
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Lagos, Nigeria"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-card border border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-foreground">
                    Years of Experience
                  </Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    placeholder="0"
                    value={formData.experience}
                    onChange={handleChange}
                    className="bg-card border border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-foreground">
                    Professional Summary
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    placeholder="Tell us about your career journey and achievements..."
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="bg-card border border-border"
                  />
                </div>
              </div>

              <Button onClick={handleNext} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {/* Step 2: Skills & Preferences */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Skills & Preferences</h2>
                <p className="text-foreground/70">Help us match you with the right opportunities</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills" className="text-foreground">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    name="skills"
                    placeholder="React, TypeScript, Node.js (comma separated)"
                    value={formData.skills}
                    onChange={handleChange}
                    className="bg-card border border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="languages" className="text-foreground">
                    Languages
                  </Label>
                  <Input
                    id="languages"
                    name="languages"
                    placeholder="English, Yoruba, French (comma separated)"
                    value={formData.languages}
                    onChange={handleChange}
                    className="bg-card border border-border"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workMode" className="text-foreground">
                      Work Mode
                    </Label>
                    <Select value={formData.workMode} onValueChange={(val) => handleSelectChange("workMode", val)}>
                      <SelectTrigger className="bg-card border border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="onsite">On-site</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contractType" className="text-foreground">
                      Contract Type
                    </Label>
                    <Select
                      value={formData.contractType}
                      onValueChange={(val) => handleSelectChange("contractType", val)}
                    >
                      <SelectTrigger className="bg-card border border-border">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salaryExpectation" className="text-foreground">
                    Expected Salary (USD/year)
                  </Label>
                  <Input
                    id="salaryExpectation"
                    name="salaryExpectation"
                    type="number"
                    placeholder="0"
                    value={formData.salaryExpectation}
                    onChange={handleChange}
                    className="bg-card border border-border"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(1)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button onClick={handleNext} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Next <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: CV Upload & Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Upload CV</h2>
                <p className="text-foreground/70">Let us parse your CV to enhance your profile</p>
              </div>

              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground font-semibold mb-2">Upload your CV</p>
                <p className="text-foreground/70 text-sm mb-4">PDF or Word document (Max 10MB)</p>
                <input type="file" accept=".pdf,.doc,.docx" className="hidden" id="cv-upload" />
                <Label htmlFor="cv-upload" className="cursor-pointer">
                  <Button variant="outline" type="button">
                    Choose File
                  </Button>
                </Label>
              </div>

              <div className="bg-card/50 rounded-lg p-4 border border-border">
                <p className="text-foreground/70 text-sm">
                  CV upload is optional. You can always add it later in your profile settings.
                </p>
              </div>

              <div className="flex gap-4">
                <Button onClick={() => setStep(2)} variant="outline" className="flex-1">
                  Back
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isLoading ? "Completing..." : "Complete Setup"}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
