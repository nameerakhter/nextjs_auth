import UserModel from "@/app/models/User";
import dbConnect from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await dbConnect();
  // Extract data from token
  const userId = await getDataFromToken(request)
  console.log( userId)
  const user = await UserModel.findOne({_id: userId }).select("-password")
  console.log(user)
  return NextResponse.json({
    message: "User data fetched successfully",
    data: user,
  });
}
