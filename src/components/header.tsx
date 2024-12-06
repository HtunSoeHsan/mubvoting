"use client";
import { ReactElement } from "react";
interface Props {
  bg: string;
  nav?: ReactElement;
  hero?: ReactElement;
}
export const Header = ({ bg, nav, hero }: Props) => {
  return (
    <div
      className=" shadow bg-transparent bg-cover bg-center min-h-[400px] sm:min-h-[500px] lg:min-h-[710px]"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {nav && nav}
      {hero && hero}
    </div>
  );
};
