'use client'

import { useCallback, useState } from 'react'
import { signOut } from 'next-auth/react'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { useLoginModal } from '@/hooks/useLoginModal'
import { useSignupModal } from '@/hooks/useSignupModal'
import { MenuItem } from '@/components/navigation/MenuItem'
import Image from 'next/image'

type MenuProps = {
  currentUser: User | null
}

export const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const loginModal = useLoginModal();
  const signupModal  = useSignupModal();

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value)
  }, [])

  return (
    <div className="relative">
      <div className="relative h-10 w-10 cursor-pointer" onClick={toggleOpen}>
        <Image 
          src={currentUser?.image || "/default.png"}
          className="rounded-full object-cover"
          alt="avatar"
          fill
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-40 overflow-hidden rounded-lg bg-white text-sm shadow-lg shadow-gray-100">
          <div className="cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My Favorites"
                  onClick={() => {
                    router.push('/favorites')
                    setIsOpen(false)
                  }}
                />
                <MenuItem
                  label="logout"
                  onClick={() => {
                    signOut()
                    setIsOpen(false)
                  }}
                />
              </>
            ) : (
              <>
                <MenuItem
                  label="login"
                  onClick={() => {
                    loginModal.onOpen()
                    setIsOpen(false)
                  }}
                />
                <MenuItem
                  label="signup"
                  onClick={() => {
                    signupModal.onOpen()
                    setIsOpen(false)
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}