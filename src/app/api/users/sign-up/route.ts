import dbConnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/User";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";


export async function POST(request: NextRequest){
    await dbConnect()

    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody
        // validation

        console.log(reqBody)

        const user = await UserModel.findOne({email})

        if (user) {
            return NextResponse.json({
                error: "User already exists"
            },{status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new UserModel({
            username: username,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser)

        // Send Verification email

        await sendEmail({email, emailType:'VERIFY', userId: savedUser._id})

        return NextResponse.json({
            message: "verification email sent",
            success: true,
            savedUser
        })


    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
