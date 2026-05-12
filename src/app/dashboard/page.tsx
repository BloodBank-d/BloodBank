"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, MapPin, Droplets, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DonorCard from "@/components/shared/DonorCard"
import { createClientComponentClient } from "@/lib/supabase"
import { toast } from "sonner"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

interface Donor {
  id: string
  full_name: string
  blood_group: string
  address: string
  phone: string
  avatar_url?: string
  latitude?: number
  longitude?: number
}

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [donors, setDonors] = useState<Donor[]>([])
  const [filters, setFilters] = useState({
    bloodGroup: "all",
    location: "",
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)

  const supabase = createClientComponentClient()

  const fetchDonors = useCallback(async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()

      let query = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'user')

      if (user) {
        query = query.neq('id', user.id)
      }

      if (filters.bloodGroup !== "all") {
        query = query.eq('blood_group', filters.bloodGroup)
      }

      if (filters.location) {
        query = query.ilike('address', `%${filters.location}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setDonors((data as Donor[]) || [])
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to fetch donors"
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }, [filters, supabase])

  useEffect(() => {
    // Detect user location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast.error("Could not detect your location. Showing all donors.")
        }
      )
    }
    fetchDonors()
  }, [fetchDonors])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Find Blood Donors</h1>
          <p className="text-gray-600 mt-2">Search for compatible blood donors near your location.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-48">
            <Select 
              onValueChange={(val: string | null) => val && setFilters({...filters, bloodGroup: val})}
              defaultValue="all"
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Blood Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Groups</SelectItem>
                {bloodGroups.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1 min-w-[200px] relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search by city or address..." 
              className="pl-10 bg-white"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
          </div>
          <Button onClick={fetchDonors} className="gap-2">
            <Search className="h-4 w-4" /> Search
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
          <p className="text-gray-500">Searching for donors...</p>
        </div>
      ) : donors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <DonorCard 
              key={donor.id} 
              donor={{
                ...donor,
                distance: "2.4 km away" // Placeholder for distance calculation logic
              }} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <Droplets className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No donors found</h3>
          <p className="text-gray-500 mt-1">Try adjusting your filters or location.</p>
          <Button variant="outline" className="mt-6" onClick={() => {
            setFilters({bloodGroup: "all", location: ""})
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
