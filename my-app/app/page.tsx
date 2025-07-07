"use client"

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen justify-center items-center gap-10 bg-yellow-100">
      <header className="text-7xl font-bold">Hello, I’m Kim Bibi :)</header>
      <Button
        onClick={() => router.push('/example')}
        className='p-7 rounded-full'>Welcome</Button>
    </div>
  )
}
