"use client";
import RoundedCircle from "@/components/ui/rounded-circle";
import { Button } from "@/components/ui/button";
import LoginCard from "@/components/LoginCard";
import Image from "next/image";

const config = {
  imgUrl: "/otp.svg",
  content: {
    title: "Enter Your Email",
    description:
      "If you enter you email that have on our member,we will send OTP code",
  },
  btnText: "Continue with Google",
  btnIcon: "/google.svg",
};

export default function Page() {
  return (
    <>
      <div className="relative h-screen w-screen flex justify-center items-center flex-col">
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
            <Button className="bg-gradient-to-tr  from-gold to-yellow-700 hover:from-black hover:opacity-90 transition ease-in duration-500 w-full flex-1 py-6 text-[18px] lg:text-[16px]">
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
