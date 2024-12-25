import { NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.split("Bearer ")[1];
    console.log("Token:", token);
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const userRef = doc(db, "users", token);
    const userDoc = await getDoc(userRef);
    if (!userDoc.exists) {
      return NextResponse.json(
        { message: "Forbidden: User does not exist" },
        { status: 403 }
      );
    }

    const user = userDoc.data();

    return NextResponse.json(
      { message: "User is authorized", user },
      { status: 200 }
    );
  } catch (error) {
    console.log("Authentication error:", error);
    return NextResponse.json(
      { message: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}
