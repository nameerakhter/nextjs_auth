import UserModel from "@/app/models/User";
import dbConnect from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest){
    // Extract data from token
    const userId = await getDataFromToken(request)
    const user = await UserModel.findOne({_id: userId}).select("-password")
    return NextResponse.json({
        message: "User data fetched successfully",
        data: user
    })

}