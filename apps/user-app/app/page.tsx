'use client'
import prisma from '@repo/prisma/client'
import { 
  SignInButton, 
  SignedIn, 
  SignedOut, 
  UserButton,
  useUser 
} from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) {
      router.push('/dashboard')
    }
  }, [user, isLoaded, router])

  return (
    <div className="h-[100vh] flex justify-center flex-col items-center bg-teal-600">
      <div className="text-white text-3xl font-bold mb-8">
        USER_APP
      </div>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  )
}