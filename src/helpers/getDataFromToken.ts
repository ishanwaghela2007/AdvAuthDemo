import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      throw new Error('Token not found in cookies')
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!)
    return decodedToken
  } catch (error: any) {
    console.error('JWT Error:', error.message)
    return null // instead of throwing, safely return null
  }
}
