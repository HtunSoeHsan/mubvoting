"use client";
import RoundedCircle from "@/components/ui/rounded-circle";
import { Button } from "@/components/ui/button";
import LoginCard from "@/components/LoginCard";

const config = {
  imgUrl: "/login_mail.svg",
  content: {
    title: "Enter Your Email",
    description: "If you enter you email that have on our member,we will send OTP code",
  },
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
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-2 justify-center items-center">
            <input
              type="email"
              className="w-full lg:w-[350px] bg-slate-200 px-5 py-2 ring-1 ring-gold rounded-sm"
            />
            <Button className="bg-gold w-full flex-1 py-3 lg:py-5 text-[16px]">Send OTP</Button>
          </div>
        </LoginCard>
      </div>
    </>
  );
}
