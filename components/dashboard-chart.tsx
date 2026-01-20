"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export function CareerVelocityChart() {
  const data = [
    { month: "Jan", velocity: 65 },
    { month: "Feb", velocity: 72 },
    { month: "Mar", velocity: 68 },
    { month: "Apr", velocity: 78 },
    { month: "May", velocity: 85 },
    { month: "Jun", velocity: 92 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis stroke="var(--color-muted-foreground)" />
        <YAxis stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: `1px solid var(--color-border)`,
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="velocity"
          stroke="var(--color-primary)"
          strokeWidth={2}
          dot={{ fill: "var(--color-primary)" }}
          name="Career Velocity"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function JobApplicationsChart() {
  const data = [
    { month: "Jan", applications: 3, interviews: 1 },
    { month: "Feb", applications: 5, interviews: 2 },
    { month: "Mar", applications: 4, interviews: 1 },
    { month: "Apr", applications: 8, interviews: 3 },
    { month: "May", applications: 7, interviews: 3 },
    { month: "Jun", applications: 12, interviews: 5 },
  ]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
        <XAxis stroke="var(--color-muted-foreground)" />
        <YAxis stroke="var(--color-muted-foreground)" />
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: `1px solid var(--color-border)`,
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Bar dataKey="applications" fill="var(--color-primary)" name="Applications" />
        <Bar dataKey="interviews" fill="var(--color-accent)" name="Interviews" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function SkillsDistributionChart() {
  const data = [
    { name: "Frontend", value: 35 },
    { name: "Backend", value: 28 },
    { name: "DevOps", value: 20 },
    { name: "Data", value: 17 },
  ]

  const COLORS = ["var(--color-primary)", "var(--color-accent)", "var(--color-chart-3)", "var(--color-chart-4)"]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, value }) => `${name} ${value}%`}
          outerRadius={80}
          fill="var(--color-primary)"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "var(--color-card)",
            border: `1px solid var(--color-border)`,
            borderRadius: "0.5rem",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
