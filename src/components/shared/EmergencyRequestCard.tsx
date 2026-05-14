import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Phone, MapPin, Hospital, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

interface RequestCardProps {
  request: {
    patient_name: string
    blood_group: string
    hospital_name: string
    location: string
    units_required: number
    urgency_level: 'Normal' | 'Urgent' | 'Critical'
    contact_number: string
    created_at: string
    notes?: string
  }
}

export default function EmergencyRequestCard({ request }: RequestCardProps) {
  const urgencyColors = {
    Normal: "bg-blue-100 text-blue-700 border-blue-200",
    Urgent: "bg-orange-100 text-orange-700 border-orange-200",
    Critical: "bg-red-100 text-red-700 border-red-200"
  }

  return (
    <Card className={`overflow-hidden border-l-4 ${
      request.urgency_level === 'Critical' ? 'border-l-red-600' : 
      request.urgency_level === 'Urgent' ? 'border-l-orange-500' : 'border-l-blue-500'
    }`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Badge className={`font-bold ${urgencyColors[request.urgency_level]}`}>
            {request.urgency_level}
          </Badge>
          <span className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3" /> 
            {formatDistanceToNow(new Date(request.created_at))} ago
          </span>
        </div>
        <CardTitle className="mt-4 flex items-center gap-2">
          {request.patient_name} Needs {request.blood_group}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Hospital className="h-4 w-4 text-primary" />
              <span className="font-medium">{request.hospital_name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="truncate">{request.location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{request.units_required}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Units Required</div>
          </div>
        </div>

        {request.notes && (
          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border italic">
            &quot;{request.notes}&quot;
          </p>
        )}

        <div className="pt-4 flex flex-col gap-2 border-t">
          <div className="flex flex-col sm:flex-row gap-3">
            <a 
              href={`tel:${request.contact_number}`}
              className={cn(buttonVariants({ variant: "outline", className: "w-full sm:flex-1" }))}
            >
              <Phone className="h-4 w-4 mr-2" /> Call
            </a>
            <a 
              href={`https://wa.me/${request.contact_number.replace(/\D/g, '')}?text=${encodeURIComponent(
                `Hello! I saw your blood request for ${request.patient_name} on Lifeline Bharat. I would like to help by donating ${request.blood_group} blood. \n\n"To the world you may be one person, but to one person you may be the world." \n\nPlease let me know the process or if there is anything specific I should know. I am ready to help!`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ 
                variant: request.urgency_level === 'Critical' ? 'destructive' : 'default',
                className: "w-full sm:flex-1 gap-2" 
              }))}
            >
              Donate Now
            </a>
          </div>
          <a 
            href={`https://wa.me/?text=${encodeURIComponent(
              `🚨 *BLOOD EMERGENCY* 🚨\n\n*Patient:* ${request.patient_name}\n*Blood Group:* ${request.blood_group}\n*Hospital:* ${request.hospital_name}\n*Location:* ${request.location}\n*Units:* ${request.units_required}\n\nPlease contact: ${request.contact_number}\n\nShared via Lifeline Bharat`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "secondary", className: "w-full bg-green-600 hover:bg-green-700 text-white" }))}
          >
            <svg className="h-4 w-4 mr-2 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Share to WhatsApp
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
