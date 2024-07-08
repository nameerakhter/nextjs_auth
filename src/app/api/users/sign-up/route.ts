import dbConnect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/app/models/User";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Validate input
    if (!username || !email || !password) {
      return NextResponse.json(
        {
          error: "All fields are required",
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(
        {
          error: "User already exists",
        },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    // Save new user to database
    const savedUser = await newUser.save();
    console.log(`Saved user to database: ${savedUser}`);

    // Send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json({
      message: "Verification email sent",
      success: true,
      user: savedUser,
    });

  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
