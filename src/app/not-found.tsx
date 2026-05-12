import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplets } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center px-4">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
        <Droplets className="h-10 w-10" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">404</h1>
      <p className="mt-4 text-lg text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
      <div className="mt-10">
        <Link href="/">
          <Button size="lg">Go back home</Button>
        </Link>
      </div>
    </div>
  )
}
