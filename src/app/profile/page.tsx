'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profile = () => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me', {
        withCredentials: true,
      })
      setData(res.data.data) 
    } catch (error: any) {
      console.error('Error fetching user data:', error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserDetails()
  }, [])

  if (loading) {
    return <div className="text-center p-10 text-xl">Loading profile...</div>
  }

  if (!data) {
    return <div className="text-center p-10 text-red-500">No user data found.</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: Avatar */}
        <div className="md:w-1/3 bg-blue-600 flex items-center justify-center p-8">
          <img
            src={data.avatar || 'https://i.pravatar.cc/150?img=12'}
            alt="Profile"
            className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
          />
        </div>

        {/* Right: Profile Info */}
        <div className="md:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {data.name || data.username}
          </h2>
          <p className="text-sm text-gray-600 mb-4">{data.email}</p>
          <p className="text-gray-700 mb-4">
            {data.bio || 'No bio provided.'}
          </p>

          <div className="flex space-x-4 mb-6">
            <div>
              <p className="text-lg font-bold text-gray-800">{data.posts || 0}</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{data.followers || 0}</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">{data.following || 0}</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>

          <button
            onClick={getUserDetails}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
