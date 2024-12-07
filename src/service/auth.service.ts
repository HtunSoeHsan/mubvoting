import { emailQueue } from "@/queue/emailQueue";
import { getUserByEmail } from "@/repository/user.repo";
import { NextResponse } from "next/server";
import otpGenerator from "otp-generator";

export const postOTP = async (request: Request) => {
  try {
    const { email } = await request.json();

    if (!email) throw new Error("Email is required");

    const isUser = await getUserByEmail(email);

    if (!isUser) {
      throw new Error("User Email Not found");
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });

    emailQueue.add(
      "email-user",
      {
        receiver: email,
        subject: "Your OTP CODE",
        html: `<h1>${otp}</h1>`,
      },
      { removeOnComplete: true, removeOnFail: 1000 }
    );

    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 404 }
    );
  }
};
