"use client";

import { motion } from "framer-motion";

const phases = [
  {
    phase: "Phase 1",
    years: "2008 - 2012",
    title: "The Avengers Initiative",
    description: "The birth of the Marvel Cinematic Universe with Iron Man, leading to the formation of Earth's Mightiest Heroes.",
    movies: ["Iron Man", "The Incredible Hulk", "Iron Man 2", "Thor", "Captain America", "The Avengers"],
    color: "from-blue-600 to-purple-600",
  },
  {
    phase: "Phase 2",
    years: "2013 - 2015",
    title: "Age of Expansion",
    description: "The universe expands with new heroes like the Guardians of the Galaxy while dealing with the aftermath of New York.",
    movies: ["Iron Man 3", "Thor: The Dark World", "Captain America: Winter Soldier", "Guardians of the Galaxy", "Avengers: Age of Ultron", "Ant-Man"],
    color: "from-purple-600 to-pink-600",
  },
  {
    phase: "Phase 3",
    years: "2016 - 2019",
    title: "The Infinity Saga",
    description: "The epic conclusion featuring the Civil War, Thor's cosmic journey, and the battle against Thanos.",
    movies: ["Captain America: Civil War", "Doctor Strange", "Guardians Vol. 2", "Spider-Man: Homecoming", "Thor: Ragnarok", "Black Panther", "Infinity War", "Ant-Man & Wasp", "Captain Marvel", "Endgame"],
    color: "from-pink-600 to-red-600",
  },
  {
    phase: "Phase 4",
    years: "2021 - 2022",
    title: "The Multiverse Saga Begins",
    description: "New heroes emerge, the multiverse opens, and the post-Endgame world takes shape.",
    movies: ["WandaVision", "The Falcon & Winter Soldier", "Loki", "Black Widow", "What If...?", "Shang-Chi", "Eternals", "Hawkeye", "Spider-Man: No Way Home", "Moon Knight", "Ms. Marvel", "Thor: Love and Thunder", "Werewolf by Night", "Black Panther: Wakanda Forever"],
    color: "from-red-600 to-orange-600",
  },
  {
    phase: "Phase 5",
    years: "2023 - 2024",
    title: "Kang Dynasty Rising",
    description: "The Multiverse Saga continues with the emergence of Kang the Conqueror and new cosmic threats.",
    movies: ["Ant-Man & Wasp: Quantumania", "Guardians Vol. 3", "Secret Invasion", "Loki Season 2", "The Marvels", "Echo", "Deadpool & Wolverine", "Agatha All Along"],
    color: "from-orange-600 to-yellow-600",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            MCU <span className="text-red-600">TIMELINE</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Journey through the evolution of the Marvel Cinematic Universe
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-yellow-600 md:-translate-x-1/2" />

          {phases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-start mb-12 md:mb-16 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-red-600 border-4 border-neutral-950 z-10 md:-translate-x-1/2 mt-2" />

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
              }`}>
                <div className={`p-6 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-red-600/30 transition-all duration-300`}>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 bg-gradient-to-r ${phase.color} text-white`}>
                    {phase.phase}
                  </div>
                  <p className="text-red-500 text-sm font-semibold mb-2">{phase.years}</p>
                  <h3 className="text-xl font-bold text-white mb-3">{phase.title}</h3>
                  <p className="text-neutral-400 text-sm mb-4">{phase.description}</p>
                  
                  {/* Movies Grid */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? "md:justify-end" : ""}`}>
                    {phase.movies.slice(0, 4).map((movie) => (
                      <span
                        key={movie}
                        className="px-2 py-1 text-xs bg-neutral-800 text-neutral-300 rounded"
                      >
                        {movie}
                      </span>
                    ))}
                    {phase.movies.length > 4 && (
                      <span className="px-2 py-1 text-xs bg-red-600/20 text-red-400 rounded">
                        +{phase.movies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-5/12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}