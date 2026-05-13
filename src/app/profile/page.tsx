"use client"

import { useState, useEffect, useCallback } from "react"
import { User, Mail, Phone, MapPin, Heart, Calendar, Camera, Loader2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClientComponentClient } from "@/lib/supabase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

interface UserProfile {
  full_name?: string
  phone?: string
  age?: number
  blood_group?: string
  address?: string
  avatar_url?: string
  email?: string
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    bloodGroup: "",
    address: "",
  })

  const supabase = createClientComponentClient()
  const router = useRouter()

  const fetchProfile = useCallback(async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/login")
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error) throw error

      setProfile(data)
      setFormData({
        fullName: data.full_name || "",
        phone: data.phone || "",
        age: data.age?.toString() || "",
        bloodGroup: data.blood_group || "",
        address: data.address || "",
      })
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch profile")
    } finally {
      setLoading(false)
    }
  }, [supabase, router])

  useEffect(() => {
    const init = async () => {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      await fetchProfile()
    }
    init()
  }, [fetchProfile])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
          age: parseInt(formData.age),
          blood_group: formData.bloodGroup,
          address: formData.address,
        })
        .eq('id', user.id)

      if (error) throw error
      toast.success("Profile updated successfully")
      fetchProfile()
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <div className="relative inline-block">
          <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
            <AvatarImage src={profile?.avatar_url} />
            <AvatarFallback className="bg-primary/5 text-primary text-4xl">
              {formData.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <Button 
            size="icon" 
            variant="secondary" 
            className="absolute bottom-0 right-0 rounded-full border shadow-sm"
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900">{formData.fullName}</h1>
        <p className="text-gray-500">Manage your account and donor information</p>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your name and contact details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input 
                    id="fullName" 
                    value={formData.fullName} 
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})} 
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" value={profile?.email} disabled className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Location Details</CardTitle>
                <CardDescription>We use this to show you nearby donors and requests.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Residential Address</Label>
                  <Input 
                    id="address" 
                    value={formData.address} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})} 
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Medical Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Select 
                    onValueChange={(val: string | null) => val && setFormData({...formData, bloodGroup: val})} 
                    value={formData.bloodGroup}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Group" />
                    </SelectTrigger>
                    <SelectContent>
                      {bloodGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age" 
                    type="number" 
                    value={formData.age} 
                    onChange={(e) => setFormData({...formData, age: e.target.value})} 
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <h4 className="font-bold text-primary flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Donor Status
                </h4>
                <p className="text-xs text-gray-600 mt-2">
                  Your profile is currently public. People can find you in search results if they need your blood group.
                </p>
                <Button variant="outline" size="sm" className="w-full mt-4 border-primary text-primary hover:bg-primary/10">
                  Switch to Private
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <Button type="submit" disabled={saving} className="gap-2">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}
