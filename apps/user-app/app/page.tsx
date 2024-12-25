'use client'

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

  const saveUserToDatabase = async (userData: any) => {
    
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userData.id,
          number: userData.primaryPhoneNumber?.phoneNumber,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save user')
      }

      const {id} = await response.json()
      console.log('User saved successfully:', id)
      localStorage.setItem('userId', id);
    } catch (error) {
      console.error('Error saving user:', error)
    }
  }

  useEffect(() => {
    if (isLoaded && user) {
      console.log(user.id)
      console.log(user.primaryPhoneNumber?.phoneNumber)
      saveUserToDatabase(user)
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