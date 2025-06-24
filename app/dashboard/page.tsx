'use client'

import { useTheme } from '@/lib/ThemeContext'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Artist {
  name: string
  bio?: string
  categories: string[]
  languages: string[]
  feeRange: string
  location: string
  timestamp: string
}

interface Quote {
  name: string
  category: string
  feeRange: string
  location: string
  timestamp: string
}

type Submission = Artist | Quote

const ARTISTS_KEY = 'artistly_artists'
const QUOTES_KEY = 'artistly_quotes'

export default function ManagerDashboardPage() {
  const { darkMode, toggleTheme } = useTheme()
  const [artists, setArtists] = useState<Submission[]>([])
  const [selected, setSelected] = useState<Submission | null>(null)

  useEffect(() => {
    const onboarded: Artist[] = JSON.parse(localStorage.getItem(ARTISTS_KEY) || '[]')
    const quotes: Quote[] = JSON.parse(localStorage.getItem(QUOTES_KEY) || '[]')
    setArtists([...onboarded, ...quotes])
  }, [])

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Head>
        <title>Manager Dashboard | Artistly</title>
      </Head>

      <main className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

          {/* Navbar */}
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
          {/* Table */}
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <h2 className="text-xl font-semibold mb-4 text-center sm:text-left">Artist Submissions & Quote Requests</h2>

            {artists.length === 0 ? (
              <p className="text-center text-gray-500">No submissions found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-orange-500 text-white">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">City</th>
                      <th className="px-4 py-2 text-left">Fee</th>
                      <th className="px-4 py-2 text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {artists.map((artist, index) => (
                      <tr key={index} className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
                        <td className="px-4 py-2">{artist.name}</td>
                        <td className="px-4 py-2">
                          {'categories' in artist ? artist.categories.join(', ') : artist.category}
                        </td>
                        <td className="px-4 py-2">{artist.location}</td>
                        <td className="px-4 py-2">{artist.feeRange}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => setSelected(artist)}
                            className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </motion.section>
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-6 rounded-lg w-full max-w-md relative shadow-lg">
              <button onClick={() => setSelected(null)} className="absolute top-2 right-2 text-gray-400 hover:text-white">✖</button>
              <h3 className="text-xl font-bold mb-4">Submission Details</h3>
              <p><strong>Name:</strong> {selected.name}</p>
              <p><strong>Type:</strong> {'categories' in selected ? 'Onboarded' : 'Quote'}</p>
              {'categories' in selected && <p><strong>Categories:</strong> {selected.categories.join(', ')}</p>}
              {'languages' in selected && <p><strong>Languages:</strong> {selected.languages.join(', ')}</p>}
              {'bio' in selected && <p><strong>Bio:</strong> {selected.bio}</p>}
              <p><strong>Fee Range:</strong> {selected.feeRange}</p>
              <p><strong>Location:</strong> {selected.location}</p>
              <p className="text-sm text-gray-500 mt-3">
                Submitted at: {new Date(selected.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
