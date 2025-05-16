"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

interface ProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const [credentials, setCredentials] = useState({
    username: "Sasquatch",
    password: "test123",
    email: "demo@gmail.com"
  })
  
  const [budget, setBudget] = useState("1000")

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCredentials(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdateCredentials = () => {
    // Here you would implement the API call to update credentials
    console.log("Updating credentials:", credentials)
    // Provide feedback to user (could use a toast notification)
  }

  const handleUpdateBudget = () => {
    // Here you would implement the API call to update budget
    console.log("Updating budget:", budget)
    // Provide feedback to user
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleCredentialChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={credentials.email}
              onChange={handleCredentialChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleCredentialChange}
              placeholder="Enter new password"
            />
          </div>
          <Button 
            onClick={handleUpdateCredentials} 
            className="mt-2 text-black bg-white hover:bg-stone-200"
          >
            Update Credentials
          </Button>
          
          <Separator className="my-2" />
          
          <div className="grid grid-cols-[1fr_auto] gap-4 items-end">
            <div className="grid gap-2">
              <Label htmlFor="budget">Monthly Budget</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            <Button 
              onClick={handleUpdateBudget}
              className="bg-white text-black hover:bg-stone-200"
            >
              Update Budget
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
