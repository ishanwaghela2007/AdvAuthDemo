// /app/api/users/me/route.ts
import { NextResponse,NextRequest } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken'
import User from '@/models/user.model'
import { connectDB } from '@/dbConfig/dbconnect'

export async function GET(request:NextRequest) {
  try {
    await connectDB()

    const decodedToken: any = getDataFromToken(request) // ✅ No request param needed

    const user = await User.findById(decodedToken.id).select('-password')
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 })
  } catch (error: any) {
    console.error('GET /api/users/me error:', error.message)
    return NextResponse.json({ success: false, message: error.message }, { status: 500 })
  }
}
