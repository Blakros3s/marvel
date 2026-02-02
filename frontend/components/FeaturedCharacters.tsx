"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Shield, Sword, Zap } from "lucide-react";

const characters = [
  {
    name: "Iron Man",
    realName: "Tony Stark",
    description: "Genius, billionaire, playboy, philanthropist. The armored Avenger who started it all.",
    icon: Zap,
    color: "from-red-600 to-yellow-500",
    stats: { strength: 85, intelligence: 100, speed: 85, durability: 85 },
  },
  {
    name: "Captain America",
    realName: "Steve Rogers",
    description: "The First Avenger. A symbol of hope and justice with an indestructible shield.",
    icon: Shield,
    color: "from-blue-600 to-red-600",
    stats: { strength: 80, intelligence: 75, speed: 80, durability: 90 },
  },
  {
    name: "Thor",
    realName: "Thor Odinson",
    description: "God of Thunder wielding Mjolnir. Asgardian royalty protecting the Nine Realms.",
    icon: Sword,
    color: "from-gray-400 to-yellow-400",
    stats: { strength: 100, intelligence: 70, speed: 90, durability: 100 },
  },
  {
    name: "Spider-Man",
    realName: "Peter Parker",
    description: "Your friendly neighborhood hero with great power comes great responsibility.",
    icon: Heart,
    color: "from-red-600 to-blue-600",
    stats: { strength: 85, intelligence: 95, speed: 90, durability: 75 },
  },
];

export default function FeaturedCharacters() {
  return (
    <section id="characters" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            LEGENDARY <span className="text-red-600">HEROES</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Meet the iconic characters who shaped the Marvel Universe
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((character, index) => (
            <motion.div
              key={character.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-neutral-800 rounded-2xl overflow-hidden border border-neutral-700 hover:border-red-600/50 transition-all duration-300"
            >
              {/* Character Header */}
              <div className={`h-32 bg-gradient-to-br ${character.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <character.icon className="absolute top-4 right-4 w-8 h-8 text-white/80" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{character.name}</h3>
                <p className="text-sm text-red-500 mb-3">{character.realName}</p>
                <p className="text-neutral-400 text-sm mb-4 line-clamp-2">
                  {character.description}
                </p>

                {/* Stats */}
                <div className="space-y-2">
                  {Object.entries(character.stats).map(([stat, value]) => (
                    <div key={stat} className="flex items-center gap-2">
                      <span className="text-xs text-neutral-500 w-16 capitalize">{stat}</span>
                      <div className="flex-1 h-2 bg-neutral-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                          className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                        />
                      </div>
                      <span className="text-xs text-neutral-400 w-8">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}