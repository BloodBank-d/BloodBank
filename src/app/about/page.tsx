"use client"

import { motion } from "framer-motion"
import { Droplets, Heart, Users, MapPin, CheckCircle2 } from "lucide-react"

const stats = [
  { label: 'Registered Donors', value: '10,000+' },
  { label: 'Lives Saved', value: '25,000+' },
  { label: 'Cities Covered', value: '500+' },
  { label: 'Blood Bags Collected', value: '15,000+' },
]

const values = [
  {
    title: "Accessibility",
    description: "Making blood donation accessible to every citizen of India through technology.",
    icon: MapPin
  },
  {
    title: "Urgency",
    description: "Responding to emergency blood requests within minutes, not hours.",
    icon: Heart
  },
  {
    title: "Community",
    description: "Building a selfless community of donors dedicated to saving lives.",
    icon: Users
  }
]

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">About Lifeline Bharat</h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              India's premier digital platform dedicated to bridging the gap between blood donors and those in urgent need.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 opacity-10">
          <Droplets className="w-[600px] h-[600px]" />
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                In a country as vast as India, finding the right blood group during an emergency can be a daunting task. Lifeline Bharat was born from the vision to ensure that no life is lost due to the unavailability of blood.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time donor tracking across India",
                  "Verified medical profiles",
                  "Zero-cost platform for patients",
                  "Secure and private data handling"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[400px] bg-gray-100"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent flex items-center justify-center">
                <Droplets className="w-32 h-32 text-primary animate-pulse" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-sm"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/20 text-primary mb-6">
                  <value.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
