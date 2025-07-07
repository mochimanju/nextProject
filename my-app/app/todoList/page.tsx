"use client"

import React, { useState, useEffect } from "react"
import Navbar from '@/components/ui/Navbar'
import { Button } from "@/components/ui/button"

interface Todo {
    id: number
    text: string
    completed: boolean
    priority: 'low' | 'medium' | 'high'
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([])
    const [hasMounted, setHasMounted] = useState(false)
    const [inputValue, setInputValue] = useState("")
    const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium')
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
    const [editingId, setEditingId] = useState<number | null>(null)
    const [editText, setEditText] = useState("")

    // Load todos from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('todos')
        if (saved) {
            setTodos(JSON.parse(saved))
        }
        setHasMounted(true)
    }, [])

    // Save todos to localStorage
    useEffect(() => {
        if (hasMounted) {
            localStorage.setItem('todos', JSON.stringify(todos))
        }
    }, [todos, hasMounted])

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        setTodos([...todos, {
            id: Date.now(),
            text: inputValue,
            completed: false,
            priority
        }])
        setInputValue("")
        setPriority('medium')
    }

    const toggleComplete = (id: number) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ))
    }

    const deleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const startEdit = (id: number, text: string) => {
        setEditingId(id)
        setEditText(text)
    }

    const saveEdit = (id: number) => {
        if (!editText.trim()) return
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, text: editText } : todo
        ))
        setEditingId(null)
        setEditText("")
    }

    const clearCompleted = () => {
        setTodos(todos.filter(todo => !todo.completed))
    }

    const filteredTodos = todos
        .filter(todo => {
            if (filter === 'active') return !todo.completed
            if (filter === 'completed') return todo.completed
            return true
        })
        .sort((a, b) => {
            const order = { high: 1, medium: 2, low: 3 }
            return order[a.priority] - order[b.priority]
        })

    const activeCount = todos.filter(todo => !todo.completed).length

    return (
        <div className="min-h-screen overflow-hidden">
            <div className="fixed top-0 left-0 w-full z-50 bg-white shadow">
                <Navbar />
            </div>

            <main className="flex items-center justify-center min-h-screen bg-gray-100 pt-16">
                <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-xl">

                    <h1 className="text-2xl font-bold mb-4 text-center">Todo List</h1>

                    {/* Add Todo */}
                    <form onSubmit={addTodo} className="mb-4 space-y-2">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={e => setInputValue(e.target.value)}
                                placeholder="Add a new todo"
                                className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <select
                                value={priority}
                                onChange={e => setPriority(e.target.value as Todo['priority'])}
                                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <Button type="submit" className="w-full p-3 rounded-full font-bold">
                            Add Todo
                        </Button>
                    </form>

                    {/* Filter + Clear */}
                    <div className="flex justify-between mb-4">
                        <div className="space-x-2">
                            {['all', 'active', 'completed'].map(f => (
                                <button
                                    key={f}
                                    type="button"
                                    onClick={() => setFilter(f as typeof filter)}
                                    className={`px-3 py-1 rounded ${filter === f ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {f[0].toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={clearCompleted}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Clear Completed
                        </button>
                    </div>

                    {/* Active count */}
                    <div className="mb-4 text-sm text-gray-600">
                        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                    </div>

                    {/* Todo List */}
                    <ul className="space-y-2">
                        {filteredTodos.map(todo => (
                            <li key={todo.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                {editingId === todo.id ? (
                                    <div className="flex-grow flex gap-2">
                                        <input
                                            type="text"
                                            value={editText}
                                            onChange={e => setEditText(e.target.value)}
                                            className="flex-grow p-1 border rounded"
                                        />
                                        <button onClick={() => saveEdit(todo.id)} className="text-green-500 hover:text-green-700">Save</button>
                                        <button onClick={() => setEditingId(null)} className="text-gray-500 hover:text-gray-700">Cancel</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center gap-2 flex-grow">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleComplete(todo.id)}
                                                className="h-5 w-5"
                                            />
                                            <span
                                                onClick={() => startEdit(todo.id, todo.text)}
                                                className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''} ${todo.priority === 'high' ? 'text-red-500' : todo.priority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                                                    }`}
                                            >
                                                {todo.text}
                                            </span>
                                        </div>
                                        <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">Delete</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>

                </div>
            </main>
        </div>
    )
}
