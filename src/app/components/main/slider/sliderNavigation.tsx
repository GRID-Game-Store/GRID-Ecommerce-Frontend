import React from "react";
import {
  Container,
  Stack,
} from "@mui/material";
import type * as CSS from 'csstype';
import { ACTIVE_SLIDER_IN_MS, AMOUNT_SLIDES } from "@/app/constants/slider";

const DotStyle: CSS.Properties  = {
  background: "#ffff",
  width: "7px",
  height: "7px",
  borderRadius: "100%",
  cursor:"pointer"
}
const ActiveDotStyle: CSS.Properties = {
  background: "#08AD2C",
  width: "7px",
  height: "7px",
  borderRadius: "100%",
  cursor:"pointer"
}
interface IChangeCurrentSlide {
  (i:number ,
  setCurrent: (i: number) => void,
  setIsTouched: (value: boolean) => void,) : void
}
export const changeCurrentSlide: IChangeCurrentSlide = (i, setCurrent, setIsTouched)  => {
  setIsTouched(true)
  setCurrent(i)
  setTimeout(() =>{
    setIsTouched(false)
  }, ACTIVE_SLIDER_IN_MS)
}

const NavigationDots:React.FC<ISliderNavigation> = ({current, setCurrent, setIsTouched}) => {
  const dots = Array.from(Array(AMOUNT_SLIDES).keys())

  return (
    <Stack spacing={1} direction="row" width={"max-content"} sx={{position:"relative", zIndex:"10"}}>
      {dots.map((dot, i) => {
        const isCurrent = i === current
        return <div key={i} aria-label="navigation dots" onClick={() => changeCurrentSlide(i, setCurrent, setIsTouched)} style={isCurrent ? ActiveDotStyle : DotStyle}/>
      })}
    </Stack>
  );
};


const SliderNavigation:React.FC<ISliderNavigation> = ({current, setCurrent, setIsTouched}) => {
  return (
    <Container
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
       
      }}
    >
    <NavigationDots setCurrent={setCurrent} setIsTouched={setIsTouched} current={current}/>
    </Container>
  );
};
export {SliderNavigation}

interface ISliderNavigation {
  current: number,
  setCurrent: (i: number) => void;
  setIsTouched: (value: boolean) => void;
}