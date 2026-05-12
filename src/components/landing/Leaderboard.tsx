"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Star, ShieldCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const donors = [
  { name: "Rahul Sharma", donations: 12, group: "O+", city: "Bhubaneswar", rank: 1 },
  { name: "Priya Patel", donations: 9, group: "A-", city: "Mumbai", rank: 2 },
  { name: "Amit Kumar", donations: 7, group: "B+", city: "Delhi", rank: 3 },
]

export default function Leaderboard() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl flex items-center justify-center gap-3">
            <Trophy className="text-yellow-500 h-10 w-10" /> Our Life-Saving Heroes
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Recognizing the top contributors to the Bharat blood donation community this month.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {donors.map((donor, index) => (
            <motion.div
              key={donor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-950 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4">
                {donor.rank === 1 && <Medal className="h-10 w-10 text-yellow-500" />}
                {donor.rank === 2 && <Medal className="h-10 w-10 text-gray-400" />}
                {donor.rank === 3 && <Medal className="h-10 w-10 text-orange-400" />}
              </div>

              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-4 border-primary/10 mb-6">
                  <AvatarFallback className="text-2xl bg-primary/5 text-primary">
                    {donor.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{donor.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{donor.city}</p>
                
                <div className="flex items-center gap-6 w-full pt-6 border-t dark:border-gray-800">
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-primary">{donor.donations}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Donations</div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{donor.group}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400">Group</div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/10 px-3 py-1 rounded-full">
                  <ShieldCheck className="h-3 w-3" /> Verified Hero
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
