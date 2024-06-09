import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dark } from '@clerk/themes';
import './globals.css';
import './layout.css'; // Added the new layout.css import
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import React from 'react';
import Image from 'next/image';
import sakura from '../../public/sakura.svg'; // Import the SVG logo
import Link from 'next/link'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { siteConfig } from '@/config/site';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = siteConfig;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang='en'>
        <body className={inter.className}>
          <header>
            <nav className='bg-black bg-opacity-50 text-white py-2'>
              <div className='container mx-auto flex justify-between items-center'>
                <div className='flex items-center space-x-4'>
                  <Image src={sakura} alt='Sakura Logo' width={40} height={40} />
                  <a href='/' className='text-lg font-bold'>
                    Short.moe
                  </a>
                </div>
                <div>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                  <SignedOut>
                    <SignInButton 
                    mode='modal'
                    />
                  </SignedOut>
                </div>
              </div>
            </nav>
          </header>
          <main>
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
          <footer className='flex justify-between'>
            <div className='container mx-auto py-1 text-center text-fuchsia-100'>
              <p>&copy; 2024 short.moe by <Link href='https://cvyl.me'>Mikka</Link></p>
              <p>All Rights Reserved</p>
            </div>
            <div className='container mx-auto py-1 text-center text-fuchsia-100'>
              <p><Link href='mailto:legal@short.moe'>Legal Inquiries</Link></p>
              <p><Link href='/privacy'>Privacy Policy</Link></p>
            </div>
            <div className='container mx-auto py-1 text-center text-fuchsia-100'>
            <p><Link href='mailto:abuse@short.moe'>Report Abuse</Link></p>
            <p><Link href='https://github.com/cvyl/short.moe'>Source Code</Link></p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
