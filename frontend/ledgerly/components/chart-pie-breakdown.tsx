"use client"

import * as React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { format } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig } from "@/components/ui/chart"

// Data for current month breakdown
const monthlyBreakdownData = [
  {
    category: "entertainment",
    amount: 42
  },
  {
    category: "food",
    amount: 30
  },
  {
    category: "work",
    amount: 50
  }
]

const chartConfig = {
  entertainment: {
    label: "Entertainment",
    color: "hsl(44, 83.30%, 53.10%)",
  },
  food: {
    label: "Food",
    color: "hsl(160, 60%, 45%)",
  },
  work: {
    label: "Work",
    color: "hsl(220, 70%, 50%)",
  },
} satisfies ChartConfig

// Transform the data for use with the pie chart
const transformDataForChart = (data) => {
  return data.map(item => ({
    name: chartConfig[item.category].label,
    value: item.amount,
    color: chartConfig[item.category].color,
    category: item.category
  }))
}

const chartData = transformDataForChart(monthlyBreakdownData)

// Custom Legend component for the pie chart
const CustomLegend = (props) => {
  const { payload } = props

  if (!payload) return null

  return (
    <ul className="flex flex-row justify-center gap-6 pt-4">
      {payload.map((entry, index) => (
        <li key={`item-${index}`} className="flex items-center gap-2">
          <div 
            className="h-3 w-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm">{entry.value}</span>
          <span className="text-sm text-muted-foreground">
            ₹{chartData.find(item => item.name === entry.value)?.value}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function ChartPieBreakdown() {
  const currentMonth = format(new Date(), 'MMMM')
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Breakdown for {currentMonth}</CardTitle>
        <CardDescription>
          Category distribution for current month spending
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col h-[250px]">
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={95}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <CustomLegend payload={chartData.map(item => ({ 
            value: item.name, 
            color: item.color 
          }))} />
        </div>
      </CardContent>
    </Card>
  )
}
