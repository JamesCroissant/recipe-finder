import { Inter } from 'next/font/google'
import { AuthContext } from '@/contexts/AuthContext'
import { SignupModal } from '@/components/modals/SignupModal'
import { LoginModal } from '@/components/modals/LoginModal'
import { Navigation } from '@/components/navigation/Navigation'
import { getCurrentUser } from '@/app/actions/getCurrentUser'
import { ToasterContext } from '@/contexts/ToasterContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Recipe Finder',
  description: 'find your favorite recipe',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <div className="">
            <Navigation currentUser={currentUser} />
          </div>
            <ToasterContext />
            <SignupModal />
            <LoginModal />
            {children}
          <footer className="py-5">
            <div className="text-center text-sm">
              Copyright © All rights reserved | My Personal Chef App
            </div>
          </footer>
        </AuthContext>
      </body>
    </html>
  )
}
