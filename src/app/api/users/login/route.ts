import { connectDB } from '@/dbConfig/dbconnect'
import User from '@/models/user.model.js'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export async function POST(request: NextRequest) {
     try {
        connectDB()
        const reqBody= await request.json()
        const {email,password}=reqBody
        //check if user exist
        const user=await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exist"},{status:400})
        }
        //check if the password is correct 
        const validPassword=await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password"},{status:400})
        }
        //create token data 
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }
        //create token
        const token=jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:"1d"})
        const responce=NextResponse.json({
            message:"Login Successfull",
            success:true
        })
        responce.cookies.set("token",token,{httpOnly:true})
        return responce

     } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
     }
}