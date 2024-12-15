"use server";
import { auth, storeUser } from "@/service/auth.service";
import { redirect } from "next/navigation";

async function page() {
  const user = await auth();

  if (!user?.user?.email || !user?.user?.name || !user?.user?.image) {
    return redirect("/login");
  }

  const isSyned = await storeUser({
    name: user?.user?.name,
    email: user?.user?.email,
    image: user?.user?.image,
  });

  console.log({
    name: user?.user?.name,
    email: user?.user?.email,
    image: user?.user?.image,
  });
  

  if (isSyned) {
    return redirect("/");
  } else {
    return redirect("/login");
  }
}

export default page;
