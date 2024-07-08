import dbConnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/User";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await UserModel.findOne({
      isVerifiedToken: token,
      isVerifiedTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        { status: 400 }
      );
    }
    console.log(user);

    user.isVerified = true;
    user.isVerifiedToken = ""
 

    await user.save();
    return Response.json(
      { message: "Email verified successfully", sucess: true },
      { status: 500 }
    );
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
