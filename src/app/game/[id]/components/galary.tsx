/* eslint-disable no-unused-vars */
"use client";
import React, { useRef, useState } from "react";

import Image from "next/image";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { gameMedia } from "@/app/components/main/types/Response";
import { Box, Stack, useMediaQuery } from "@mui/material";

interface IGalleryProps {
  gameMedia: gameMedia;
}

const Preview = ({
  isVideo,
  src,
  ref,
}: {
  isVideo: number;
  src: string | undefined;
  ref?: any;
}) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const width = matches ? 840 : 380;
  const height = matches ? 490 : 220;
  if (isVideo === 1) {
    return (
      src && (
        <video
          ref={ref}
          width={width}
          height={height}
          controls
          muted
          autoPlay
          style={{ borderRadius: "13px", marginBottom: "20px" }}
          src={src}
        />
      )
    );
  } else {
    return (
      src && (
        <img
          ref={ref}
          width={width}
          height={height}
          style={{ borderRadius: "5px", marginBottom: "20px" }}
          src={src}
          alt=""
        />
      )
    );
  }
};


const Item = ({
  src,
  setIsPreview,
  index,
  additionSrc = src,
  isVideo,
}: {
  src: string | undefined;
  setIsPreview: (object: any) => void;
  index: number;
  additionSrc?: string;
  isVideo?: boolean;
}) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const widthItem = matches ? 180 : 120;
  const handleChange = () => {
    setIsPreview({ src: additionSrc, isVideo: index });
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <button
      style={{ position: "relative" }}
      onClick={handleChange}
    >
      {src && (
        <img
          width={widthItem}
          style={{ borderRadius: "5px" }}
          src={src}
          alt="gallery item"
        />
      )}
      {isVideo && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            background: "rgb(0 0 0 / 48%)",
            borderRadius: "5px",
          }}
        >
          <Image
            width={50}
            height={50}
            style={{
              position: "relative",
              top: "50%",
              transform: "translate(0%,-50%)",
            }}
            src={"/play-button.svg"}
            alt={"play"}
          ></Image>
        </div>
      )}
    </button>
  );
};

export const Gallery: React.FC<IGalleryProps> = ({ gameMedia }) => {
  const matches = useMediaQuery("(min-width:1200px)");
  const widthItem = matches ? 180 : 120;
  const [isPreview, setIsPreview] = useState({
    src: gameMedia?.trailer,
    isVideo: 1,
  });

  const positionIndicator =
    isPreview.isVideo === 0
      ? -8
      : isPreview.isVideo * widthItem + (isPreview.isVideo - 1) * 8;
  return (
    <Box position={"relative"}>
      <TransitionGroup>
        <CSSTransition
          key={isPreview.isVideo}
          timeout={300}
          classNames="changeSlide"
        >
          <Box maxWidth={840} position={"relative"}>
            <Preview
              src={isPreview.src}
              isVideo={isPreview.isVideo}
            />
          </Box>
        </CSSTransition>
      </TransitionGroup>
      {gameMedia?.bannerUrl && (
        <Stack direction={"row"} spacing={1} sx={{ position: "relative" }}>
          <Item
            src={gameMedia.bannerUrl}
            setIsPreview={setIsPreview}
            index={0}
          />
          <Item
            src={gameMedia.trailerScreenshot}
            additionSrc={gameMedia.trailer}
            setIsPreview={setIsPreview}
            index={1}
            isVideo
          />
          <Item
            src={gameMedia.screenshotUrl}
            setIsPreview={setIsPreview}
            index={2}
          />
          <span
            className="MuiTabs-indicator mui-1u4qj0q-MuiTabs-indicator"
            style={{
              width: `${widthItem}px`,
              position: "absolute",
              left: `${positionIndicator}px`,
              bottom: "-10px",
            }}
          ></span>
        </Stack>
      )}
    </Box>
  );
};
