import { FC } from "react";

interface SectionHeaderProps {
  title: string;
  subTitle: string;
  images: {
    first: string;
    second: string;
    third: string;
  };
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, subTitle }) => {
  return (
    <div className="hidden md:flex justify-between items-center">
      <div className="px-5">
        <h4 className="text-[30px] text  md:text-2xl font-semibold uppercase">
          {title}
        </h4>
        <p className="text-lg md:text-md opacity-80">{subTitle}</p>
      </div>
      {/* <div className="gap-2 hidden md:flex">
          <Image
            src={images.first}
            alt={`${name}'s photo`}
            width={100}
            height={100}
            className="w-[50px] h-[50px] object-contain"
            priority
          />
          <Image
            src={images.second}
            alt={`${name}'s photo`}
            width={100}
            height={100}
            className="w-[40px] h-[40px] animate-bounce object-contain"
            priority
          />
          <Image
            src={images.third}
            alt={`${name}'s photo`}
            width={100}
            height={100}
            className="w-[50px] h-[50px] object-contain"
            priority
          />
        </div> */}
    </div>
  );
};

export default SectionHeader;
