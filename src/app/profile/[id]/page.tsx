"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClientComponentClient } from "@/lib/supabase"
import { motion } from "framer-motion"
import { 
  Droplets, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ArrowLeft, 
  ShieldCheck, 
  CalendarCheck,
  Navigation
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export default function DonorProfilePage() {
  const { id } = useParams()
  const router = useRouter()
  const [donor, setDonor] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchDonor() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setDonor(data)
      } catch (error: any) {
        toast.error("Failed to load donor profile")
        router.push("/dashboard")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchDonor()
  }, [id, supabase, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!donor) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Header / Cover */}
      <div className="h-48 bg-gradient-to-r from-primary to-red-900 relative">
        <Button 
          variant="ghost" 
          className="absolute top-6 left-6 text-white hover:bg-white/20"
          onClick={() => router.back()}
        >
          <ArrowLeft className="h-5 w-5 mr-2" /> Back
        </Button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-none shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="p-8 md:flex gap-8 items-start">
                <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-900 shadow-lg -mt-16 md:mt-0">
                  <AvatarImage src={donor.avatar_url} />
                  <AvatarFallback className="text-3xl bg-red-50 text-primary">
                    {donor.full_name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="mt-6 md:mt-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{donor.full_name}</h1>
                    <Badge className="bg-green-50 text-green-700 border-green-200">
                      <ShieldCheck className="h-3 w-3 mr-1" /> Verified Donor
                    </Badge>
                  </div>
                  <p className="text-gray-500 mt-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {donor.address}
                  </p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-2xl text-center border border-red-100 dark:border-red-900/30">
                      <div className="text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-1">Blood Group</div>
                      <div className="text-2xl font-black text-primary">{donor.blood_group}</div>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-2xl text-center border border-blue-100 dark:border-blue-900/30">
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mb-1">Age</div>
                      <div className="text-2xl font-black text-blue-700 dark:text-blue-400">{donor.age}</div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center border border-gray-100 dark:border-gray-700">
                      <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Donations</div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white">12</div>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-2xl text-center border border-green-100 dark:border-green-900/30">
                      <div className="text-xs text-green-600 dark:text-green-400 font-bold uppercase tracking-wider mb-1">Lives Saved</div>
                      <div className="text-2xl font-black text-green-700 dark:text-green-400">36</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-8 pb-8 flex flex-wrap gap-4">
                <a href={`tel:${donor.phone}`} className="flex-1 min-w-[200px]">
                  <Button className="w-full h-12 text-lg gap-2">
                    <Phone className="h-5 w-5" /> Call {donor.full_name}
                  </Button>
                </a>
                {donor.latitude && donor.longitude && (
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${donor.latitude},${donor.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[200px]"
                  >
                    <Button variant="outline" className="w-full h-12 text-lg gap-2">
                      <Navigation className="h-5 w-5" /> Get Directions
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Email Address</p>
                    <p className="font-medium">{donor.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Phone Number</p>
                    <p className="font-medium">{donor.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">Current Location</p>
                    <p className="font-medium">{donor.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { date: '20 May 2024', loc: 'Capital Hospital' },
                    { date: '15 Jan 2024', loc: 'Red Cross Center' },
                    { date: '10 Oct 2023', loc: 'Blood Camp' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="mt-1 h-2 w-2 rounded-full bg-primary shrink-0" />
                      <div>
                        <p className="font-bold text-sm">{item.date}</p>
                        <p className="text-xs text-gray-500">{item.loc}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <p className="text-xs text-primary font-bold flex items-center gap-1">
                      <CalendarCheck className="h-4 w-4" /> Available for next donation
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
