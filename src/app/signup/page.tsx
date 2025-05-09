'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const Signup = () => {
  const router = useRouter()

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [buttonDisabled, setButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const { username, email, password } = user
    setButtonDisabled(!(username && email && password))
  }, [user])

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        '/api/users/signup',
        user,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
  
      toast.success('User created successfully!')
      router.push('/login')
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || error.message || 'Signup failed'
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {loading ? 'Loading...' : 'Sign Up'}
          </h1>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            className={`w-full font-semibold py-2 rounded-lg transition ${
              buttonDisabled || loading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {buttonDisabled ? 'Fill all fields' : loading ? 'Signing up...' : 'Signup'}
          </button>

          <p className="mt-4 text-sm text-center">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg"
            alt="Signup illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Signup
