import { connectDB } from '@/dbConfig/dbconnect'
import User from '@/models/user.model.js'
import { NextRequest, NextResponse } from 'next/server'

import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const reqBody = await request.json()
    const { username, email, password } = reqBody

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()
    
    await sendEmail({
      email:savedUser.email,
      emailType:"VERIFY",
      userId:savedUser._id
    })
    return NextResponse.json({
      message: 'User created successfully',
      success: true,
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}