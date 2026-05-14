"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Heart, ArrowRight, Droplets, ShieldCheck, Zap, MapPin } from "lucide-react"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Hero() {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 200])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-gray-900">
      {/* Background Decorative Elements */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div 
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-[#ff80b5] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-10 pb-24 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <motion.div 
          style={{ opacity }}
          className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-24 sm:mt-32 lg:mt-16"
          >
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/20">
                What's New
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                <span>V2.0 is live with Map Tracking</span>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </span>
            </a>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white"
          >
            Rakt Daan, <span className="text-primary relative inline-block">
              Mahadaan.
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-0 left-0 h-1 bg-primary/30 rounded-full"
              />
            </span> <br />
            <span className="text-3xl sm:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
              Every Drop Saves a Life in Bharat.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
          >
            Join Bharat&apos;s most advanced blood donation network. We use real-time geolocation to connect you with donors exactly when every second counts.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-x-6"
          >
            <Link href="/requests/new" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-12 px-8 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                Post Request <Zap className="ml-2 h-4 w-4 fill-current" />
              </Button>
            </Link>
            <Link href="/dashboard" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white flex items-center gap-2 group py-2">
              Find Donors <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex items-center gap-8 border-t border-gray-100 dark:border-gray-800 pt-8"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <ShieldCheck className="h-5 w-5 text-green-500" />
              <span>Verified Donors</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Zap className="h-5 w-5 text-yellow-500" />
              <span>Instant Alerts</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
        >
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <motion.div 
              style={{ y: y1 }}
              className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 dark:bg-white/5 dark:ring-white/10"
            >
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
              
              <div className="bg-white dark:bg-gray-950 rounded-lg shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800 w-[300px] sm:w-[500px]">
                 {/* Mock UI for Visual Impact */}
                 <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                    <div className="flex gap-2">
                       <div className="w-3 h-3 rounded-full bg-red-400" />
                       <div className="w-3 h-3 rounded-full bg-yellow-400" />
                       <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">LIFELINE-DASHBOARD.EXE</div>
                 </div>
                 <div className="p-6 space-y-4">
                    <div className="h-4 w-3/4 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
                    <div className="grid grid-cols-2 gap-4">
                       <div className="h-20 bg-primary/5 rounded-lg border border-primary/10 flex flex-col items-center justify-center">
                          <Droplets className="h-6 w-6 text-primary mb-1" />
                          <span className="text-[10px] font-bold">O+ Needed</span>
                       </div>
                       <div className="h-20 bg-gray-50 dark:bg-gray-800 rounded-lg flex flex-col items-center justify-center">
                          <Users className="h-6 w-6 text-gray-400 mb-1" />
                          <span className="text-[10px]">12 Donors Near</span>
                       </div>
                    </div>
                    <div className="h-32 bg-gray-50 dark:bg-gray-800 rounded-lg relative overflow-hidden">
                       <div className="absolute inset-0 flex items-center justify-center">
                          <MapPin className="h-8 w-8 text-primary animate-bounce" />
                       </div>
                       <div className="absolute bottom-2 left-2 right-2 h-1 bg-primary/20 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '70%' }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="h-full bg-primary"
                          />
                       </div>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div 
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-primary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
          }}
        />
      </div>
    </div>
  )
}

const Users = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
)
