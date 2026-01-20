"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  Lightbulb,
  MessageSquare,
  Eye,
  Hand,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Code2,
  Brain,
  Users2,
  Zap,
  Award,
  Briefcase,
  GitBranch,
  BarChart3,
  Database,
  Star,
  ZapIcon,
  Target,
  Heart,
  Rocket,
  AlertTriangle,
  Smile,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface Persona {
  id: string
  name: string
  age: number
  role: string
  salary: string
  type: "student" | "hiring"
  bio: string
  motivation: string
  challenges: string[]
  goals: string[]
  feels: string[]
  thinks: string[]
  says: string[]
  does: string[]
  interests: string[]
  skills: string[]
  tools: string[]
  painPoints: { title: string; description: string }[]
  solutions: { title: string; description: string }[]
  timeline: { year: string; milestone: string }[]
  emotionalJourney: {
    stage: string
    emotion: string
    description: string
  }[]
}

const personas: Persona[] = [
  {
    id: "marouan",
    name: "Marouan",
    age: 21,
    role: "Data Science Student",
    salary: "$12k/year",
    type: "student",
    bio: "Passionate data science student seeking internship opportunities to gain practical experience and apply theoretical knowledge in real-world projects.",
    motivation:
      "To secure a challenging internship that provides hands-on experience with machine learning and data analytics in a professional environment.",
    challenges: [
      "Finding internships that match technical skill level and interests",
      "Presenting skills effectively to recruiters",
      "Competing with experienced professionals for entry-level roles",
      "Building a portfolio that stands out",
      "Navigating the uncertainty of the job market",
    ],
    goals: [
      "Land an internship in machine learning",
      "Build practical experience with production data systems",
      "Develop professional skills and mentorship",
      "Create a strong professional network",
      "Secure a return offer for full-time role",
    ],
    feels: ["Eager", "Confident but cautious", "Motivated", "Sometimes overwhelmed"],
    thinks: [
      "My projects demonstrate my potential",
      "I need to find the right company culture fit",
      "How can I make my application stand out?",
      "Will my skills be enough?",
    ],
    says: [
      "I'm looking for a learning opportunity, not just a job",
      "I want to work with people who will mentor me",
      "The company culture matters as much as the role",
    ],
    does: [
      "Works on personal data science projects",
      "Shares knowledge through blogs and tutorials",
      "Attends webinars and industry conferences",
      "Maintains GitHub with documented projects",
      "Networks on LinkedIn regularly",
    ],
    interests: ["Machine Learning", "Analytics", "Writing", "Community"],
    skills: ["Python", "Machine Learning", "Data Analysis", "SQL", "Statistics"],
    tools: ["Jupyter", "Pandas", "Scikit-learn", "GitHub", "LinkedIn"],
    painPoints: [
      {
        title: "Opportunity Gap",
        description: "Hard to find internships aligned with specific interests and skill level",
      },
      {
        title: "Visibility Challenge",
        description: "Difficulty in getting noticed among thousands of other candidates",
      },
      {
        title: "Imposter Syndrome",
        description: "Constantly doubting if skills are good enough for professional roles",
      },
      {
        title: "Information Overload",
        description: "Too many job boards and platforms to search across",
      },
      {
        title: "Feedback Vacuum",
        description: "Rarely getting constructive feedback on why applications were rejected",
      },
    ],
    solutions: [
      {
        title: "AI-Powered Matching",
        description: "Get job recommendations tailored to your exact skills and career goals",
      },
      {
        title: "Portfolio Showcase",
        description: "Display projects with impact metrics and peer validation",
      },
      {
        title: "Career Analytics",
        description: "See how your profile ranks and identify growth areas",
      },
      {
        title: "Mentor Matching",
        description: "Connect with experienced professionals for guidance",
      },
      {
        title: "Skill Validation",
        description: "Get recognized for your abilities through assessments",
      },
    ],
    timeline: [
      { year: "Year 1", milestone: "Begin learning Python and data science fundamentals" },
      { year: "Year 2", milestone: "Build first machine learning projects and join competitions" },
      { year: "Year 3", milestone: "Create portfolio, start applying for internships, network actively" },
      { year: "Year 4", milestone: "Secure internship, gain practical experience, convert to full-time" },
    ],
    emotionalJourney: [
      { stage: "Excited", emotion: "Hope", description: "Fresh start, unlimited possibilities" },
      { stage: "Overwhelmed", emotion: "Anxiety", description: "Too many options, pressure mounting" },
      { stage: "Focused", emotion: "Determination", description: "Clear goals, consistent effort" },
      { stage: "Validated", emotion: "Confidence", description: "Success and recognition achieved" },
    ],
  },
  {
    id: "leila",
    name: "Leila",
    age: 32,
    role: "CTO, X-Startup",
    salary: "$45k+/year",
    type: "hiring",
    bio: "Tech leader passionate about identifying and nurturing high-potential talent. Believes in hiring for curiosity and potential rather than just technical skills.",
    motivation:
      "Hire 5 high-potential data science interns with strong likelihood of receiving and accepting return full-time offers after successful internship.",
    challenges: [
      "Poor communication from hiring managers and unrealistic expectations",
      "Finding candidates with passion, not just perfect resumes",
      "Balancing speed of hiring with finding the right cultural fit",
      "Assessing potential vs immediate capability",
      "Retaining talent after internships",
    ],
    goals: [
      "Build a strong internship program for future talent",
      "Identify candidates with raw potential and growth mindset",
      "Create a supportive environment for junior talent development",
      "Reduce hiring time while improving quality",
      "Build a pipeline of future leaders",
    ],
    feels: [
      "Excited and responsible when finding potential",
      "Pressure from hiring managers",
      "Invested in mentorship",
    ],
    thinks: [
      "The best candidates are storytellers about their projects",
      "Raw potential matters more than perfection",
      "A great GitHub profile tells me a lot about a candidate",
      "Culture fit is as important as technical ability",
    ],
    says: [
      "I'm not just hiring for skills on a checklist; I'm hiring for curiosity and potential",
      "What was the most challenging part and what did you learn?",
      "Remember, we're assessing for potential, not just perfection",
    ],
    does: [
      "Spends evenings browsing GitHub and Kaggle profiles",
      "Briefs interviewers to focus on problem-solving and thought process",
      "Mentors and supports interns in their growth journey",
      "Gives detailed feedback to candidates",
      "Builds relationships with educational institutions",
    ],
    interests: ["Talent Development", "Coding", "Tech Culture", "Mentorship"],
    skills: ["Leadership", "Technical Assessment", "Mentorship", "Recruitment", "Strategy"],
    tools: ["GitHub", "Kaggle", "LinkedIn Recruiter", "Internal ATS", "Communication Platforms"],
    painPoints: [
      {
        title: "Assessment Difficulty",
        description: "Hard to distinguish between luck and skill in candidate portfolios",
      },
      {
        title: "Time Constraint",
        description: "Limited time to evaluate hundreds of applications",
      },
      {
        title: "Culture Mismatch",
        description: "Difficulty finding candidates aligned with company values",
      },
      {
        title: "Retention Risk",
        description: "Interns leave after program or don't convert to full-time",
      },
      {
        title: "Onboarding Overhead",
        description: "Resources needed to train and support junior talent",
      },
    ],
    solutions: [
      {
        title: "Candidate Intelligence",
        description: "Deep insights into candidate's learning journey and problem-solving approach",
      },
      {
        title: "Screening Efficiency",
        description: "AI-powered pre-screening to focus on high-potential candidates",
      },
      {
        title: "Culture Compatibility",
        description: "See candidates' values and work preferences upfront",
      },
      {
        title: "Success Prediction",
        description: "Analytics showing likelihood of retention and performance",
      },
      {
        title: "Streamlined Pipeline",
        description: "Manage entire recruitment process from discovery to onboarding",
      },
    ],
    timeline: [
      { year: "5 Years Ago", milestone: "Joined as Senior Engineer at startup" },
      { year: "3 Years Ago", milestone: "Promoted to Tech Lead, started mentoring junior developers" },
      {
        year: "2 Years Ago",
        milestone: "Became CTO, initiated first formal internship program",
      },
      { year: "Today", milestone: "Building talent strategy, scaling engineering team" },
    ],
    emotionalJourney: [
      { stage: "Ambitious", emotion: "Drive", description: "Building and scaling teams" },
      { stage: "Selective", emotion: "Caution", description: "Bad hires cost time and money" },
      { stage: "Mentoring", emotion: "Fulfillment", description: "Developing talent brings joy" },
      { stage: "Strategic", emotion: "Satisfaction", description: "Building strong culture and teams" },
    ],
  },
]

const SkillIcon = ({ skill }: { skill: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Python: <Code2 className="w-4 h-4" />,
    "Machine Learning": <Brain className="w-4 h-4" />,
    "Data Analysis": <BarChart3 className="w-4 h-4" />,
    SQL: <Database className="w-4 h-4" />,
    Statistics: <TrendingUp className="w-4 h-4" />,
    Leadership: <Users2 className="w-4 h-4" />,
    Mentorship: <Award className="w-4 h-4" />,
    Recruitment: <Briefcase className="w-4 h-4" />,
  }
  return iconMap[skill] || <Zap className="w-4 h-4" />
}

const EmotionIcon = ({ emotion }: { emotion: string }) => {
  const iconMap: Record<string, React.ReactNode> = {
    Hope: <Star className="w-6 h-6 text-yellow-500" />,
    Anxiety: <ZapIcon className="w-6 h-6 text-orange-500" />,
    Determination: <Target className="w-6 h-6 text-red-500" />,
    Confidence: <Smile className="w-6 h-6 text-green-500" />,
    Drive: <Rocket className="w-6 h-6 text-blue-500" />,
    Caution: <AlertTriangle className="w-6 h-6 text-amber-500" />,
    Fulfillment: <Heart className="w-6 h-6 text-pink-500" />,
    Satisfaction: <Target className="w-6 h-6 text-purple-500" />,
  }
  return iconMap[emotion] || <Star className="w-6 h-6 text-primary" />
}

export default function PersonasPage() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Careerly</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                Dashboard
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                Jobs
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title Slide */}
        <div className="text-center mb-20 py-12">
          <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30">Understand Our Users</Badge>
          <h1 className="text-6xl font-bold text-foreground mb-6">User Personas & Journeys</h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Meet Marouan and Leila. Two professionals with different goals but complementary needs. Careerly bridges the
            gap between ambitious job seekers and visionary hiring managers.
          </p>
        </div>

        {/* Persona Slides */}
        {personas.map((persona, idx) => (
          <div key={persona.id} className="mb-24">
            {/* Profile Slide */}
            <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
              {/* Left: Portrait and Basic Info */}
              <div className="space-y-6">
                <div className="relative">
                  {/* Professional Portrait Placeholder */}
                  <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/30 overflow-hidden">
                    <img
                      src={
                        persona.id === "marouan"
                          ? "https://media.licdn.com/dms/image/v2/D4E03AQFXe7m0fsoEkw/profile-displayphoto-scale_200_200/B4EZekC6RuHgAc-/0/1750803917547?e=2147483647&v=beta&t=1ZJFmcuxhmrLBp_T06LkLDx-_b_VUvFGeetKjwxnCgE"
                          : "https://c.superprof.com/i/a/28355983/12610877/600/20231013140206/experte-recrutement-dotee-experience-ravie-accompagner-mise-experiences.jpg"
                      }
                      alt={`${persona.name} - ${persona.role}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="text-5xl font-bold text-foreground">{persona.name}</h2>
                    <p className="text-2xl text-foreground/70 mt-2">{persona.role}</p>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    <div className="bg-primary/10 rounded-lg p-3">
                      <p className="text-xs text-foreground/70 uppercase tracking-wider">Age</p>
                      <p className="text-lg font-bold text-foreground">{persona.age}</p>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-3">
                      <p className="text-xs text-foreground/70 uppercase tracking-wider">Salary Range</p>
                      <p className="text-lg font-bold text-foreground">{persona.salary}</p>
                    </div>
                    <div className="bg-chart-1/10 rounded-lg p-3">
                      <p className="text-xs text-foreground/70 uppercase tracking-wider">Type</p>
                      <Badge className={persona.type === "student" ? "bg-primary" : "bg-accent"}>
                        {persona.type === "student" ? "Job Seeker" : "Hiring Manager"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Bio and Motivation */}
              <div className="space-y-8">
                <Card className="border-2 border-primary/20 p-8 bg-gradient-to-br from-primary/5 to-transparent">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    About
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">{persona.bio}</p>
                </Card>

                <Card className="border-2 border-accent/20 p-8 bg-gradient-to-br from-accent/5 to-transparent">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-accent" />
                    Primary Motivation
                  </h3>
                  <p className="text-foreground/80 leading-relaxed italic">"{persona.motivation}"</p>
                </Card>
              </div>
            </div>

            {/* Skills & Tools Section */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Card className="border border-border p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-primary" />
                  Core Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {persona.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="gap-2 px-4 py-2">
                      <SkillIcon skill={skill} />
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>

              <Card className="border border-border p-8">
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-accent" />
                  Tools & Platforms
                </h3>
                <div className="flex flex-wrap gap-3">
                  {persona.tools.map((tool, idx) => (
                    <Badge key={idx} variant="outline" className="px-4 py-2">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Timeline Journey */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8">Journey Timeline</h3>
              <div className="space-y-4">
                {persona.timeline.map((point, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                      {idx < persona.timeline.length - 1 && (
                        <div className="w-1 h-20 bg-gradient-to-b from-primary/40 to-primary/10 mt-2" />
                      )}
                    </div>
                    <div className="pt-2 pb-8">
                      <p className="font-bold text-primary text-sm uppercase tracking-wide">{point.year}</p>
                      <p className="text-lg text-foreground mt-2">{point.milestone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emotional Journey */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8">Emotional Journey</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {persona.emotionalJourney.map((journey, idx) => (
                  <Card key={idx} className="border border-border p-6 text-center hover:border-primary/50 transition">
                    <div className="text-4xl mb-3 flex justify-center">
                      <EmotionIcon emotion={journey.emotion} />
                    </div>
                    <p className="font-bold text-foreground">{journey.stage}</p>
                    <p className="text-sm text-foreground/70 mt-2">{journey.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pain Points vs Solutions */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Challenges & Solutions</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Pain Points */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Pain Points
                  </h4>
                  {persona.painPoints.map((point, idx) => (
                    <Card
                      key={idx}
                      className="border border-red-200/50 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/30 p-4"
                    >
                      <p className="font-semibold text-foreground text-sm">{point.title}</p>
                      <p className="text-foreground/70 text-sm mt-2">{point.description}</p>
                    </Card>
                  ))}
                </div>

                {/* Solutions */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    How Careerly Solves It
                  </h4>
                  {persona.solutions.map((solution, idx) => (
                    <Card
                      key={idx}
                      className="border border-green-200/50 bg-green-50/50 dark:bg-green-950/20 dark:border-green-900/30 p-4"
                    >
                      <p className="font-semibold text-foreground text-sm">{solution.title}</p>
                      <p className="text-foreground/70 text-sm mt-2">{solution.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Empathy Card */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Empathy Map</h3>
              <Card className="border-2 border-primary/20 p-12 bg-gradient-to-br from-card to-card/50">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Feels */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-primary" />
                      </div>
                      <p className="font-bold text-foreground">Feels</p>
                    </div>
                    <div className="space-y-2">
                      {persona.feels.map((feel, idx) => (
                        <p key={idx} className="text-sm text-foreground/70 italic">
                          "{feel}"
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Thinks */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-accent" />
                      </div>
                      <p className="font-bold text-foreground">Thinks</p>
                    </div>
                    <div className="space-y-2">
                      {persona.thinks.map((thought, idx) => (
                        <p key={idx} className="text-sm text-foreground/70 italic">
                          "{thought}"
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Says */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-chart-1/20 flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-chart-1" />
                      </div>
                      <p className="font-bold text-foreground">Says</p>
                    </div>
                    <div className="space-y-2">
                      {persona.says.map((quote, idx) => (
                        <p key={idx} className="text-sm text-foreground/70 italic">
                          "{quote}"
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Does */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-10 h-10 rounded-full bg-chart-2/20 flex items-center justify-center">
                        <Hand className="w-5 h-5 text-chart-2" />
                      </div>
                      <p className="font-bold text-foreground">Does</p>
                    </div>
                    <div className="space-y-2">
                      {persona.does.map((action, idx) => (
                        <p key={idx} className="text-sm text-foreground/70">
                          • {action}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Divider for multiple personas */}
            {idx < personas.length - 1 && (
              <div className="my-20 border-t-2 border-border/30 pt-20">
                <div className="text-center mb-12">
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Next Persona</Badge>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Comparison Schema - How They Complement Each Other */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">The Perfect Match</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Marouan and Leila represent two sides of the same coin. Careerly brings them together for mutual success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Marouan */}
            <Card className="border-2 border-primary/30 p-8 bg-gradient-to-br from-primary/5 to-transparent">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-foreground">M</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground text-center mb-4">Marouan</h3>
              <div className="space-y-3 text-sm text-foreground/70">
                <p>
                  <span className="font-semibold text-primary">Seeks:</span> Opportunity & Mentorship
                </p>
                <p>
                  <span className="font-semibold text-primary">Offers:</span> Fresh Perspective & Energy
                </p>
                <p>
                  <span className="font-semibold text-primary">Needs:</span> Recognition & Growth
                </p>
              </div>
            </Card>

            {/* Arrow / Connection */}
            <div className="flex items-center justify-center">
              <div className="text-center">
                <Zap className="w-12 h-12 text-accent mx-auto mb-4" />
                <p className="font-bold text-foreground mb-4">Careerly</p>
                <p className="text-sm text-foreground/70 text-pretty">
                  Connects ambitious seekers with visionary leaders through Careerly's AI-powered matching
                </p>
              </div>
            </div>

            {/* Leila */}
            <Card className="border-2 border-accent/30 p-8 bg-gradient-to-br from-accent/5 to-transparent">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-foreground">L</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground text-center mb-4">Leila</h3>
              <div className="space-y-3 text-sm text-foreground/70">
                <p>
                  <span className="font-semibold text-accent">Seeks:</span> Talent & Potential
                </p>
                <p>
                  <span className="font-semibold text-accent">Offers:</span> Experience & Guidance
                </p>
                <p>
                  <span className="font-semibold text-accent">Needs:</span> Efficient Screening
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Key Insights Table */}
        <Card className="border border-border p-12 bg-gradient-to-r from-primary/5 to-accent/5 mb-20">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Key Insights</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left py-4 px-4 font-bold text-foreground">Dimension</th>
                  <th className="text-left py-4 px-4 font-bold text-primary">Marouan (Seeker)</th>
                  <th className="text-left py-4 px-4 font-bold text-accent">Leila (Hiring)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Primary Goal</td>
                  <td className="py-4 px-4 text-foreground/70">Secure meaningful opportunity</td>
                  <td className="py-4 px-4 text-foreground/70">Find high-potential talent</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Key Challenge</td>
                  <td className="py-4 px-4 text-foreground/70">Standing out & getting noticed</td>
                  <td className="py-4 px-4 text-foreground/70">Assessing real potential</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Decision Factor</td>
                  <td className="py-4 px-4 text-foreground/70">Company culture & learning</td>
                  <td className="py-4 px-4 text-foreground/70">Passion & problem-solving</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-4 px-4 font-semibold text-foreground">Success Metric</td>
                  <td className="py-4 px-4 text-foreground/70">Offer & conversion to FTE</td>
                  <td className="py-4 px-4 text-foreground/70">Intern retention & performance</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-foreground">What They Want</td>
                  <td className="py-4 px-4 text-foreground/70">Visibility & guidance</td>
                  <td className="py-4 px-4 text-foreground/70">Efficiency & quality hires</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>

        {/* Final CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Be Part of the Story?</h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Whether you're Marouan seeking your breakthrough opportunity or Leila building your team, Careerly is here
            to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/jobs">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Explore Opportunities
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="border-border hover:bg-muted bg-transparent">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
