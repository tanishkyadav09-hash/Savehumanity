'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Users, MapPin, Globe } from 'lucide-react';

interface Counter {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
}

export default function ImpactCounters() {
  const [counts, setCounts] = useState<Counter[]>([]);

  useEffect(() => {
    setCounts([
      { icon: <Leaf className="w-8 h-8" />, label: 'Trees Planted', value: 0, suffix: '' },
      { icon: <Users className="w-8 h-8" />, label: 'Active Volunteers', value: 0, suffix: '' },
      { icon: <MapPin className="w-8 h-8" />, label: 'Cities Covered', value: 0, suffix: '' },
      { icon: <Globe className="w-8 h-8" />, label: 'Impact Reach', value: 0, suffix: '+' },
    ]);
  }, []);

  useEffect(() => {
    const targets = [12458, 642, 28, 50];
    const intervals = targets.map((target, index) => {
      const increment = Math.ceil(target / 100);
      return setInterval(() => {
        setCounts((prev) => {
          const newCounts = [...prev];
          if (newCounts[index] && newCounts[index].value < target) {
            newCounts[index] = {
              ...newCounts[index],
              value: Math.min(newCounts[index].value + increment, target),
            };
          }
          return newCounts;
        });
      }, 30);
    });

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="impact" className="relative py-20 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Title */}
          <div className="text-center mb-16">
            <motion.h2
              variants={itemVariants}
              className="text-4xl lg:text-5xl font-bold mb-4"
            >
              Our <span className="text-green-400">Live Impact</span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-gray-400 text-lg"
            >
              Real-time metrics showing the positive change we're creating
            </motion.p>
          </div>

          {/* Counters Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {counts.map((counter, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border border-green-500/20 hover:border-green-500/50 transition-all duration-300 backdrop-blur-sm">
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 transition-colors">
                        {counter.icon}
                      </div>
                    </div>

                    <div className="mb-2">
                      <motion.div className="text-3xl lg:text-4xl font-bold text-green-400">
                        {counter.value.toLocaleString()}
                        <span>{counter.suffix}</span>
                      </motion.div>
                    </div>

                    <p className="text-gray-400 text-sm">{counter.label}</p>

                    {/* Edit Button */}
                    <button className="mt-4 text-xs text-green-400 hover:text-green-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      ✎ Edit
                    </button>
                  </div>

                  {/* Border Glow */}
                  <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                    style={{
                      background: 'radial-gradient(circle at var(--mouse-x), rgba(34, 197, 94, 0.1), transparent)',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
