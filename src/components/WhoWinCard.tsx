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
  return (
    <div className="w-[300px] bg-[#143848] py-2 relative rounded-t-lg pb-5 ">
      <div className="h-[80px] flex justify-center">
        <div className="absolute z-30 top-[-110px]">
          <Image
            priority
            alt="Crown"
            src={crownSrc}
            width={iconw}
            height={iconh}
            className="object-contain"
          />
        </div>
        <div className="absolute top-[-80px] rounded-full w-[150px] h-[150px] bg-[#143848] bg-cover overflow-hidden p-1">
          <Image
            priority
            alt="Person's Photo"
            src={person?.profile || "/images/questionmark.png"}
            width={conf.resolution.w}
            height={conf.resolution.h}
            className="w-full h-full rounded-full object-cover border-2 border-black"
          />
        </div>
      </div>
      <h4 className="w-[80%] text-white bg-gold rounded-r-full font-bold text-lg px-10 py-2">
        {title}
      </h4>
      <div className="grid gap-2 mt-5">
        {person ? (
          <>
            <div className="p-2">
              <Image
                alt={`${title} Profile`}
                src={person.profile || "/images/questionmark.png"}
                width={conf.resolution.w}
                height={conf.resolution.h}
                className="w-full h-[200px] object-cover rounded-xl"
              />
            </div>
            <div className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between hover:bg-[#0E2C70] hover:text-white">
              <p className="font-semibold">{person.selection_no}</p>
              <p>{person.name}</p>
            </div>
          </>
        ) : loading ? (
          <p className="text-center text-white">
            <LoadingSpinner />
          </p>
        ) : (
          selections
            .sort((a, b) => a.selection_no - b.selection_no)
            .map((candidate, i) => (
              <div
                key={i}
                className="py-2 px-4 hover:border hover:border-white rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between hover:bg-[#0E2C70] hover:text-white"
              >
                <div className="text-left flex gap-2">
                  <p className="font-semibold text-white">
                    {candidate.selection_no}
                  </p>
                  <p>{candidate.name}</p>
                </div>
                <p>
                  {title === "KING" && candidate.kingVotesCount}{" "}
                  {title === "QUEEN" && candidate.queenVotesCount}{" "}
                  {title === "POPULAR" && candidate.popularVotesCount}{" "}
                  {title === "INNOCENT" && candidate.innocentVotesCount}
                </p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default WhoWinCard;
