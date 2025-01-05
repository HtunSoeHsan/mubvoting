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
    </div>
  );
};

export default SectionHeader;
