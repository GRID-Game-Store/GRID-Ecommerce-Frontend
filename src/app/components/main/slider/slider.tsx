"use client";
import Box from "@mui/material/Box";
import {
  useEffect,
  useState,
} from "react";
import {
  Container,
  SxProps,
} from "@mui/material";
import style from "./slider.module.css";
import { SliderActions } from "./sliderActions";
import { SliderNavigation } from "./sliderNavigation";
import { useColorFromImg } from "@/app/hooks/useColorFromImg";
import { IMostPopularProps, ResponseGamePopular } from "./../types/Response.d";
import {
  TransitionGroup,
  CSSTransition,
} from "react-transition-group";


type SlierItemsProps = {
  slides: ResponseGamePopular;
  current: number,
  setCurrent: (i: number) => void;
  setIsTouched: (value: boolean) => void;
};

const SliderItems: React.FC<SlierItemsProps> = ({ slides, current, setCurrent, setIsTouched }) => {
  
  const color =  useColorFromImg(slides.cover_image_url);
  const Link = slides.cover_image_url
  const styleItemSlider: SxProps  = {
      background: `url(${Link}) 0 0px / 100% no-repeat `,
      borderRadius: "20px",
      boxShadow: color && `${color} 0px 2px 15px 0px`,
  } 


  return (
    <Box
      width={"900px"}
      height={"453px"}
      className={style.SliderItem}
      sx={styleItemSlider}
    >
      <SliderActions 
        slides={slides} 
        setCurrent={setCurrent}
        setIsTouched={setIsTouched}
        current={current} />
    </Box>
  );

  
};

const MostPopular: React.FC<IMostPopularProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const [isTouched, setIsTouched] = useState(false);
  
  const slidesWrapInSec = 14

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isTouched) {
      } else if (current >= 4) {
        setCurrent(0);
      } else {
        setCurrent(current + 1);
      }
    }, slidesWrapInSec*1000);
    return () => clearTimeout(timer);
  }, [current, isTouched, setCurrent]);



  return (
    <Container>
      <Container sx={styleWrapSlider}>
        <TransitionGroup>
          <CSSTransition key={current} timeout={500} classNames="messageout">
            <SliderItems slides={slides[current]}  
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

const styleWrapSlider: SxProps = {
  width: "900px",
  height: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
};
