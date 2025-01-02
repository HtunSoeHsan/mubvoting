"use client";
import RoundedCircle from "@/components/ui/rounded-circle";
import { Button } from "@/components/ui/button";
import LoginCard from "@/components/LoginCard";
import Image from "next/image";
import { useAuth } from "@/context/auth";
import { redirect } from "next/navigation";

const config = {
  imgUrl: "/images/otp.svg",
  content: {
    title: "Login",
    description: "You can esily login with your gmail account",
  },
  btnText: "Continue with Google",
  btnIcon: "/images/google.svg",
};

export default function Page() {
  const { signInWithGoogle, user } = useAuth();
  if (user) return redirect("/");

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log("Google sign-in failed");
    }
  };

  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden flex justify-center items-center bg-background flex-col">
        <RoundedCircle
          top={-30}
          left={-10}
          width={600}
          height={600}
          bgColor="bg-gold"
          opacity={100}
        />
        <RoundedCircle
          top={-40}
          left={-1}
          width={600}
          height={600}
          bgColor="bg-gold"
          opacity={60}
        />
        <LoginCard imgUrl={config.imgUrl} content={config.content}>
          <div className="">
            <Button
              className="bg-gradient-to-tr  from-gold to-yellow-700 hover:from-black hover:opacity-90 transition ease-in duration-500 w-full flex-1 py-6 text-[18px] lg:text-[16px]"
              onClick={handleGoogleSignIn}
            >
              <Image
                src={config.btnIcon}
                alt={`svg photo`}
                width={30}
                height={30}
                className=""
                priority
              />
              {config.btnText}
            </Button>
          </div>
        </LoginCard>
      </div>
    </>
  );
}
