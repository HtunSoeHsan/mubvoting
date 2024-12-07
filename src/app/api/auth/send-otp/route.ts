import { db } from "@/db";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface sendOtp extends Request {
  email: string;
}

export async function POST(request: sendOtp) {
  try {
    const { email } = await request.json();

    if (!email) throw new Error("Email is required");

    const isUserEmail = await db.user.findFirst({
      where: { email: email },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SENDER_MAIL,
        pass: process.env.SENDER_PASSWORD,
      },
    });

    transporter.sendMail({
        from: process.env.SENDER_MAIL,
        to: email,
        subject: "OTP CODE",
        html: "<h1>Here is your otp code. 1111 </h1>"
    })
    
    console.log(transporter);

    if (!isUserEmail) {
      throw new Error("User Email Not found");
    }

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 404 }
    );
  }
}
