"use client";
import { TypeAnimation } from "react-type-animation";
import { useRouter } from "next/navigation";

export const TypeTextAni = () => {
  const router = useRouter();

  return (
    <div className="space-y-8 text-center">
      {/* Main heading */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Voting System
        </h1>
        <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
      </div>
      
      {/* Animated subtitle */}
      <TypeAnimation
        sequence={[
          "Welcome to the Future of Voting",
          2000,
          "Computer University (MAUBIN)",
          2000,
          "Polytechnic University (MAUBIN)",
          2000,
          "Secure • Transparent • Democratic",
          2000,
        ]}
        speed={50}
        className="text-lg md:text-2xl text-gray-600 font-medium"
        repeat={Infinity}
      />
      
      {/* Call to action */}
      <div className="pt-4">
        <button 
          onClick={() => router.push('/king')}
          className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Start Voting
        </button>
      </div>
    </div>
  );
};
