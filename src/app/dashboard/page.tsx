"use client"

import React from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation'
const page = () => {
  const router=useRouter()
   const logout=async()=>{
     try {
        await axios.get('/api/users/logout')
        toast.success('logout successfull')
        router.push('/login')
     } catch (error:any) {
       toast.error(error.message)
     }
   }
  return (
    <div>page
      <button 
      className='bg-blue-500 text-white mt-2 p-2 border'
      onClick={logout}
      >
        logout
      </button>
      <ToastContainer/>
    </div>
  )
}

export default page