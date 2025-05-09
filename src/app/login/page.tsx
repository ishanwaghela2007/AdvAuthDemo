'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  useEffect(()=>{
    if(user.email.length>0&&user.password.length>0){
       setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  },[user])
  const onLogin = async () => {
      try {
        setLoading(true)
        const responce=await axios.post('api/users/login',user)
        toast.success("user looged in")
        router.push('/dashboard')
      } catch (error:any) {
        toast.error(error.message)
      }finally
      {
        setLoading(false)
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-center">{loading?"processing":"Login"}</h1>

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
            onClick={onLogin}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="mt-4 text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
        </div>

        {/* Right: Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-2242.jpg?t=st=1744544103~exp=1744547703~hmac=a53a76bf997fd9b8825ea58a80c56a78db29d74f5f9d6017c30917d355e43f39&w=1380"
            alt="Login illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Login;

