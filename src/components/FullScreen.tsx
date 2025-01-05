"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Fullscreen } from "lucide-react";

const FullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement != null);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const enterFullScreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
    setIsFullScreen(true);
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullScreen(false);
  };

  const handleFullScreen = () => {
    if (isFullScreen) {
      exitFullScreen();
    } else {
      enterFullScreen();
    }
  };

  return (
    <Button onClick={handleFullScreen}>
      {isFullScreen ? <Fullscreen /> : <FullScreen />}
    </Button>
  );
};

export default FullScreen;
