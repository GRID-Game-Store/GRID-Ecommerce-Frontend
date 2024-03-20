"use client";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { Container, SxProps, useMediaQuery } from "@mui/material";
import style from "./slider.module.css";
import { SliderActions } from "./sliderActions";
import { SliderNavigation } from "./sliderNavigation";
import { useColorFromImg } from "@/app/hooks/useColorFromImg";
import { IMostPopularProps } from "./../types/Response.d";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { TSlierItemsProps } from "./types/slider.d";
import { useTimeChangeSlide } from "@/app/hooks/useTimeChangeSlide";

const SliderItems: React.FC<TSlierItemsProps> = ({
  slides,
  current,
  setCurrent,
  setIsTouched,
}) => {
  const color = useColorFromImg(slides.coverImageUrl);
  const Link = slides.coverImageUrl;
  const matches = useMediaQuery("(min-width:1200px)");
  const styleItemSlider: SxProps = {
    background: `url(${Link}) 0 0px / 100% no-repeat `,
    borderRadius: "20px",
    boxShadow: color && `${color} 0px 2px 15px 0px`,
  };

  return (
    <Box
      width={!matches ? "350px" : "900px"}
      height={"453px"}
      className={style.SliderItem}
      sx={styleItemSlider}
    >
      <SliderActions
        slides={slides}
        setCurrent={setCurrent}
        setIsTouched={setIsTouched}
        current={current}
      />
    </Box>
  );
};

const MostPopular: React.FC<IMostPopularProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [isTouched, setIsTouched] = useState(false);
  useTimeChangeSlide(isTouched, current, setCurrent);
  const matches = useMediaQuery("(min-width:1200px)");
  const styleWrapSlider: SxProps = {
    width: !matches ? "300px" : "900px",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  return (
    <Container>
      <Container sx={styleWrapSlider}>
        <TransitionGroup>
          <CSSTransition key={current} timeout={500} classNames="messageout">
            <SliderItems
              slides={slides[current]}
              setCurrent={setCurrent}
              setIsTouched={setIsTouched}
              current={current}
            />
          </CSSTransition>
        </TransitionGroup>
      </Container>
      <SliderNavigation
        setCurrent={setCurrent}
        setIsTouched={setIsTouched}
        current={current}
      />
    </Container>
  );
};
export { MostPopular };
// 900
