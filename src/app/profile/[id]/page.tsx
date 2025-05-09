'use client'

import { useParams } from 'next/navigation'
import React from 'react'

const profilewithid = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex flex-col md:flex-row overflow-hidden">
        
        {/* Left: Avatar */}
        <div className="md:w-1/3 bg-blue-600 flex items-center justify-center p-8">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Profile"
            className="rounded-full w-40 h-40 border-4 border-white shadow-lg"
          />
        </div>

        {/* Right: Profile Info */}
        <div className="md:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{useParams().id}</h2>
          <p className="text-sm text-gray-600 mb-4">ishan@example.com</p>
          <p className="text-gray-700 mb-4">
            Computer Engineering student | React Developer | Building cool stuff with JS, Node & Tailwind 💻✨
          </p>

          <div className="flex space-x-4 mb-6">
            <div>
              <p className="text-lg font-bold text-gray-800">45</p>
              <p className="text-sm text-gray-500">Posts</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">2.1k</p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">180</p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
            Edit Profile
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default profilewithid
