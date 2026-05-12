import { Droplets, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2">
              <Droplets className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-gray-900">Lifeline Bharat</span>
            </Link>
            <p className="text-sm leading-6 text-gray-600 max-w-xs">
              Empowering Indian communities through life-saving blood donations. 
              Connecting donors with those in need across Bharat.
            </p>
            <div className="flex space-x-6">
              {/* Add social links here if needed */}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Platform</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/dashboard" className="text-sm leading-6 text-gray-600 hover:text-primary">Find Donors</Link>
                  </li>
                  <li>
                    <Link href="/requests" className="text-sm leading-6 text-gray-600 hover:text-primary">Emergency Requests</Link>
                  </li>
                  <li>
                    <Link href="/about" className="text-sm leading-6 text-gray-600 hover:text-primary">About Bharat Lifeline</Link>
                  </li>
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                <ul role="list" className="mt-6 space-y-4">
                  <li>
                    <Link href="/faq" className="text-sm leading-6 text-gray-600 hover:text-primary">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-sm leading-6 text-gray-600 hover:text-primary">Contact Us</Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="text-sm leading-6 text-gray-600 hover:text-primary">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">Contact</h3>
              <ul role="list" className="mt-6 space-y-4">
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-primary" />
                  +91 7978683707
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-primary" />
                  debaprasadjena187@gmail.com
                </li>
                <li className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 text-primary" />
                  Bhubaneswar, Odisha
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-900/10 pt-8 sm:mt-16 lg:mt-24 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs leading-5 text-gray-500">&copy; {new Date().getFullYear()} Lifeline Bharat. All rights reserved.</p>
          <p className="text-xs font-medium text-gray-400 flex items-center gap-1">
            Made with <span className="text-red-500">❤️</span> in Bharat
          </p>
        </div>
      </div>
    </footer>
  )
}
