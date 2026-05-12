"use client"

import { useState, useEffect } from "react"
import { Users, Droplets, AlertCircle, Building2, Trash2, CheckCircle, XCircle, LayoutDashboard, Search } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { createClientComponentClient } from "@/lib/supabase"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export default function AdminPage() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<any[]>([])
  const [requests, setRequests] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRequests: 0,
    activeEmergencies: 0,
  })

  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    checkAdmin()
    fetchData()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push("/login")
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      toast.error("Access denied. Admin only.")
      router.push("/dashboard")
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const [usersRes, requestsRes] = await Promise.all([
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('blood_requests').select('*').order('created_at', { ascending: false })
      ])

      if (usersRes.error) throw usersRes.error
      if (requestsRes.error) throw requestsRes.error

      setUsers(usersRes.data || [])
      setRequests(requestsRes.data || [])

      setStats({
        totalUsers: usersRes.data?.length || 0,
        totalRequests: requestsRes.data?.length || 0,
        activeEmergencies: requestsRes.data?.filter(r => r.urgency_level === 'Critical' || r.urgency_level === 'Urgent').length || 0,
      })
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch admin data")
    } finally {
      setLoading(false)
    }
  }

  const deleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', id)
      if (error) throw error
      toast.success("User deleted")
      fetchData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return
    try {
      const { error } = await supabase.from('blood_requests').delete().eq('id', id)
      if (error) throw error
      toast.success("Request deleted")
      fetchData()
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-10">
        <div className="h-10 w-10 bg-gray-900 text-white rounded-lg flex items-center justify-center">
          <LayoutDashboard className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Overview of the Lifeline platform activities.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="bg-white border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-gray-400 mt-1">Registered users on platform</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">Total Requests</CardTitle>
            <Droplets className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRequests}</div>
            <p className="text-xs text-gray-400 mt-1">Total requests posted to date</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-gray-100 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-gray-500">Active Emergencies</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.activeEmergencies}</div>
            <p className="text-xs text-gray-400 mt-1">High urgency requests pending</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="w-full">
        <TabsList className="bg-gray-100 p-1 mb-6">
          <TabsTrigger value="users" className="gap-2">
            <Users className="h-4 w-4" /> Users
          </TabsTrigger>
          <TabsTrigger value="requests" className="gap-2">
            <Droplets className="h-4 w-4" /> Blood Requests
          </TabsTrigger>
          <TabsTrigger value="hospitals" className="gap-2">
            <Building2 className="h-4 w-4" /> Hospitals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>View and manage registered users.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Name</th>
                      <th className="px-6 py-4">Blood Group</th>
                      <th className="px-6 py-4">Role</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{user.full_name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="bg-red-50 text-red-700">{user.blood_group}</Badge>
                        </td>
                        <td className="px-6 py-4 capitalize">{user.role}</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle className="h-3 w-3" /> Active
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600" onClick={() => deleteUser(user.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Blood Requests</CardTitle>
              <CardDescription>Manage emergency requests and spam.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50 text-gray-500 font-medium">
                    <tr>
                      <th className="px-6 py-4">Patient</th>
                      <th className="px-6 py-4">Blood Group</th>
                      <th className="px-6 py-4">Urgency</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {requests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{request.patient_name}</div>
                          <div className="text-xs text-gray-500">{request.hospital_name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="bg-red-50 text-red-700">{request.blood_group}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={request.urgency_level === 'Critical' ? 'destructive' : 'secondary'}>
                            {request.urgency_level}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 capitalize">{request.status}</td>
                        <td className="px-6 py-4 text-right flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-600">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600" onClick={() => deleteRequest(request.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
