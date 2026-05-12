"use client"

import { motion } from "framer-motion"

const stats = [
  { id: 1, name: 'Active Donors', value: '5,000+' },
  { id: 2, name: 'Lives Saved', value: '12,000+' },
  { id: 3, name: 'Hospitals Connected', value: '200+' },
  { id: 4, name: 'Success Rate', value: '99%' },
]

export default function Stats() {
  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id} 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              className="mx-auto flex max-w-xs flex-col gap-y-4"
            >
              <dt className="text-base leading-7 text-gray-600 dark:text-gray-400">{stat.name}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                {stat.value}
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  )
}
