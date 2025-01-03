"use client";

import { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { db } from "@/firebase";
import { Check, Clock, Loader2, Vote } from "lucide-react";

import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useAuth } from "@/context/auth";

interface StudentCardProps {
  name: string;
  no: number;
  gender: string;
  grade: string;
  image: string; // Path or URL to the student's photo
  bio: string; // Short description of the student
  gallery: string[];
  votetype: string;
  alreadyVoted: boolean;
  setUserVoted: () => void;
}

const StudentCard: FC<StudentCardProps> = ({
  no,
  name,
  image,
  gender,
  gallery,
  votetype,
  alreadyVoted,
  setUserVoted,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isTimeToVote, setIsTimeToVote] = useState<boolean>(false); // Dynamic voting control

  // Fetch vote status in real-time
  useEffect(() => {
    const settingsDocRef = doc(db, "setting", "PaOqyekj0ixF1GBAYMLF"); // Adjust your Firestore path
    const unsubscribe = onSnapshot(settingsDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        console.log("votestatus", data.voteStatus);
        setIsTimeToVote(data.voteStatus); // Set voting status dynamically
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isUserVotedSelection, setIsUserVotedSelection] = useState(false);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function checkUserVotedSelection() {
      const q = query(
        collection(db, "selections"),
        where("name", "==", name) // Filter by name field
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No students found with the name:", name);
        return;
      }

      querySnapshot.forEach(async (docSnapshot) => {
        const student = docSnapshot.data();
        if (
          student[votetype].some(
            (vote: { email: string }) => vote.email === user?.email
          )
        ) {
          // Update the vote array
          setIsUserVotedSelection(true);
        }
      });
    }

    checkUserVotedSelection();
  }, []);

  async function handelVoting(name: string, votetype: string) {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, "selections"),
        where("name", "==", name) // Filter by name field
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No students found with the name:", name);
        return;
      }
      querySnapshot.forEach(async (docSnapshot) => {
        const student = docSnapshot.data();
        if (
          student[votetype].some(
            (vote: { email: string }) => vote.email === user?.email
          )
        ) {
          // Update the vote array

          return;
        }

        // previos vote count
        const previousVoteCount = student[votetype].length;

        const docRef = doc(db, "selections", docSnapshot.id);
        const vote = { email: user?.email, vote: 1 };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const allVoteTypes: any = {
          kingVotes: {
            kingVotes: arrayUnion(vote),
            kingVotesCount: previousVoteCount + 1,
          },
          queenVotes: {
            queenVotes: arrayUnion(vote),
            queenVotesCount: previousVoteCount + 1,
          },
          popularVotes: {
            popularVotes: arrayUnion(vote),
            popularVotesCount: previousVoteCount + 1,
          },
          innocentVotes: {
            innocentVotes: arrayUnion(vote),
            innocentVotesCount: previousVoteCount + 1,
          },
        };

        await updateDoc(docRef, allVoteTypes[votetype]);
        setUserVoted();
        setIsUserVotedSelection(true);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative bg-[#143848] w-[340px] py-[30px] rounded-xl space-y-6 mx-auto">
      <div className="h-[50px] flex justify-center">
        {/* Profile Image */}
        <div className="absolute top-[-80px] rounded-full w-[140px] h-[140px] border-2 border-white bg-cover overflow-hidden">
          <Image
            priority
            alt={`${name} photo`}
            src={image}
            width={1920}
            height={1080}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {/* Student Number */}
        <div className="absolute top-[-15px] right-[-20px] rounded-full w-[60px] h-[60px] bg-white flex items-center justify-center">
          <div className="relative border-2 border-black w-[80%] h-[80%] rounded-full flex items-center justify-center">
            <Image
              priority
              alt="Crown icon"
              src={
                gender === "female"
                  ? "/images/queen-crown.png"
                  : "/images/king-crown.png"
              }
              width={100}
              height={100}
              className="absolute top-[-25px] right-[-10px] transform rotate-[15deg]"
            />
            <span className="font-extrabold text-[26px]">{no}</span>
          </div>
        </div>
      </div>

      {/* Swiper Gallery */}
      <div className="flex justify-center items-end">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          {gallery.map((g, i) => (
            <SwiperSlide key={i} onClick={() => openModal(g)}>
              <Image
                alt={`${name} photo`}
                priority
                src={g}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 z-50"
            onClick={closeModal}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full h-full">
              <Image
                alt="Enlarged view"
                src={selectedImage!}
                layout="fill"
                objectFit="contain"
                className="cursor-pointer"
              />
            </div>
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={closeModal}
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Student Info and Voting Section */}
      <div className="space-y-5 overflow-hidden">
        <h4 className="p-3 animated-background bg-gradient-to-br from-gold via-yellow-600 to-yellow-800 w-[70%] rounded-r-full text-[20px] font-bold line-clamp-1">
          {name}
        </h4>
        <div className="flex justify-between items-center">
          <p className="mx-3 text-white opacity-80 uppercase">Section - A</p>
          {isUserVotedSelection ? (
            <button
              disabled
              onClick={() => {
                handelVoting(name, votetype);
              }}
              className="w-[50%] p-3 bg-green-400 rounded-l-full  justify-center items-center gap-2  opacity-50 inline-flex"
            >
              Your Choice
              <Check className="text-black font-mono" />
            </button>
          ) : (
            <>
              {!alreadyVoted && isTimeToVote ? (
                <button
                  disabled={isLoading}
                  onClick={() => {
                    handelVoting(name, votetype);
                  }}
                  className="w-[50%] cursor-pointer translate-x-[40px] hover:translate-x-0 hover:bg-yellow-100 transition-all duration-300 p-3 bg-gold rounded-l-full  text-right font-semibold text-[16px] capitalize inline-flex justify-end items-center gap-2 disabled:bg-yellow-200/50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      Voting...
                      <Clock className="text-golden animate-spin" />
                    </>
                  ) : (
                    <>
                      Vote now
                      <Vote className="text-golden animate-bounce" />
                    </>
                  )}
                </button>
              ) : (
                <button
                  disabled
                  className="w-[50%] p-3 bg-gold rounded-l-full  justify-center items-center gap-2  opacity-50 inline-flex"
                >
                  {alreadyVoted ? (
                    "Already Voted"
                  ) : (
                    <span className="flex items-center gap-2">
                      {" "}
                      Can&apos;t vote now <Loader2 className="animate-spin" />
                    </span>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
