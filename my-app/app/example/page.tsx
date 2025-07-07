'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/ui/Navbar'

export default function HomePage() {
    const router = useRouter()

    return (
        <div className="flex flex-col min-h-screen gap-4">
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <Navbar />
            </div>

            <div className="flex flex-1 gap-4 pt-22">
                <aside className="bg-red-300 p-4 w-1/4 text-white text-center font-bold">
                    Sidebar
                    <Image
                        src="/kitty.jpg"
                        alt="Example"
                        width={200}
                        height={200}
                        className="mt-4 mx-auto rounded-lg shadow-md"
                    />
                    <h1 className="mt-4">Hello, World!!</h1>
                    <div className='flex flex-col justify-center mt-4 space-y-4 mx-15'>

                        <Button
                            onClick={() => router.push('/todoList')}
                            className='p-4 rounded-full'>To do list</Button>

                        <Button
                            onClick={() => router.push('/')}
                            className='p-4 rounded-full'>Back Home</Button>
                    </div>

                </aside>
                <main className="bg-blue-200 p-4 flex-1 text-center text-white font-bold">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae
                    facilisis quam, nec consectetur urna. Aliquam elementum nibh metus,
                    eget lobortis lacus aliquet eu.
                </main>
            </div>

            <div className="bg-pink-300 p-4 text-white text-center font-bold">Footer</div>
        </div>
    )
}
