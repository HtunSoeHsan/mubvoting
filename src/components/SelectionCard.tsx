import React from "react";
import { Card } from "./ui/card";
import Image from "next/image";

function SelectionCard() {
  return (
    <div className="w-[300] bg-[#143848] py-2 relative rounded-t-lg">
      <div className="h-[80px] flex justify-center">
        <div className="absolute z-30 top-[-110px]">
          <Image
            priority
            alt={`${name}'s photo`}
            src={"/crown-normal-queen.png"}
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <div className="absolute top-[-80px] rounded-full w-[150px] h-[150px] bg-white bg-cover overflow-hidden p-1">
          <Image
            priority
            alt={`${name}'s photo`}
            src={"https://images.hellomagazine.com/horizon/landscape/ec09d4add571-gettyimages-1443645015.jpg"}
            width={100}
            height={100}
            className="w-full h-full rounded-full object-cover border-2 border-black"
          />
        </div>
      </div>
      <h4 className="w-[80%] bg-gold rounded-r-full font-bold text-lg px-10 py-2">
        KING
      </h4>
      <div className="p-2">
        <Image
          alt="check"
          src={
            "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600"
          }
          width={100}
          height={100}
          className="w-full h-[200px] object-cover rounded-xl"
        />
      </div>
      <div className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between">
        <p className="font-semibold">MG-5</p>
        <p>Name</p>
      </div>
    </div>
  );
}

export default SelectionCard;
