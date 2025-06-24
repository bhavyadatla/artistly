'use client'

import { useTheme } from '@/lib/ThemeContext'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  { label: 'Singers', icon: '/images/Singers.png' },
  { label: 'Dancers', icon: '/images/Dancers.png' },
  { label: 'Speakers', icon: '/images/Speakers.png' },
  { label: 'DJs', icon: '/images/DJs.png' },
]

export default function HomePage() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-3">
  {/* Title */}
  <h1 className="text-2xl font-bold">Artistly</h1>

  {/* Nav + Theme (responsive row on mobile, inline on desktop) */}
  <div className="flex gap-4 items-center overflow-x-auto whitespace-nowrap">
    <nav className="flex gap-4 text-sm font-medium">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/artists" className="hover:underline">Artists</Link>
      <Link href="/onboard" className="hover:underline">Onboarding</Link>
      <Link href="/dashboard" className="hover:underline">Dashboard</Link>
    </nav>
    <button
  onClick={toggleTheme}
  className="px-3 py-1 rounded text-sm font-medium border border-orange-600 bg-orange-500 text-white hover:bg-orange-600 transition"
>
  {darkMode ? 'Light Mode' : 'Dark Mode'}
</button>

  </div>
</header>

          {/* Hero Section */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              Find and Book <br className="hidden sm:block" />
              Performing Talent
            </h2>
            <p className="mb-6 text-base sm:text-lg">
              Artistly is a platform for event planners and artist managers to connect and book performing artists for various events.
            </p>
            <Link href="/artists">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-md transition">
                Explore Artists
              </button>
            </Link>
          </motion.section>

          {/* Category Cards */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          >
            {categories.map(({ label, icon }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center border rounded-xl p-6 shadow-sm hover:shadow-md transition"
                role="region"
                aria-label={label}
              >
                <Image
                  src={icon}
                  alt={label}
                  width={48}
                  height={48}
                  className="object-contain"
                />
                <p className="mt-4 text-lg font-semibold">{label}</p>
              </motion.div>
            ))}
          </motion.section>

          {/* Description Below Cards */}
          <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5 }}
  className="mt-12 text-center max-w-3xl mx-auto text-base sm:text-lg"
>
  <p className="mb-4">
    Whether you&apos;re organizing a wedding, corporate event, cultural show, or concert — Artistly helps you discover and connect with the perfect performing talent for any occasion.
  </p>
  <p>
    Browse diverse artist profiles, filter by category or budget, and request a quote directly. Everything you need, simplified in one platform.
  </p>
</motion.section>

        </div>
      </main>
    </div>
  )
}
