"use client"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { Menu, X } from 'lucide-react' // Import icons
import { useState } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-gray-800">
                            Wallet
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-6">
                        
                        
                        {/* Auth Buttons */}
                        <div className="ml-4">
                            {/* @ts-ignore */}
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                                 {/* @ts-ignore */}
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link 
                            href="/dashboard" 
                            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Dashboard
                        </Link>
                        <Link 
                            href="/transactions" 
                            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Transactions
                        </Link>
                        <Link 
                            href="/transfer" 
                            className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Transfer
                        </Link>
                        
                        {/* Mobile Auth Buttons */}
                        <div className="mt-4 px-3">
                                 {/* @ts-ignore */}
                            <SignedOut>
                                <SignInButton mode="modal">
                                    <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                                        Sign In
                                    </button>
                                </SignInButton>
                            </SignedOut>
                                 {/* @ts-ignore */}
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar