// 'use client'

// import { useEffect, useState } from 'react'
// import axios from '@/lib/axios'
// import Navbar from '@/components/ui/Navbar'

// interface User {
//     userId: number
//     id: number
//     title: string
//     body: string
// }

// export default function Users() {
//     const [users, setUsers] = useState<User[]>([])

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const res = await axios.get<User[]>('/posts')
//                 setUsers(res.data)
//             } catch (error) {
//                 console.error('Error fetching posts:', error)
//             }
//         }

//         fetchUsers()
//     }, [])

//     return (
//         <div className="min-h-screen overflow-hidden">
//             <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
//                 <Navbar />
//             </div>
//             <main className="container mx-auto p-4 mt-20">
//                 <h1 className="text-2xl font-bold mb-4">Test</h1>
//                 {users.length === 0 ? (
//                     <p className="text-gray-500">Loading...</p>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="min-w-full border-collapse border border-gray-200">
//                             <thead>
//                                 <tr className="bg-gray-100">
//                                     <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">User ID</th>
//                                     <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
//                                     <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
//                                     <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Body</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {users.map((u) => (
//                                     <tr key={u.id} className="hover:bg-gray-50">
//                                         <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{u.userId}</td>
//                                         <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{u.id}</td>
//                                         <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{u.title}</td>
//                                         <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{u.body}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </main>
//         </div>
//     )
// }

// ใช้ TanStack Query เพิ่มด้วย
'use client'

import { useQuery } from '@tanstack/react-query'
import axios from '@/lib/axios'
import Navbar from '@/components/ui/Navbar'

interface User {
  userId: number
  id: number
  title: string
  body: string
}

export default function Users() {
  // ใช้ useQuery แทน useEffect/useState
  const { data: users, isLoading, isError, error } = useQuery<User[]>({
    queryKey: ['posts'], // ชื่อ cache สำหรับข้อมูลนี้
    queryFn: async () => {
      const res = await axios.get<User[]>('/posts')
      return res.data
    },
  })

  return (
    <div className="min-h-screen overflow-hidden">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Navbar />
      </div>
      <main className="container mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-4">Test</h1>
        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Error: {error instanceof Error ? error.message : 'Something went wrong'}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">User ID</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
                  <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Body</th>
                </tr>
              </thead>
              <tbody>
                {users?.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{u.userId}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{u.id}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{u.title}</td>
                    <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">{u.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}