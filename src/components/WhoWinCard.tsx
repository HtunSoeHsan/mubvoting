"use client";

import Image from "next/image";
import LoadingSpinner from "./cell/LoadingSpinner";
import { Selection } from "@/interface/selection";
import { conf } from "@/config";

interface CardProps {
  title: string;
  crownSrc: string;
  person: Selection | undefined;
  loading: boolean;
  selections: Selection[];
}

const WhoWinCard = ({
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
            width={100}
            height={100}
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
      <h4 className="w-[80%] bg-gold rounded-r-full font-bold text-lg px-10 py-2">
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
            <div className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between">
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
                className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between"
              >
                <p className="font-semibold">{candidate.selection_no}</p>
                <p>{candidate.name}</p>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default WhoWinCard;
