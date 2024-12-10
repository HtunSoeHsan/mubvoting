'use client';
import RoundedCircle from "@/components/ui/rounded-circle";
import { Button } from "@/components/ui/button";
import LoginCard from "@/components/LoginCard";
import OtpInput from "@/components/OtpInput"
import { useSearchParams } from 'next/navigation'

const config = {
    imgUrl: "/otp.svg",
    content: {
        title: "OTP Verification",
        description: "We Will send your one time password on this Email",
    },
};

export default function Page() {
    const params =   useSearchParams()
    ;
    const curr_email = params.get('email');

    
    return (
        <>
            <div className="relative h-screen max-w-full flex justify-center items-center flex-col">
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
                <LoginCard imgUrl={config.imgUrl} content={config.content} current_email={curr_email}>
                    <div className="space-y-5">
                        <OtpInput />
                        <div className="flex items-center justify-center">
                            <p className="text-slate-600">Do not sent OTP? </p><a className="ml-3 text-gold font-bold">Send OTP</a>
                        </div>
                        <Button className="bg-gold w-full flex-1 py-5 text-[16px]">Send</Button>
                    </div>

                </LoginCard>
            </div>
        </>
    );
}
