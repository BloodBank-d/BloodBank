"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X, Info } from "lucide-react"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

const compatibility: Record<string, { canGiveTo: string[], canReceiveFrom: string[] }> = {
  "A+": { canGiveTo: ["A+", "AB+"], canReceiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-": { canGiveTo: ["A+", "A-", "AB+", "AB-"], canReceiveFrom: ["A-", "O-"] },
  "B+": { canGiveTo: ["B+", "AB+"], canReceiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-": { canGiveTo: ["B+", "B-", "AB+", "AB-"], canReceiveFrom: ["B-", "O-"] },
  "AB+": { canGiveTo: ["AB+"], canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"] },
  "AB-": { canGiveTo: ["AB+", "AB-"], canReceiveFrom: ["A-", "B-", "AB-", "O-"] },
  "O+": { canGiveTo: ["A+", "B+", "AB+", "O+"], canReceiveFrom: ["O+", "O-"] },
  "O-": { canGiveTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], canReceiveFrom: ["O-"] },
}

export default function CompatibilityMatrix() {
  const [selectedGroup, setSelectedGroup] = useState<string>("O-")

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Who Can You Help?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Select your blood group to see your donation and receiving compatibility.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-50 dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              Select Blood Group
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`h-16 rounded-xl font-bold transition-all ${
                    selectedGroup === group
                      ? "bg-primary text-white shadow-lg shadow-primary/30 scale-105"
                      : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:border-primary border border-transparent"
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <p className="text-sm text-primary/80 italic">
                {selectedGroup === 'O-' && "You are a Universal Donor! Your blood can be given to anyone."}
                {selectedGroup === 'AB+' && "You are a Universal Recipient! You can receive blood from any group."}
                {selectedGroup !== 'O-' && selectedGroup !== 'AB+' && `Interesting fact: People with ${selectedGroup} can save thousands of lives across Bharat.`}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedGroup}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Can Give To */}
                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/20">
                  <h4 className="text-green-700 dark:text-green-400 font-bold mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5" /> You can give to:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {compatibility[selectedGroup].canGiveTo.map((g) => (
                      <span key={g} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm font-bold text-green-600">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Can Receive From */}
                <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-2xl border border-blue-100 dark:border-blue-900/20">
                  <h4 className="text-blue-700 dark:text-blue-400 font-bold mb-4 flex items-center gap-2">
                    <Droplet className="h-5 w-5" /> You can receive from:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {compatibility[selectedGroup].canReceiveFrom.map((g) => (
                      <span key={g} className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm font-bold text-blue-600">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}

const Droplet = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5s-3 3.5-3 5.5a7 7 0 0 0 7 7z"/></svg>
)
