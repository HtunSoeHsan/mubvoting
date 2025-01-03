"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getVotes } from "@/repository/vote.repo";
import { getVotingCount } from "@/service/vote.service";
import { useEffect, useState } from "react";

export default function Page() {
  const King = [
    { id: 1, name: "Thaw Bhonte Htet" },
    { id: 2, name: "Okkar Thu" },
    { id: 3, name: "Thein Yati Nwe" },
    { id: 4, name: "Yoon Lae Lae Khaing" },
    { id: 5, name: "Hnin Hnin Hsan" },
  ];

  const irefresh = "/refresh.png";

  const [votings, setVoting] = useState<{
    kingVotes: {
      name: string;
      no: number;
      count: number;
    }[];
    queenVotes: {
      name: string;
      no: number;
      count: number;
    }[];
    popularVotes: {
      name: string;
      no: number;
      count: number;
    }[];
    innocentVotes: {
      name: string;
      no: number;
      count: number;
    }[];
  } | null>(null);
  const fetch = async () => {
    await getVotingCount()
      .then((data) => setVoting(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <div className=" m-5">
        <div className="flex  gap-3 items-center justify-around m-5">
          <div className="px-2 flex flex-wrap gap-12 justify-center items-center w-full ">
            <Card className="border-[#176B87] border-4">
              <CardHeader className="px-14">
                <CardTitle> 100</CardTitle>
                <CardDescription>Login</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-[#176B87] border-4">
              <CardHeader className="px-14">
                <CardTitle>120</CardTitle>
                <CardDescription>Vote Count</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-[#176B87] border-4">
              <CardHeader className="px-14">
                <CardTitle>12</CardTitle>
                <CardDescription>Participant</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <Card className=" bg-[#32bbb2] flex-wrap flex items-center justify-end mx-24 max-h-[80px]">
            <CardHeader>
              <CardDescription>
                <button>
                  <img src={irefresh} className="max-h-[80px]" />
                </button>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="flex flex-wrap gap-8 justify-start items-center">
          <div className="rounded-lg flex flex-col border-2 bg-[#053025]">
            <p className="w-[250px] text-left rounded-r-full rounded-br-full bg-[#FFC145]  font-bold text-lg  px-14 py-2 mb-8">
              King{" "}
            </p>
            {votings?.kingVotes.map((v, i) => (
              <div
                key={i}
                className=" text-start bg-[#FFC145] flex justify-between items-center  font-bold text-lg rounded-l-full rounded-r-md px-4 gap-5 py-2 ml-4 mt-1"
              >
                <div className="text-start">
                  <span className="border border-white border-2 rounded-full p-2">
                    {v.no}
                  </span>
                  <span className="text-start ms-5">{v.name}</span>
                </div>
                <span className="text-white">{v.count}</span>
              </div>
            ))}
            <button className="mt-8 text-center bg-[#FFC145] font-bold text-lg  px-14 py-2">
              SELECT{" "}
            </button>
          </div>
          <div className="rounded-lg flex flex-col border-2 bg-[#053025]">
            <p className="w-[250px] text-left bg-[#FFC145]  rounded-r-full rounded-br-full  font-bold text-lg  px-14 py-2 mb-8">
              Popular{" "}
            </p>
            {votings?.popularVotes.map((v, i) => (
              <div
                key={i}
                className="text-start bg-[#FFC145] flex justify-between items-center  font-bold text-lg rounded-l-full rounded-r-md px-4 gap-5 py-2 ml-4 mt-1"
              >
                <div className="text-start">
                  <span className="border border-white border-2 rounded-full p-2">
                    {v.no}
                  </span>
                  <span className="text-start ms-5">{v.name}</span>
                </div>
                <span className="text-white">{v.count}</span>
              </div>
            ))}
            <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">
              SELECT{" "}
            </button>
          </div>
          <div className=" rounded-md flex flex-col border-2 bg-[#053025]">
            <p className="w-[250px] text-left rounded-r-full rounded-br-full bg-[#FFC145]  font-bold text-lg  px-14 py-2 mb-8">
              Queen{" "}
            </p>
            {votings?.queenVotes.map((v, i) => (
              <div
                key={i}
                className=" text-start bg-[#FFC145] flex justify-between items-center  font-bold text-lg rounded-l-full rounded-r-md px-4 gap-5 py-2 ml-4 mt-1"
              >
                <div className="text-start">
                  <span className="border border-white border-2 rounded-full p-2">
                    {v.no}
                  </span>
                  <span className="text-start ms-5">{v.name}</span>
                </div>
                <span className="text-white">{v.count}</span>
              </div>
            ))}
            <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">
              SELECT{" "}
            </button>
          </div>
          <div className=" rounded-md flex flex-col border-2 bg-[#053025]">
            <p className="w-[250px] text-left bg-[#FFC145] rounded-r-full rounded-br-full font-bold text-lg  px-14 py-2 mb-8">
              Innocence{" "}
            </p>
            {votings?.innocentVotes.map((v, i) => (
              <div
                key={i}
                className=" text-start bg-[#FFC145] flex justify-between items-center  font-bold text-lg rounded-l-full rounded-r-md px-4 gap-5 py-2 ml-4 mt-1"
              >
                <div className="text-start">
                  <span className="border border-white border-2 rounded-full p-2">
                    {v.no}
                  </span>
                  <span className="text-start ms-5">{v.name}</span>
                </div>
                <span className="text-white">{v.count}</span>
              </div>
            ))}
            <button className="mt-8 text-center bg-[#FFC145]  font-bold text-lg  px-14 py-2">
              SELECT{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
