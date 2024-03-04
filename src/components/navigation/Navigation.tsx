"use client"

import Link from "next/link"
import React from "react"
import { Menu } from '@/components/navigation/Menu'
import { User } from '@prisma/client'


type NavigationProps = {
  currentUser : User | null,
}

export const Navigation = ({ currentUser }: NavigationProps) => {
  return (
    <nav className="flex flex-row border-b mb-5 px-5 h-14 items-center justify-around shadow-lg shadow-gray-100">
      <div className="flex space-x-11">
        <Link href="/">My personal Chef</Link>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Menu currentUser={currentUser} />
      </div>
    
    </nav>
  )
}