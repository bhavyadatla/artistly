// app/layout.tsx
import { ThemeProvider } from '@/lib/ThemeContext'
import './globals.css'

export const metadata = {
  title: 'Artistly',
  description: 'Artist Booking Platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
