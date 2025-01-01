// "use client";

// import { db } from "@/firebase";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import Image from "next/image";
// import { useCallback, useEffect, useState } from "react";
// import LoadingSpinner from "./cell/LoadingSpinner";
// import { Selection } from "@/interface/selection";
// import { conf } from "@/config";

// export default function WhoWinCard() {
//   const [selections, setSelections] = useState<{
//     male: Selection[];
//     female: Selection[];
//   }>({ male: [], female: [] });
//   const [loading, setLoading] = useState(false);

//   const getRealTimeData = useCallback(() => {
//     setLoading(true);
//     const maleQuery = query(
//       collection(db, "selections"),
//       where("gender", "==", "male")
//     );
//     const unsubscribeMale = onSnapshot(
//       maleQuery,
//       (snapshot) => {
//         const male: Selection[] = snapshot.docs.map(
//           (doc) =>
//             ({
//               ...doc.data(),
//             } as Selection)
//         );
//         setSelections((prev) => ({ ...prev, male }));
//       },
//       (error) => {
//         console.error("Error fetching male data: ", error);
//       }
//     );

//     const femaleQuery = query(
//       collection(db, "selections"),
//       where("gender", "==", "female")
//     );
//     const unsubscribeFemale = onSnapshot(
//       femaleQuery,
//       (snapshot) => {
//         const female: Selection[] = snapshot.docs.map(
//           (doc) =>
//             ({
//               ...doc.data(),
//             } as Selection)
//         );
//         setSelections((prev) => ({ ...prev, female }));
//       },
//       (error) => {
//         console.error("Error fetching female data: ", error);
//       }
//     );

//     setLoading(false);

//     return () => {
//       unsubscribeMale();
//       unsubscribeFemale();
//     };
//   }, []);

//   useEffect(() => {
//     const unsubscribe = getRealTimeData();
//     return () => unsubscribe(); // Cleanup on unmount
//   }, [getRealTimeData]);

//   const king = selections.male.find((s) => s.isKing);
//   const queen = selections.female.find((s) => s.isQueen);
//   const popular = selections.male.find((s) => s.isPopular);
//   const innocent = selections.female.find((s) => s.isInnocent);

//   return (
//     <div className="flex gap-5 p-10">
//       {/* KING */}
//       <div className="w-[300px] bg-[#143848] py-2 relative rounded-t-lg pb-5">
//         <div className="h-[80px] flex justify-center">
//           <div className="absolute z-30 top-[-110px]">
//             <Image
//               priority
//               alt="Crown"
//               src="/crown-normal-queen.png"
//               width={100}
//               height={100}
//               className="object-contain"
//             />
//           </div>
//           <div className="absolute top-[-80px] rounded-full w-[150px] h-[150px] bg-[#143848] bg-cover overflow-hidden p-1">
//             <Image
//               priority
//               alt="King's Photo"
//               src={king?.profile || "/images/questionmark.png"}
//               width={conf.resolution.w}
//               height={conf.resolution.h}
//               className="w-full h-full rounded-full object-cover border-2 border-black"
//             />
//           </div>
//         </div>
//         <h4 className="w-[80%] bg-gold rounded-r-full font-bold text-lg px-10 py-2">
//           KING
//         </h4>
//         <div className="grid gap-2 mt-5">
//           {king ? (
//             <>
//               <div className="p-2">
//                 <Image
//                   alt="King Profile"
//                   src={king.profile || "/images/questionmark.png"}
//                   width={conf.resolution.w}
//                   height={conf.resolution.h}
//                   className="w-full h-[200px] object-cover rounded-xl"
//                 />
//               </div>
//               <div className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between">
//                 <p className="font-semibold">{king.selection_no}</p>
//                 <p>{king.name}</p>
//               </div>
//             </>
//           ) : loading ? (
//             <p className="text-center text-white">
//               <LoadingSpinner />
//             </p>
//           ) : (
//             selections.male
//               .sort((a, b) => a.selection_no - b.selection_no)
//               .map((student, i) => (
//                 <div
//                   key={i}
//                   className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between"
//                 >
//                   <p className="font-semibold">{student.selection_no}</p>
//                   <p>{student.name}</p>
//                 </div>
//               ))
//           )}
//         </div>
//       </div>

//       {/* QUEEN */}
//       <div className="w-[300px] bg-[#143848] py-2 relative rounded-t-lg pb-5">
//         <div className="h-[80px] flex justify-center">
//           <div className="absolute z-30 top-[-110px]">
//             <Image
//               priority
//               alt="Crown"
//               src="/crown-normal-queen.png"
//               width={100}
//               height={100}
//               className="object-contain"
//             />
//           </div>
//           <div className="absolute top-[-80px] rounded-full w-[150px] h-[150px] bg-[#143848] bg-cover overflow-hidden p-1">
//             <Image
//               priority
//               alt="Queen's Photo"
//               src={queen?.profile || "/images/questionmark.png"}
//               width={conf.resolution.w}
//               height={conf.resolution.h}
//               className="w-full h-full rounded-full object-cover border-2 border-black"
//             />
//           </div>
//         </div>
//         <h4 className="w-[80%] bg-gold rounded-r-full font-bold text-lg px-10 py-2">
//           QUEEN
//         </h4>
//         <div className="grid gap-2 mt-5">
//           {queen ? (
//             <>
//               <div className="p-2">
//                 <Image
//                   alt="Queen Profile"
//                   src={queen.profile || "/images/questionmark.png"}
//                   width={conf.resolution.w}
//                   height={conf.resolution.h}
//                   className="w-full h-[200px] object-cover rounded-xl"
//                 />
//               </div>
//               <div className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between">
//                 <p className="font-semibold">{queen.selection_no}</p>
//                 <p>{queen.name}</p>
//               </div>
//             </>
//           ) : loading ? (
//             <p className="text-center text-white">
//               <LoadingSpinner />
//             </p>
//           ) : (
//             selections.female
//               .sort((a, b) => a.selection_no - b.selection_no)
//               .map((student, i) => (
//                 <div
//                   key={i}
//                   className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between"
//                 >
//                   <p className="font-semibold">{student.selection_no}</p>
//                   <p>{student.name}</p>
//                 </div>
//               ))
//           )}
//         </div>
//       </div>

//       {/* Popular */}
//       <div className="w-[300px] bg-[#143848] py-2 relative rounded-t-lg pb-5">
//         <div className="h-[80px] flex justify-center">
//           <div className="absolute z-30 top-[-110px]">
//             <Image
//               priority
//               alt="Crown"
//               src="/crown-normal-queen.png"
//               width={100}
//               height={100}
//               className="object-contain"
//             />
//           </div>
//           <div className="absolute top-[-80px] rounded-full w-[150px] h-[150px] bg-[#143848] bg-cover overflow-hidden p-1">
//             <Image
//               priority
//               alt="King's Photo"
//               src={king?.profile || "/images/questionmark.png"}
//               width={conf.resolution.w}
//               height={conf.resolution.h}
//               className="w-full h-full rounded-full object-cover border-2 border-black"
//             />
//           </div>
//         </div>
//         <h4 className="w-[80%] bg-gold rounded-r-full font-bold text-lg px-10 py-2">
//           Popular
//         </h4>
//         <div className="grid gap-2 mt-5">
//           {popular ? (
//             <>
//               <div className="p-2">
//                 <Image
//                   alt="King Profile"
//                   src={popular.profile || "/images/questionmark.png"}
//                   width={conf.resolution.w}
//                   height={conf.resolution.h}
//                   className="w-full h-[200px] object-cover rounded-xl"
//                 />
//               </div>
//               <div className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between">
//                 <p className="font-semibold">{popular.selection_no}</p>
//                 <p>{popular.name}</p>
//               </div>
//             </>
//           ) : loading ? (
//             <p className="text-center text-white">
//               <LoadingSpinner />
//             </p>
//           ) : (
//             selections.male
//               .sort((a, b) => a.selection_no - b.selection_no)
//               .map((student, i) => (
//                 <div
//                   key={i}
//                   className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between"
//                 >
//                   <p className="font-semibold">{student.selection_no}</p>
//                   <p>{student.name}</p>
//                 </div>
//               ))
//           )}
//         </div>
//       </div>

//       {/* Innocent */}
//       <div className="w-[300px] bg-[#143848] py-2 relative rounded-t-lg pb-5">
//         <div className="h-[80px] flex justify-center">
//           <div className="absolute z-30 top-[-110px]">
//             <Image
//               priority
//               alt="Crown"
//               src="/crown-normal-queen.png"
//               width={100}
//               height={100}
//               className="object-contain"
//             />
//           </div>
//           <div className="absolute top-[-80px] rounded-full w-[150px] h-[150px] bg-[#143848] bg-cover overflow-hidden p-1">
//             <Image
//               priority
//               alt="Queen's Photo"
//               src={queen?.profile || "/images/questionmark.png"}
//               width={conf.resolution.w}
//               height={conf.resolution.h}
//               className="w-full h-full rounded-full object-cover border-2 border-black"
//             />
//           </div>
//         </div>
//         <h4 className="w-[80%] bg-gold rounded-r-full font-bold text-lg px-10 py-2">
//           Innocent
//         </h4>
//         <div className="grid gap-2 mt-5">
//           {innocent ? (
//             <>
//               <div className="p-2">
//                 <Image
//                   alt="Queen Profile"
//                   src={innocent.profile || "/images/questionmark.png"}
//                   width={conf.resolution.w}
//                   height={conf.resolution.h}
//                   className="w-full h-[200px] object-cover rounded-xl"
//                 />
//               </div>
//               <div className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between">
//                 <p className="font-semibold">{innocent.selection_no}</p>
//                 <p>{innocent.name}</p>
//               </div>
//             </>
//           ) : loading ? (
//             <p className="text-center text-white">
//               <LoadingSpinner />
//             </p>
//           ) : (
//             selections.female
//               .sort((a, b) => a.selection_no - b.selection_no)
//               .map((student, i) => (
//                 <div
//                   key={i}
//                   className="py-2 px-4 rounded-l-full ml-auto bg-gold flex w-[90%] items-center justify-between"
//                 >
//                   <p className="font-semibold">{student.selection_no}</p>
//                   <p>{student.name}</p>
//                 </div>
//               ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { db } from "@/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
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
    <div className="w-[300px] bg-[#143848] py-2 relative rounded-t-lg pb-5 sm:mt-[400px]">
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
