import { FC, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { Loader2, Vote } from "lucide-react";
import { Gallery } from "@/interface/selection";

interface StudentCardProps {
  name: string;
  no: number;
  gender: string;
  grade: string;
  image: string; // Path or URL to the student's photo
  bio: string; // Short description of the student
  gallery: string[];
  onVote: () => void; // Callback when the vote button is clicked
}

const StudentCard: FC<StudentCardProps> = ({
  no,
  name,
  image,
  gender,
  gallery,
}) => {
  const isTimeToVote = true;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (image: string) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-[#143848] w-[340px] py-[30px] rounded-xl space-y-6 mx-auto">
      <div className="h-[50px] flex justify-center">
        {/* Image at the top,It'used for show profile  */}
        <div className="absolute top-[-80px] rounded-full w-[140px] h-[140px] border-2 border-white bg-cover overflow-hidden">
          <Image
            priority
            alt={`${name} photo`}
            src={image}
            width={1920} // Full HD width
            height={1080} // Full HD height
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        {/* This circle describe the no of the selection  */}
        <div className="absolute top-[-15px] right-[-20px]  rounded-full w-[60px] h-[60px] bg-white flex items-center justify-center">
          <div className="relative border-2 border-black w-[80%] h-[80%] rounded-full flex items-center justify-center">
            {/* This is image is used as crown icon  */}
            <Image
              priority
              alt={`${name} photo`}
              src={
                gender === "FEMALE"
                  ? "/images/queen-crown.png"
                  : "/images/king-crown.png"
              }
              width={100}
              height={100}
              className="absolute top-[-25px] right-[-10px]"
            />
            <span className="font-extrabold text-[26px]">{no}</span>
          </div>
        </div>
      </div>

      {/* develop with swiper to flip images of seletion  */}
      <div className=" flex justify-center items-end">
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

      {/* This section show the  name and section of selection  */}
      <div className="space-y-5 overflow-hidden">
        <h4 className="p-3 animated-background bg-gradient-to-br from-gold via-yellow-600 to-yellow-800 w-[70%] rounded-r-full text-[20px] font-bold line-clamp-1">
          {name}
        </h4>
        <div className="flex justify-between items-center">
          <p className="mx-3 text-white opacity-80 uppercase">Section - A</p>
          {isTimeToVote ? (
            <button className="w-[50%] translate-x-[40px] hover:translate-x-0 hover:bg-yellow-100 transition-all duration-300 p-3 bg-gold rounded-l-full  text-right font-semibold text-[16px] capitalize inline-flex justify-end items-center gap-2">
              Vote now
              <Vote className="text-golden animate-bounce" />
            </button>
          ) : (
            <button
              disabled
              className="w-[50%] p-3 bg-gold rounded-l-full  justify-center items-center gap-2  opacity-50 inline-flex"
            >
              <Loader2 className="animate-spin" />
              Can&apos;t vote now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
