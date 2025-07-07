'use client'

import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()
    const pathname = usePathname()

    const isActive = (path: string) => pathname === path

    const navItems = [
        { label: 'Home', path: '/' },
        { label: 'Example', path: '/example' },
        { label: 'todo List', path: '/todoList' },
        { label: 'API', path: '/api' },
    ]

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems.map((item) => (
                            <li key={item.path} onClick={() => router.push(item.path)}>
                                <a
                                    className={`rounded-md px-2 py-1 ${
                                        isActive(item.path) ? 'bg-primary text-white' : ''
                                    }`}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <a
                    onClick={() => router.push('/')}
                    className="text-xl px-10 font-bold cursor-pointer">Logo</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-3 font-bold">
                    {navItems.map((item) => (
                        <li key={item.path} onClick={() => router.push(item.path)}>
                            <a
                                className={`rounded-md px-3 py-2 ${
                                    isActive(item.path) ? 'bg-primary text-white' : ''
                                }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end"></div>
        </div>
    )
}
