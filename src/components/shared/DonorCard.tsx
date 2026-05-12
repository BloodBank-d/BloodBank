import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Phone, MapPin, Droplets, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface DonorCardProps {
  donor: {
    id: string
    full_name: string
    blood_group: string
    address: string
    phone: string
    avatar_url?: string
    distance?: string
    latitude?: number
    longitude?: number
  }
}

export default function DonorCard({ donor }: DonorCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-gray-100">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <Avatar className="h-14 w-14 border-2 border-primary/10">
              <AvatarImage src={donor.avatar_url} />
              <AvatarFallback className="bg-primary/5 text-primary">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{donor.full_name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 font-bold">
                  {donor.blood_group}
                </Badge>
                {donor.distance && (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {donor.distance}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Droplets className="h-6 w-6 text-primary/20" />
        </div>
        
        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="truncate">{donor.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone className="h-4 w-4 text-primary" />
            <span>{donor.phone}</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2">
          <div className="flex gap-3">
            <Link href={`/profile/${donor.id}`} className="flex-1">
              <Button className="w-full" variant="outline">View Profile</Button>
            </Link>
            <a 
              href={`tel:${donor.phone}`} 
              className={cn(buttonVariants({ className: "flex-1" }))}
            >
              Contact Now
            </a>
          </div>
          {donor.latitude && donor.longitude && (
            <a 
              href={`https://www.google.com/maps/dir/?api=1&destination=${donor.latitude},${donor.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "secondary", className: "w-full" }))}
            >
              Navigate to Location
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
