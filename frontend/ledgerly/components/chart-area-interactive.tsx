"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A stacked bar chart showing monthly spending breakdown"

// Raw spending data by category and month
const rawSpendingData = [
  {
    month: "Feb",
    category: "entertainment",
    amount: 15
  },
  {
    month: "Feb",
    category: "food",
    amount: 43
  },
  {
    month: "Feb",
    category: "work",
    amount: 49
  },
  {
    month: "Mar",
    category: "entertainment",
    amount: 27
  },
  {
    month: "Mar",
    category: "food",
    amount: 32
  },
  {
    month: "Mar",
    category: "work",
    amount: 46
  },
  {
    month: "Apr",
    category: "entertainment",
    amount: 75
  },
  {
    month: "Apr",
    category: "food",
    amount: 38
  },
  {
    month: "Apr",
    category: "work",
    amount: 50
  },
  {
    month: "May",
    category: "entertainment",
    amount: 42
  },
  {
    month: "May",
    category: "food",
    amount: 30
  },
  {
    month: "May",
    category: "work",
    amount: 50
  }
]

// Transform the data for use with the bar chart
const transformDataForChart = (data) => {
  const monthData = {}
  
  // Group by month
  data.forEach(item => {
    if (!monthData[item.month]) {
      monthData[item.month] = { month: item.month }
    }
    
    monthData[item.month][item.category] = item.amount
  })
  
  // Convert to array and sort chronologically
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  
  return Object.values(monthData).sort((a, b) => 
    months.indexOf(a.month) - months.indexOf(b.month)
  )
}

const chartData = transformDataForChart(rawSpendingData)

const chartConfig = {
  spending: {
    label: "Spending",
  },
  entertainment: {
    label: "Personal",
    color: "hsl(44, 83.30%, 53.10%)",
  },
  food: {
    label: "Food",
    color: "hsl(220, 70%, 50%)",
  },
  work: {
    label: "Work",
    color: "hsl(160, 60%, 45%)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Monthly Expenditure</CardTitle>
        <CardDescription>
          Spending breakdown across categories
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart 
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              padding={{ left: 10, right: 10 }}
            />

            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 1}
              content={
                <ChartTooltipContent indicator="dot" />
              }
            />
            <Bar
              name={chartConfig.entertainment.label}
              dataKey="entertainment"
              fill={chartConfig.entertainment.color}
              stackId="a"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              name={chartConfig.food.label}
              dataKey="food"
              fill={chartConfig.food.color}
              stackId="a"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              name={chartConfig.work.label}
              dataKey="work"
              fill={chartConfig.work.color}
              stackId="a"
              radius={[4, 4, 0, 0]}
            />
            
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
