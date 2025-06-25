'use client'

import { useTheme } from '@/lib/ThemeContext'
import { yupResolver } from '@hookform/resolvers/yup'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type ArtistFormValues = {
  name: string
  bio: string
  categories: string[]
  languages: string[]
  feeRange: string
  location: string
  customLocation?: string
}

const categories = ['Singer', 'Dancer', 'DJ', 'Speaker']
const languages = ['Hindi', 'English', 'Telugu', 'Tamil', 'Kannada']
const locations = [
  'Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata', 'Pune', 'Chennai',
  'Ahmedabad', 'Jaipur', 'Lucknow', 'Bhopal', 'Patna', 'Nagpur', 'Indore',
  'Chandigarh', 'Surat', 'Amritsar', 'Guwahati', 'Raipur', 'Thiruvananthapuram',
  'Ranchi', 'Vadodara', 'Jodhpur', 'Udaipur', 'Coimbatore', 'Hubli',
  'Vijayawada', 'Agra', 'Gwalior', 'Jabalpur', 'Vishakhapatnam', 'Other'
]

const LOCAL_STORAGE_KEY = 'artistly_artists'

// ✅ Fixed schema typing using `as yup.Schema<string[]>`
const schema: yup.ObjectSchema<ArtistFormValues> = yup.object({
  name: yup.string().required('Name is required'),
  bio: yup.string().required('Bio is required'),
  categories: yup.array().of(yup.string()).required().min(1, 'Select at least one category') as yup.Schema<string[]>,
  languages: yup.array().of(yup.string()).required().min(1, 'Select at least one language') as yup.Schema<string[]>,
  feeRange: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
  customLocation: yup.string().when('location', {
    is: 'Other',
    then: (schema) => schema.required('Please specify your location'),
    otherwise: (schema) => schema.notRequired()
  }),
})

export default function ArtistOnboardPage() {
  const { darkMode, toggleTheme } = useTheme()
  const [artists, setArtists] = useState<ArtistFormValues[]>([])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ArtistFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      bio: '',
      categories: [],
      languages: [],
      feeRange: '',
      location: '',
      customLocation: ''
    }
  })

  const watchLocation = watch('location')

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      setArtists(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(artists))
  }, [artists])

  const onSubmit = (data: ArtistFormValues) => {
    const finalLocation = data.location === 'Other' ? data.customLocation : data.location
    const newArtist = { ...data, location: finalLocation ?? '', customLocation: undefined }
    setArtists(prev => [...prev, newArtist])
    reset() // ✅ clear the form after submission
    alert('Artist submitted ✅')
  }

  const handleMultiSelect = (
    field: keyof Pick<ArtistFormValues, 'categories' | 'languages'>,
    value: string
  ) => {
    const current = watch(field) || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    setValue(field, updated)
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-3">
            <h1 className="text-2xl font-bold">Artistly</h1>
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

          {/* Form Title */}
          <motion.h2
            className="text-xl font-semibold mb-6 text-center sm:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Submit a New Artist Profile
          </motion.h2>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Name */}
            <div>
              <label>Name</label>
              <input {...register("name")} className={`w-full border p-2 rounded mt-1 ${darkMode ? 'bg-black border-white text-white' : 'bg-white text-black'}`} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Bio */}
            <div>
              <label>Bio</label>
              <textarea {...register("bio")} rows={3} className={`w-full border p-2 rounded mt-1 ${darkMode ? 'bg-black border-white text-white' : 'bg-white text-black'}`} />
              {errors.bio && <p className="text-red-500 text-sm">{errors.bio.message}</p>}
            </div>

            {/* Categories */}
            <div>
              <label>Category</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={watch("categories")?.includes(cat)}
                      onChange={() => handleMultiSelect("categories", cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
              {errors.categories && <p className="text-red-500 text-sm">{errors.categories.message}</p>}
            </div>

            {/* Languages */}
            <div>
              <label>Languages Spoken</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                {languages.map((lang) => (
                  <label key={lang} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={watch("languages")?.includes(lang)}
                      onChange={() => handleMultiSelect("languages", lang)}
                    />
                    <span>{lang}</span>
                  </label>
                ))}
              </div>
              {errors.languages && <p className="text-red-500 text-sm">{errors.languages.message}</p>}
            </div>

            {/* Fee Range */}
            <div>
              <label>Fee Range</label>
              <select {...register("feeRange")} className={`w-full border p-2 rounded mt-1 ${darkMode ? 'bg-black text-white border-white' : 'bg-white text-black'}`}>
                <option value="">Select</option>
                <option>₹1000 - ₹1500</option>
                <option>₹1500 - ₹2000</option>
                <option>₹2000 - ₹2500</option>
                <option>₹2500 - ₹3000</option>
                <option>₹3000 - ₹3500</option>
                <option>₹3500 - ₹4000</option>
                <option>₹4000 - ₹4500</option>
              </select>
              {errors.feeRange && <p className="text-red-500 text-sm">{errors.feeRange.message}</p>}
            </div>

            {/* Location */}
            <div>
              <label>Location</label>
              <select {...register("location")} className={`w-full border p-2 rounded mt-1 ${darkMode ? 'bg-black text-white border-white' : 'bg-white text-black'}`}>
                <option value="">Select</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
            </div>

            {/* Custom Location */}
            {watchLocation === 'Other' && (
              <div>
                <label>Specify Location</label>
                <input {...register("customLocation")} className={`w-full border p-2 rounded mt-1 ${darkMode ? 'bg-black text-white border-white' : 'bg-white text-black'}`} />
                {errors.customLocation && <p className="text-red-500 text-sm">{errors.customLocation.message}</p>}
              </div>
            )}

            {/* Image Upload */}
            <div>
              <label>Profile Image (optional)</label>
              <input type="file" className={`w-full border p-2 rounded mt-1 ${darkMode ? 'bg-black text-white border-white' : 'bg-white text-black'}`} />
            </div>

            {/* Submit */}
            <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
              Submit
            </button>
          </motion.form>
        </div>
      </main>
    </div>
  )
}
