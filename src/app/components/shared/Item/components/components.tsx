import React, { Dispatch, SetStateAction, useState } from "react";

import Link from "next/link";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {
  Badge,
  Box,
  Button,
  Chip,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  IButtonBuyProps,
  ICoverItemProps,
  IListTagsOrGenresProps,
  ITypographyItemProps,
  THover,
} from "../types/item";
import { ArrowDownRight, ArrowUpLeft, ArrowUpRight } from "lucide-react";
import { useOpenClose } from "../hooks/useOpenClose";
import { getBtnBackgroundColor } from "../utils/btnColor";

//! TODO FIX WARN WITH REF
export const CoverItem: React.FC<ICoverItemProps> = ({
  linkCoverImg,
  width,
  hover,
  linkCoverVideo,
  minHeight = "70px",
  labelOwnerGame = "left",
  isOwned,
  idGame,
}) => {
  const [hoverOnTheiler, setHoverOnTheiler] = useState(false);
  const customHeight = minHeight !== "70px" && minHeight;
  const badgeContent = isOwned ? "In library" : 0;
  if (linkCoverImg || linkCoverVideo) {
    return (
      <>
        {hover === 0 || hover === undefined ? (
          <a href={`/game/${idGame}`} >
            <Badge
              color="primary"
              badgeContent={badgeContent}
              anchorOrigin={{ horizontal: labelOwnerGame, vertical: "top" }}
            >
              <img
                style={{
                  borderRadius: "5px",
                  minHeight: minHeight,
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                width={width}
                height={customHeight.toString()}
                src={linkCoverImg}
                alt="cover item"
              />
            </Badge>
          </a>
        ) : (
          <video
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHoverOnTheiler(true)}
            onMouseLeave={() => setHoverOnTheiler(false)}
            controls={hoverOnTheiler}
            poster={linkCoverImg}
            width={width}
            height={223}
            autoPlay
            muted
            src={linkCoverVideo}
          ></video>
        )}
      </>
    );
  } else {
    return null;
  }
};

export const TypographyItem: React.FC<ITypographyItemProps> = ({
  fontSize,
  whiteSpace,
  text,
  mt,
  ml,
  p,
  link,
}) => {
  if (link) {
    return (
      <>
        {text && (
          <Link href={`${link}`} style={{ color: "#fff" }}>
            <Typography
              sx={{
                whiteSpace: whiteSpace,
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
              mt={mt}
              ml={ml}
              p={p}
              fontSize={fontSize}
            >
              {text}
            </Typography>
          </Link>
        )}
      </>
    );
  } else {
    return (
      text && (
        <Typography
          sx={{
            whiteSpace: whiteSpace,
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          mt={mt}
          ml={ml}
          p={p}
          fontSize={fontSize}
        >
          {text}
        </Typography>
      )
    );
  }
};

export const ListTagsOrGenres: React.FC<IListTagsOrGenresProps> = ({
  arrayElements,
  mt,
  ml,
  spacing = 1,
  mb = "10px",
  spaceBetween,
}) => {
  const { isOpen, setIsOpen, modifiedArrayEl } = useOpenClose(arrayElements);
  const maxAmountChips = 10;
  const isMoreChips = arrayElements && arrayElements.length > maxAmountChips; 
  return (
    <Stack
      sx={
        spacing === 0
          ? { flexWrap: "wrap", maxWidth: "350px", alignItems: "center" }
          : { justifyContent: spaceBetween ? "space-between" : null }
      }
      direction={"row"}
      spacing={spaceBetween ? 0 : spacing}
      mb={mb}
      ml={ml}
      mt={mt}
    >
      {modifiedArrayEl &&
        modifiedArrayEl.map((el, i) => {
          return (
            <div key={el.id + "_" + i}>
              <Tooltip title={el.name}>
                <Chip
                  label={el.name}
                  sx={{
                    fontSize: "12px",
                    marginTop: spacing === 0 ? "7px" : null,
                    marginLeft: spacing === 0 ? "5px" : null,
                    maxWidth: "70px",
                  }}
                />
              </Tooltip>
            </div>
          );
        })}
      {isMoreChips && (
        <Button
          onClick={() => setIsOpen(!isOpen)}
          sx={{ width: "47px", height: "30px", mt: "7px", ml: "5px" }}
        >
          {!isOpen && <ArrowDownRight />}
          {isOpen && <ArrowUpLeft />}
        </Button>
      )}
    </Stack>
  );
};

export const ButtonBuy: React.FC<IButtonBuyProps> = ({ price, href, discount }) => {
  return (
    <Link href={href}>
      <Button
        sx={{
          width: "100%",
          position: "absolute",
          bottom: "0",
          height: "100%",
          background: getBtnBackgroundColor(discount),
        }}
      >
        {price}
      </Button>
    </Link>
  );
};

interface IItemLargePreviewWrapperProps {
  width: string;
  setHover: Dispatch<SetStateAction<THover>>;
  children: React.ReactNode;
}
interface IItemLargePreviewAnimationProps {
  hover: THover;
  children: React.ReactNode;
}

export const ItemLargePreviewWrapper: React.FC<
  IItemLargePreviewWrapperProps
> = ({ width, setHover, children }) => {
  return (
    <Box
      width={width}
      height={"650px"}
      bgcolor={"#0a0a0adb"}
      overflow={"hidden"}
      position={"relative"}
      ml={"20px"}
      borderRadius={"5px"}
      onMouseEnter={() => setHover && setHover(1)}
      onMouseLeave={() => setHover && setHover(0)}
    >
      {children}
    </Box>
  );
};

export const ItemLargePreviewAnimation: React.FC<
  IItemLargePreviewAnimationProps
> = ({ hover, children }) => {
  return (
    <Box width={390} height={223}>
      <TransitionGroup>
        <CSSTransition key={hover} timeout={500} classNames="item">
          {children}
        </CSSTransition>
      </TransitionGroup>
    </Box>
  );
};
