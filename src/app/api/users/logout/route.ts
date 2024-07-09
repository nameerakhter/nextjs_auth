import dbConnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    await dbConnect()
    try {
        const response = NextResponse.json({
            message: "Logged out successfully",
            success: true
        })

        response.cookies.set("token", "",{
            httpOnly: true,
            expires: new Date(0)
        },)

        return response
    } catch (error:any) {
        return Response.json({ error: error.message }, { status: 500 });
    }


}