"use client";
import { useState } from "react";
import { TopMenu } from "./TopMenu";
import MobileNav from "./MobileMenu";

export const Nav = () => {
  const [nav, setNav] = useState(false);
  return (
    <>
      <TopMenu openNav={() => setNav(true)} />
      <MobileNav nav={nav} closeNav={() => setNav(false)} />
    </>
  );
};
