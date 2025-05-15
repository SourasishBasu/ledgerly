"use client"

import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { ChartPieBreakdown } from "@/components/chart-pie-breakdown"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { Avatar } from "@/components/ui/avatar"
import { UserCircle } from "lucide-react"
import { ProfileDialog } from "@/components/profile-dialog"
import { useState } from "react"

import transactionsData from "./data.json"

export default function Page() {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  
  return (
        <div className="flex flex-1 flex-col">
          {/* Header section */}
          <header className="border-b border-border bg-background px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded bg-amber-600 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">L</span>
                </div>
                <span className="text-xl font-semibold">Ledgerly</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium">Sasquatch</span>
                <Avatar className="h-8 w-8 cursor-pointer" onClick={() => setIsProfileOpen(true)}>
                  <UserCircle className="h-8 w-8" />
                </Avatar>
                <ProfileDialog open={isProfileOpen} onOpenChange={setIsProfileOpen} />
              </div>
            </div>
          </header>
          
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
                <ChartAreaInteractive />
                <ChartPieBreakdown />
              </div>
              <DataTable data={transactionsData} />
            </div>
          </div>
        </div>
  )
}
