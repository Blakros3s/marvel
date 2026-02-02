"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Swords, Zap, Shield, Heart, Sword, RotateCcw, Trophy, Sparkles } from "lucide-react";
import Link from "next/link";

const heroes = [
  {
    id: 1,
    name: "Iron Man",
    realName: "Tony Stark",
    description: "Genius, billionaire, playboy, philanthropist",
    icon: Zap,
    color: "from-red-600 to-yellow-500",
    bgColor: "bg-gradient-to-br from-red-600/20 to-yellow-500/20",
    stats: { strength: 85, intelligence: 100, speed: 85, durability: 85, combat: 70 },
    tagline: "I am Iron Man"
  },
  {
    id: 2,
    name: "Captain America",
    realName: "Steve Rogers",
    description: "The First Avenger with an indestructible shield",
    icon: Shield,
    color: "from-blue-600 to-red-600",
    bgColor: "bg-gradient-to-br from-blue-600/20 to-red-600/20",
    stats: { strength: 80, intelligence: 75, speed: 80, durability: 90, combat: 95 },
    tagline: "I can do this all day"
  },
  {
    id: 3,
    name: "Thor",
    realName: "Thor Odinson",
    description: "God of Thunder wielding Mjolnir",
    icon: Sword,
    color: "from-gray-400 to-yellow-400",
    bgColor: "bg-gradient-to-br from-gray-400/20 to-yellow-400/20",
    stats: { strength: 100, intelligence: 70, speed: 90, durability: 100, combat: 85 },
    tagline: "Bring me Thanos!"
  },
  {
    id: 4,
    name: "Spider-Man",
    realName: "Peter Parker",
    description: "Your friendly neighborhood hero",
    icon: Heart,
    color: "from-red-600 to-blue-600",
    bgColor: "bg-gradient-to-br from-red-600/20 to-blue-600/20",
    stats: { strength: 85, intelligence: 95, speed: 90, durability: 75, combat: 80 },
    tagline: "With great power comes great responsibility"
  },
  {
    id: 5,
    name: "Black Panther",
    realName: "T'Challa",
    description: "King of Wakanda with Vibranium suit",
    icon: Sparkles,
    color: "from-purple-600 to-purple-900",
    bgColor: "bg-gradient-to-br from-purple-600/20 to-purple-900/20",
    stats: { strength: 75, intelligence: 90, speed: 85, durability: 80, combat: 95 },
    tagline: "Wakanda Forever"
  },
  {
    id: 6,
    name: "Hulk",
    realName: "Bruce Banner",
    description: "The strongest there is when angry",
    icon: Swords,
    color: "from-green-600 to-green-800",
    bgColor: "bg-gradient-to-br from-green-600/20 to-green-800/20",
    stats: { strength: 100, intelligence: 88, speed: 70, durability: 100, combat: 85 },
    tagline: "Hulk Smash!"
  }
];

const statLabels: Record<string, string> = {
  strength: "Strength",
  intelligence: "Intelligence",
  speed: "Speed",
  durability: "Durability",
  combat: "Combat"
};

export default function BattlePage() {
  const [hero1, setHero1] = useState<typeof heroes[0] | null>(null);
  const [hero2, setHero2] = useState<typeof heroes[0] | null>(null);
  const [isBattling, setIsBattling] = useState(false);
  const [winner, setWinner] = useState<typeof heroes[0] | null>(null);

  const selectHero = (hero: typeof heroes[0], slot: 1 | 2) => {
    if (slot === 1) {
      setHero1(hero);
      if (hero2?.id === hero.id) setHero2(null);
    } else {
      setHero2(hero);
      if (hero1?.id === hero.id) setHero1(null);
    }
    setWinner(null);
    setIsBattling(false);
  };

  const startBattle = () => {
    if (!hero1 || !hero2) return;
    setIsBattling(true);
    
    // Calculate total stats for each hero
    const hero1Total = Object.values(hero1.stats).reduce((a, b) => a + b, 0);
    const hero2Total = Object.values(hero2.stats).reduce((a, b) => a + b, 0);
    
    // Add some randomness for fun
    const randomFactor = () => 0.9 + Math.random() * 0.2;
    const finalScore1 = hero1Total * randomFactor();
    const finalScore2 = hero2Total * randomFactor();
    
    setTimeout(() => {
      setWinner(finalScore1 > finalScore2 ? hero1 : hero2);
    }, 2000);
  };

  const reset = () => {
    setHero1(null);
    setHero2(null);
    setWinner(null);
    setIsBattling(false);
  };

  const getWinnerStats = () => {
    if (!hero1 || !hero2 || !winner) return null;
    let wins = 0;
    let losses = 0;
    let ties = 0;
    
    Object.entries(hero1.stats).forEach(([stat, val1]) => {
      const val2 = hero2.stats[stat as keyof typeof hero1.stats];
      if (winner.id === hero1.id) {
        if (val1 > val2) wins++;
        else if (val1 < val2) losses++;
        else ties++;
      } else {
        if (val2 > val1) wins++;
        else if (val2 < val1) losses++;
        else ties++;
      }
    });
    
    return { wins, losses, ties };
  };

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Header */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black text-white">
            MARVEL<span className="text-red-600">VERSE</span>
          </Link>
          <nav className="flex gap-6">
            <Link href="/" className="text-neutral-400 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-red-600 font-semibold">Battle Arena</span>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/10 border border-red-600/30 mb-6"
          >
            <Swords className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-400">Epic Showdowns</span>
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4">
            BATTLE <span className="text-red-600">ARENA</span>
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Choose your champions and witness legendary showdowns. May the best hero win!
          </p>
        </div>
      </section>

      {/* Hero Selection */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-red-600" />
            Select Your Heroes
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {heroes.map((hero) => (
              <motion.button
                key={hero.id}
                onClick={() => selectHero(hero, hero1?.id === hero.id ? 1 : hero2?.id === hero.id ? 2 : !hero1 ? 1 : !hero2 ? 2 : 1)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                  hero1?.id === hero.id || hero2?.id === hero.id
                    ? "border-red-600 bg-red-600/10"
                    : "border-neutral-700 bg-neutral-800 hover:border-neutral-600"
                }`}
              >
                <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br ${hero.color} flex items-center justify-center`}>
                  <hero.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-sm font-bold text-white">{hero.name}</h3>
                {hero1?.id === hero.id && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                )}
                {hero2?.id === hero.id && (
                  <span className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Battle Stage */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Hero 1 Card */}
            <AnimatePresence mode="wait">
              {hero1 ? (
                <motion.div
                  key={hero1.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className={`relative p-8 rounded-2xl border-2 border-red-600 ${hero1.bgColor} backdrop-blur-sm`}
                >
                  <div className="text-center">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${hero1.color} flex items-center justify-center shadow-lg shadow-red-600/25`}>
                      <hero1.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-1">{hero1.name}</h3>
                    <p className="text-red-400 mb-4">{hero1.realName}</p>
                    <p className="text-neutral-300 italic">&ldquo;{hero1.tagline}&rdquo;</p>
                    
                    {/* Stats */}
                    <div className="mt-6 space-y-3">
                      {Object.entries(hero1.stats).map(([stat, value]) => (
                        <div key={stat} className="flex items-center gap-3">
                          <span className="text-xs text-neutral-400 w-20 text-right">{statLabels[stat]}</span>
                          <div className="flex-1 h-3 bg-neutral-700/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                            />
                          </div>
                          <span className="text-sm font-bold text-white w-10">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setHero1(null)}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-96 rounded-2xl border-2 border-dashed border-neutral-700 bg-neutral-800/30 flex items-center justify-center"
                >
                  <p className="text-neutral-500 text-lg">Select Hero 1</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* VS / Battle Button */}
            <div className="text-center">
              <AnimatePresence mode="wait">
                {winner ? (
                  <motion.div
                    key="winner"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-4"
                  >
                    <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-yellow-500/20 border border-yellow-500/50">
                      <Trophy className="w-6 h-6 text-yellow-500" />
                      <span className="text-yellow-500 font-bold text-xl">WINNER!</span>
                    </div>
                    <div className="text-4xl font-black text-white">{winner.name}</div>
                    {getWinnerStats() && (
                      <div className="text-sm text-neutral-400">
                        Won {getWinnerStats()?.wins} stats • Lost {getWinnerStats()?.losses} stats • Tied {getWinnerStats()?.ties} stats
                      </div>
                    )}
                    <motion.button
                      onClick={reset}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-4 px-8 py-3 bg-neutral-700 hover:bg-neutral-600 text-white font-bold rounded-lg transition-all flex items-center gap-2 mx-auto"
                    >
                      <RotateCcw className="w-5 h-5" />
                      Battle Again
                    </motion.button>
                  </motion.div>
                ) : isBattling ? (
                  <motion.div
                    key="battling"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-6xl font-black text-red-600 animate-pulse">VS</div>
                    <div className="flex justify-center gap-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-red-600 rounded-full"
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                    <p className="text-neutral-400">Calculating...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="ready"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    <div className="text-6xl font-black text-neutral-600">VS</div>
                    {hero1 && hero2 ? (
                      <motion.button
                        onClick={startBattle}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-600/25"
                      >
                        START BATTLE!
                      </motion.button>
                    ) : (
                      <p className="text-neutral-500">Select both heroes to begin</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Hero 2 Card */}
            <AnimatePresence mode="wait">
              {hero2 ? (
                <motion.div
                  key={hero2.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className={`relative p-8 rounded-2xl border-2 border-blue-600 ${hero2.bgColor} backdrop-blur-sm`}
                >
                  <div className="text-center">
                    <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${hero2.color} flex items-center justify-center shadow-lg shadow-blue-600/25`}>
                      <hero2.icon className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-1">{hero2.name}</h3>
                    <p className="text-blue-400 mb-4">{hero2.realName}</p>
                    <p className="text-neutral-300 italic">&ldquo;{hero2.tagline}&rdquo;</p>
                    
                    {/* Stats */}
                    <div className="mt-6 space-y-3">
                      {Object.entries(hero2.stats).map(([stat, value]) => (
                        <div key={stat} className="flex items-center gap-3">
                          <span className="text-xs text-neutral-400 w-20 text-right">{statLabels[stat]}</span>
                          <div className="flex-1 h-3 bg-neutral-700/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                            />
                          </div>
                          <span className="text-sm font-bold text-white w-10">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setHero2(null)}
                    className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-96 rounded-2xl border-2 border-dashed border-neutral-700 bg-neutral-800/30 flex items-center justify-center"
                >
                  <p className="text-neutral-500 text-lg">Select Hero 2</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Stat Comparison */}
      {hero1 && hero2 && !winner && !isBattling && (
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Stat Comparison</h3>
            <div className="space-y-4">
              {Object.entries(hero1.stats).map(([stat, val1]) => {
                const val2 = hero2.stats[stat as keyof typeof hero2.stats];
                const total = val1 + val2;
                const hero1Percent = (val1 / total) * 100;
                const hero2Percent = (val2 / total) * 100;
                
                return (
                  <div key={stat} className="bg-neutral-800 rounded-xl p-4">
                    <div className="flex justify-between text-sm text-neutral-400 mb-2">
                      <span>{hero1.name}: {val1}</span>
                      <span className="font-semibold text-white">{statLabels[stat]}</span>
                      <span>{hero2.name}: {val2}</span>
                    </div>
                    <div className="flex h-4 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${hero1Percent}%` }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-r from-red-600 to-red-500"
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${hero2Percent}%` }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-l from-blue-600 to-blue-500"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-neutral-800 mt-16 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Link href="/" className="text-xl font-black text-white mb-4 inline-block">
            MARVEL<span className="text-red-600">VERSE</span>
          </Link>
          <p className="text-neutral-500 text-sm">
            Battle Arena • Where Legends Clash
          </p>
        </div>
      </footer>
    </main>
  );
}
