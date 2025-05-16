"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

interface AuthModalProps {
  trigger?: React.ReactNode
  defaultTab?: "login" | "signup"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function AuthModal({ 
  trigger, 
  defaultTab = "login",
  open,
  onOpenChange
}: AuthModalProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState<"login" | "signup">(defaultTab)
  
  // Reference to the tabs
  const loginTabRef = React.useRef<HTMLButtonElement>(null)
  const signupTabRef = React.useRef<HTMLButtonElement>(null)

  // Handle controlled/uncontrolled open state
  React.useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  const switchToLogin = () => {
    setActiveTab("login")
    loginTabRef.current?.click()
  }

  const switchToSignup = () => {
    setActiveTab("signup")
    signupTabRef.current?.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-[425px]" hideCloseButton={true}>
        <VisuallyHidden>
          <DialogTitle>Authentication</DialogTitle>
        </VisuallyHidden>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger ref={loginTabRef} value="login">Login</TabsTrigger>
            <TabsTrigger ref={signupTabRef} value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Sign in to access your Ledgerly account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="yourname@example.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" />
                </div>
                {/* <div className="text-sm text-right">
                  <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                </div> */}
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full">Login</Button>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <span>Don't have an account? </span>
                  <button 
                    className="text-blue-600 hover:underline"
                    onClick={switchToSignup}
                  >
                    Sign up
                  </button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>
                  Sign up for a new Ledgerly account to get started.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input id="fullname" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="yourname@example.com" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input id="signup-password" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="budget">Budget</Label>
                  <Input id="budget" type="number" />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">Create Account</Button>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  <span>Already have an account? </span>
                  <button 
                    className="text-blue-600 hover:underline"
                    onClick={switchToLogin}
                  >
                    Login
                  </button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
