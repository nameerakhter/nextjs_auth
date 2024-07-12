import dbConnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/User";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export async function POST(request: NextRequest){
    await dbConnect()

    try {
        const reqBody = await request.json()
        const {username, email, password, isAdmin} = reqBody
        console.log(reqBody)

        const user=  await UserModel.findOne({email})

        if(!isAdmin)
        return NextResponse.json({
            message: "You are not authorized to perform this action"})
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}