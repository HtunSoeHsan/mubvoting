import { createUser, getUserByEmail } from "@/repository/user.repo";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

import { UserTypes } from "@/types";

// import { signIn } from "@/auth";

// export const postOTP = async (request: Request) => {
//   try {
//     const { email } = await request.json();

//     if (!email) throw new Error("Email is required");

//     const isUser = await getUserByEmail(email);

//     if (!isUser) {
//       throw new Error("User Email Not found");
//     }

//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       specialChars: false,
//       digits: true,
//     });

//     emailQueue.add(
//       "email-user",
//       {
//         receiver: email,
//         subject: "Your OTP CODE",
//         html: `<h1>${otp}</h1>`,
//       },
//       { removeOnComplete: true, removeOnFail: 1000 }
//     );

//     return NextResponse.json({ success: true });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 404 }
//     );
//   }
// };

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
});

export async function signInAction() {
  await signIn("google", { redirectTo: "/welcome" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function storeUser({ name, email, image }: UserTypes) {
  const user = await getUserByEmail(email);

  if (!name || !email || !image) {
    return false;
  }

  if (!user) {
    const new_user = await createUser({ name, email, image });
    console.log(new_user);
  }

  return true;
}
