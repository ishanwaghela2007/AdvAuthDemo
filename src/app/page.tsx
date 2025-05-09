"use client"
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-center px-4">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        🔐 Advanced Auth Demo
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        This is a minimal demonstration of advanced login, signup, and profile (dashboard) pages using Next.js and Tailwind CSS.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/login"
          className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md hover:opacity-90"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-6 py-2 border border-black dark:border-white text-black dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Sign Up
        </Link>
        <Link
          href="/profile"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
