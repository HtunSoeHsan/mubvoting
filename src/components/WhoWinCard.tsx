"use client";

import Image from "next/image";
import LoadingSpinner from "./cell/LoadingSpinner";
import { Selection } from "@/interface/selection";
import { conf } from "@/config";

interface CardProps {
  iconw: number;
  iconh: number;
  title: "KING" | "QUEEN" | "POPULAR" | "INNOCENT";
  crownSrc: string;
  person: Selection | undefined;
  loading: boolean;
  selections: Selection[];
}

const WhoWinCard = ({
  iconh,
  iconw,
  title,
  crownSrc,
  person,
  loading,
  selections,
}: CardProps) => {
  const getTitleColor = () => {
    switch (title) {
      case "KING": return "from-yellow-400 to-yellow-600";
      case "QUEEN": return "from-pink-400 to-purple-600";
      case "POPULAR": return "from-blue-400 to-cyan-600";
      case "INNOCENT": return "from-green-400 to-emerald-600";
      default: return "from-primary to-gold";
    }
  };

  return (
    <div className="group relative">
      {/* Card container */}
      <div className="w-[320px] glass-card rounded-2xl hover-lift pulse-glow">
        
        {/* Header with crown and profile */}
        <div className="relative h-32 bg-gradient-to-br from-accent/20 to-accent/5 overflow-visible">
          {/* Crown */}
          <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-20">
            <div className="relative group-hover:scale-110 transition-transform duration-300">
              <div className="absolute -inset-2 bg-gradient-to-r from-gold/30 to-primary/30 rounded-full blur-lg" />
              <Image
                priority
                alt="Crown"
                src={crownSrc}
                width={iconw}
                height={iconh}
                className="relative object-contain drop-shadow-2xl"
              />
            </div>
          </div>
          
          {/* Profile picture */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-[9999]">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-gold/50 rounded-full blur-md" />
              <div className="relative w-60 h-60 rounded-full overflow-hidden border-4 border-background shadow-2xl">
                <Image
                  priority
                  alt="Person's Photo"
                  src={person?.profile || "/images/questionmark.png"}
                  width={conf.resolution.w}
                  height={conf.resolution.h}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Title badge */}
        <div className="px-6 pt-16 pb-4">
          <div className={`inline-flex px-6 py-3 bg-gradient-to-r ${getTitleColor()} rounded-full shadow-lg`}>
            <h3 className="text-white font-bold text-lg tracking-wide">{title}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 pb-6 space-y-4">
          {person ? (
            <>
              {/* Winner image */}
              <div className="relative overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                <Image
                  alt={`${title} Profile`}
                  src={person.profile || "/images/questionmark.png"}
                  width={conf.resolution.w}
                  height={conf.resolution.h}
                  className="w-full h-50 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                      #{person.selection_no}
                    </span>
                    <span className="font-bold text-lg">{person.name}</span>
                  </div>
                </div>
              </div>
            </>
          ) : loading ? (
            <div className="flex justify-center items-center h-48">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {selections
                .sort((a, b) => a.selection_no - b.selection_no)
                .map((candidate, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 glass-card rounded-xl hover:bg-accent/20 smooth-transition group/item"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-gold rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {candidate.selection_no}
                      </div>
                      <span className="font-medium group-hover/item:text-primary transition-colors">
                        {candidate.name}
                      </span>
                    </div>
                    <div className="w-2 h-2 bg-muted rounded-full group-hover/item:bg-primary transition-colors" />
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhoWinCard;
