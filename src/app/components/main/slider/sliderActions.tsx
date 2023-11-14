import {
  Button,
  Chip,
  Container,
  MobileStepper,
  Stack,
  SxProps,
  Typography,
  
} from "@mui/material";
import { ResponseGame } from "./../types/Response.d";
import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { changeCurrentSlide } from "./sliderNavigation";
import { AMOUNT_SLIDES } from "@/app/constants/slider";



interface ITitleProps {
  title: string;
}
interface IDescriptionProps {
  description: string;
}
interface IPricingProps {
  prise: number;
}
type TSlierItemsProps = {
  slides: ResponseGame;
  current: number,
  setCurrent: (i: number) => void;
  setIsTouched: (value: boolean) => void;
};

type IButtonsNavigate = {
  current: number,
  setCurrent: (i: number) => void;
  setIsTouched: (value: boolean) => void;
};

const Title: React.FC<ITitleProps> = ({ title }) => {
  return (
    <Typography sx={{ fontWeight: "700" }} variant="h4">
      {title}
    </Typography>
  );
};
const Description: React.FC<IDescriptionProps> = ({ description }) => {
  return (
    <Typography
      width={"550px"}
      height={"50px"}
      overflow={"hidden"}
      paddingBottom={"5px"}
    >
      {description}
    </Typography>
  );
};

const Pricing: React.FC<IPricingProps> = ({ prise }) => {
  
  return (
    <Container
      sx={{
        padding: "5.4px",
        background: "#08AD2C",
        borderRadius: "5px",
        width: "max-content",
      }}
    >
      <Typography fontSize={"21px"}>{prise ? prise + "" : "free"}</Typography>
    </Container>
  );
};

const ButtonBuy = () => {
  return (
    <Button size="large" sx={{ width: "200px", marginRight: "4px" }}>
      Buy now
    </Button>
  );
};

const styleButtonsNavigate: SxProps = {
          position: "absolute",
          left: "0px",
          right: "undefined", 
          top: "50%",
          transform: "translate(0, -50%) rotate(0.5turn)",
          width: "80px",
          height: "455px",
          background: "none",
          color:"rgba(114, 114, 114, 0.844)",
          "&:hover": {
            color:"#ffff",
            backdropFilter: "blur(3px)",
            background: "#040d129f",
            overflow: "hidden",
            borderRadius: "0 20px 20px 0",
          },
}
let styleButtonsNavigateRight = {...styleButtonsNavigate}
styleButtonsNavigateRight.right = "0"
styleButtonsNavigateRight.left = "undefined"
styleButtonsNavigateRight.transform = "translate(0, -50%)"

const ButtonsNavigate: React.FC<IButtonsNavigate> = ({current, setCurrent, setIsTouched}) => {
  const isFirstSlide = current  >= 1
  const isLastSlide = current  < AMOUNT_SLIDES-1
  return (
    <>
      {isFirstSlide && <Button
        sx={styleButtonsNavigate}
        aria-label="prev slide"
        disableRipple 
        onClick={() => changeCurrentSlide(current-1, setCurrent, setIsTouched)}
      >
        <ArrowRightAltIcon fontSize="large" />
      </Button>}
      { isLastSlide && <Button
        sx={styleButtonsNavigateRight}
        disableRipple
        aria-label="next slide"
        onClick={() => changeCurrentSlide(current+1, setCurrent, setIsTouched)}
      >
        <ArrowRightAltIcon sx={{ filter: "blur(0px)" }} fontSize="large" />
      </Button>}
    </>
  );
};
const SliderActions: React.FC<TSlierItemsProps> = ({ slides, current, setCurrent, setIsTouched }) => {

  
  return (
    <Container sx={SliderWrapStyle}>
      <ButtonsNavigate 
        setCurrent={setCurrent}
        setIsTouched={setIsTouched}
        current={current}/>
      <Title title={slides.title} />
      <Description description={slides.description} />
      <Stack direction="row" spacing={"5px"}>
        {slides.genres.map(genre => {
          return  <Chip key={genre.id} label={genre.name} variant="outlined"  />
        })}
    </Stack>
      <Container disableGutters sx={StyleWrapInfo}>
        <ButtonBuy />
        <Pricing prise={slides.price} />
      </Container>
    </Container>
  );
};

export { SliderActions };
const SliderWrapStyle: SxProps = {
  marginTop: "-200px",
  marginLeft: "65px",
};
const StyleWrapInfo: SxProps = {
  display: "flex",
  flexDirection: "row",
  width: "max-content",
  alignItems: "flex-end",
  marginLeft: 0,
  marginTop: "10px",
}