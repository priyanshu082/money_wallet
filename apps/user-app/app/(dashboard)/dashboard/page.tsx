"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'

const page = () => {
  const {user} = useUser()
  console.log(user)
  return (
    <div>dashboard</div>
  )
}

export default page