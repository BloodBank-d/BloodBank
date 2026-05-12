"use client"

import { motion } from "framer-motion"
import { Search, Droplets, Shield, Clock } from "lucide-react"

const features = [
  {
    name: 'Real-time Search',
    description: 'Find active blood donors in your city within seconds using our geolocation tracking system.',
    icon: Search,
  },
  {
    name: 'Emergency Requests',
    description: 'Post urgent blood requests that reach thousands of nearby donors instantly through our alert system.',
    icon: Droplets,
  },
  {
    name: 'Verified Donors',
    description: 'Every donor on our platform is verified through Aadhaar or mobile authentication for trust and safety.',
    icon: Shield,
  },
  {
    name: '24/7 Support',
    description: 'Our dedicated team and community are available round the clock for emergency blood support.',
    icon: Clock,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export default function Features() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-base font-semibold leading-7 text-primary"
          >
            Why Choose Lifeline Bharat?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-white"
          >
            Everything you need to save a life
          </motion.p>
        </div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <motion.div 
                key={feature.name} 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-950 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all hover:shadow-md"
              >
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg shadow-primary/20">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  )
}
