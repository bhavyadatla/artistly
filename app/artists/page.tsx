'use client'

import { useTheme } from '@/lib/ThemeContext'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Artist = {
  name: string
  bio?: string
  categories: string[]
  languages: string[]
  feeRange: string
  location: string
}

const LOCAL_STORAGE_KEY = 'artistly_artists'
const QUOTE_STORAGE_KEY = 'artistly_quotes'

const staticArtists: Artist[] = [
  {
    name: 'Asha Mehta',
    bio: 'Classical and folk singer.',
    categories: ['Singer'],
    languages: ['Hindi', 'English'],
    feeRange: '₹1500 - ₹2000',
    location: 'Delhi'
  },
  {
    name: 'DJ Blaze',
    bio: 'Club and wedding DJ.',
    categories: ['DJ'],
    languages: ['English'],
    feeRange: '₹3000 - ₹3500',
    location: 'Bangalore'
  },
  {
    name: 'Priya Rao',
    bio: 'Multilingual speaker.',
    categories: ['Speaker'],
    languages: ['Hindi', 'Telugu'],
    feeRange: '₹2000 - ₹2500',
    location: 'Hyderabad'
  },
  {
    name: 'Neha Sinha',
    bio: 'Contemporary dancer.',
    categories: ['Dancer'],
    languages: ['English', 'Hindi'],
    feeRange: '₹3500 - ₹4000',
    location: 'Chennai'
  },
  {
    name: 'Shaan Kapoor',
    bio: 'Playback singer.',
    categories: ['Singer'],
    languages: ['Telugu', 'Tamil'],
    feeRange: '₹1500 - ₹2000',
    location: 'Hyderabad'
  },
  {
    name: 'DJ Sky',
    bio: 'EDM DJ.',
    categories: ['DJ'],
    languages: ['English'],
    feeRange: '₹2000 - ₹2500',
    location: 'Indore'
  },
  {
    name: 'Anita Desai',
    bio: 'Spiritual speaker.',
    categories: ['Speaker'],
    languages: ['Hindi'],
    feeRange: '₹1000 - ₹1500',
    location: 'Lucknow'
  },
  {
    name: 'Lavanya Menon',
    bio: 'Carnatic vocalist.',
    categories: ['Singer'],
    languages: ['Tamil'],
    feeRange: '₹2000 - ₹2500',
    location: 'Coimbatore'
  },
]

export default function ArtistListingPage() {
  const { darkMode, toggleTheme } = useTheme()
  const [allArtists, setAllArtists] = useState<Artist[]>([])
  const [filtered, setFiltered] = useState<Artist[]>([])
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    const onboarded: Artist[] = stored ? JSON.parse(stored) : []
    const combined = [...staticArtists, ...onboarded]
    setAllArtists(combined)
    setFiltered(combined)
  }, [])

  useEffect(() => {
    const filteredList = allArtists.filter((artist) => {
      const matchCategory = category ? artist.categories.includes(category) : true
      const matchLocation = location ? artist.location.toLowerCase() === location.toLowerCase() : true
      const matchPrice = price ? artist.feeRange === price : true
      return matchCategory && matchLocation && matchPrice
    })
    setFiltered(filteredList)
  }, [category, location, price, allArtists])

  const handleQuote = (artist: Artist) => {
    const existing = localStorage.getItem(QUOTE_STORAGE_KEY)
    const list = existing ? JSON.parse(existing) : []
    const updated = [...list, artist]
    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(updated))
    alert(`Quote request sent for ${artist.name}`)
  }

  const uniqueLocations = Array.from(new Set(allArtists.map(a => a.location))).sort()

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Head>
        <title>Artists | Artistly</title>
        <meta name="description" content="Browse performing artists and book them for your events." />
      </Head>

      <main className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

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
          <section className="text-center mb-10">
            <motion.h2
              className="text-3xl font-bold leading-tight mb-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find and Book Performing Artists
            </motion.h2>
            <motion.p
              className="max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Discover artists submitted through our platform and connect with them directly.
            </motion.p>
          </section>

          {/* Filters */}
          <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <select onChange={(e) => setCategory(e.target.value)} className={`border p-2 rounded ${darkMode ? 'bg-black text-white border-gray-600' : 'bg-white text-black'}`}>
              <option value="">All Categories</option>
              <option>Singer</option>
              <option>Dancer</option>
              <option>DJ</option>
              <option>Speaker</option>
            </select>

            <select onChange={(e) => setLocation(e.target.value)} className={`border p-2 rounded ${darkMode ? 'bg-black text-white border-gray-600' : 'bg-white text-black'}`}>
              <option value="">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <select onChange={(e) => setPrice(e.target.value)} className={`border p-2 rounded ${darkMode ? 'bg-black text-white border-gray-600' : 'bg-white text-black'}`}>
              <option value="">All Fee Ranges</option>
              <option>₹1000 - ₹1500</option>
              <option>₹1500 - ₹2000</option>
              <option>₹2000 - ₹2500</option>
              <option>₹2500 - ₹3000</option>
              <option>₹3000 - ₹3500</option>
              <option>₹3500 - ₹4000</option>
              <option>₹4000 - ₹4500</option>
            </select>
          </section>

          {/* Artist Cards */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">No artists found for selected filters.</p>
            ) : (
              filtered.map((artist, index) => (
                <div
                  key={index}
                  className={`border p-4 rounded-md shadow-sm hover:shadow-md transition flex flex-col justify-between ${
                    darkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black'
                  }`}
                >
                  <div>
                    <h3 className="text-lg font-semibold">{artist.name}</h3>
                    <p className="text-sm italic">{artist.bio}</p>
                    <p className="text-sm mt-2"><strong>Category:</strong> {artist.categories.join(', ')}</p>
                    <p className="text-sm"><strong>Languages:</strong> {artist.languages.join(', ')}</p>
                    <p className="text-sm"><strong>Fee:</strong> {artist.feeRange}</p>
                    <p className="text-sm"><strong>Location:</strong> {artist.location}</p>
                  </div>
                  <button
                    onClick={() => handleQuote(artist)}
                    className="mt-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                  >
                    Ask for Quote
                  </button>
                </div>
              ))
            )}
          </motion.section>
        </div>
      </main>
    </div>
  )
}
