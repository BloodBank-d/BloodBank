"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Droplets } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EmergencyRequestCard from "@/components/shared/EmergencyRequestCard"
import Link from "next/link"
import { createClientComponentClient } from "@/lib/supabase"
import { toast } from "sonner"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

interface BloodRequest {
  id: string
  patient_name: string
  blood_group: string
  hospital_name: string
  location: string
  units_required: number
  urgency_level: 'Normal' | 'Urgent' | 'Critical'
  contact_number: string
  created_at: string
  notes?: string
  status: string
}

export default function RequestsPage() {
  const [loading, setLoading] = useState(true)
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [filter, setFilter] = useState("all")
  const supabase = createClientComponentClient()

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('blood_requests')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter !== "all") {
        query = query.eq('blood_group', filter)
      }

      const { data, error } = await query
      if (error) throw error
      setRequests((data as BloodRequest[]) || [])
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch requests"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [filter, supabase])

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Blood Requests</h1>
          <p className="text-gray-600 mt-2">View and respond to urgent blood needs in your area.</p>
        </div>
        <div className="flex items-center gap-4">
          <Select onValueChange={(val: string | null) => val && setFilter(val)} defaultValue="all">
            <SelectTrigger className="w-48 bg-white">
              <SelectValue placeholder="Filter Blood Group" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Groups</SelectItem>
              {bloodGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Link href="/requests/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> New Request
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-64 rounded-xl bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : requests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <EmergencyRequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Droplets className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No active requests</h3>
          <p className="text-gray-500 mt-1">There are no pending blood requests at the moment.</p>
        </div>
      )}
    </div>
  )
}
