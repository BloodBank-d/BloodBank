"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Droplets, Loader2, User, Phone, Mail, Lock, MapPin, Calendar, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { createClientComponentClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    age: "",
    bloodGroup: "",
    address: "",
  })
  const [location, setLocation] = useState<{lat: number | null, lng: number | null}>({lat: null, lng: null})

  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        }
      )
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleBloodGroupChange = (value: string | null) => {
    if (value) setFormData({ ...formData, bloodGroup: value })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // 1. Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            age: formData.age,
            blood_group: formData.bloodGroup,
            address: formData.address,
            latitude: location.lat,
            longitude: location.lng,
          }
        }
      })

      if (authError) throw authError

      toast.success("Account created successfully! Please check your email.")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message || "Failed to register")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white shadow-lg">
          <Droplets className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Join the Lifeline Community</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Register to become a donor or request help</p>
      </div>

      <Card className="w-full max-w-2xl border-gray-200 shadow-xl dark:border-gray-800">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>Fill in your details to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" /> Full Name
                  </Label>
                  <Input id="fullName" placeholder="John Doe" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" /> Email
                  </Label>
                  <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" /> Phone Number
                  </Label>
                  <Input id="phone" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-primary" /> Password
                  </Label>
                  <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>
              </div>

              {/* Medical Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" /> Age
                  </Label>
                  <Input id="age" type="number" placeholder="25" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup" className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-primary" /> Blood Group
                  </Label>
                  <Select onValueChange={handleBloodGroupChange} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Blood Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map((group) => (
                        <SelectItem key={group} value={group}>{group}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" /> Address
                  </Label>
                  <Input id="address" placeholder="123 Main St, City" value={formData.address} onChange={handleChange} required />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 border-t pt-6">
          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
