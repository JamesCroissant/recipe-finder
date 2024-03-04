'use client'

import { SessionProvider } from 'next-auth/react'

type AuthContextProps = {
  children: React.ReactNode
}

export const AuthContext = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>
}