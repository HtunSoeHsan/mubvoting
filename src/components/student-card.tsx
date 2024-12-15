import { FC } from "react";
import { Button } from "@/components/ui/button"; // Adjust path if needed
import Image from "next/image";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

interface StudentCardProps {
  name: string;
  grade: string;
  image: string; // Path or URL to the student's photo
  bio: string; // Short description of the student
  onVote: () => void; // Callback when the vote button is clicked
}

const StudentCard: FC<StudentCardProps> = ({
  name,
  grade,
  image,
  bio,
  onVote,
}) => {
  return (
    <div className="relative bg-[#143848] w-[340px] py-[30px] rounded-xl space-y-6 mx-auto">
      <div className="h-[50px] flex justify-center">
        <div className="absolute top-[-80px] rounded-full w-[140px] h-[140px] border-2 border-black bg-cover overflow-hidden">
          <Image
            priority
            alt={`${name}'s photo`}
            src={image}
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-[-15px] right-[-20px]  rounded-full w-[60px] h-[60px] bg-white flex items-center justify-center">
          <div className="relative border-2 border-black w-[80%] h-[80%] rounded-full flex items-center justify-center">
            <Image
              priority
              alt={`${name}'s photo`}
              src={"/king-crown.png"}
              width={100}
              height={100}
              className="absolute top-[-20px] right-[-20px]"
            />
            <span className="font-extrabold text-[26px]">1</span>
          </div>
        </div>
      </div>
      <div className=" flex justify-center items-end">
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
      <div className="space-y-5">
        <h4 className="p-3 bg-gold w-[70%] rounded-r-full text-[20px] font-bold line-clamp-1">
          Chit Thel Lay Kain
        </h4>
        <div className="flex justify-between items-center">
          <p className="mx-3 text-white opacity-80 uppercase">
            First Year Section-A
          </p>
          <button className="w-[35%] p-3 bg-gold rounded-l-full text-[18px] font-bold text-right capitalize">
            Vote now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
