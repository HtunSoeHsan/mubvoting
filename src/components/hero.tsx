"use client";
import Image from "next/image";
import { TypeTextAni } from "./cell";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background with modern overlay */}
      <div
        className="min-h-[100vh] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(/images/mub-poly.jpg)` }}
      >
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-background/95" />

        {/* Animated particles */}
        {/* <Particle /> */}

        {/* Content container */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[100vh] py-20">

            {/* Logo section */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-gold/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500" />
                <Image
                  src="/images/logo.png"
                  alt="University Logo"
                  width={400}
                  height={400}
                  className="relative hover-lift rounded-full shadow-2xl"
                  priority
                />
              </div>
            </div>

            {/* Text animation section */}
            <div className="flex items-center justify-center lg:justify-end order-1 lg:order-2">
              <div className="text-center lg:text-right">
                <TypeTextAni />

                {/* Subtitle */}
                {/* <div className="mt-8 space-y-4 fade-in">
                  <p className="text-lg lg:text-xl text-muted-foreground font-medium">
                    Experience the future of democratic participation
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center lg:justify-end">
                    <span className="px-4 py-2 glass-card rounded-full text-sm font-medium">
                      Secure Voting
                    </span>
                    <span className="px-4 py-2 glass-card rounded-full text-sm font-medium">
                      Real-time Results
                    </span>
                    <span className="px-4 py-2 glass-card rounded-full text-sm font-medium">
                      Transparent Process
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};
