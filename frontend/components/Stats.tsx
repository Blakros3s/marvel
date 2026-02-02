"use client";

import { motion } from "framer-motion";
import { Film, Users, Globe, Trophy, Star, Calendar } from "lucide-react";

const stats = [
  {
    icon: Film,
    value: "32+",
    label: "Movies Released",
    description: "And counting...",
  },
  {
    icon: Users,
    value: "80+",
    label: "Heroes & Villains",
    description: "Iconic characters",
  },
  {
    icon: Globe,
    value: "$29B+",
    label: "Box Office",
    description: "Worldwide revenue",
  },
  {
    icon: Trophy,
    value: "15",
    label: "Academy Awards",
    description: "Oscar wins",
  },
  {
    icon: Star,
    value: "2008",
    label: "It All Started",
    description: "Iron Man debut",
  },
  {
    icon: Calendar,
    value: "16",
    label: "Years Strong",
    description: "Of storytelling",
  },
];

export default function Stats() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            BY THE <span className="text-red-600">NUMBERS</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            The Marvel Cinematic Universe in statistics
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center p-6 rounded-2xl bg-neutral-800 border border-neutral-700 hover:border-red-600/30 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-red-500 mx-auto mb-4" />
              <div className="text-3xl sm:text-4xl font-black text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-neutral-300 mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-neutral-500">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}