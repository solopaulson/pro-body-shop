import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Pro Body Shop - Professional Auto Body Repair in Santa Fe',
  description: 'Expert auto body repair services in Santa Fe, NM. Free estimates, insurance assistance, and lifetime warranty. Call (505) 473-4132 for quality repairs.',
  keywords: 'auto body repair, car repair, Santa Fe, NM, body shop, collision repair, paintless dent repair',
  openGraph: {
    title: 'Pro Body Shop - Professional Auto Body Repair in Santa Fe',
    description: 'Expert auto body repair services in Santa Fe, NM. Free estimates, insurance assistance, and lifetime warranty.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Pro Body Shop',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification', // You'll need to add your actual Google verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
