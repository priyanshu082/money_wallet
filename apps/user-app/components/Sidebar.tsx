import React from 'react'
import Link from 'next/link' // Using Next.js Link for better navigation

interface SidebarProps {
    href: string
    icon: React.ReactNode
    title: string
}

const Sidebar = ({ href, icon, title }: SidebarProps) => {
    return (
        <button className="flex items-center w-full  gap-2 p-2 pl-5 hover:bg-gray-100 rounded">
            <Link href={href} className="flex items-center gap-2 w-[100%]">
                {icon}
                <span>{title}</span>
            </Link>
        </button>
    )
}

export default Sidebar