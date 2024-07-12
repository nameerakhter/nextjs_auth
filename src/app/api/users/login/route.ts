import dbConnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/User";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export async function POST(request: NextRequest){
    await dbConnect()
    try {
        const reqBody= await request.json()
        const {username, email, password} = reqBody
        console.log(reqBody)


       const user=  await UserModel.findOne({email})

       if (!user) {
        return NextResponse.json({
            message: "User does not exists",
        }, {status: 400})
       }
       console.log("User exists")

      const validPassword =  await bcryptjs.compare(password, user.password)

      if(!validPassword){
        return NextResponse.json({
            error:"Check your credentials"
        }, {status: 400})
      }

      const tokenPayload = {
        id:user._id,
        username: user.username,
        email: user.email
      }

      const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, {expiresIn: '1d'})

      const response = NextResponse.json({
        message: "Logged in successfully",
        success: true,
        username: user.username,
      })

      response.cookies.set("token", token,{
        httpOnly: true
      })
      return response

        
    } catch (error:any) {
        return Response.json({ error: error.message }, { status: 500 });
    }

}