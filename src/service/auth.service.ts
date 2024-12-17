import { createUser, getUserByEmail } from "@/repository/user.repo";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { UserTypes } from "@/types";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("user:", user);
        const dbUser = await getUserByEmail(user.email as string);
        console.log({ dbUser });
        if (!dbUser) {
          if (!user.name || !user.email || !user.image) {
            token.role = "guest";
            return token;
          }
          const newUser = await createUser({
            name: user.name,
            email: user.email,
            image: user.image,
          });
          token.role = newUser.type;
          token.user_id = newUser.id;
        } else {
          token.role = dbUser.type;
          token.user_id = dbUser.id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.role = token.role || "user";
      return session;
    },
  },
});

export async function signInAction() {
  await signIn("google", { redirectTo: "/" });
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
