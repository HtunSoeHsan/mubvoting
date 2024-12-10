"use client";
import { FC } from "react";

interface RoundedCircleProps {
  top: number;
  left: number;
  width: number;
  height: number;
  bgColor: string;
  opacity ?: number;
}

const RoundedCircle: FC<RoundedCircleProps> = ({
  top,
  left,
  width,
  height,
  bgColor,
  opacity = 100,
}) => {

    const positionStyles = {
        top : `${top}%`,
        left : `${left}%`,
        width :`${width}px`,
        height : `${height}px`,
    }
  return (
    <div
      style={positionStyles}
      className={`absolute animate-zoomIn z-[-4] lg:flex dark:bg-white  rounded-full ${bgColor} opacity-${opacity}`}
    ></div>
  );
};

export default RoundedCircle;
