"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Droplets, Loader2, Hospital, MapPin, User, Phone, Clipboard, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { createClientComponentClient } from "@/lib/supabase"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const urgencyLevels = ["Normal", "Urgent", "Critical"]

export default function NewRequestPage() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    patientName: "",
    bloodGroup: "",
    hospitalName: "",
    location: "",
    units: "",
    urgency: "Normal",
    contact: "",
    notes: ""
  })

  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        toast.error("You must be logged in to post a request")
        router.push("/login")
        return
      }

      const { error } = await supabase
        .from('blood_requests')
        .insert({
          user_id: user.id,
          patient_name: formData.patientName,
          blood_group: formData.bloodGroup,
          hospital_name: formData.hospitalName,
          location: formData.location,
          units_required: parseInt(formData.units),
          urgency_level: formData.urgency,
          contact_number: formData.contact,
          notes: formData.notes,
        })

      if (error) throw error

      toast.success("Blood request posted successfully!")
      router.push("/requests")
    } catch (error: any) {
      toast.error(error.message || "Failed to post request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-10 w-10 bg-primary text-white rounded-lg flex items-center justify-center">
          <Droplets className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Emergency Request</h1>
          <p className="text-gray-600">Provide details about the blood requirement.</p>
        </div>
      </div>

      <Card className="border-gray-200 shadow-xl">
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
          <CardDescription>All fields are required for a valid emergency post.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="patientName" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary" /> Patient Name
                </Label>
                <Input 
                  id="patientName" 
                  placeholder="Full Name" 
                  required 
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bloodGroup" className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-primary" /> Blood Group Needed
                </Label>
                <Select onValueChange={(val: string | null) => val && setFormData({...formData, bloodGroup: val})} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hospitalName" className="flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-primary" /> Hospital Name
                </Label>
                <Input 
                  id="hospitalName" 
                  placeholder="City Hospital" 
                  required 
                  value={formData.hospitalName}
                  onChange={(e) => setFormData({...formData, hospitalName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Hospital Location
                </Label>
                <Input 
                  id="location" 
                  placeholder="Street, City" 
                  required 
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="units" className="flex items-center gap-2">
                  <Clipboard className="h-4 w-4 text-primary" /> Units Required
                </Label>
                <Input 
                  id="units" 
                  type="number" 
                  placeholder="e.g. 2" 
                  required 
                  value={formData.units}
                  onChange={(e) => setFormData({...formData, units: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="urgency" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" /> Urgency Level
                </Label>
                <Select onValueChange={(val: string | null) => val && setFormData({...formData, urgency: val})} defaultValue="Normal">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    {urgencyLevels.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="contact" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" /> Contact Number
                </Label>
                <Input 
                  id="contact" 
                  placeholder="+1 (555) 000-0000" 
                  required 
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="notes">Additional Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any extra details like room number, case history, etc." 
                  rows={4}
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Posting Request...
                </>
              ) : (
                "Post Emergency Request"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
